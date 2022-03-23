/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */

//hcl libraries
import { constants, getLocalStorageUtil, getSessionStorageUtil } from "@hcl-commerce-store-sdk/utils";
import { PERMANENT_STORE_DAYS } from "../../configs/common";

const basename = process.env.REACT_APP_ROUTER_BASENAME || "";
//base name scope storeId and session

const _localStorageUtil = getLocalStorageUtil(basename);
const _sessionStorageUtil = getSessionStorageUtil(basename);

const storageSessionHandler = {
  /**
   * Save current user to storage
   */
  saveCurrentUser: (currentUser: any) => {
    if (!currentUser.forUserId) {
      _localStorageUtil.set(
        constants.CURRENT_USER,
        currentUser,
        currentUser.rememberMe ? PERMANENT_STORE_DAYS : undefined
      );
    }
  },
  /**
   * Remove current user from storage.
   */
  removeCurrentUser: () => {
    _localStorageUtil.removeStartsWith(constants.ACCOUNT);
    _localStorageUtil.remove(constants.CURRENT_USER);
    _sessionStorageUtil.remove(constants.CURRENT_USER);
  },

  /**
   * Get current user from storage and load any account-related keys from storage
   */
  getCurrentUserAndLoadAccount: (): any => {
    //forUserSession
    const _forUser = _sessionStorageUtil.get(constants.FOR_USER_SESSION);
    const _inForUserSession =
      window.parent === window.top &&
      window.top !== window.self &&
      window.parent.location.pathname.toLocaleLowerCase().endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser !== null && _inForUserSession) {
      return _forUser;
    }
    //handle refresh use both session and local
    const lCurrentUser = _localStorageUtil.get(constants.CURRENT_USER);
    const sCurrentUser = _sessionStorageUtil.get(constants.CURRENT_USER);
    // if (lCurrentUser && sCurrentUser === null) {
    //   _sessionStorageUtil.set(constants.CURRENT_USER, lCurrentUser);
    // }
    if (
      (lCurrentUser === null && sCurrentUser) ||
      (lCurrentUser?.rememberMe && !lCurrentUser?.WCToken && sCurrentUser?.rememberMe)
    ) {
      _localStorageUtil.set(
        constants.CURRENT_USER,
        sCurrentUser,
        sCurrentUser.rememberMe ? PERMANENT_STORE_DAYS : undefined
      );
      _sessionStorageUtil.remove(constants.CURRENT_USER);

      const sAccountKeys = _sessionStorageUtil.getKeysStartsWith(constants.ACCOUNT);
      sAccountKeys.forEach((sKey) => {
        const lValue = _localStorageUtil.get(sKey);
        const sValue = _sessionStorageUtil.get(sKey);

        if (lValue === null && sValue) {
          _localStorageUtil.set(sKey, sValue);
          _sessionStorageUtil.remove(sKey);
        }
      });
    }
    return _localStorageUtil.get(constants.CURRENT_USER);
  },
  /**
   * Save previewToken to storage
   */
  savePreviewToken: (token: any) => {
    _sessionStorageUtil.set(constants.WC_PREVIEW_TOKEN, token);
  },
  /**
   * Remove previewToke to storage
   */
  removePreviewToken: () => {
    _sessionStorageUtil.remove(constants.WC_PREVIEW_TOKEN);
  },
  /**
   * Get previewToken from storage.
   */
  getPreviewToken: (): any => {
    return _sessionStorageUtil.get(constants.WC_PREVIEW_TOKEN);
  },
  /**
   * Replicate session info from LocalStorage to SessionStorage to
   * handle refresh last open tab scenario
   */
  replicateSession: () => {
    const currentUser = _localStorageUtil.get(constants.CURRENT_USER);
    if (currentUser) {
      _sessionStorageUtil.set(constants.CURRENT_USER, currentUser);
    }

    const accountKeys = _localStorageUtil.getKeysStartsWith(constants.ACCOUNT);
    accountKeys.forEach((key) => {
      const value = _localStorageUtil.get(key);
      _sessionStorageUtil.set(key, value);
    });
  },
  clearLocalStorageSessionInfo: () => {
    const currentUser = _localStorageUtil.get(constants.CURRENT_USER);
    if (currentUser.rememberMe) {
      delete currentUser.WCToken;
      delete currentUser.WCTrustedToken;
      _localStorageUtil.set(constants.CURRENT_USER, currentUser, PERMANENT_STORE_DAYS);
    } else {
      _localStorageUtil.remove(constants.CURRENT_USER);
    }
    _localStorageUtil.removeStartsWith(constants.ACCOUNT);
  },

  triggerUserStorageListener: (callback: () => void) => {
    window.addEventListener("storage", () => {
      callback();
    });
  },
};

const windowRegistryHandler = {
  /**
   * Add new window/tab to window counter.
   */
  registerWindow: () => {
    const _forUser = _sessionStorageUtil.get(constants.FOR_USER_SESSION);
    const _inForUserSession =
      window.parent === window.top &&
      window.top !== window.self &&
      window.parent.location.pathname.toLocaleLowerCase().endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser === null || !_inForUserSession) {
      const windowId: string = Date.now().toString();
      _sessionStorageUtil.set(constants.WINDOW_ID, windowId);
      const windowCounter: string[] = _localStorageUtil.get(constants.WINDOW_COUNTER) || [];
      windowCounter.push(windowId);
      _localStorageUtil.set(constants.WINDOW_COUNTER, windowCounter);
    }
  },
  /**
   * Remove window counter from window counter upon window unload,
   * if the window counter is less than 2, remove the counter
   * and also the current user.
   */
  unRegisterWindow: () => {
    const _forUser = _sessionStorageUtil.get(constants.FOR_USER_SESSION);
    const _inForUserSession =
      window.parent === window.top &&
      window.top !== window.self &&
      window.parent.location.pathname.toLocaleLowerCase().endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser === null || !_inForUserSession) {
      const windowCounter: string[] = _localStorageUtil.get(constants.WINDOW_COUNTER) || [];
      storageSessionHandler.replicateSession();
      if (windowCounter.length < 2) {
        //only one tab is open
        _localStorageUtil.remove(constants.WINDOW_COUNTER);
        //only remove from localStorage, sessionStorage is handled by browser
        storageSessionHandler.clearLocalStorageSessionInfo();
        if (_localStorageUtil.getTotalWindowCount() === 0) {
          //remove storeId from storage upon all windows/tab close
          //so that new window open will start a new store session
          //using default store or the storeId in url.
          _localStorageUtil.removeStoreId();
        }
      } else {
        const windowId: string = _sessionStorageUtil.get(constants.WINDOW_ID);
        const index: number = windowCounter.findIndex((wid) => {
          return wid === windowId;
        });
        windowCounter.splice(index, 1);
        _localStorageUtil.set(constants.WINDOW_COUNTER, windowCounter);
      }
      _sessionStorageUtil.remove(constants.WINDOW_ID);
    }
  },
};

const storageStoreIdHandler = {
  /**
   * Sets storeId to storage.
   */
  setStoreId: (storeId: string) => {
    _localStorageUtil.setStoreId(storeId);
    _sessionStorageUtil.setStoreId(storeId);
  },
  /**
   * Gets store Id for initialization of App
   */
  getStoreId4Initialization: (): string | null => {
    return _sessionStorageUtil.getStoreId() || _localStorageUtil.getStoreId();
  },
  /**
   * Gets storeId for current tab(sessionStorage)
   */
  getStoreId: (): string | null => {
    return _sessionStorageUtil.getStoreId();
  },
  /**
   * Remove storeId from localStorage.
   */
  removeStoreId: () => {
    _localStorageUtil.removeStoreId();
  },

  /**
   * Verify currently active store and save it to localStorage.
   * It is called each time a service request issued and while user
   * trying to open contextmenu.
   */
  verifyActiveStoreId: () => {
    const _lStoreId: string = _localStorageUtil.getStoreId();
    const _sStoreId = _sessionStorageUtil.getStoreId();
    if (_lStoreId !== _sStoreId) {
      _localStorageUtil.setStoreId(_sStoreId);
    }
  },
};

const sessionStorageUtil = (() => {
  const { setStoreName, set, get, remove, clear } = _sessionStorageUtil;
  return {
    setStoreName,
    set,
    get,
    remove,
    clear,
  };
})();
const localStorageUtil = (() => {
  const { setStoreName, get, set, remove } = _localStorageUtil;
  return {
    setStoreName,
    get,
    set,
    remove,
  };
})();

export { localStorageUtil, sessionStorageUtil, storageSessionHandler, storageStoreIdHandler, windowRegistryHandler };

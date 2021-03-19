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
//Standard libraries
import attempt from "lodash/attempt";
import isError from "lodash/isError";
import * as constants from "../constants/common";

const basename = process.env.REACT_APP_ROUTER_BASENAME || "";
const KEY_PREFIX = `HCS${basename}-`;
//base name scope storeId and session

const getLocalStorageUtil = () => {
  const EXPIRATION_SUFFIX = "STORAGEUTIL-EXPIREKEY";
  const EXPIRATION_DAY: number = 24 * 60 * 60 * 1000;
  let STORAGE_KEYS = `${KEY_PREFIX}KEYS`;
  let storeName = "";

  /**
   * Set StoreId to localStorage
   */
  const setStoreId = (value: any): void => {
    localStorage.setItem(
      `${KEY_PREFIX}${constants.STORE_ID}`,
      JSON.stringify(value)
    );
  };

  /**
   * Get storeId from localStorage
   */
  const getStoreId = (): any => {
    const r = localStorage.getItem(`${KEY_PREFIX}${constants.STORE_ID}`);
    let result = r === null ? null : attempt(JSON.parse, r);
    if (isError(result)) {
      result = r;
    }
    return result;
  };

  /**
   * Remove storeId from localStorage
   */
  const removeStoreId = (): any => {
    localStorage.removeItem(`${KEY_PREFIX}${constants.STORE_ID}`);
  };

  /**
   * Initialize storage scope/namespace using store identifier
   * @param _storeName
   */
  const setStoreName = (_storeName: string) => {
    storeName = _storeName;
    invalidateAllIfExpired();
  };

  const _get = (storeNameKey: string): any | null => {
    const r = localStorage.getItem(`${KEY_PREFIX}${storeNameKey}`);
    let result = r == null ? null : attempt(JSON.parse, r);
    if (isError(result)) {
      result = r;
    }
    return result;
  };
  /**
   * Gets the item from localStorage.
   * @param {string} key
   * @returns {any | null}
   */
  const get = (key: string): any | null => {
    const storeNameKey = `${storeName}-${key}`;
    return _get(storeNameKey);
  };

  /**
   * Gets the keys from localStorage where key starts with prefix
   * @param {string} key
   * @returns {any[]}
   */
  const getKeysStartsWith = (keyStartsWith: string): any | null => {
    let getKeysList: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key && key.startsWith(`${KEY_PREFIX}${storeName}-${keyStartsWith}`)) {
        getKeysList.push(key.substring(key.indexOf(`${keyStartsWith}`)));
      }
    }
    return getKeysList;
  };

  /**
   * Save the item to localStorage
   * @param {string} key
   * @param {string} value
   * @param {number} expiration duration in days
   */
  const set = (key: string, value: any, expiration?: number) => {
    remove(key);
    const currentKey = `${KEY_PREFIX}${storeName}-${key}`;
    setItem(currentKey, value);
    const jsonKeys: string[] = getStorageKeys();
    jsonKeys.push(key);
    saveStorageKeys(jsonKeys);
    if (expiration) {
      setItem(
        `${KEY_PREFIX}${storeName}-` + getExpirationKey(key),
        getExpireValue(expiration)
      );
    }
  };

  /**
   * Remove the localStorage cache item with specific key
   * @param {string} key
   */
  const remove = (key: string) => {
    localStorage.removeItem(`${KEY_PREFIX}${storeName}-${key}`);
    localStorage.removeItem(
      `${KEY_PREFIX}${storeName}-` + getExpirationKey(key)
    );
    const storageKeys = getStorageKeys();
    const kIndex = storageKeys.indexOf(key);
    /* istanbul ignore else */
    if (kIndex > -1) {
      storageKeys.splice(kIndex, 1);
    }
    saveStorageKeys(storageKeys);
  };

  /**
   * Remove the localStorage cache item with key starting with prefix
   * @param {string} key
   */
  const removeStartsWith = (keyStartsWith: string) => {
    let removeKeysList: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key && key.startsWith(`${KEY_PREFIX}${storeName}-${keyStartsWith}`)) {
        removeKeysList.push(key.substring(key.indexOf(`${keyStartsWith}`)));
      }
    }
    removeKeysList.forEach((key) => remove(key));
  };

  /**
   * get the key that stores the expiration days info
   * @param {string} key
   * @returns {string} the key for storing expiration days
   */
  const getExpirationKey = (key: string) => {
    return `${key}-${EXPIRATION_SUFFIX}`;
  };

  /**
   * Invalidate the localStorage cache if it is expired.
   * @param {string} key
   */
  const invalidateIfExpired = (key: string): boolean => {
    const expireKey = getExpirationKey(key);
    const expireTime = get(expireKey);
    const currentTime = new Date().getTime();
    if (expireTime && currentTime > parseInt(expireTime, 10)) {
      remove(key);
      return true;
    } else {
      return false;
    }
  };

  const invalidateAllIfExpired = () => {
    const keys: string[] = getStorageKeys();
    const keysClone = [...keys];
    keys.forEach((k) => {
      if (invalidateIfExpired(k)) {
        keysClone.splice(keysClone.indexOf(k), 1);
      }
    });
    saveStorageKeys(keysClone);
  };

  const getExpireValue = (t: number) => {
    return String(new Date().getTime() + t * EXPIRATION_DAY);
  };

  const getStorageKeys = (): string[] => {
    const r = localStorage.getItem(STORAGE_KEYS);
    const storeNamePrefix = `${storeName}-`;
    let storageKeys = r == null ? [] : attempt(JSON.parse, r);
    if (isError(storageKeys)) {
      storageKeys = [];
    }
    const keys2return = storageKeys
      .filter((k) => k.indexOf(storeNamePrefix) === 0)
      .map((k: string) => k.substr(storeNamePrefix.length));
    return keys2return;
  };

  const getAllWindowCountStorageKeys = (): string[] => {
    const r = localStorage.getItem(STORAGE_KEYS);
    let storageKeys = r == null ? [] : attempt(JSON.parse, r);
    if (isError(storageKeys)) {
      storageKeys = [];
    }
    const keys2return = storageKeys.filter((k: string) =>
      k.endsWith(constants.WINDOW_COUNTER)
    );
    return keys2return;
  };

  const saveStorageKeys = (keys: string[]) => {
    const storeNamePrefix = `${storeName}-`;
    const r = localStorage.getItem(STORAGE_KEYS);
    let storageKeys = r == null ? [] : attempt(JSON.parse, r);
    if (isError(storageKeys)) {
      storageKeys = [];
    }
    const keys2save = storageKeys.filter(
      (k) => k.indexOf(storeNamePrefix) !== 0
    );
    const _keys = keys.map((k) => `${storeName}-${k}`);
    setItem(STORAGE_KEYS, _keys.concat(keys2save));
  };

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  };

  const getTotalWindowCount = (): number => {
    let _count = 0;
    const keys = getAllWindowCountStorageKeys();
    keys.forEach((k) => {
      const v: string[] = _get(k);
      if (v) {
        _count = _count + v.length;
      }
    });
    return _count;
  };

  return {
    setStoreName,
    get,
    getKeysStartsWith,
    set,
    remove,
    removeStartsWith,
    setStoreId,
    getStoreId,
    removeStoreId,
    getTotalWindowCount,
  };
};

const getSessionStorageUtil = () => {
  let storeName = "";

  /**
   * Set store name as storage scope
   * @param _storeName
   */
  const setStoreName = (_storeName: string) => {
    storeName = _storeName;
  };

  const getKey = (key: string) => {
    return `${KEY_PREFIX}${storeName}-${key}`;
  };
  // WE do not need to use storename for session storage, since the storage is per tab.
  /**
   * Set item to sessionStorage
   * @param key
   * @param value
   */
  const set = (key: string, value: any): void => {
    sessionStorage.setItem(getKey(key), JSON.stringify(value));
  };

  /**
   * Get item from sessionStorage
   * @param key
   */
  const get = (key: string): any => {
    const r = sessionStorage.getItem(getKey(key));
    let result = r === null ? null : attempt(JSON.parse, r);
    if (isError(result)) {
      result = r;
    }
    return result;
  };

  /**
   * Gets the keys from sessionStorage where key starts with prefix
   * @param {string} key
   * @returns {any[]}
   */
  const getKeysStartsWith = (keyStartsWith: string): any | null => {
    let getKeysList: any[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key && key.startsWith(getKey(`${keyStartsWith}`))) {
        getKeysList.push(key.substring(key.indexOf(`${keyStartsWith}`)));
      }
    }
    return getKeysList;
  };

  /**
   * Set StoreId to sessionStorage
   */
  const setStoreId = (value: any): void => {
    sessionStorage.setItem(
      `${KEY_PREFIX}${constants.STORE_ID}`,
      JSON.stringify(value)
    );
  };

  /**
   * Get storeId from sessionStorage
   */
  const getStoreId = (): any => {
    const r = sessionStorage.getItem(`${KEY_PREFIX}${constants.STORE_ID}`);
    let result = r === null ? null : attempt(JSON.parse, r);
    if (isError(result)) {
      result = r;
    }
    return result;
  };

  /**
   * Remove storeId from sessionStorage
   */
  const removeStoreId = (): any => {
    sessionStorage.removeItem(`${KEY_PREFIX}${constants.STORE_ID}`);
  };

  /**
   * Remove item from sessionStorage
   * @param key
   */
  const remove = (key: string): void => {
    sessionStorage.removeItem(getKey(key));
  };

  /**
   * Clear store specific sessionStorage items.
   */
  const clear = () => {
    let removeKeysList: any[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key && key.startsWith(`${KEY_PREFIX}${storeName}`)) {
        removeKeysList.push(key);
      }
    }
    removeKeysList.forEach((key) => sessionStorage.removeItem(key));
  };

  return {
    setStoreName,
    setStoreId,
    getStoreId,
    removeStoreId,
    set,
    get,
    getKeysStartsWith,
    remove,
    clear,
  };
};

const _localStorageUtil = getLocalStorageUtil();
const _sessionStorageUtil = getSessionStorageUtil();

const storageSessionHandler = {
  /**
   * Save current user to storage
   */
  saveCurrentUser: (currentUser: any) => {
    if (!currentUser.forUserId) {
      _localStorageUtil.set(constants.CURRENT_USER, currentUser);
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
      window.parent.location.pathname
        .toLocaleLowerCase()
        .endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser !== null && _inForUserSession) {
      return _forUser;
    }
    //handle refresh use both session and local
    const lCurrentUser = _localStorageUtil.get(constants.CURRENT_USER);
    const sCurrentUser = _sessionStorageUtil.get(constants.CURRENT_USER);
    // if (lCurrentUser && sCurrentUser === null) {
    //   _sessionStorageUtil.set(constants.CURRENT_USER, lCurrentUser);
    // }
    if (lCurrentUser === null && sCurrentUser) {
      _localStorageUtil.set(constants.CURRENT_USER, sCurrentUser);
      _sessionStorageUtil.remove(constants.CURRENT_USER);

      const sAccountKeys = _sessionStorageUtil.getKeysStartsWith(
        constants.ACCOUNT
      );
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
    _localStorageUtil.remove(constants.CURRENT_USER);
    _localStorageUtil.removeStartsWith(constants.ACCOUNT);
  },

  triggerUserStorageListener: (callback: Function) => {
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
      window.parent.location.pathname
        .toLocaleLowerCase()
        .endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser === null || !_inForUserSession) {
      const windowId: string = Date.now().toString();
      _sessionStorageUtil.set(constants.WINDOW_ID, windowId);
      const windowCounter: string[] =
        _localStorageUtil.get(constants.WINDOW_COUNTER) || [];
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
      window.parent.location.pathname
        .toLocaleLowerCase()
        .endsWith(constants.SHOP_ON_BEHALF_PATH);
    if (_forUser === null || !_inForUserSession) {
      const windowCounter: string[] =
        _localStorageUtil.get(constants.WINDOW_COUNTER) || [];
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

export {
  localStorageUtil,
  sessionStorageUtil,
  storageSessionHandler,
  storageStoreIdHandler,
  windowRegistryHandler,
};

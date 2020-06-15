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
import attempt from "lodash-es/attempt";
import isError from "lodash-es/isError";
import { STORE_ID } from "../constants/common";

const getLocalStorageUtil = () => {
  const EXPIRATION_SUFFIX = "STORAGEUTIL-EXPIREKEY";
  const EXPIRATION_DAY: number = 24 * 60 * 60 * 1000;
  const KEY_PREFIX = "HCS-";
  let STORAGE_KEYS = `${KEY_PREFIX}KEYS`;
  let storeName = "";

  const setStoreName = (_storeName: string) => {
    storeName = _storeName;
    invalidateAllIfExpired();
  };
  /**
   * Gets the item from localStorage.
   * @param {string} key
   * @returns {any | null}
   */
  const get = (key: string): any | null => {
    const r = localStorage.getItem(`${KEY_PREFIX}${storeName}-${key}`);
    let result = r == null ? null : attempt(JSON.parse, r);
    if (isError(result)) {
      result = r;
    }
    return result;
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
    let storageKeys = r == null ? [] : attempt(JSON.parse, r);
    if (isError(storageKeys)) {
      storageKeys = [];
    }
    return storageKeys;
  };

  const saveStorageKeys = (keys: string[]) => {
    setItem(STORAGE_KEYS, keys);
  };

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  };

  return {
    setStoreName,
    get,
    set,
    remove,
  };
};

const getSessionStorageUtil = () => {
  const KEY_PREFIX = "HCS";
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
   * Set StoreId to sessionStorage
   */
  const setStoreId = (value: any): void => {
    sessionStorage.setItem(`${KEY_PREFIX}-${STORE_ID}`, JSON.stringify(value));
  };

  /**
   * Get storeId from sessionStorage
   */
  const getStoreId = (): any => {
    const r = sessionStorage.getItem(`${KEY_PREFIX}-${STORE_ID}`);
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
    sessionStorage.removeItem(`${KEY_PREFIX}-${STORE_ID}`);
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
    remove,
    clear,
  };
};

const localStorageUtil = getLocalStorageUtil();
const sessionStorageUtil = getSessionStorageUtil();
export { localStorageUtil, sessionStorageUtil };

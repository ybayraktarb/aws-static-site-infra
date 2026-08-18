/**
 * Card State Management & URL Serialization
 * Handles state encoding/decoding for shareable permalinks and local storage.
 */

const CardState = {
  storageKey: 'user_card_profiles',

  encode(data) {
    try {
      const jsonStr = JSON.stringify(data);
      return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
    } catch (e) {
      console.error('Failed to encode card state', e);
      return null;
    }
  },

  decode(hash) {
    if (!hash || hash.length < 2) return null;
    try {
      const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
      const params = new URLSearchParams(cleanHash);
      const encodedData = params.get('data');

      if (!encodedData) return null;
      const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedData))));
      return JSON.parse(jsonStr);
    } catch (e) {
      console.warn('Invalid or corrupted card hash, falling back to default', e);
      return null;
    }
  },

  saveToLocal(profile) {
    const list = this.getAllLocal();
    const existingIndex = list.findIndex(p => p.id === profile.id);
    if (existingIndex >= 0) {
      list[existingIndex] = profile;
    } else {
      list.push(profile);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  },

  getAllLocal() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  removeLocal(id) {
    const list = this.getAllLocal().filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }
};

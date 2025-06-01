const axios = require('axios');

let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const fetchSettingsFromRemote = async () => {
  try {
    const response = await axios.get('http://localhost:8881/api/setting/listAll');
    cache.data = response.data || [];
    cache.timestamp = Date.now();
  } catch (error) {
    console.error('Failed to fetch settings from remote:', error.message);
    cache.data = [];
  }
};

const loadSettings = async () => {
  try {
    const settings = await getCachedSettings();

    const allSettings = {};
    settings.forEach(({ settingKey, settingValue }) => {
      allSettings[settingKey] = settingValue;
    });

    return allSettings;
  } catch (error) {
    console.error('Failed to load settings:', error.message);
    return {};
  }
};

const getCachedSettings = async () => {
  const now = Date.now();
  const isExpired = now - cache.timestamp > CACHE_DURATION_MS;

  if (!cache.data || isExpired) {
    await fetchSettingsFromRemote();
  }

  return cache.data;
};

const readBySettingKey = async ({ settingKey }) => {
  if (!settingKey) return null;

  const settings = await getCachedSettings();
  const found = settings.find((s) => s.settingKey === settingKey);
  return found || null;
};

const increaseBySettingKey = async ({ settingKey }) => {
    if (!settingKey) return null;
  
    try {
      const settings = await getCachedSettings();
      const current = settings.find(s => s.settingKey === settingKey);
  
      if (!current || typeof current.settingValue !== 'number') {
        return null;
      }
  
      const newValue = current.settingValue + 1;
  
      // Send update to remote microservice
      const response = await axios.patch(
        `http://localhost:8881/api/setting/updateByKey/${encodeURIComponent(settingKey)}`,
        { settingValue: newValue }
      );
  
      if (response.status === 200) {
        // Optional: update the cache optimistically
        current.settingValue = newValue;
        return current;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to increase setting "${settingKey}":`, error.message);
      return null;
    }
  };

module.exports = {
  getCachedSettings,
  readBySettingKey,
  loadSettings,
  increaseBySettingKey,
};

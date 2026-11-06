
import { storeConfig } from "@/config/store.config";
import type { StoreSettings } from "@/types/settings";

const SETTINGS_KEY = "parna-store-settings";

export const defaultSettings: StoreSettings = {
  general: {
    name: storeConfig.name,
    description: storeConfig.description,
    title: storeConfig.name,
    logo: storeConfig.logo,
  },

  contact: {
    phone: storeConfig.contact.phone,
    email: storeConfig.contact.email,
    address: storeConfig.contact.address,
  },

  social: {
    instagram: storeConfig.social.instagram,
    telegram: storeConfig.social.telegram,
  },

  shipping: {
    cost: 50000,
    freeShippingEnabled: true,
    freeShippingMinimum: 1000000,
  },

  payment: {
    onlineEnabled: true,
    cashOnDeliveryEnabled: false,
    cardToCardEnabled: false,
  },

  policies: {
    terms: "",
    returns: "",
    privacy: "",
  },
};

const mergeSettings = (
  saved: Partial<StoreSettings>
): StoreSettings => ({
  general: {
    ...defaultSettings.general,
    ...saved.general,
  },
  contact: {
    ...defaultSettings.contact,
    ...saved.contact,
  },
  social: {
    ...defaultSettings.social,
    ...saved.social,
  },
  shipping: {
    ...defaultSettings.shipping,
    ...saved.shipping,
  },
  payment: {
    ...defaultSettings.payment,
    ...saved.payment,
  },
  policies: {
    ...defaultSettings.policies,
    ...saved.policies,
  },
});

export const settingsService = {
  get: (): StoreSettings => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }

    try {
      const saved = localStorage.getItem(SETTINGS_KEY);

      if (!saved) return defaultSettings;

      return mergeSettings(JSON.parse(saved));
    } catch {
      return defaultSettings;
    }
  },

  save: (settings: StoreSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  reset: (): StoreSettings => {
    localStorage.removeItem(SETTINGS_KEY);
    return defaultSettings;
  },
};

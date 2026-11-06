
export interface StoreSettings {
  general: {
    name: string;
    description: string;
    title: string;
    logo: string;
  };

  contact: {
    phone: string;
    email: string;
    address: string;
  };

  social: {
    instagram: string;
    telegram: string;
  };

  shipping: {
    cost: number;
    freeShippingEnabled: boolean;
    freeShippingMinimum: number;
  };

  payment: {
    onlineEnabled: boolean;
    cashOnDeliveryEnabled: boolean;
    cardToCardEnabled: boolean;
  };

  policies: {
    terms: string;
    returns: string;
    privacy: string;
  };
}

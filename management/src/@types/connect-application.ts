export type ConnectApplication = {
  id: string;
  name: string;
  description: string;
  defaultHomePage: string;
  redirectUris: string[];
};

export type ConnectProviderApplication = {
  application: ConnectApplication;
};

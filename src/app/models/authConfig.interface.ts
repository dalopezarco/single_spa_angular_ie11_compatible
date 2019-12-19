export interface IAuthConfig {
  loginUrl: string;
  redirectUri: string;
  clientId: string;
  scope: string;
  strictDiscoveryDocumentValidation: boolean;
  responseType: string;
  oidc: boolean;
}

export interface IEndPoints {
  apiUI: string;
  apiDomain: string;
  apiAdminDomain: string;
  apiProfileDomain: string;
  apiNotification: string;
  apiTask: string;
  apiProcess: string;
  apiProcessDefinition: string;
  apiUms: string;
  apiUmsQuerymodel: string;
  apiFlexiField: string;
  apiMonitoring: string;
  apiReferenceService: string;
  apiEventRouter: string;
}

export interface IConfiguration {
  featureToggle: string;
  idaAudience: string;
  clientId: string;
  masterTenant: string;
  identityBrokerClientID: string;
  identityBrokerUrl: string;
  authenticationSource: string;
  appInsightsInstrumentationKey: string;
  enclosePersonnelDossier: boolean;
  googleApiKey: string;
  wootricAccountKey: string;
  endpoints: IEndPoints;
  userLanguage: string;
  angularUrls: string;
  YounifierURLs: string;
}

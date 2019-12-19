export const footerLinksConfiguration = {
  others: 'https://www.raet.com/about-us/system-privacy-security/security',
  nl: 'http://trust.youforce.com/nl-nl/beveiliging/melding-kwetsbaarheden/'
};

export const companyName = 'Raet Youforce';

export class AppSettings {
  public static readonly USER_API_ENDPOINT = 'https://yfo-blackwood-dev-ums.azurewebsites.net/api/users?uid';
  public static readonly USER_DETAILS_ENDPOINT = '/employees';
  public static readonly USER_PHOTO_ENDPOINT = 'https://YFO-blackwood-dev-ui-api.azurewebsites.net/api/photos/person?externalId';
  public static readonly BASE_HRM_API_ENDPOINT = 'https://YFO-blackwood-dev-hrmapi.azurewebsites.net/api/';
}

export class UmsRoutes {
  public static readonly user = '/api/users';
  public static readonly updateUser = '/api/users/{userId}/account';
  public static readonly getUser = '/api/users/{userId}';
  public static readonly grantedPermission = '/api/grantedpermissions';
  public static readonly grantedPermissionOnTarget = '/api/v2.0/grantedpermissions/{uid}/{permissionName}/{targetReferenceId}';
  public static readonly explicitGroups = '/api/groups/explicit';
  public static readonly explicitAddGroups = '/api/groups';
  public static readonly explicitGroupUsers = '/api/groups/explicit/{explicitGroupId}/users';
  public static readonly explicitGroup = '/api/groups/explicit/{explicitGroupId}';
  public static readonly userPermissions = '/api/v2.0/grantedpermissions/{uid}?type=feature';
  public static readonly etis = '/api/eti?isRoot=true';
  public static readonly getEti = '/api/eti?id={id}';
  public static readonly deleteExplicitGroupUsers = '/api/groups/explicit/{explicitGroupId}/users/{userId}';
  public static readonly roles = '/api/roles';
  public static readonly role = '/api/roles/{roleid}';
  public static readonly getPermissions = '/api/permissions';
  public static readonly getUserByReferenceId = '/api/users?referenceId={referenceId}';
  public static readonly deleteUserIdentity = '/api/v2.0/users/{uid}/identities?identity={identity}';
  public static readonly addIdentityToUser = '/api/v2.0/users/{uid}/identities';
  public static readonly getPermissionsOnTarget = '/api/v2.0/grantedpermissions/{uid}/{targetReferenceId}/permissions';
  public static readonly settingsGraphToggle = '/api/settings/UseGraphAsQM';
  public static readonly permissionsets = '/api/permissionsets';
  public static readonly permissionset = '/api/permissionsets/{permissionsetid}';
}

export class UiApiRoutes {
  public static readonly feed = '/api/feeds';
  public static readonly menu = '/api/menuitems';
  public static readonly submenu = '/api/submenuitems';
  public static readonly photos = '/api/photos/person';
  public static readonly appearance = '/api/brandsetting';
  public static readonly employee = '/api/employees';
  public static readonly massUpdates = '/api/massupdate';
}

export class PermissionTypes {
  public static readonly VIEW_SETTINGS = 'ViewSettings';
  public static readonly MANAGE_SETTINGS = 'ManageSettings';
}

export const BackUrls = {
  system: '/settings/system',
  settings: '/settings'
};

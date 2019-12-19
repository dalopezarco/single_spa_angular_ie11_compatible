export interface UserInfo {
  isAuthenticated: boolean;
  userName: string;
  uid: string;
  sourceid: string;
  loginError: string;
  permissions: UserPermissions[];
}

export interface UserPermissions {
  ShortName: string;
  RequiresTarget: boolean;
}

export interface UserService {
  getUserHasPermission(uid: string, permission: string): boolean;
}

export interface OAuthService {
  getUserInfo(): UserInfo;
}

export class Permission {
  public Id: number;
  public ShortName: string;
  public RequiresTarget: boolean;
  public Roles: any[];
}

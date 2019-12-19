export interface IIdentity {
  Id: string;
}

export interface INamedEntity {
  FullName: string;
  ShortName: string;
}

export interface IActiveEntity {
  Active: boolean;
}

export interface IBasicEntity extends IIdentity, INamedEntity, IActiveEntity {}

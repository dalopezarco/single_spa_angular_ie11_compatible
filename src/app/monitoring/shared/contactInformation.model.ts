import { IIdentity } from './basicEntity.model';

export interface IContactInformationDto extends IIdentity {
  WorkEmail1: string;
  WorkEmail2: string;
  WorkPhone1: string;
  WorkPhone2: string;
  PersonalEmail: string;
  PersonalPhone1: string;
  PersonalPhone2: string;
  PrimaryEmail: string;
  PrimaryPhone: string;
}

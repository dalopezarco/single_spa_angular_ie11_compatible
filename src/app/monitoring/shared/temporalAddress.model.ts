import { ITemporalValidityPeriodDto } from './temporal.model';

export interface ITemporalAddressDto {
  Id: number;
  TypeName: string;
  ExternalId: string;
  Version: ITemporalAddressVersionDto;
}

export interface ITemporalAddressVersionDto extends ITemporalValidityPeriodDto {
  CountryId: number;
  Country: string;
  Street: string;
  HouseNumber: string;
  Addition: string;
  AdditionalInfo: string;
  ZipCode: string;
  City: string;
  State: string;
  EndDateSetBy: number;
}

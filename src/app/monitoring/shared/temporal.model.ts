import { IBasicEntity } from './basicEntity.model';

export interface ITemporalDto extends IBasicEntity {
  Version: ITemporalValidityPeriodDto;
}

export interface ITemporalValidityPeriodDto {
  VersionId: string;
  ValidityPeriod: IValidityPeriodDto;
}

export interface IValidityPeriodDto {
  VersionValidFrom: string;
  VersionValidTo: string;
}

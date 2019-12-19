import { ITemporalDto, ITemporalValidityPeriodDto } from './temporal.model';

import { IIdentity } from './basicEntity.model';
import { IReferenceDto } from './reference.model';
import { ITemporalAddressDto } from './temporalAddress.model';
import { IContactInformationDto } from './contactInformation.model';
import { IProcessAttachmentDto } from './processFile.model';
import { IFlexifieldMetadata } from './flexifieldsMetadata.model';

export interface ITemporalPersonDto extends ITemporalDto {
  PersonNumber: string;
  ExternalId: string;
  LastNameAtBirth: string;
  PrefixLastNameAtBirth: string;
  LastNameToUse: string;
  DisplayName: string;
  PrefixLastNameToUse: string;
  Initials: string;
  FirstNames: string;
  KnownAs: string;
  TitlePrefix: string;
  TitleSuffix: string;
  GenderId: string;
  Gender: IReferenceDto;
  DateOfDeath: string;
  DateOfBirth: string;
  CountryOfBirthId: string;
  CountryOfBirth: string;
  PrimaryNationalityId: string;
  PrimaryNationality: string;

  PlaceOfBirth: string;
  CommunicationLanguageId: string;
  CommunicationLanguage: IReferenceDto;

  MaritalStatusId: string;
  MaritalStatus: IReferenceDto;

  NationalIdentifications: INationalIdentificationDto[];
  Nationalities: INationalityDto[];

  HomeAddresses: ITemporalAddressDto;
  PostalAddresses: ITemporalAddressDto;
  HomeAddress: ITemporalAddressDto;
  PostalAddress: ITemporalAddressDto;

  ContactInformation: IContactInformationDto;

  Version: ITemporalPersonVersionDto;
  Extensions: any;
  ProcessAttachment: IProcessAttachmentDto;
  Metadata: IFlexifieldMetadata[];
}

export interface ITemporalPersonVersionDto extends ITemporalValidityPeriodDto {
  MaritalStatusId: string;
  MaritalStatus: IReferenceDto;
}

export interface INationalityDto {
  CountryId: string;
  Nationality: string;
}

export interface INationalIdentificationDto {
  NationalDocumentationId: string;
  NationalDocumentation: INationalDocumentationDto;
  Value: string;
}

export interface INationalDocumentationDto {
  NationalDocumentationFullName: string;
  NationalDocumentationShortName: string;
  CountryId: string;
  CountryName: string;
}

export interface IPersonalInformationDto {
  ExternalId: string;
  Id: string;
  VersionId: string;
  LastNameAtBirth: string;
  PrefixLastNameAtBirth: string;
  LastNameToUse: string;
  PrefixLastNameToUse: string;
  Initials: string;
  FirstNames: string;
  KnownAs: string;
  TitlePrefix: string;
  TitleSuffix: string;
  GenderId: string;
  DateOfBirth: string;
  CountryOfBirthId: string;
  PrimaryNationalityId: string;
  Nationalities: string[];
  NationalIdentifications: INationalIdentificationDto[];
  PlaceOfBirth: string;
  CommunicationLanguageId: string;
  MaritalStatusId: string;
  StartDate: string;
  Extensions: any;
  ProcessAttachment: IProcessAttachmentDto;
  Metadata: IFlexifieldMetadata[];
}

export interface IPersonNationalIdentificationDto extends IIdentity {
  Id: string;
  NationalIdentification: IPersonNationalIdentificationInfoDto;
  NationalIdentificationValue: string;
  PersonId: string;
}

export interface IPersonNationalIdentificationInfoDto extends IIdentity {
  FullName: string;
  ShortName: string;
  CountryId: string;
  Country: string;
}

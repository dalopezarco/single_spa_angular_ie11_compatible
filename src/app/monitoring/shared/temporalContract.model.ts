// import PositionAssignmentDto = App.FeedItems.Employee.Hire.IPositionAssignmentDto;
// import { ITemporalDto, ITemporalValidityPeriodDto } from './temporal.model';
// import { IReferenceDto } from './reference.model';

// export interface ITemporalContractDto extends ITemporalDto {
//   PersonId: string;
//   ExternalId: string;
//   ContractNumber: string;
//   CompanyId: string;
//   Company: IEmployeeCompanyDto;
//   HireDate: string;
//   FirstHireDate: string;
//   DischargeDate: string;
//   EmployeeNoticeReceivedDate?: string;
//   EmployerNoticeSendDate?: string;
//   TerminationReasonId?: string;
//   TerminationReason?: IReferenceDto;
//   TerminationTypeId?: string;
//   TerminationNote?: string;
//   Version: ITemporalContractVersionDto;
// }

// export interface ITemporalContractVersionDto extends ITemporalValidityPeriodDto {
//   LocationId: string;
//   Location: IReferenceDto;
//   ContractTypeId: string;
//   ContractType: IReferenceDto;
//   OrganizationalUnitId: string;
//   OrganizationalUnit: IReferenceDto;
//   JobProfileId: string;
//   JobProfile: IReferenceDto;
//   PartTimePercentage: number;
//   ContractualAmount: .IContractualAmountDto;
//   Probation: IProbationDto;
//   EmployeeNoticePeriod: INoticePeriodDto;
//   EmployerNoticePeriod: INoticePeriodDto;
//   CompetitionClause: boolean;
//   LinkedCostAllocation: boolean;
//   CollectiveLaborAgreementId: string;
//   CollectiveLaborAgreement: IReferenceDto;
//   PayAdministrationId: string;
//   PayAdministration: IPayAdministrationDto;
//   TimeOffPolicyId: string;
//   TimeOffPolicy: ITimeOffPolicyDto;
//   SicknessPolicyId: string;
//   SicknessPolicy: ISicknessPolicyDto;
//   ExpensePolicyId: string;
//   ExpensePolicy: App.FeedItems.Settings.ReferenceList.IExpensePolicyDto;
//   PayrollProfile: App.Common.Dto.IReferenceDto;
//   PayrollProfileId: string;
//   WorkPattern: any;
//   RecurringCompensation: App.Common.Dto.IRecurringCompensationDto[];
//   FunctionalAppointments: App.FeedItems.Employee.Hire.IFunctionalAppointmentDto[];
//   PaySchemeDataId: string;
//   PaySchemeData: IPaySchemeDataDto;
//   Extensions: any;
//   Metadata: App.Controls.Flexifields.IFlexifieldMetadata[];
// }

// export interface IEmployeeCompanyDto {
//   ShortName: string;
//   FullName: string;
//   HoursPerWeek: number;
//   HoursPerMonth: number;
//   CountryId: string;
//   CountryName: string;
// }

// export interface IPaySchemeDataDto {
//   Id: string;
//   PaySchemeValueId: string;
//   LowValue: number;
//   MidValue: number;
//   HighValue: number;
//   AutocreatePayComponents: boolean;
// }

// export interface IContractMenuTemporalDto extends ITemporalDto {
//   Id: string;
//   PersonId: string;
//   ExternalId: string;
//   ContractNumber: string;
//   HireDate: string;
//   FirstHireDate: string;
//   DischargeDate: string;
//   Version: ITemporalIContractMenuVersionDto;
// }
// export interface ITemporalIContractMenuVersionDto extends ITemporalValidityPeriodDto {
//   JobProfile: IReferenceDto;
// }

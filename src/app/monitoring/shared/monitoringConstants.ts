import { ZoomSelectOption } from './monitoring-table-header.model';

export class EntityType {
  static PERSON_ID = 'PersonId';
  static PERSON_NUMBER = 'PersonNumber';
  static CONTRACT_ID = 'ContractId';
  static CONTRACT_NUMBER = 'ContractNumber';
}

export class EventType {
  public static readonly ADDRESS_CHANGE = 'AddressChange';
  public static readonly BANKACCOUNT_CHANGE = 'BankAccountChange';
  public static readonly CHANGE_CONTRACT_START_DATE = 'ChangeContractStartDate';
  public static readonly CONTACT_INFORMATION_CHANGE = 'ContactInformationChange';
  public static readonly CONTRACT_ADDED = 'ContractAdded';
  public static readonly CONTRACT_CHANGED = 'ContractChanged';
  public static readonly CONTRACT_DELETED = 'ContractDeleted';
  public static readonly CONTRACT_TERMINATION = 'ContractTermination';
  public static readonly COST_ALLOCATION = 'CostAllocation';
  public static readonly DEPENDENT_ADD = 'DependentAdd';
  public static readonly DEPENDENT_DELETED = 'DependentDeleted';
  public static readonly DEPENDENT_CHANGED = 'DependentChanged';
  public static readonly EXPENSE_ADDED = 'ExpenseAdded';
  public static readonly HIRE_COMPLETED = 'HireCompleted';
  public static readonly PERSONAL_DETAILS_CHANGE = 'PersonalDetailsChange';
  public static readonly SICK_LEAVE_ADDED = 'SickLeaveAdded';
  public static readonly SICK_LEAVE_DELETED = 'SickLeaveDeleted';
  public static readonly TEMPORARY_COMPENSATION_CHANGED = 'TemporaryCompensationChanged';
  public static readonly TIMEOFF_ADDED = 'TimeOffAdded';
  public static readonly TIMEOFF_DELETED = 'TimeOffDeleted';
  public static readonly WORK_AMOUNT_PATTERN_CHANGE = 'WorkAmountPatternChange';
  public static readonly LEARNING_MODE_CHANGED_EVENT = 'LearningModeChangedEvent';
  public static readonly ENTITY_IMPORTED_EVENT = 'EntityImportedEvent';
  public static readonly BATCH_EVENT = 'BatchEvent';
  public static readonly ORGANIZATIONAL_UNIT_CHANGE_EVENT = 'OrganizationalUnitChange';
  public static readonly JOB_PROFILE_EVENT = 'JobProfile';
  public static readonly FINANCIAL_DIMENSION_EVENT = 'FinancialDimension';
}

export class SystemName {
  public static readonly HRCB_CONNECTOR = 'HRCBConnector';
  public static readonly SPOC_CONNECTOR = 'SPOCConnector';
  public static readonly LOHNAG_CONNECTOR = 'LohnAgConnector';
  public static readonly ROUTING_SYSTEM = 'RoutingSystem';
  public static readonly HRCBMINI_CONNECTOR = 'HRCBMiniConnector';
}
export class Status {
  public static readonly OK = 'OK';
  public static readonly ERROR = 'Error';
  public static readonly WARNING = 'Warning';
  public static readonly INPROGRESS = 'InProgress';
  public static readonly WAITING = 'Waiting';
  public static readonly RETRY = 'Retry';
}

export enum ActionResultType {
  Ok = 0,
  Warning = 1,
  Error = 2,
  BlockingError = 3,
  Waiting = 4,
  Closed = 5,
}

export const EventTypeFilter: ZoomSelectOption[] = [
  {
    id: EventType.ADDRESS_CHANGE,
    name: 'yfo.younifier.AddressChanged',
  },
  {
    id: EventType.BANKACCOUNT_CHANGE,
    name: 'yfo.younifier.BankAccountChanged',
  },
  {
    id: EventType.CHANGE_CONTRACT_START_DATE,
    name: 'yfo.younifier.ChangeContractStartDate',
  },
  {
    id: EventType.CONTACT_INFORMATION_CHANGE,
    name: 'yfo.younifier.ContactInfoChanged',
  },
  {
    id: EventType.CONTRACT_ADDED,
    name: 'yfo.younifier.ContractAdded',
  },
  {
    id: EventType.CONTRACT_CHANGED,
    name: 'yfo.younifier.ContractChanged',
  },
  {
    id: EventType.CONTRACT_DELETED,
    name: 'yfo.younifier.ContractDeleted',
  },
  {
    id: EventType.CONTRACT_TERMINATION,
    name: 'yfo.younifier.ContractTermination',
  },
  {
    id: EventType.COST_ALLOCATION,
    name: 'yfo.younifier.CostAllocation',
  },
  {
    id: EventType.DEPENDENT_ADD,
    name: 'yfo.younifier.DependentAddedEvent',
  },
  {
    id: EventType.DEPENDENT_DELETED,
    name: 'yfo.younifier.DependentDeletedEvent',
  },
  {
    id: EventType.DEPENDENT_CHANGED,
    name: 'yfo.younifier.DependentChangedEvent',
  },
  {
    id: EventType.EXPENSE_ADDED,
    name: 'yfo.younifier.ExpenseAdded',
  },
  {
    id: EventType.FINANCIAL_DIMENSION_EVENT,
    name: 'yfo.younifier.FinancialDimension',
  },
  {
    id: EventType.HIRE_COMPLETED,
    name: 'yfo.younifier.HireCompleted',
  },
  {
    id: EventType.JOB_PROFILE_EVENT,
    name: 'yfo.younifier.JobProfile',
  },
  {
    id: EventType.ORGANIZATIONAL_UNIT_CHANGE_EVENT,
    name: 'yfo.younifier.OrganizationalUnitChange',
  },
  {
    id: EventType.PERSONAL_DETAILS_CHANGE,
    name: 'yfo.younifier.PersonalDetailsChanged',
  },
  {
    id: EventType.SICK_LEAVE_ADDED,
    name: 'yfo.younifier.SickLeaveAdded',
  },
  {
    id: EventType.SICK_LEAVE_DELETED,
    name: 'yfo.younifier.SickLeaveDeleted',
  },
  {
    id: EventType.TEMPORARY_COMPENSATION_CHANGED,
    name: 'yfo.younifier.TemporaryCompensationChanged',
  },
  {
    id: EventType.TIMEOFF_ADDED,
    name: 'yfo.younifier.TimeOffAdded',
  },
  {
    id: EventType.TIMEOFF_DELETED,
    name: 'yfo.younifier.TimeOffDeleted',
  },
  {
    id: EventType.WORK_AMOUNT_PATTERN_CHANGE,
    name: 'yfo.younifier.WorkAmountPatternChanged',
  },
  {
    id: EventType.LEARNING_MODE_CHANGED_EVENT,
    name: 'yfo.younifier.LearningModeChangedEvent',
  },
  {
    id: EventType.ENTITY_IMPORTED_EVENT,
    name: 'yfo.younifier.EntityImportedEvent',
  },
  {
    id: EventType.BATCH_EVENT,
    name: 'yfo.younifier.BatchEvent',
  },
];

export const StatusFilter: ZoomSelectOption[] = [
  {
    id: Status.OK,
    name: 'yfo.edmodm.Ok',
  },
  {
    id: Status.ERROR,
    name: 'yfo.edmodm.Error',
  },
  {
    id: Status.WARNING,
    name: 'yfo.younifier.Warning',
  },
  {
    id: Status.INPROGRESS,
    name: 'yfo.younifier.InProgress',
  },
  {
    id: Status.WAITING,
    name: 'yfo.younifier.Waiting',
  },
  {
    id: Status.RETRY,
    name: 'yfo.younifier.Retry',
  },
];

export const SystemNameFilter: ZoomSelectOption[] = [
  {
    id: SystemName.HRCB_CONNECTOR,
    name: 'yfo.younifier.HRCBConnector',
  },
  {
    id: SystemName.SPOC_CONNECTOR,
    name: 'yfo.younifier.SPOCConnector',
  },
  {
    id: SystemName.LOHNAG_CONNECTOR,
    name: 'yfo.younifier.LohnAgConnector',
  },
  {
    id: SystemName.ROUTING_SYSTEM,
    name: 'yfo.younifier.RoutingSystem',
  },
  {
    id: SystemName.HRCBMINI_CONNECTOR,
    name: 'yfo.younifier.HRCBMiniConnector',
  },
];
export enum ProcessResultType {
  Error = 0,
  Ok = 1,
  Warning = 2,
}

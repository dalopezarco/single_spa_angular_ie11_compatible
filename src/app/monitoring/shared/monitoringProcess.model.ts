import { OperationResult } from './operation-result.model';
import { Action } from './action.model';
import { Relation } from './relation.model';
import { ZoomDataSource } from '@zoomui/table';

export interface MonitoringProcess extends ZoomDataSource {
  Id: string;
  EventType: string;
  MessageDateUtc: string;
  Status: string;
  OperationResult: OperationResult;
  Actions: Action[];
  Relations: Relation[];
  PersonId: string;
  PersonNumber: string;
  ContractId: string;
  ContractNumber: string;
  SystemName: string;
  TenantId: string;
  TrackingId: string;
}

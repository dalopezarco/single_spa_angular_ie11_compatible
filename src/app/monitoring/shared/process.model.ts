import {Action} from './action.model';
import {Relation} from './relation.model';
import {OperationResult} from './operation-result.model';

export class Process {
    Id: string;
    EventType: string;
    MessageDateUtc: string;
    Status: string;
    OperationResult: OperationResult;
    Actions: Action[];
    Relations: Relation[];
    PersonId: string;
    PersonNumber: string;
    ContractNumber: string;
    SystemName: string;
}

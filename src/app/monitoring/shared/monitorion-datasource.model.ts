import {ZoomDataSource} from '@zoomui/table';

export class MonitoringDataSource implements ZoomDataSource {
    id: string | number;
    EventType: string;
    SystemName: string;
    PersonNumber: string;
    ContractNumber: string;
    MessageDateUtc: Date;
    Status: string;

    constructor(dataSource: any) {
        this.id = dataSource.Id;
        this.EventType = dataSource.EventType;
        this.SystemName = dataSource.SystemName;
        this.PersonNumber = dataSource.PersonNumber;
        this.ContractNumber = dataSource.ContractNumber;
        this.MessageDateUtc = dataSource.MessageDateUtc;
        this.Status = dataSource.Status;
    }
}

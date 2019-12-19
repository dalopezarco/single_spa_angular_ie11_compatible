import { IZoomTableHeaderCell, ZoomDataSource } from '@zoomui/table';

export const MonitoringTableHeader: IZoomTableHeaderCell[] = [
  { field: 'EventType', title: 'Name', sortable: false },
  { field: 'SystemName', title: 'SystemName', sortable: false },
  { field: 'PersonNumber', title: 'PersonNumber', sortable: false },
  { field: 'ContractNumber', title: 'ContractNumber', sortable: false },
  { field: 'MessageDateUtc', title: 'MessageDateUtc', sortable: false },
  { field: 'Status', title: 'Status', sortable: false },
];

export class ZoomSelectOption extends ZoomDataSource {
  id: string;
  name: string;
  description?: string;
  options?: ZoomSelectOption[];
}

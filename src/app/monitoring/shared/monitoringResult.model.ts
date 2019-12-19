import { MonitoringProcess } from './monitoringProcess.model';

export interface MonitoringResult {
  Count: number;
  PageSize: number;
  Processes: MonitoringProcess[];
}

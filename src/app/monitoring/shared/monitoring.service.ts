import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MonitoringProcess } from './monitoringProcess.model';
import { EntityType, EventTypeFilter, Status, SystemName, SystemNameFilter, StatusFilter } from './monitoringConstants';
import { OperationResult } from './operation-result.model';
import { TranslateService } from '@ngx-translate/core';
import { MonitoringResult } from './monitoringResult.model';
import { Injectable } from '@angular/core';
import { ZoomSelectOption } from './monitoring-table-header.model';
import { DatePipe } from '@angular/common';
import { map, filter } from 'rxjs/operators';
import { ITemporalPersonDto } from './temporalPerson.model';
import { Route, Router, NavigationStart } from '@angular/router';
import { AppConfigurationService } from 'src/app/services/configuration/app-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private urlProcess = '/api/v2/processes';
  private urlResend = '/api/resends';
  private apiMonitoring = '';
  private apiEventStore = '';
  private apiProfileDomain = '';
  private filters: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private route: Router,
    private configService: AppConfigurationService
  ) {
    this.initApis();
    this.filters = new BehaviorSubject(null);
    route.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      if (!(event.url.includes('monitoring') || event.url === '/')) {
        this.clearFilters();
      }
    });
  }

  getProcesses(
    personNumber: string,
    systemName: string,
    status: string,
    eventType: string,
    dateFrom?: Date,
    dateTo?: Date,
    skip?: number
  ): Observable<MonitoringResult> {
    const filters = {
      PersonNumber: personNumber,
      eventType,
      fromDate: dateFrom,
      toDate: dateTo,
      status,
      systemName,
      skip
    };

    this.filters.next(filters);

    const params = this.getFilterParams(filters);

    return this.http.get<MonitoringResult>(this.apiMonitoring + this.urlProcess, {
      params
    });
  }

  initApis() {
    this.configService.getConfiguration().subscribe(config => {
      this.apiMonitoring = config.endpoints.apiMonitoring;
      this.apiEventStore = config.endpoints.apiEventRouter;
      this.apiProfileDomain = config.endpoints.apiProfileDomain;
    });
  }

  public getProcess(pId: string): Observable<MonitoringProcess> {
    const url = this.apiMonitoring + this.urlProcess + '/' + pId;
    return this.http.get<MonitoringProcess>(url).pipe(
      map(process => {
        if (process.OperationResult) {
          process.Status = this.getStatus(process.OperationResult);
        }
        this.getRelationships(process);
        return process;
      })
    );
  }

  private getFilterParams(filters: {
    PersonNumber: string;
    eventType: string;
    fromDate: Date;
    toDate: Date;
    status: string;
    systemName: string;
  }) {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        let element = filters[key];
        if (typeof element === 'string') {
          element = element.trim();
        }

        if (element instanceof Date) {
          if (key === 'toDate') {
            element.setHours(23, 59, 59);
          }
          if (key === 'fromDate') {
            element.setHours(0, 0, 0);
          }
          element = this.transformDate(element);
        }
        if (element) {
          params = params.append(key, element);
        }
      }
    }
    return params;
  }

  private getStatus(operationResult: OperationResult): string {
    switch (operationResult.ResultCode) {
      case 0: {
        return 'yfo.edmodm.Error';
      }
      case 1: {
        return 'yfo.edmodm.Ok';
      }
      case 2: {
        return 'yfo.younifier.Warning';
      }

      case 3: {
        return 'yfo.younifier.InProgress';
      }

      case 4: {
        return 'yfo.younifier.Waiting';
      }

      case 5: {
        return 'yfo.younifier.Retry';
      }
    }
  }

  getSystemNames(): { id: string; name: string }[] {
    return [
      { id: 'Ok', name: 'Ok' },
      { id: 'Error', name: 'Error' },
      { id: 'Warning', name: 'Warning' },
      { id: 'InProgress', name: 'In Progress' },
      { id: 'Waiting', name: 'Waiting' },
      { id: 'Retry', name: 'Retry' }
    ];
  }

  getEventTypes(): { id: string; name: string }[] {
    return [
      { id: 'Ok', name: 'Ok' },
      { id: 'Error', name: 'Error' },
      { id: 'Warning', name: 'Warning' },
      { id: 'InProgress', name: 'In Progress' },
      { id: 'Waiting', name: 'Waiting' },
      { id: 'Retry', name: 'Retry' }
    ];
  }

  postProcess(processId: string, userName: string, comment: string): Observable<any> {
    const url = this.apiMonitoring + this.urlProcess + '/' + processId + '/close';
    const body: any = {
      Username: userName,
      Message: comment
    };

    return this.http.post<any>(url, body);
  }

  resendProcess(eventTargetExternalId: string): Observable<any> {
    const url = this.apiEventStore + this.urlResend;
    const body: any = {
      EventTargetExternalId: eventTargetExternalId,
      EventProperties: {}
    };

    return this.http.post<any>(url, body);
  }

  public parseProcesses(items: MonitoringProcess[]): MonitoringProcess[] {
    const processes = [];
    if (!items) {
      return processes;
    }

    for (const item of items) {
      this.getRelationships(item);
      processes.push(item);
      if (item.OperationResult) {
        item.Status = this.getStatus(item.OperationResult);
      }
      this.translate.get(item.Status).subscribe(text => (item.Status = text));
      item.MessageDateUtc = this.datePipe.transform(new Date(item.MessageDateUtc), 'd MMMM  y');
    }

    return processes;
  }

  private getRelationships(item: MonitoringProcess) {
    if (!item.Relations) {
      return;
    }
    item.PersonId = item.Relations.filter(x => x.EntityType === EntityType.PERSON_ID)[0]
      ? item.Relations.filter(x => x.EntityType === EntityType.PERSON_ID)[0].EntityId
      : undefined;
    item.ContractId = item.Relations.filter(x => x.EntityType === EntityType.CONTRACT_ID)[0]
      ? item.Relations.filter(x => x.EntityType === EntityType.CONTRACT_ID)[0].EntityId
      : undefined;
    item.PersonNumber = item.Relations.filter(x => x.EntityType === EntityType.PERSON_NUMBER)[0]
      ? item.Relations.filter(x => x.EntityType === EntityType.PERSON_NUMBER)[0].EntityId
      : undefined;
    item.ContractNumber = item.Relations.filter(x => x.EntityType === EntityType.CONTRACT_NUMBER)[0]
      ? item.Relations.filter(x => x.EntityType === EntityType.CONTRACT_NUMBER)[0].EntityId
      : undefined;
  }

  getPersonVersions(id: string): Promise<ITemporalPersonDto[]> {
    const url = this.apiProfileDomain + '/api/employees/' + id + '/person';

    return this.http.get<ITemporalPersonDto[]>(url).toPromise();
  }

  public getContractVersions(id: string): Promise<any> {
    const url = this.apiProfileDomain + '/api/employees/' + id + '/contracts';
    return this.http.get(url).toPromise();
  }

  // getContractVersions(id: string): Observable<Common.ITemporalContractDto[]> {
  //   //  const url = this.apiProfileDomain + '/api/employees/' + id + '/contracts';

  //   //  return this.http.get<Common.ITemporalContractDto[]>(url);
  // }

  getEventTypeFilter() {
    const filter = EventTypeFilter;
    filter.forEach(element => {
      this.translate.get(element.name).subscribe(translatedText => (element.name = translatedText));
    });
    return filter;
  }

  getSystemNameFilter() {
    const filter = SystemNameFilter;
    filter.forEach(element => {
      this.translate.get(element.name).subscribe(translatedText => (element.name = translatedText));
    });
    return filter;
  }

  getStatusFilter() {
    const filter = StatusFilter;
    filter.forEach(element => {
      this.translate.get(element.name).subscribe(translatedText => (element.name = translatedText));
    });
    return filter;
  }

  getSearchFilters() {
    return this.filters.value;
  }

  clearFilters() {
    this.filters.next(null);
  }

  transformDate(date: Date): string {
    return this.datePipe.transform(new Date(date), 'y-M-d HH:mm:ss');
  }
}

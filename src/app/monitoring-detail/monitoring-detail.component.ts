import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, map, concatMap, filter, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { MonitoringService } from '../monitoring/shared/monitoring.service';
import { MonitoringProcess } from '../monitoring/shared/monitoringProcess.model';
import { ActionResultType, ProcessResultType } from '../monitoring/shared/monitoringConstants';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import { Type, ZoomButtonComponent } from '@zoomui/button';
import { FormGroup, FormControl } from '@angular/forms';
import { ITemporalPersonDto } from '../monitoring/shared/temporalPerson.model';
import { ZoomOutputComponent } from '@zoomui/output';
import { HeaderService } from '../services/header/header.service';
import { Permissions } from '../monitoring/shared/permissions';
import { UserService } from '../services/user/user.service';
import { NotificationModes } from '@zoomui/notification';
import { TimelineView } from '../models/timelineView.model';
import { TimelineStatus } from '../models/timelineStatus.model';
import { PermissionService } from '../services/permission/permissions.service';

@Component({
  selector: 'app-monitoring-detail',
  templateUrl: './monitoring-detail.component.html',
  styleUrls: ['./monitoring-detail.component.scss'],
})
export class MonitoringDetailComponent implements OnInit, OnDestroy {
  @ViewChildren(ZoomOutputComponent) outputElement: QueryList<ZoomOutputComponent>;
  @ViewChildren(ZoomButtonComponent) buttonElement: QueryList<ZoomButtonComponent>;

  private subs = new SubSink();
  routeId$: Observable<any>;
  showUpdateEventSection$: BehaviorSubject<boolean>;
  showResend$: BehaviorSubject<boolean>;
  eventTargetExternalId$: BehaviorSubject<string>;
  showAction$: BehaviorSubject<boolean>;
  updateEventText$: Observable<string>;
  resendEventText$: Observable<string>;
  actions: TimelineView[];
  form: FormGroup;
  process: MonitoringProcess;
  processId: string;
  faCoffee = faCoffee;
  type = Type;

  resendLinkText = 'yfo.younifier.Show';
  technicalLinkText = 'yfo.younifier.Show';
  showTechnicalDetails: boolean;
  contractNumber: any;
  payAdministratioName: string;
  errorMessage = new BehaviorSubject<string>('');
  notificationMode: string;

  constructor(
    private route: ActivatedRoute,
    private monitoringService: MonitoringService,
    private headerService: HeaderService,
    private permissionService: PermissionService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.headerService.setTitle('yfo.common.SystemSettings');
    this.showUpdateEventSection$ = new BehaviorSubject(false);
    this.showAction$ = new BehaviorSubject(false);
    this.showResend$ = new BehaviorSubject(false);
    this.eventTargetExternalId$ = new BehaviorSubject('');
    this.form = new FormGroup({ updateEventTextArea: new FormControl(''), resendEventTextArea: new FormControl('') });
    this.updateEventText$ = this.form.controls.updateEventTextArea.valueChanges;
    this.resendEventText$ = this.form.controls.resendEventTextArea.valueChanges;
    this.getProcess();
  }

  private getProcess() {
    this.subs.add(
      this.route.paramMap
        .pipe(
          concatMap(params => {
            const processId = params.get('id');
            this.processId = processId;
            return this.monitoringService.getProcess(processId).pipe(
              catchError(err => {
                return this.handleHttpError(err);
              }),
            );
          }),
        )
        .subscribe(async process => {
          this.process = process;
          const eventTargetExternalId = await this.getEventTargetExternalId();
          this.eventTargetExternalId$.next(eventTargetExternalId);
          this.setValues(process);
          this.setShowUpdateEventSection();
        }),
    );
  }

  private handleHttpError(err: any) {
    this.notificationMode = NotificationModes.alert;
    this.errorMessage.next(err.message);
    return throwError(err);
  }

  private getEventTargetExternalId(): Promise<string> {
    return new Promise((resolve, reject) => {
      const eventTargetRelation = this.process.Relations.filter(relation => relation.EntityType === 'EventTargetExternalId');
      if (eventTargetRelation[0] && eventTargetRelation[0].EntityId) {
        resolve(this.process.Relations.filter(relation => relation.EntityType === 'EventTargetExternalId')[0].EntityId);
      }
      resolve('');
    });
  }

  private getActionStatus(result: number): TimelineStatus {
    let timelineStatus: TimelineStatus;
    if (result === ActionResultType.Waiting) {
      timelineStatus = TimelineStatus.Waiting;
    }
    if (result === ActionResultType.BlockingError || result === ActionResultType.Error) {
      timelineStatus = TimelineStatus.Error;
    }
    timelineStatus = TimelineStatus.Ok;
    return timelineStatus;
  }

  private setActions() {
    this.actions = this.process.Actions.map(action => {
      return {
        title: action.Name,
        status: this.getActionStatus(action.Result),
        messages: action.Messages,
      } as TimelineView;
    });
    this.showAction$.next(true);
  }

  private setShowUpdateEventSection() {
    if (!this.process) {
      this.showUpdateEventSection$.next(false);
    }

    const operationResult = this.process.OperationResult.ResultCode;
    this.showUpdateEventSection$.next(operationResult === ProcessResultType.Warning || operationResult === ProcessResultType.Error);
  }

  private setPersonValues(personVersions) {
    if (personVersions && personVersions.length > 0) {
      const person = personVersions[0];
      this.updateOutput('Person', ' ' + person.DisplayName + ' (' + person.PersonNumber + ')');
    }
  }

  private setValues(process: MonitoringProcess): void {
    if (process.PersonId) {
      this.monitoringService.getPersonVersions(process.PersonId).then((response: ITemporalPersonDto[]) => {
        this.setPersonValues(response);
      });
      this.monitoringService.getContractVersions(process.PersonId).then(response => {
        this.setContractValues(response);
      });
    }
    this.updateOutput('SystemName', process.SystemName);
    this.updateOutput('Status', process.Status);
    this.updateOutput('TrackingId', process.TrackingId);
    this.updateOutput('TenantId', process.TenantId);
    this.updateOutput('PersonId', process.PersonId);
    this.updateOutput('ContractId', process.ContractId);

    this.setShowResendEventSection();
    this.setActions();
  }

  private setContractValues(contractVersions) {
    if (contractVersions && contractVersions.length > 0) {
      const contract = contractVersions[contractVersions.length - 1];
      this.updateOutput('Company', contract.Company.FullName + ' (' + contract.Company.ShortName + ')');
      this.updateOutput('Contract', contract.ContractNumber);
      this.updateOutput(
        'PayAdministration',
        contract.Version.PayAdministration.FullName + ' (' + contract.Version.PayAdministration.ShortName + ')',
      );
    }
  }

  private updateOutput(raetId: string, value) {
    this.outputElement.find(o => o.raetId === raetId).content = value;
    this.outputElement.find(o => o.raetId === raetId).showChanges();
  }

  private setShowResendEventSection() {
    if (!this.process) {
      this.showResend$.next(false);
    }
    this.subs.add(
      this.permissionService.hasPermission([Permissions[Permissions.ViewYounifierResendEvent]]).subscribe(hasPermission => {
        const operationResult = this.process.OperationResult.ResultCode;
        this.showResend$.next(operationResult === ProcessResultType.Error && (hasPermission && this.eventTargetExternalId$.value !== ''));
      }),
    );
  }

  private updateEvent() {
    const username = this.userService.getUserName();
    this.monitoringService.postProcess(this.processId, username, this.form.controls.updateEventTextArea.value).subscribe(res => {
      this.getProcess();
    });
  }

  private resendEvent() {
    const username = this.userService.getUserName();
    this.subs.add(
      this.monitoringService
        .resendProcess(this.eventTargetExternalId$.value)
        .pipe(
          concatMap(res => {
            return this.monitoringService.postProcess(this.processId, username, this.form.controls.resendEventTextArea.value);
          }),
          catchError(err => {
            return this.handleHttpError(err);
          }),
        )
        .subscribe(res => {
          this.getProcess();
        }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

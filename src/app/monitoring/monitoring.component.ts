import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {
  ZoomTableDataSource,
  IZoomTableHeaderCell,
  ZoomDataSource,
  ZoomTableDisplayedColumns,
  IZoomActionRow,
  ZoomPageEvent,
  ZoomPaginatorComponent
} from '@zoomui/table';
import { MonitoringService } from './shared/monitoring.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Process } from './shared/process.model';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { Type } from '@zoomui/button';
import { MonitoringTableHeader, ZoomSelectOption } from './shared/monitoring-table-header.model';
import { map, catchError } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { EventTypeFilter } from './shared/monitoringConstants';
import { color, size } from '@zoomui/loading';
import { NotificationModes } from '@zoomui/notification';
import { HeaderService } from '../services/header/header.service';
import { Router } from '@angular/router';
import { MonitoringProcess } from './shared/monitoringProcess.model';
import { MonitoringResult } from './shared/monitoringResult.model';
import { ZoomDatePicker, ZoomDataLanguage } from '@zoomui/date-picker';
import { format, isValid } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitoringComponent implements OnInit, OnDestroy {
  @ViewChild('popoverTriggerIcon', { read: ElementRef, static: true }) triggerIcon: ElementRef<HTMLElement>;
  @ViewChild('prefilledDatePickerPopover', { read: ElementRef, static: true }) triggerDatePicker: ElementRef<HTMLElement>;
  @ViewChild(ZoomPaginatorComponent, { read: ZoomPaginatorComponent, static: true }) zoomPaginator: ZoomPaginatorComponent;
  @ViewChild('picker', { read: ElementRef, static: true }) datepicker;
  filter: FormGroup;
  type = Type;
  tableData: ZoomTableDataSource<ZoomDataSource, IZoomActionRow<Function>>;
  displayedColumns: ZoomTableDisplayedColumns<IZoomTableHeaderCell[]>;
  actionRows: IZoomActionRow<Function> = {};
  length$ = new BehaviorSubject<number>(0);
  processes: Process[];
  pageSize = 20;
  private subs = new SubSink();
  filterEventType: ZoomSelectOption[];
  filterSystemName: ZoomSelectOption[];
  filterStatus: ZoomSelectOption[];
  size = size;
  color = color;
  loading$ = new BehaviorSubject(true);
  errorMessage = new BehaviorSubject<string>('');
  notificationMode: string;

  monitoringProcess: MonitoringProcess[];
  showFilters = new BehaviorSubject(false);

  dateFromValue: ZoomDatePicker = new ZoomDatePicker();
  dateToValue: ZoomDatePicker = new ZoomDatePicker();
  clickDateFromValue: Function = new Function();
  clickDateToValue: Function = new Function();

  isOpenIcon = false;
  isOpenPrefilled = false;

  dataLanguage: ZoomDataLanguage = new ZoomDataLanguage();

  minDateFormatted: string;
  maxDateFormatted: string;
  selectedDateFormatted: string | Date;
  CLICKABLE_ROW = 1;
  constructor(
    private monitoringService: MonitoringService,
    private headerService: HeaderService,
    private router: Router,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filter = new FormGroup({
      personNumber: new FormControl(),
      eventStatus: new FormControl(),
      systemName: new FormControl(),
      eventType: new FormControl(),
      dateFrom: new FormControl(this.dateFromValue.selectedDate),
      dateTo: new FormControl(this.dateToValue.selectedDate)
    });

    const filters = this.monitoringService.getSearchFilters();
    if (this.checkFilters(filters)) {
      this.initFilters(filters);
    }
    this.tableData = new ZoomTableDataSource(null, this.actionRows);
    this.displayedColumns = new ZoomTableDisplayedColumns<IZoomTableHeaderCell[]>(MonitoringTableHeader);
    this.filterEventType = this.monitoringService.getEventTypeFilter();
    this.filterSystemName = this.monitoringService.getSystemNameFilter();
    this.filterStatus = this.monitoringService.getStatusFilter();
    this.headerService.setTitle('yfo.common.SystemSettings');
    this.actionRows[this.CLICKABLE_ROW] = (id: string) => {
      this.router.navigate(['/settings/payrollmonitoring/' + id]);
    };
    
    this.filter.get('dateFrom').valueChanges.subscribe((value: string) => {
      this.dateFromValue.selectedDate = new Date(value);
      
      const newMinValue = new ZoomDatePicker({
        minDate: this.dateFromValue.selectedDate
      });
    
      this.dateToValue = newMinValue;
    });

    this.filter.get('dateTo').valueChanges.subscribe((value: string) => {
      this.dateToValue.selectedDate = new Date(value);
      
      const newMaxValue = new ZoomDatePicker({
        maxDate: this.dateToValue.selectedDate
      });
    
      this.dateFromValue = newMaxValue;
    });

    this.clickDateFromValue = (value: string) => this.onClickMinValueEvent(value);
    this.clickDateToValue = (value: string) => this.onClickMaxValueEvent(value);
  }

  private initFilters(filters: any) {
    this.showFilters.next(true);
    this.filter.patchValue({
      personNumber: filters.personNumber,
      eventStatus: filters.status,
      systemName: filters.systemName,
      eventType: filters.eventType,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo
    });
  }

  checkFilters(filters): boolean {
    if (filters) {
      if (filters.PersonNumber || filters.eventType || filters.fromDate || filters.status || filters.systemName || filters.toDate) {
        return true;
      }
    }
    return false;
  }

  /**
   * Everytime that the page change is needed to get the data from the endpoint
   * @param pageEvent
   */
  onPaginate(pageEvent: ZoomPageEvent) {
    const skipRows = pageEvent.pageIndex * pageEvent.pageSize;
    this.loading$.next(true);
    this.ref.detectChanges();
    this.subs.add(
      this.getProcesses(skipRows).subscribe(res => {
        this.parseProcesses(res);
      })
    );
  }

  private parseProcesses(res: any) {
    this.processes = res;
    const parsedProcesses = this.monitoringService.parseProcesses(res);
    this.setClickableRows(parsedProcesses);
    this.tableData.streamDataSource(parsedProcesses);
    this.loading$.next(false);
    this.tableData.dataRowsActions.next(this.actionRows);
    this.tableData.dataAction = this.actionRows;
    this.ref.detectChanges();
  }

  private setClickableRows(parsedProcesses: MonitoringProcess[]) {
    parsedProcesses.map(process => {
      process.id = this.CLICKABLE_ROW;
      return process;
    });
  }

  handleClickRow($event) {
    this.actionRows[$event.id]($event.Id);
  }

  applyFilter() {
    const NOSKIPROWS = 0;
    this.subs.add(
      this.getProcesses(NOSKIPROWS).subscribe(res => {
        this.zoomPaginator.pageIndex = 0;
        this.zoomPaginator.paginatorService.pageIndex = 0;
        this.parseProcesses(res);
      })
    );
  }

  getProcesses(skipRows: number): Observable<MonitoringResult> | Observable<any> {
    return this.monitoringService
      .getProcesses(
        this.filter.get('personNumber').value,
        this.filter.get('systemName').value,
        this.filter.get('eventStatus').value,
        this.filter.get('eventType').value,
        this.filter.get('dateFrom').value,
        this.filter.get('dateTo').value,
        skipRows
      )
      .pipe(
        map(res => {
          this.length$.next(res.Count);
          return res.Processes;
        }),
        catchError(err => {
          this.loading$.next(false);
          this.ref.detectChanges();
          return this.handleHttpError(err);
        })
      );
  }

  
  private handleHttpError(err: any) {
    this.notificationMode = NotificationModes.alert;
    this.errorMessage.next(err.message);
    return throwError(err);
  }

  showDatePicker() {
    this.ref.detectChanges();
    this.datepicker.nativeElement.focus();
    this.datepicker.nativeElement.click();
  }

  onClickMinValueEvent(value: string) {
    this.filter.get('dateFrom').setValue(value);
    // console.log('before - fecha min: ' + this.dateTo.minDate);
    // this.dateTo.minDate = new Date(value);
    // console.log('after - fecha min: ' + this.dateTo.minDate);

    // this.dateTo = new ZoomDatePicker({
    //   minDate: new Date(value)
    // });
}

  onClickMaxValueEvent(value: string) {
     this.filter.get('dateTo').setValue(value);
    // this.dateFrom.maxDate = new Date(value);
    
    // this.dateFrom = new ZoomDatePicker({
    //   maxDate: new Date(value)
    // });
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.errorMessage.next('');
  }
}

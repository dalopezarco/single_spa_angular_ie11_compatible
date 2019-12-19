import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { MonitoringDetailComponent } from './monitoring-detail/monitoring-detail.component';

const routes: Routes = [
  { path: '', component: MonitoringComponent, canActivate: [AuthGuard] },
  { path: 'settings/payrollmonitoring', component: MonitoringComponent, canActivate: [AuthGuard] },
  { path: 'monitoring', component: MonitoringComponent, canActivate: [AuthGuard] },
  { path: 'settings/payrollmonitoring/:id', component: MonitoringDetailComponent, canActivate: [AuthGuard] },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule]
})
export class AppRoutingModule {}

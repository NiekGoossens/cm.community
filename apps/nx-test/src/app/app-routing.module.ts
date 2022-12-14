
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { SubjectOverviewComponent } from './pages/subjects/subject-overview/subject-overview.component';
import { DetailComponent } from './pages/entity/detail/detail.component';
import { EditComponent } from './pages/entity/edit/edit.component';
import { ColumnsComponent } from './pages/columns.component';
import { AddComponent } from './pages/entity/add/add.component';
import { WorkshopOverviewComponent } from './pages/workshops/workshop-overview/workshop-overview.component';
import { WorkshopDetailComponent } from './pages/workshops/workshop-detail/workshop-detail.component';
import { WorkshopEditComponent } from './pages/workshops/workshop-edit/workshop-edit.component';
import { SubjectEditComponent } from './pages/subjects/subject-edit/subject-edit.component';
import { TopicOverviewComponent } from './pages/topics/topic-overview/topic-overview.component';
import { TopicDetailComponent } from './pages/topics/topic-detail/topic-detail.component';
import { TopicColumns } from './pages/topic-columns';
import { TopicEditComponent } from './pages/topics/topic-edit/topic-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoggedInAuthGuard } from './auth/auth.guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'subjects' },
  {
    path: 'subjects', pathMatch: 'full', component: SubjectOverviewComponent
  },
  {
    path: 'subjects/:sid/edit', component: SubjectEditComponent,
    canActivate: [LoggedInAuthGuard],
    data: { role: 'admin' }
  },
  { path: 'subjects/:sid/workshop', pathMatch: 'full', component: WorkshopOverviewComponent },
  {
    path: 'subjects/:sid/workshop/:id', pathMatch: 'full', component: WorkshopDetailComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'subjects/:sid/workshop/:id/edit', pathMatch: 'full', component: WorkshopEditComponent,
    canActivate: [LoggedInAuthGuard],
    data: { role: ['admin', 'teacher'] }
  },

  {
    path: 'subjects/:sid/workshop/:id/topic',
    component: TopicColumns,
    children: [
      {
        path: ':tid', pathMatch: 'full', component: TopicDetailComponent,
        canActivate: [LoggedInAuthGuard],
      },
    ]
  },
  { path: 'subjects/:sid/workshop/:id/topic/:tid/edit', pathMatch: 'full', component: TopicEditComponent },


  {
    path: 'users',
    component: ColumnsComponent,
    canActivate: [LoggedInAuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: ':id', pathMatch: 'full', component: DetailComponent,
        canActivate: [LoggedInAuthGuard],
        data: { role: 'admin' }
      },
      {
        path: ':id/edit', pathMatch: 'full', component: EditComponent,
        canActivate: [LoggedInAuthGuard],
        data: { role: 'admin' }
      },
      {
        path: ':id/add', pathMatch: 'full', component: AddComponent,
        canActivate: [LoggedInAuthGuard],
        data: { role: 'admin' }
      },
    ],
  },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

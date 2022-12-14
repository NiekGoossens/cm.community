import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { UiComponentsModule } from '@nx-test/ui/components';
// import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './shared/nav/nav.component';
import { ListComponent } from './pages/entity/list/list.component';
import { DetailComponent } from './pages/entity/detail/detail.component';
import { EditComponent } from './pages/entity/edit/edit.component';
import { SubjectOverviewComponent } from './pages/subjects/subject-overview/subject-overview.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';

import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { ColumnsComponent } from './pages/columns.component';
import { AddComponent } from './pages/entity/add/add.component';
import { WorkshopOverviewComponent } from './pages/workshops/workshop-overview/workshop-overview.component';
import { WorkshopDetailComponent } from './pages/workshops/workshop-detail/workshop-detail.component';
import { WorkshopEditComponent } from './pages/workshops/workshop-edit/workshop-edit.component';
import { SubjectDetailComponent } from './pages/subjects/subject-detail/subject-detail.component';
import { SubjectAddComponent } from './pages/subjects/subject-add/subject-add.component';
import { SubjectEditComponent } from './pages/subjects/subject-edit/subject-edit.component';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TopicDetailComponent } from './pages/topics/topic-detail/topic-detail.component';
import { TopicOverviewComponent } from './pages/topics/topic-overview/topic-overview.component';
import { TopicEditComponent } from './pages/topics/topic-edit/topic-edit.component';
import { TopicColumns } from './pages/topic-columns';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoggedInAuthGuard } from './auth/auth.guards';

@NgModule({
  declarations: [
    NxWelcomeComponent,
    AppComponent,
    NavComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    SubjectOverviewComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AboutComponent,
    ColumnsComponent,
    AddComponent,
    WorkshopOverviewComponent,
    WorkshopDetailComponent,
    WorkshopEditComponent,
    SubjectDetailComponent,
    SubjectAddComponent,
    SubjectEditComponent,
    TopicDetailComponent,
    TopicOverviewComponent,
    TopicEditComponent,
    TopicColumns,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    LoggedInAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

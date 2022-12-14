import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ComponentFeedComponent } from './component-feed/component-feed.component';

const routes: Routes = [
  { path: '', pathMatch:'full', component: NxWelcomeComponent },
  { path: 'feed', pathMatch:'full', component: ComponentFeedComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

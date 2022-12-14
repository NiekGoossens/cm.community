import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ComponentFeedComponent } from './component-feed/component-feed.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ComponentFeedComponent,],
  imports: [BrowserModule,
  AppRoutingModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ComponentFeedComponent } from './component-feed/component-feed.component';
import { SignalrService } from './signalr.service';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ComponentFeedComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    // SignalrService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (signalrService: SignalrService) => () =>
    //     signalrService.initiateSignalrConnection(),
    //   deps: [SignalrService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

@Component({
  selector: 'cm-community-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public signalrService: SignalrService) {}

  ngOnInit(): void {
    this.signalrService.startConnection();

    setTimeout(() => {
      this.signalrService.askServerListener();
      this.signalrService.askServer();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off('askServerResponse');
  }

  // // old
  // title = 'signalr-test'; //still test !!!!!!!!!!
  // hubHelloMessage: string;
  // // old
  // constructor(public signalrService: SignalrService) {
  //   this.hubHelloMessage = '';
  // }
  // // old
  // ngOnInit(): void {
  //   this.signalrService.hubHelloMessage.subscribe((hubHelloMessage: string) => {
  //     this.hubHelloMessage = hubHelloMessage;
  //   });
  //   // eslint-disable-next-line
  //   this.signalrService.connection.invoke('Hello').catch((error: any) => {
  //     console.log(`SignalrDemoHub.Hello() error: ${error}`);
  //     alert('SignalrDemoHub.Hello() error!, see console for details.');
  //   });
  // }

  //new
  // private hubConnectionBuilder!: HubConnection;
  // offers: any[] = [];
  //new
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // constructor() {}
  //new
  // ngOnInit(): void {
  //   this.hubConnectionBuilder = new HubConnectionBuilder()
  //     .withUrl('https://localhost:7219/offers')
  //     .configureLogging(LogLevel.Information)
  //     .build();
  //   this.hubConnectionBuilder
  //     .start()
  //     .then(() => console.log('Connection started.......!'))
  //     .catch((err) => console.log('Error while connect with server'));
  //   this.hubConnectionBuilder.on('SendOffersToUser', (result: any) => {
  //     this.offers.push(result);
  //   });
  // }
}

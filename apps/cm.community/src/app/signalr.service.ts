import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  hubConnection!: signalR.HubConnection;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:7194/feedHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  askServer() {
    this.hubConnection
      .invoke('askServer', 'hey')
      .catch((err) => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on('askServerResponse', (someText) => {
      console.log(someText);
    });
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class SignalrService {
//   hubUrl: string;
//   connection!: signalR.HubConnection;
//   // eslint-disable-next-line
//   hubHelloMessage: BehaviorSubject<string>;

//   constructor() {
//     this.hubHelloMessage = new BehaviorSubject<string>('');
//     this.hubUrl = 'http://localhost:7194/feedHub';
//   }

//   public async initiateSignalrConnection(): Promise<void> {
//     try {
//       this.connection = new signalR.HubConnectionBuilder()
//         .withUrl(this.hubUrl)
//         .withAutomaticReconnect()
//         .build();

//       await this.connection.start();
//       this.setSignalrClientMethods();

//       console.log(
//         `SignalR connection success! connectionId: ${this.connection.connectionId}`
//       );
//     } catch (error) {
//       console.log(`SignalR connection error: ${error}`);
//     }
//   }

//   private setSignalrClientMethods(): void {
//     this.connection.on('DisplayMessage', (message: string) => {
//       this.hubHelloMessage.next(message);
//     });
//   }
// }

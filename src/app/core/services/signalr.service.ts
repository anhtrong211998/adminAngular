import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenService } from './authen.service';
import { SystemConstants } from './../common/system.constants';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private proxy: any;
  private proxyName: string = 'teduShopHub';
  private connection: any;
  // create the Event Emitter  
  public announcementReceived: EventEmitter<any>;

  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;

  constructor(private _authenService: AuthenService) {
    // Constructor initialization  
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.announcementReceived = new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection  
    this.connection = $.hubConnection(environment.BASE_API);
    this.connection.qs = { "access_token": _authenService.getLoggedInUser().access_token };
    // create new proxy as name already given in top  
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events  
    this.registerOnServerEvents();
    // call the connecion start method to start the connection to send and receive events.  
    this.startConnection();
  }
  // check in the browser console for either signalr connected or not  
  private startConnection(): void {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }

  private registerOnServerEvents(): void {
    this.proxy.on('addAnnouncement', (announcement: any) => {
      this.announcementReceived.emit(announcement);
    });
  }
}

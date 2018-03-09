import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-about-data',
  templateUrl: './about-data.component.html',
  styleUrls: ['./about-data.component.css']
})
export class AboutDataComponent implements OnInit {

  socket: SocketIOClient.Socket;
  messageSocket: string;

  constructor() {
    this.socket = io.connect('http://localhost:8080', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit() {
    this.socket.on('WelcomeEvent', (data: any) => {
      this.messageSocket = data.msg;

      this.socket.emit('GetUsernameFromClient', {
        msg: this.getDisplayUserName()
      });
    });
  }

  getDisplayUserName() {
    let displayValue = "guest";
    if (localStorage.getItem('currentUser')) {
      displayValue = JSON.parse(localStorage.getItem('currentUser')).userName;
    }
    return displayValue;
  }
}

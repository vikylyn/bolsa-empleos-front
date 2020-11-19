import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bolsa';

  constructor(public wsService: WebsocketService) {

  }
  ngOnInit(): void {
  }
}

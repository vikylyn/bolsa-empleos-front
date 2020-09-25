import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']

})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    init_plugins();
  }

}

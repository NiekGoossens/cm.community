import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm.community-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cm-application';
  constructor() {
    console.log('AppComponent.constructor()');
  }
  ngOnInit() {
    console.log('AppComponent.ngOnInit()');
  }
}

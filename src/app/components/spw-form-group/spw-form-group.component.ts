import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spw-form-group',
  templateUrl: './spw-form-group.component.html'
})
export class SpwFormGroupComponent implements OnInit {
@Input() error : string;
@Input() titulo:string;
  constructor() { }

  ngOnInit() {
  }

}

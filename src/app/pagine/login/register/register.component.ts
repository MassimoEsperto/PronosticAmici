import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

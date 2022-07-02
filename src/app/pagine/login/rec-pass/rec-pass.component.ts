import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rec-pass',
  templateUrl: './rec-pass.component.html',
  styleUrls: ['./rec-pass.component.scss']
})
export class RecPassComponent implements OnInit {

  @Output() submit = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}

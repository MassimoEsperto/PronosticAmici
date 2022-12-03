import { Component, Input, OnInit } from '@angular/core';
import { Competizione } from 'src/app/model/Competizione';

@Component({
  selector: 'schede-concluse',
  templateUrl: './schede-concluse.component.html',
  styleUrls: ['./schede-concluse.component.scss']
})
export class SchedeConcluseComponent implements OnInit {

  @Input() comp!: Competizione;
  
  constructor() { }

  ngOnInit(): void {
  }

}

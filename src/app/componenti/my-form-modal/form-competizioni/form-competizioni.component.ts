import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { vrs } from 'src/app/classi/global-variables';
import { Competizione } from 'src/app/model/Competizione';

@Component({
  selector: 'form-competizioni',
  templateUrl: './form-competizioni.component.html',
  styleUrls: ['./form-competizioni.component.scss']
})
export class FormCompetizioni extends vrs implements OnInit {

  @Input() competizione!: Competizione;
  @Output() submit = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() { }

  addCompetizione(comp: Competizione) {
    console.log("addCompetizione", comp)
  }

}

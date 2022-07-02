import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.scss']
})
export class MyPagination implements OnInit {

  @Input() input_table!: any;
num:number=3

  records:number=0
modulo:number=0
pages:number=0
sel:number=1
list:[]=[]

  constructor() { }

  ngOnInit(){
  }
/*
  ngOnChanges() {
    this.records=this.input_table?this.input_table.length:0
    this.modulo=(this.records % this.num)>0?1:0;
    this.pages= Math.trunc(this.records/this.num) + this.modulo

    console.log("numero records ",this.records)
    console.log("numero modulo ",this.modulo)
    console.log("numero pagina ",this.pages)
  }*/

}

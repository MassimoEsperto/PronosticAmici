import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/servizi/player/player.service';
import {vrs}  from './../../classi/global-variables';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends vrs implements OnInit {
  

  constructor(private player :PlayerService) {
    super();
  }

  ngOnInit(): void {}

  conferma(){
    console.log(this.player.getLoggato())
    let pl:any=this.player.getLoggato()
    console.log(pl.comp[0])
  }

  onSubmit(ele:any){
    console.log("element: ",ele)
  }
}

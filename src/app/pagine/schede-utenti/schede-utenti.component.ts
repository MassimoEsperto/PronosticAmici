import { Component, OnInit } from '@angular/core';
import { vrs } from 'src/app/classi/global-variables';


@Component({
  selector: 'schede-utenti',
  templateUrl: './schede-utenti.component.html',
  styleUrls: ['./schede-utenti.component.scss']
})
export class SchedeUtentiComponent extends vrs implements OnInit {
  
  view:number=this.VIEW_PLAYER.OPZIONI
  ngOnInit() {}

  onNewScheda(){
this.view=this.VIEW_PLAYER.NEW_SCHEDA
  }

  onCopyScheda(){
    this.loading_btn=true
  }

  onRandomScheda(){
    this.loading_btn=true
  }

}

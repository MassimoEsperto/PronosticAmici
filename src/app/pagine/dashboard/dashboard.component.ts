import { Component, OnInit } from '@angular/core';
import { Competizione } from 'src/app/model/Competizione';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { PlayerService } from 'src/app/servizi/player/player.service';
import { vrs } from './../../classi/global-variables';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends vrs implements OnInit {

  tabs: any;
  tab: any;
  play_comp = this.player.getCompetizione()

  constructor(private player: PlayerService,
    private alert: AlertService) {
    super();
  }


  ngOnInit() {
    this.getCompetizioniAttive()
  }

  conferma() {
    console.log(this.player.getLoggato())
    let pl: any = this.player.getLoggato()
    console.log(pl.comp[0])
  }

  onSubmit(ele: any) {
    console.log("element: ", ele)
  }

  selectedTab(e: any) {
    this.tab = e
  }

  selezionaCompetizione() {
    if (this.tab) {
      console.log("comp: " + this.tab.id)
      let comp = new Competizione()
      comp.set(this.tab)
      this.player.setCompetizione(comp)
    }

  }

  getCompetizioniAttive() {

    this.player.getCompetizioniAttive()
      .subscribe({

        next: (result: any) => {
          this.tabs = result

          console.log("getCompetizioniAttive", result)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }
}

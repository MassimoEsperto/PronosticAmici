import { Component, OnInit } from '@angular/core';
import { Competizione } from 'src/app/model/Competizione';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  competizione!: Competizione;
  combo: any;

  constructor(
    private adminEventi: AdminEventiService,
    private alert: AlertService) {
  }

  ngOnInit() {
    this.getCombo()
  }

  selected(item: Competizione) {
    this.competizione = item;
  }

  getCombo() {

    this.adminEventi.getCombo()
      .subscribe({

        next: (result: any) => {
          this.combo = result
          console.log("combo", this.combo)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

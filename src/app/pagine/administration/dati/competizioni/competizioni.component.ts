import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { Competizione } from 'src/app/model/Competizione';
import { AdminDatiService } from 'src/app/servizi/admin/admin-dati.service';

@Component({
  selector: 'competizioni',
  templateUrl: './competizioni.component.html',
  styleUrls: ['./competizioni.component.scss']
})
export class CompetizioniComponent extends vrs implements OnInit {

  competizioni: any = []
  competizione = new Competizione();

  constructor(private adminDati: AdminDatiService) {
    super();
  }

  ngOnInit() {
    this.getCompetizioni()
  }

  viewSiNo(item: any) {
    return item == this.SI_NO.SI_V ? this.SI_NO.SI_S : this.SI_NO.NO_S
  }

  onUpdate(item: Competizione) {
    this.competizione.set(item);
    console.log("this.competizione",this.competizione)
  }

  onAdd() {
    this.competizione.reset();
  }


  getCompetizioni() {

    this.adminDati.getCompetizioni()
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.competizioni = result
          console.log("teams", this.competizioni)
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }


  setCompetizione(payload: any) {

    this.adminDati.setCompetizione(payload)
      .pipe(finalize(() =>
        this.getCompetizioni()
      ))
      .subscribe({

        next: (result: any) => {
          //alert ok
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

  updCompetizione(payload: any) {

    this.adminDati.updCompetizione(payload)
      .pipe(finalize(() =>
        this.getCompetizioni()
      ))
      .subscribe({

        next: (result: any) => {
          //alert ok
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }



}

import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { Competizione } from 'src/app/model/Competizione';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';

@Component({
  selector: 'ass-squadre-comp',
  templateUrl: './ass-squadre-comp.component.html',
  styleUrls: ['./ass-squadre-comp.component.scss']
})
export class AssSquadreCompComponent extends vrs implements OnInit {

  @Input() comp!: Competizione;
  disponibili: any =[]
  compresi: any=[]

  constructor(private adminEventi: AdminEventiService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.comp&&this.comp.id) {
      this.getSquadreComp(this.comp.id)
    }
  }

  getSquadreComp(input: string) {

    this.adminEventi.getSquadreComp(input)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.disponibili = result.disponibili
          this.compresi = result.compresi

        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

  submitForm(payload: any) {
    payload.id_comp = this.comp.id
    this.setSquadraComp(payload)
  }


  setSquadraComp(payload: any) {


    this.adminEventi.setSquadraComp(payload)
      .subscribe({

        next: (result: any) => {
          this.getSquadreComp(this.comp.id||"0")
        },
        error: (error: any) => {
          this.loading_btn = false
          // this.alert.error(error);
        }
      })

  }

}
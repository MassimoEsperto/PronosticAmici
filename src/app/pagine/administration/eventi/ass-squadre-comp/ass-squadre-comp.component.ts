import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';

@Component({
  selector: 'ass-squadre-comp',
  templateUrl: './ass-squadre-comp.component.html',
  styleUrls: ['./ass-squadre-comp.component.scss']
})
export class AssSquadreCompComponent extends vrs implements OnInit {

  @Input() id_comp: number = 0;
  disponibili: any =[]
  compresi: any=[]

  constructor(private adminEventi: AdminEventiService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.id_comp > 0) {
      this.getSquadreComp(this.id_comp.toString())
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
    payload.id_comp = this.id_comp
    this.setSquadraComp(payload)
  }


  setSquadraComp(payload: any) {


    this.adminEventi.setSquadraComp(payload)
      .subscribe({

        next: (result: any) => {
          this.getSquadreComp(this.id_comp.toString())
        },
        error: (error: any) => {
          this.loading_btn = false
          // this.alert.error(error);
        }
      })

  }

}
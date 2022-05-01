import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';

@Component({
  selector: 'eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent extends vrs implements OnInit {

  @Input() id_comp: number = 0;
  @Input() combo: any;
  eventi: any

  constructor(private adminEventi: AdminEventiService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.id_comp > 0) {
      this.getTipiPronostici(this.id_comp.toString())
    }
  }

  getTipiPronostici(input: string) {

    this.adminEventi.getTipiPronostici(input)
      .subscribe({

        next: (result: any) => {
          this.eventi = result
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

  onSetEventoPronostico(payload: any) {

    let esiste: boolean = this.eventi.some((i: any) => i.id_gruppo_punti == payload.gruppo);
    if (esiste) {
      console.log("  ATTENZIONE già esiste");
      this.loading_btn = false
      return;
    } else {
      payload.id_comp = this.id_comp
      this.setEventoPronostico(payload)
    }
  }

  setEventoPronostico(payload: any) {

    this.adminEventi.setTipiPronosticiComp(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.getTipiPronostici(this.id_comp.toString())
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

}
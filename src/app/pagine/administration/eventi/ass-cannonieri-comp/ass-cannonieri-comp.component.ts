import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { Competizione } from 'src/app/model/Competizione';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';

@Component({
  selector: 'ass-cannonieri-comp',
  templateUrl: './ass-cannonieri-comp.component.html',
  styleUrls: ['./ass-cannonieri-comp.component.scss']
})
export class AssCannonieriCompComponent extends vrs implements OnInit {

  @Input() comp!: Competizione;
  disponibili: any =[]
  compresi: any=[]

  constructor(private adminEventi: AdminEventiService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.comp.id) {
      this.getCannonieriComp(this.comp.id)
    }
  }

  getCannonieriComp(input: string) {

    this.adminEventi.getCannonieriComp(input)
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
    this.setCannonieriComp(payload)
  }


  setCannonieriComp(payload: any) {


    this.adminEventi.setCannonieriComp(payload)
      .subscribe({

        next: (result: any) => {
          this.getCannonieriComp(this.comp.id||"0")
        },
        error: (error: any) => {
          this.loading_btn = false
          // this.alert.error(error);
        }
      })

  }

}
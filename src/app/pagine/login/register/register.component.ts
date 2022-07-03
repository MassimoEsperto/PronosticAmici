import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { vrs } from 'src/app/classi/global-variables';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { AuthService } from 'src/app/servizi/autenticazione/auth.service';
import { finalize } from 'rxjs/operators';
import { SUCCESS_OK } from 'src/app/classi/costanti';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends vrs implements OnInit {

  @Output() submitto = new EventEmitter();

  constructor(
    private alert: AlertService,
    private auth: AuthService) {
    super();
  }

  ngOnInit(): void {
  }

  onRegister(payload: any) {

    this.loading_btn = true

    this.auth.register(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
          this.submitto.emit(this.LOGIN.SIGN_IN)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

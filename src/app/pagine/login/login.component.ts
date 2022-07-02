import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { AuthService } from 'src/app/servizi/autenticazione/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends vrs implements OnInit {

  view:number=this.LOGIN.SIGN_IN;

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService) {
    super();
  }

  ngOnInit(): void {this.auth.delCompetizione() }

  changeView(item:number){
this.view=item
  }


}

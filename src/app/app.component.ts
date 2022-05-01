import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <div class="page">
              <router-outlet></router-outlet>
              </div>
              <my-confirm-dialog></my-confirm-dialog>
              <my-alert></my-alert>
              <my-navbar *ngIf="isViewNav"></my-navbar>`

})
export class AppComponent {

  isViewNav: boolean = false //show hide della nav

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.isViewNav = val['snapshot']['data']['nav']
      }
    })
  }




}


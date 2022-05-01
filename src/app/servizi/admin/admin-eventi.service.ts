import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RETURN_OK, SERVICE_TYPE } from 'src/app/classi/costanti';
import { HttpSenderService } from '../autenticazione/http-sender.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEventiService  extends HttpSenderService {

  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.ADMIN.EVENTI);
  }

  getCombo(): Observable<any> {
    return this.http.get(`${this.buildURL("get_combo")}`).pipe(
      map((res: any) => {
        return res['data'];
      }),
      catchError(this.handleError));
  }

  getTipiPronostici(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_tipi_pro_by_comp")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  setTipiPronosticiComp(payload: any) {

    return this.http.post(`${this.buildURL("set_tipi_pro_by_comp")}`, { data: payload })
      .pipe(map((res: any) => {
        return RETURN_OK;
      }),
        catchError(this.handleError));
  }

  getCannonieriComp(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_cannonieri_comp")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  setCannonieriComp(payload: any) {

    return this.http.post(`${this.buildURL("set_cannoniere_comp")}`, { data: payload })
      .pipe(map((res: any) => {
        return RETURN_OK;
      }),
        catchError(this.handleError));
  }

  getSquadreComp(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_squadre_comp")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  setSquadraComp(payload: any) {

    return this.http.post(`${this.buildURL("set_squadra_comp")}`, { data: payload })
      .pipe(map((res: any) => {
        return RETURN_OK;
      }),
        catchError(this.handleError));
  }

  getSchedaMaster(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_scheda_master")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  setEventMaster(payload: any) {

    return this.http.post(`${this.buildURL("set_event_master")}`, { data: payload })
      .pipe(map((res: any) => {
        return RETURN_OK;
      }),
        catchError(this.handleError));
  }

}

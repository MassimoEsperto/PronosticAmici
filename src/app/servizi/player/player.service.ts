import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SERVICE_TYPE } from 'src/app/classi/costanti';
import { HttpSenderService } from '../autenticazione/http-sender.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends HttpSenderService {

  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.PLAYER);
  }

  getSchedaMaster(input: string): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_scheda_master_utente")}`,
      { headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  getSchedaRandom(input: string): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_scheda_random")}`,
      { headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  

  getComboScheda(): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_combo_scheda")}`,
      { headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  getInfo(): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_info_home")}`,
      { headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  setDettaglioScheda(scheda: any): Observable<any> {

    let payload = { scheda: scheda }

    return this.http.post(`${this.buildURL("set_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  updDettaglioScheda(scheda: any): Observable<any> {

    let payload = { scheda: scheda }

    return this.http.post(`${this.buildURL("upd_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  copyDettaglioScheda(id_scheda: number): Observable<any> {

    let payload = { id_scheda: id_scheda }

    return this.http.post(`${this.buildURL("copy_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  getDettaglioScheda(input: string): Observable<any> {

    const params = new HttpParams().set('id_scheda', input);

    return this.http.get<any>(`${this.buildURL("get_dettaglio_scheda")}`,
      { params: params, headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  getSchedeUtente(): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_schede_utente")}`,
      {  headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }


  getClassifica(): Observable<any> {

    return this.http.get<any>(`${this.buildURL("get_classifica")}`,
      {  headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

  delDettaglioScheda(id_scheda: number): Observable<any> {

    let payload = { id_scheda: id_scheda }

    return this.http.post(`${this.buildURL("del_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }
}

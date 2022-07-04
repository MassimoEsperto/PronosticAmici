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

  

  getComboScheda(input: string): Observable<any> {

    const params = new HttpParams().set('id_comp', input);

    return this.http.get<any>(`${this.buildURL("get_combo_scheda")}`,
      { params: params, headers: this.myheaders.headers })
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

  setDettaglioScheda(id_comp: string, scheda: any): Observable<any> {

    let payload = { id_comp: id_comp, scheda: scheda }

    return this.http.post(`${this.buildURL("set_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  updDettaglioScheda(id_comp: string, scheda: any): Observable<any> {

    let payload = { id_comp: id_comp, scheda: scheda }

    return this.http.post(`${this.buildURL("upd_dettaglio_scheda")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  copyDettaglioScheda(id_comp: string, id_scheda: number): Observable<any> {

    let payload = { id_comp: id_comp, id_scheda: id_scheda }

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

  getSchedeUtente(input: string): Observable<any> {

    const params = new HttpParams().set('id_comp', input);

    return this.http.get<any>(`${this.buildURL("get_schede_utente")}`,
      { params: params, headers: this.myheaders.headers })
      .pipe(map((res) => {

        this.tokenError(res);//controllo token

        return res['data']

      }),
        catchError(this.handleError));
  }

}

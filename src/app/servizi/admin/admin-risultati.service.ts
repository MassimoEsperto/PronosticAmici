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
export class AdminRisultatiService extends HttpSenderService {

  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.ADMIN.RISULTATI);
  }

  getRisultatiPossibili(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_risultati_possibili")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }



  getSchedaRisultati(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_scheda_risultati")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  getSchedeConcluse(input: string) {

    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_schede_concluse")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }



  //set risultati
  setRisultatoPartita(payload: any): Observable<any> {

    return this.http.post(`${this.buildURL("set_risultato_partita")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  setRisultatoEliminatorie(payload: any): Observable<any> {

    return this.http.post(`${this.buildURL("set_risultato_eliminatorie")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }


  //set risultati
  setRisultatoAntepost(payload: any): Observable<any> {

    return this.http.post(`${this.buildURL("set_risultato_antepost")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }

  //set risultati
  setRisultatoGironi(payload: any): Observable<any> {

    return this.http.post(`${this.buildURL("set_risultato_gironi")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        this.tokenError(res);//controllo token

        return res['data']
      }),
        catchError(this.handleError));
  }


  //modificabile
  getEventiMod(input: string) {
    const params = new HttpParams().set('id_comp', input);

    return this.http.get(`${this.buildURL("get_eventi_mod")}`, { params: params })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  updEventiMod(payload: any) {

    return this.http.post(`${this.buildURL("upd_eventi_mod")}`, { data: payload })
      .pipe(map((res: any) => {
        return RETURN_OK;
      }),
        catchError(this.handleError));
  }


  //set risultati
  setSchedeConcluse(payload: any): Observable<any> {

    return this.http.post(`${this.buildURL("set_schede_concluse")}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {

        return RETURN_OK
      }),
        catchError(this.handleError));
  }

}

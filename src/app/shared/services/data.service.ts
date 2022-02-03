import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataService {
  params?: HttpParams;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    }),
  };

  setParams(params: any): HttpParams {
    let opt = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (typeof value == "object") {
          for (const [index, result] of Object.entries(value)) {
            if (result != null) {
              opt = opt.append(index, result as any);
            }
          }
        }
        opt = opt.append(key, value as any);
      }
    }
    return opt;
  }

  constructor(private http: HttpClient, private router: Router) {}

  // DASHBOARD

  getDashboard() {
    return this.http.get<any>(`${environment.apiUrl}general/dashboard`, {
      headers: this.httpOptions.headers,
    });
  }

  // getFullLive(queryParams?: any) {
  //   if (queryParams !== undefined) {
  //     this.params = this.setParams(queryParams);
  //   } else {
  //     this.params = new HttpParams();
  //   }
  //   return this.http.get<any>(`${environment.sportsApiUrl}live/full`, {
  //     params: this.params,
  //     headers: this.httpOptions.headers,
  //   });
  // }

  // getLiveById(id) {
  //   return this.http.get<any>(`${environment.sportsApiUrl}live/${id}`, {
  //     headers: this.httpOptions.headers,
  //   });
  // }

  // getSoonGames() {
  //   return this.http.get<any>(`${environment.sportsApiUrl}soon`, {
  //     headers: this.httpOptions.headers,
  //   });
  // }
}

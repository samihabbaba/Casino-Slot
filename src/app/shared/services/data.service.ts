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

  constructor(private http: HttpClient, private router: Router) {}

  // DASHBOARD

  getDashboard() {
    return this.http.get<any>(`${environment.apiUrl}general/dashboard`, {
      headers: this.httpOptions.headers,
    });
  }

  // CUSTOMER

  getCustomers(queryParams = "") {
    return this.http.get<any>(
      `${environment.apiUrl}customer?SearchQuery= ${queryParams}`,
      {
        params: this.params,
        headers: this.httpOptions.headers,
      }
    );
  }

  addCustomer(customer) {
    return this.http.post<any>(`${environment.apiUrl}customer`, customer, {
      headers: this.httpOptions.headers,
    });
  }

}

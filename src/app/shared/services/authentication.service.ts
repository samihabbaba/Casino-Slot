import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  currentUser = this.jwtHelper.decodeToken(
    localStorage.getItem("token")?.toString()
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
  ) {
  }

  login(obj): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, obj).pipe(
      map((response: any) => {
        const user = response;
        if (user.token) {
          localStorage.setItem("token", user.token);

          this.loginConnections();
          this.dataService.httpOptions = {
            headers: new HttpHeaders({
              Authorization: "Bearer " + user.token,
            }),
          };
          return user;
        } else {
          return null;
        }
      })
    );
  }

  logOut() {
    localStorage.removeItem("token");
    this.decodedToken = null;
    this.dataService.httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer ",
      }),
    };
    this.currentUser = null;
    this.router.navigate(["login"]);
  }

  loggedIn() {
    const token: any = localStorage.getItem("token");
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  loginConnections() {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem("token")
    );
    this.currentUser = { ...this.decodedToken };
  }
}

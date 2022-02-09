import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

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

  // GENERAL
  getCurrencies() {
    return this.http.get<any>(`${environment.apiUrl}general/currency`, {
      headers: this.httpOptions.headers,
    });
  }

  getDays() {
    return this.http.get<any>(`${environment.apiUrl}general/days`, {
      headers: this.httpOptions.headers,
    });
  }

  closeDay() {
    return this.http.get<any>(`${environment.apiUrl}general/close`, {
      headers: this.httpOptions.headers,
    });
  }

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

  editCustomer(customer, id) {
    return this.http.put<any>(`${environment.apiUrl}customer/${id}`, customer, {
      headers: this.httpOptions.headers,
    });
  }

  // STAFF
  getStaff(queryParams = "") {
    return this.http.get<any>(
      `${environment.apiUrl}staff?SearchQuery= ${queryParams}`,
      {
        params: this.params,
        headers: this.httpOptions.headers,
      }
    );
  }

  addStaff(staff) {
    return this.http.post<any>(`${environment.apiUrl}staff`, staff, {
      headers: this.httpOptions.headers,
    });
  }

  editStaff(staff) {
    return this.http.put<any>(`${environment.apiUrl}staff`, staff, {
      headers: this.httpOptions.headers,
    });
  }

  changeStaffPassword(staff) {
    return this.http.post<any>(`${environment.apiUrl}staff/reset`, staff, {
      headers: this.httpOptions.headers,
    });
  }

  deleteStaff(id) {
    return this.http.delete<any>(`${environment.apiUrl}staff/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  // LIVE TABLE

  getLiveTable() {
    return this.http.get<any>(`${environment.apiUrl}table`, {
      headers: this.httpOptions.headers,
    });
  }

  addLiveTable(liveTable) {
    return this.http.post<any>(`${environment.apiUrl}table`, liveTable, {
      headers: this.httpOptions.headers,
    });
  }

  editLiveTable(liveTable, tableId) {
    return this.http.put<any>(
      `${environment.apiUrl}table/${tableId}`,
      liveTable,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // MACHINE
  getMachines() {
    return this.http.get<any>(`${environment.apiUrl}machine`, {
      headers: this.httpOptions.headers,
    });
  }

  addMachine(machine) {
    return this.http.post<any>(`${environment.apiUrl}machine`, machine, {
      headers: this.httpOptions.headers,
    });
  }

  editMachine(machine, machineId) {
    return this.http.put<any>(
      `${environment.apiUrl}machine/${machineId}`,
      machine,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  deleteMachine(machineId) {
    return this.http.delete<any>(`${environment.apiUrl}machine/${machineId}`, {
      headers: this.httpOptions.headers,
    });
  }

  // CHIP TYPE

  getChipType() {
    return this.http.get<any>(`${environment.apiUrl}bill/chips`, {
      headers: this.httpOptions.headers,
    });
  }

  editChipType(chip, chipId) {
    return this.http.put<any>(
      `${environment.apiUrl}bill/chip/${chipId}`,
      chip,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // HOSPITALITY

  getHospitalityItems() {
    return this.http.get<any>(`${environment.apiUrl}hospitality`, {
      headers: this.httpOptions.headers,
    });
  }

  addHospitalityItems(item) {
    return this.http.post<any>(`${environment.apiUrl}hospitality`, item, {
      headers: this.httpOptions.headers,
    });
  }

  editHospitalityItems(item, itemId) {
    return this.http.put<any>(
      `${environment.apiUrl}hospitality/${itemId}`,
      item,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getHospitalityRecords(startDayIn = 0, endDayIn = 0, staffId = "") {
    return this.http.get<any>(
      `${environment.apiUrl}hospitality/records?startDayIn=${startDayIn}&endDayIn=${endDayIn}&staff=${staffId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // CURRENCY

  getCurrencyUpdate() {
    return this.http.get<any>(`${environment.apiUrl}general/currencyupdate`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCurrency(currency) {
    return this.http.post<any>(
      `${environment.apiUrl}general/update`,
      currency,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // LOGS
  getLogs(startDayIn = 0, endDayIn = 0) {
    return this.http.get<any>(
      `${environment.apiUrl}general/logs?startDayIn=${startDayIn}&endDayIn=${endDayIn}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // SLOT TRANSACTION

  getSlot(startDayIn = 0, endDayIn = 0, machineId = 0, staff = "") {
    return this.http.get<any>(
      `${environment.apiUrl}slot?startDayIn=${startDayIn}&endDayIn=${endDayIn}&machine=${machineId}&staff=${staff}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getSlotData(startDayIn = 0, endDayIn = 0, machineId = 0, staff = "") {
    return this.http.get<any>(
      `${environment.apiUrl}slot/data?startDayIn=${startDayIn}&endDayIn=${endDayIn}&machine=${machineId}&staff=${staff}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  collectStaff(staffId) {
    return this.http.get<any>(`${environment.apiUrl}staff/collect/${staffId}`, {
      headers: this.httpOptions.headers,
    });
  }

  // LIVE TRANSACTION

  getLive(startDayIn = 0, endDayIn = 0, tableId = 0, staff = "") {
    return this.http.get<any>(
      `${environment.apiUrl}live?startDayIn=${startDayIn}&endDayIn=${endDayIn}&table=${tableId}&staff=${staff}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getLiveDrop(startDayIn = 0, endDayIn = 0, tableId = 0, staff = "") {
    return this.http.get<any>(
      `${environment.apiUrl}live/drops?startDayIn=${startDayIn}&endDayIn=${endDayIn}&table=${tableId}&staff=${staff}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // CHIP TRANSFER

  getChipTransfers(dayId = 0) {
    return this.http.get<any>(`${environment.apiUrl}kasa/transfer/${dayId}`, {
      headers: this.httpOptions.headers,
    });
  }

  transferChip(obj, isOpen, tableId, staffId) {
    return this.http.post<any>(
      `${environment.apiUrl}kasa/transfer?isOpen=${isOpen}&table=${tableId}&staff=${staffId}`,
      obj,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getChipsForCurrency(currencyId) {
    return this.http.get<any>(`${environment.apiUrl}bill/chips/${currencyId}`, {
      headers: this.httpOptions.headers,
    });
  }
}

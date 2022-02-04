import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfigService } from "../core/services/config.service";
import { EventService } from "../core/services/event.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { DataService } from "../shared/services/data.service";
import { ChartType } from "./dashboard.model";
import { emailSentBarChart, monthlyEarningChart } from "./data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  isVisible: string;
  isLoading: boolean = false;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;

  dashboardData: any;

  currencySelect: any = "";

  page: number = 1;
  pageSize: number = 5;


  euroKasaChip: any[] = [];
  dollarKasaChip: any[] = [];
  tlKasaChip: any[] = [];
  poundKasaChip: any[] = [];

  @ViewChild("content") content;
  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private eventService: EventService,
    private dataService: DataService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute("data-layout");

    this.isVisible = attribute;
    const vertical = document.getElementById("layout-vertical");
    if (vertical != null) {
      vertical.setAttribute("checked", "true");
    }
    if (attribute == "horizontal") {
      const horizontal = document.getElementById("layout-horizontal");
      if (horizontal != null) {
        horizontal.setAttribute("checked", "true");
        console.log(horizontal);
      }
    }

    /**
     * Fetches the data
     */

    this.dataService.getDashboard().subscribe((resp) => {
      this.dashboardData = resp;
      this.setCaseChip();
      this.setCurrencySelect();
      this.isLoading = false;
      console.log(resp);
    });

    this.fetchData();
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = "year";
    this.configService.getConfig().subscribe((data) => {
      console.log(data);
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  setCaseChip() {
    this.dashboardData.kasaChipList.forEach((x) => {
      if (x.currency === "EURO") {
        this.euroKasaChip.push(x);
      }
      if (x.currency === "TL") {
        this.tlKasaChip.push(x);
      }
      if (x.currency === "STG") {
        this.poundKasaChip.push(x);
      }
      if (x.currency === "USD") {
        this.dollarKasaChip.push(x);
      }
    });
  }

  setCurrencySelect() {
    if (this.dollarKasaChip.length > 0) {
      this.currencySelect = "USD";
    }
    if (this.euroKasaChip.length > 0) {
      this.currencySelect = "EURO";
    }
    if (this.tlKasaChip.length > 0) {
      this.currencySelect = "TL";
    }
    if (this.poundKasaChip.length > 0) {
      this.currencySelect = "STG";
    }
  }

  chooseWhichTableToDisplay() {
    if (this.currencySelect === "USD") {
      return this.dollarKasaChip;
    }
    if (this.currencySelect === "EURO") {
      return this.euroKasaChip;
    }
    if (this.currencySelect === "STG") {
      return this.poundKasaChip;
    }
    if (this.currencySelect === "TL") {
      return this.tlKasaChip;
    }
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast("changeLayout", layout);
  }
}

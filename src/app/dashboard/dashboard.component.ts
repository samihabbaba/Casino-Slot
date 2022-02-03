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
      console.log(data)
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  weeklyreport() {
    this.isActive = "week";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
    ];
  }

  monthlyreport() {
    this.isActive = "month";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series C",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
    ];
  }

  yearlyreport() {
    this.isActive = "year";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
    ];
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast("changeLayout", layout);
  }
}

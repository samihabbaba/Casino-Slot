import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-live-transaction",
  templateUrl: "./live-transaction.component.html",
  styleUrls: ["./live-transaction.component.scss"],
})
export class LiveTransactionComponent implements OnInit {
  editedId: string = "";

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];
  footerData: any = [];

  // Pagination
  pagination: any;
  currentpage: number = 1;
  pageSize: number = 15;

  stardDayIn: any = 0;
  endDayIn: any = 0;
  selectedMachine: any = 0;
  selectedStaff: any = "";

  daysList: any[] = [];
  machineList: any[] = [];
  staffList: any[] = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getStaff();
    this.getDays();
    this.getMachines();
    this.fetchData();
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
    });
  }

  getMachines() {
    this.dataService.getLiveTable().subscribe((resp) => {
      this.machineList = resp;
      console.log(this.machineList);
    });
  }

  getStaff() {
    this.dataService.getStaffWithQuery("", "live").subscribe((resp) => {
      this.staffList = resp;
      // resp.forEach((x) => {
      //   if (x.role === "Inspector") {
      //     this.staffList.push(x);
      //   }
      // });
    });
  }

  fetchData() {
    this.dataService
      .getLive(
        this.stardDayIn,
        this.endDayIn,
        this.selectedMachine,
        this.selectedStaff,
        this.pagination?.CurrentPage ? this.pagination?.CurrentPage : 1
      )
      .subscribe((resp) => {
        this.tableData = resp.body;
        this.pagination = JSON.parse(resp.headers.get("x-Pagination"));
        console.log(this.pagination)
        this.isLoading = false;
        console.log(resp);
      });
    this.fetchFooterData();
  }

  changePagination(ev) {
    this.pagination.CurrentPage = ev;
    this.fetchData();
    console.log(ev);
  }

  fetchFooterData() {
    this.dataService
      .getLiveDrop(
        this.stardDayIn,
        this.endDayIn,
        this.selectedMachine,
        this.selectedStaff
      )
      .subscribe((resp) => {
        this.footerData = resp;
        console.log(this.footerData);
      });
  }

  // confirmCollect(obj) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: `You want to collect ${
  //       document.getElementById("staffSelect").innerHTML
  //     }?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#34c38f",
  //     cancelButtonColor: "#f46a6a",
  //     confirmButtonText: "Yes, collect!",
  //   }).then((result) => {
  //     if (result.value) {
  //       this.dataService.collectStaff(this.selectedStaff).subscribe(
  //         (resp) => {
  //           this.toastr.success("Staff Collected successfully");
  //           this.fetchData();
  //         },
  //         (err) => {
  //           this.toastr.error("Something went wrong");
  //         }
  //       );
  //     }
  //   });
  // }
}

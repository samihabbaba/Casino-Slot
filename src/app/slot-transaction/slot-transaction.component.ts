import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-slot-transaction",
  templateUrl: "./slot-transaction.component.html",
  styleUrls: ["./slot-transaction.component.scss"],
})
export class SlotTransactionComponent implements OnInit {
  editedId: string = "";

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];
  footerData: any = [];

  // Pagination
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
    this.dataService.getMachines().subscribe((resp) => {
      this.machineList = resp;
    });
  }

  getStaff() {
    this.dataService.getStaff().subscribe((resp) => {
      resp.forEach((x) => {
        if (x.role === "Attendant") {
          this.staffList.push(x);
        }
      });
    });
  }

  fetchData() {
    this.dataService
      .getSlotData(
        this.stardDayIn,
        this.endDayIn,
        this.selectedMachine,
        this.selectedStaff
      )
      .subscribe((resp) => {
        this.tableData = resp.body;
        this.isLoading = false;
        console.log(resp.headers.keys());
      });
    this.fetchFooterData();
  }

  fetchFooterData() {
    this.dataService
      .getSlot(
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

  confirmCollect(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to collect ${
        document.getElementById("staffSelect").innerHTML
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, collect!",
    }).then((result) => {
      if (result.value) {
        this.dataService.collectStaff(this.selectedStaff).subscribe(
          (resp) => {
            this.toastr.success("Staff Collected successfully");
            this.fetchData();
          },
          (err) => {
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }


}


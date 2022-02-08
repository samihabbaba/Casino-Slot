import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
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
  footerData: any[] = [];

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
        this.tableData = resp;
        this.isLoading = false;
        console.log(this.tableData);
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
      });
  }
}

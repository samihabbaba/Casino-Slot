import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataService } from "../shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-hospitality",
  templateUrl: "./hospitality.component.html",
  styleUrls: ["./hospitality.component.scss"],
})
export class HospitalityComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

  stardDayIn: any = 0;
  endDayIn: any = 0;
  staff: any = "";

  staffList: any[] = [];
  daysList: any[] = [];

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];
  tableData2: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  searchQuery: any;
  debounceSubject = new Subject<any>();

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
    this.initializeAddForm();
    this.fetchData();
    this.fetchData2();
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
    });
  }

  getStaff() {
    this.dataService.getStaff().subscribe((resp) => {
      this.staffList = resp;
    });
  }

  fetchData() {
    this.dataService.getHospitalityItems().subscribe((resp) => {
      this.tableData = resp;
    });
  }

  fetchData2() {
    this.dataService
      .getHospitalityRecords(this.stardDayIn, this.endDayIn, this.staff)
      .subscribe((resp) => {
        this.tableData2 = resp;
        this.isLoading = false;
      });
  }

  get form() {
    return this.formData.controls;
  }
  get editF() {
    return this.editForm.controls;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      customerGrade: ["D"],
      dailyPlay: [0, Validators.min(0)],
      monthlyPlay: [0, Validators.min(0)],
      yearlyPlay: [0, Validators.min(0)],
      isActive: [true],
    });
  }

  initializeEditForm(obj) {
    console.log(obj);
    this.editForm = this.formBuilder.group({
      name: [obj.name, [Validators.required]],
      customerGrade: [obj.customerGrade],
      dailyPlay: [obj.dailyPlay, Validators.min(0)],
      monthlyPlay: [obj.monthlyPlay, Validators.min(0)],
      yearlyPlay: [obj.yearlyPlay, Validators.min(0)],
      isActive: [obj.isActive],
      isDeleted: [false],
    });
  }

  openModal(content: any, obj?: any) {
    if (obj) {
      this.editedId = obj.id;
      this.initializeEditForm(obj);
      this.modalService.open(content);
    } else {
      this.modalService.open(content);
    }
    this.submitted = false;
  }

  editCustomer() {
    if (this.editForm.valid) {
      const form = this.editForm.getRawValue();
      this.dataService.editHospitalityItems(form, this.editedId).subscribe(
        (resp) => {
          this.toastr.success("Item edited successfully");
          this.modalService.dismissAll();
          this.fetchData();
        },
        (err) => {
          this.toastr.error("Something went wrong");
        }
      );
    } else {
      this.submitted = true;
    }
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      this.dataService.addHospitalityItems(form).subscribe(
        (resp) => {
          this.toastr.success("Item added successfully");
          this.modalService.dismissAll();
          this.initializeAddForm();
          this.fetchData();
        },
        (err) => {
          this.toastr.error("Something went wrong");
        }
      );
    } else {
      this.submitted = true;
    }
  }

  confirmDelete(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        obj.isDeleted = true;
        this.dataService.editHospitalityItems(obj, obj.id).subscribe(
          (resp) => {
            this.toastr.success("Item deleted successfully");
            this.fetchData();
          },
          (err) => {
            obj.isDeleted = false;
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }
}

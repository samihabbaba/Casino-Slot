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
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-open-day",
  templateUrl: "./open-day.component.html",
  styleUrls: ["./open-day.component.scss"],
})
export class OpenDayComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";
  todaysDate;

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  searchQuery: any;
  debounceSubject = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.todaysDate = this.datePipe.transform(Date.now(), "yyyy-MM-dd");
    this.fetchData();
  }

  fetchData() {
    this.dataService.getDays().subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
      console.log(this.tableData);
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
      password: new FormControl("", [Validators.required]),
    });
  }

  confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to close day ${this.todaysDate}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, close!",
    }).then((result) => {
      if (result.value) {
        this.dataService.closeDay().subscribe(
          (resp) => {
            this.toastr.success("Day added successfully");
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

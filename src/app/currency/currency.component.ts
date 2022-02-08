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
  selector: "app-currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.scss"],
})
export class CurrencyComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchData();
  }

  fetchData() {
    this.dataService.getCurrencyUpdate().subscribe((resp) => {
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
      usd: new FormControl(this.tableData[0].usd),
      stg: new FormControl(this.tableData[0].stg),
      euro: new FormControl(this.tableData[0].euro),
    });
  }

  openModal(content: any, obj?: any) {
    this.initializeAddForm();
    this.modalService.open(content);
    this.submitted = false;
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      this.dataService.updateCurrency(form).subscribe(
        (resp) => {
          this.toastr.success("Currency updated successfully");
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
}

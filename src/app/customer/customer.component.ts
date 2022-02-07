import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DataService } from "../shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

  submitted = false;
  isLoading: boolean = false;

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
  ) {
    this.debounceSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.fetchData();
      });
  }

  ngOnInit() {
    this.isLoading = true;
    this.initializeAddForm();
    this.fetchData();
  }

  fetchData() {
    this.dataService.getCustomers(this.searchQuery).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
      console.log(this.tableData);
    });
  }

  get form() {
    return this.formData.controls;
  }

  get editF() {
    return this.formData.controls;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      grade: ["D", [Validators.required]],
      identity: [""],
      avarageBet: [0],
      birthday: [""],
      mobile: ["05"],
    });
  }

  initializeEditForm(obj) {
    this.editForm = this.formBuilder.group({
      name: [obj?.name, [Validators.required]],
      grade: [obj?.grade, [Validators.required]],
      identity: [obj?.identity],
      avarageBet: [obj?.avarageBet],
      birthday: [obj?.birthday?.slice(0, -9)],
      mobile: [obj?.mobile],
      isBaned: [obj.isBaned],
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
      const formData = new FormData();
      for (let i in form) {
        formData.append(i, form[i]);
      }

      this.dataService.editCustomer(formData, this.editedId).subscribe(
        (resp) => {
          this.toastr.success("Customer edited successfully");
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
      const formData = new FormData();
      for (let i in form) {
        formData.append(i, form[i]);
      }

      this.dataService.addCustomer(formData).subscribe(
        (resp) => {
          this.toastr.success("Customer added successfully");
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

  confirmBlock(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, block!",
    }).then((result) => {
      if (result.value) {
        obj.isBaned = true;
        const formData = new FormData();
        for (let i in obj) {
          formData.append(i, obj[i]);
        }
        this.dataService.editCustomer(formData, obj.id).subscribe(
          (resp) => {
            this.toastr.success("Customer blocked successfully");
            this.fetchData();
          },
          (err) => {
            obj.isBaned = false;
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }

  confirmUnblock(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to unblock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, unblock!",
    }).then((result) => {
      if (result.value) {
        obj.isBaned = false;
        const formData = new FormData();
        for (let i in obj) {
          formData.append(i, obj[i]);
        }
        this.dataService.editCustomer(formData, obj.id).subscribe(
          (resp) => {
            this.toastr.success("Customer unblocked successfully");
            this.fetchData();
          },
          (err) => {
            obj.isBaned = true;
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }
}

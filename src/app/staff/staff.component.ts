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
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DataService } from "../shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.scss"],
})
export class StaffComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  changePasswordForm: FormGroup;
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
    this.dataService.getStaff(this.searchQuery).subscribe((resp) => {
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
  get password() {
    return this.changePasswordForm.controls;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}"
          ),
        ],
      ],
      role: ["Administrator"],
      birthday: [""],
      mobile: ["05"],
      isActive: [true],
    });
  }

  initializeEditForm(obj) {
    console.log(obj);
    this.editForm = this.formBuilder.group({
      staffId: [obj.id],
      name: [obj?.name, [Validators.required]],
      username: [obj?.username, [Validators.required]],
      // password: [obj?.password, [Validators.required]],
      role: [obj?.role, [Validators.required]],
      birthday: [
        obj?.birthday?.slice(0, -9) ? obj?.birthday?.slice(0, -9) : "",
      ],
      mobile: [obj?.mobile ? obj?.mobile : ""],
      // isActive: [obj.isActive],
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

  openPasswordModal(content, obj) {
    this.initializePasswordForm(obj);
    this.modalService.open(content);
  }

  initializePasswordForm(obj) {
    this.passwordsNotMatch = false;
    this.changePasswordForm = this.formBuilder.group({
      staffId: new FormControl(obj.id),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}"
        ),
      ]),
      confirmPassword: new FormControl(""),
    });
  }

  changeStaffPassword() {
    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get("password").value;
      const passwordConfirm =
        this.changePasswordForm.get("confirmPassword").value;

      if (password === passwordConfirm) {
        const obj = this.changePasswordForm.getRawValue();
        delete obj.confirmPassword;
        this.dataService.changeStaffPassword(obj).subscribe(
          (resp) => {
            this.toastr.success("Password changed successfully");
            this.modalService.dismissAll();
            this.fetchData();
          },
          (err) => {
            this.toastr.error("Something went wrong");
          }
        );
      }
      if (password !== passwordConfirm) {
        this.passwordsNotMatch = true;
      }
    } else {
      this.submitted = true;
    }
  }

  editCustomer() {
    if (this.editForm.valid) {
      const form = this.editForm.getRawValue();
      const formData = new FormData();
      for (let i in form) {
        formData.append(i, form[i]);
      }

      this.dataService.editStaff(formData).subscribe(
        (resp) => {
          this.toastr.success("Staff edited successfully");
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

      this.dataService.addStaff(formData).subscribe(
        (resp) => {
          this.toastr.success("Staff added successfully");
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
      text: "You want to delete this staff?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteStaff(obj.id).subscribe(
          (resp) => {
            this.toastr.success("Staff deleted successfully");
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

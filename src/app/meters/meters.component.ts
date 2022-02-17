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
import { AuthenticationService } from "../shared/services/authentication.service";
@Component({
  selector: "app-meters",
  templateUrl: "./meters.component.html",
  styleUrls: ["./meters.component.scss"],
})
export class MetersComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedObj: any;

  stardDayIn: any;

  staffList: any[] = [];
  daysList: any[] = [];

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];
  tableData2: any[] = [];
  footerData: any;
  isDetailed: boolean = false;
  isMoney: boolean = false;

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
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getDays();
    // this.initializeAddForm();
    // this.fetchData();
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
      console.log(this.daysList);
      this.stardDayIn = this.daysList[this.daysList.length - 1].id;
      this.fetchData2();
    });
  }

  fetchData2() {
    this.dataService.getMetersByDayId(this.stardDayIn).subscribe((resp) => {
      let obj = resp;
      this.footerData = obj[obj.length - 1];
      obj.pop();
      this.tableData2 = obj;
      this.isLoading = false;
    });
  }

  // get form() {
  //   return this.formData.controls;
  // }
  get editF() {
    return this.editForm.controls;
  }

  // initializeAddForm() {
  //   this.formData = this.formBuilder.group({
  //     name: ["", [Validators.required]],
  //     customerGrade: ["D"],
  //     dailyPlay: [0, Validators.min(0)],
  //     monthlyPlay: [0, Validators.min(0)],
  //     yearlyPlay: [0, Validators.min(0)],
  //     isActive: [true],
  //   });
  // }

  initializeEditForm(obj) {
    console.log(obj);
    this.editForm = this.formBuilder.group({
      in: [obj.startIn, [Validators.required]],
      out: [obj.startOut, [Validators.required]],
      jackPot: [obj.startJackPot, [Validators.required]],
      isClear: [true],
      isStart: [true],
      staffId: [this.authService.currentUser.id],
    });
  }

  startValueChange(ev) {
    if (!ev) {
      this.editF["in"].patchValue(this.editedObj.endIn);
      this.editF["out"].patchValue(this.editedObj.endOut);
      this.editF["jackPot"].patchValue(this.editedObj.endJackPot);
      this.editForm.updateValueAndValidity();
    } else {
      this.editF["in"].patchValue(this.editedObj.startIn);
      this.editF["out"].patchValue(this.editedObj.startOut);
      this.editF["jackPot"].patchValue(this.editedObj.startJackPot);
      this.editForm.updateValueAndValidity();
    }
  }

  openModal(content: any, obj?: any) {
    if (obj) {
      this.editedObj = obj;
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
      console.log(this.editedObj);
      this.dataService.editMeter(form, this.editedObj.id).subscribe(
        (resp) => {
          this.toastr.success("Meter edited successfully");
          this.modalService.dismissAll();
          this.fetchData2();
        },
        (err) => {
          this.toastr.error("Something went wrong");
        }
      );
    } else {
      this.submitted = true;
    }
  }

  // saveCustomer() {
  //   if (this.formData.valid) {
  //     const form = this.formData.getRawValue();
  //     this.dataService.addHospitalityItems(form).subscribe(
  //       (resp) => {
  //         this.toastr.success("Item added successfully");
  //         this.modalService.dismissAll();
  //         this.initializeAddForm();
  //         this.fetchData2();
  //       },
  //       (err) => {
  //         this.toastr.error("Something went wrong");
  //       }
  //     );
  //   } else {
  //     this.submitted = true;
  //   }
  // }

  confirmDelete(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reset this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, reset!",
    }).then((result) => {
      if (result.value) {
        const form = this.formBuilder.group({
          in: [0],
          out: [0],
          jackPot: [0],
          isClear: [true],
          isStart: [false],
          staffId: [this.authService.currentUser.id],
        });
        this.dataService.editMeter(form.getRawValue(), obj.id).subscribe(
          (resp) => {
            this.toastr.success("Item reset successful");
            this.fetchData2();
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

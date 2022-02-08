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
  selector: "app-chip-type",
  templateUrl: "./chip-type.component.html",
  styleUrls: ["./chip-type.component.scss"],
})
export class ChipTypeComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

  selectedObj: any;
  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

  tableData: any[] = [];

  currencyList: any[] = [];

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
    this.getCurrencies();
    this.fetchData();
  }

  getCurrencies() {
    this.dataService.getCurrencies().subscribe((resp) => {
      this.currencyList = resp;
    });
  }

  fetchData() {
    this.dataService.getChipType().subscribe((resp) => {
      const arr: any = resp;
      arr.sort(this.compare);
      this.tableData = arr;
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

  compare(a, b) {
    if (a.currency < b.currency) {
      return -1;
    }
    if (a.currency > b.currency) {
      return 1;
    }
    return 0;
  }

  initializeEditForm(obj) {
    this.selectedObj = obj;
    console.log(obj);
    this.editForm = this.formBuilder.group({
      currencyId: [obj.currencyId, [Validators.required]],
      value: [obj.value, [Validators.min(0)]],
      isActive: [obj.isActive],
      isDelete: [false],
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
      form.currencyId = parseInt(form.currencyId)
      this.dataService.editChipType(form, this.editedId).subscribe(
        (resp) => {
          this.toastr.success("Chip edited successfully");
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

  confirmDelete(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this chip?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        obj.isDeleted = true;
        this.dataService.editChipType(obj, obj.id).subscribe(
          (resp) => {
            this.toastr.success("Chip deleted successfully");
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

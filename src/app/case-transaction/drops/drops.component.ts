import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { DataService } from "src/app/shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-drops",
  templateUrl: "./drops.component.html",
  styleUrls: ["./drops.component.scss"],
})
export class DropsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  editForm: FormGroup;
  editedObj: any;

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];
  footerData: any = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  stardDayIn: any;

  billsList: any[] = [];
  daysList: any[] = [];
  currencyList: any[] = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.breadCrumbItems = [
      { label: "Case" },
      { label: "Drops", active: true },
    ];
    this.getDays();
    this.getCurrencies();
  }

  openModal(content: any, obj?: any) {
    if (obj) {
      this.editedObj = obj;
      this.initializeEditForm(obj);
      this.modalService.open(content);
    } else {
      this.initializeAddForm();
      this.modalService.open(content);
    }

    this.submitted = false;
  }

  get form() {
    return this.formData.controls;
  }
  get editF() {
    return this.formData.controls;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      currencyId: [this.currencyList[0].id],
      dayId: [this.daysList[0].id ? this.daysList[0].id : 0],
      billId: [this.billsList[0].id],
      quantity: [0, [Validators.required, Validators.min(0)]],
      staffId: [this.authService.currentUser.id],
      isOpen: [false],
    });
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      form.billId = parseInt(form.billId);
      form.dayId = parseInt(form.dayId);

      delete form.currencyId;

      this.dataService.addKasaDrop(form).subscribe(
        (resp) => {
          this.toastr.success("Drop added successfully");
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

  initializeEditForm(obj) {
    this.editForm = this.formBuilder.group({
      quantity: [obj?.quantity, [Validators.required, Validators.min(0)]],
      isOpen: [false],
    });
  }

  editCustomer() {
    if (this.editForm.valid) {
      const form = this.editForm.getRawValue();

      this.dataService.editKasaDrops(form, this.editedObj.id).subscribe(
        (resp) => {
          this.toastr.success("Drop edited successfully");
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

  getCurrencies() {
    this.dataService.getCurrencies().subscribe((resp) => {
      this.currencyList = resp;
      this.getBillsByCurrencyId(this.currencyList[0].id);
    });
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
      if (this.daysList.length >= 1) {
        this.stardDayIn = this.daysList[0].id;
      } else {
        this.stardDayIn = 0;
      }
      console.log(this.daysList);
      this.fetchData();
    });
  }

  getBillsByCurrencyId(currencyId) {
    this.dataService.getBillByCurrencyId(currencyId).subscribe((resp) => {
      this.billsList = resp;
      if (this.formData?.controls?.billId) {
        this.form.billId.patchValue(this.billsList[0].id);
      }
    });
  }

  fetchData() {
    this.dataService.getKasaDrops(this.stardDayIn).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
      console.log(this.tableData);
    });
  }
}

import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { from, Observable, of, OperatorFunction } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from "rxjs/operators";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { DataService } from "src/app/shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-money-exchange",
  templateUrl: "./money-exchange.component.html",
  styleUrls: ["./money-exchange.component.scss"],
})
export class MoneyExchangeComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  editForm: FormGroup;
  editedObj: any;

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  stardDayIn: any = 0;

  customersList: any[] = [];
  daysList: any[] = [];
  currencyList: any[] = [];
  typeListIsIn: any[] = [];
  typeListIsOut: any[] = [];
  isIn: boolean = false;

  customerOptions = [];

  selectFromList: any;

  filterMethod(event) {
    this.dataService.getCustomerAutoComplete(event.query).subscribe((resp) => {
      this.customerOptions = resp;
    });
  }

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
      { label: "Money Exchange", active: true },
    ];
    this.getDays();
    this.getCurrencies();
    this.getKasaTypes();
    this.fetchData();
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
    this.selectFromList = false;
    this.formData = this.formBuilder.group({
      customerId: [null, [Validators.required]],
      staffId: [this.authService.currentUser.id],
      fromCurrencyId: [this.currencyList[0].id],
      toCurrencyId: [this.currencyList[0].id],
      fromRate: [this.currencyList[0].rate],
      toRate: [this.currencyList[0].rate],
      fromAmount: [0, [Validators.required, Validators.min(0.01)]],
      toAmount: [0, [Validators.required]],
    });
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      form.customerId = form.customerId.id;
      form.fromCurrencyId = parseInt(form.fromCurrencyId);
      form.toCurrencyId = parseInt(form.toCurrencyId);
      form.toAmount = form.fromAmount * (form.fromRate / form.toRate);

      this.dataService.addKasaExchanges(form).subscribe(
        (resp) => {
          this.toastr.success("Exchange successful");
          this.modalService.dismissAll();
          this.fetchData();
        },
        (err) => {
          if (!form.customerId) {
            this.toastr.error("Select a customer from the list");
            this.selectFromList = true;
            return;
          }
          this.toastr.error("Something went wrong");
        }
      );
    } else {
      this.submitted = true;
    }
  }

  initializeEditForm(obj) {
    this.editForm = this.formBuilder.group({
      customerId: [obj.customerId, [Validators.required]],
      staffId: [this.authService.currentUser.id],
      fromCurrencyId: [obj.fromCurrency],
      toCurrencyId: [obj.toCurrency],
      fromRate: [obj.fromRate],
      toRate: [obj.toRate],
      fromAmount: [obj.fromAmount, [Validators.required, Validators.min(0.01)]],
      toAmount: [obj.toAmount, [Validators.required]],
      isDeleted: [true],
    });
  }

  getKasaTypes() {
    this.dataService.getKasaType().subscribe((resp) => {
      resp.forEach((x) => {
        if (x.isIn) {
          this.typeListIsIn.push(x);
        } else {
          this.typeListIsOut.push(x);
        }
      });
    });
  }

  getCurrencies() {
    this.dataService.getCurrencies().subscribe((resp) => {
      this.currencyList = resp;
    });
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
    });
  }

  fetchData() {
    this.dataService.getKasaExchanges(this.stardDayIn).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
      console.log(this.tableData);
    });
  }

  patchRate(ev, isTo) {
    const rate = this.currencyList.find(
      (x) => x.id === parseInt(ev.target.value)
    ).rate;
    if (isTo) {
      this.form.toRate.patchValue(rate);
    }
    if (!isTo) {
      this.form.fromRate.patchValue(rate);
    }
  }

  returnToCurrency(currencyId) {
    return this.currencyList.find((x) => x.id === parseInt(currencyId)).code;
  }

  confirmDelete(obj) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this exchange?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.initializeEditForm(obj);
        const form = this.editForm.getRawValue();

        form.fromCurrencyId = this.currencyList.find(
          (x) => x.code == form.fromCurrencyId
        ).id;

        form.toCurrencyId = this.currencyList.find(
          (x) => x.code == form.toCurrencyId
        ).id;

        this.dataService.editKasaExchanges(form, obj.id).subscribe(
          (resp) => {
            this.toastr.success("Exchange deleted successfully");
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

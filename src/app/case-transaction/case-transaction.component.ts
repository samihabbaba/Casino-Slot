import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AuthenticationService } from "../shared/services/authentication.service";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-case-transaction",
  templateUrl: "./case-transaction.component.html",
  styleUrls: ["./case-transaction.component.scss"],
})
export class CaseTransactionComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];
  footerData: any = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  stardDayIn: any = 0;

  daysList: any[] = [];
  currencyList: any[] = [];
  typeListIsIn: any[] = [];
  typeListIsOut: any[] = [];
  isIn: boolean = false;

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
      { label: "Transactions", active: true },
    ];
    this.getDays();
    this.getCurrencies();
    this.getKasaTypes();
    this.fetchData();
  }

  openModal(content: any, obj?: any) {
    this.initializeAddForm();
    this.modalService.open(content);

    this.submitted = false;
  }

  get form() {
    return this.formData.controls;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      staffId: [this.authService.currentUser.id],
      currencyId: [this.currencyList[0].id],
      rate: [this.currencyList[0].rate],
      note: [""],
      typeId: [this.typeListIsOut[0].id, [Validators.required]],
    });
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      form.currencyId = parseInt(form.currencyId);
      form.typeId = parseInt(form.typeId);

      this.dataService.addKasaTransaction(form).subscribe(
        (resp) => {
          this.toastr.success("Transaction added successfully");
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
    this.dataService.getKasaTransactions(this.stardDayIn).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
    });
    this.fetchFooterData();
  }

  fetchFooterData() {
    this.dataService
      .getKasaTransactionsTotal(this.stardDayIn)
      .subscribe((resp) => {
        this.footerData = resp;
      });
  }
}

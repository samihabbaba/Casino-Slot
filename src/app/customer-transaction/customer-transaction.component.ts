import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, startWith } from "rxjs/operators";
import Swal from "sweetalert2";
import { AuthenticationService } from "../shared/services/authentication.service";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-customer-transaction",
  templateUrl: "./customer-transaction.component.html",
  styleUrls: ["./customer-transaction.component.scss"],
})
export class CustomerTransactionComponent implements OnInit {
  @ViewChild("addCustomerTransaction") addCustomerTransactionModal: any;
  @ViewChild("editCustomerTransaction") editCustomerTransactionModal: any;

  searchQuery: any;
  debounceSubject = new Subject<any>();

  breadCrumbItems: Array<{}>;

  addCustomerTransactionForm: FormGroup;
  editTransactionForm: FormGroup;

  isIn: boolean = true;

  submitted = false;
  isLoading: boolean = false;

  firstPanelData: any[] = [];
  filteredFirstPanelData: any[] = [];
  secondPanelData: any[] = [];
  thirdPanelData: any[] = [];
  fourthPanelData: any[] = [];
  selectedCustomer: any = "";
  selectedTransaction: any = "";
  selectedExtra: any = "";

  items = [
    {
      label: "Create Transaction",
      icon: "pi pi-fw pi-plus",
      command: () => {
        this.initializeAddCustomerTransactionForm();
        this.modalService.open(this.addCustomerTransactionModal);
        this.submitted = false;
      },
    },
    { label: "Customer Report", icon: "pi pi-fw pi-file", command: () => null },
  ];

  items2 = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        console.log(this.selectedTransaction);
        this.initializeEditTransactionForm(this.selectedTransaction);
        this.modalService.open(this.editCustomerTransactionModal);
        this.submitted = false;
      },
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-times",
      command: () => {
        this.confirmTransactionDelete();
      },
    },
  ];

  items3 = [
    {
      label: "Delete",
      icon: "pi pi-fw pi-times",
      command: () => {
        this.confirmExtraDelete();
      },
    },
  ];

  transactionTypeIn: string[] = [
    "Discount In",
    "Credit In",
    "Live Discount In",
    "Cash In",
    "Credit Card In",
    "Old Day In",
  ];
  transactionTypeOut: string[] = [
    "Discount Out",
    "Credit Out",
    "Live Discount Out",
    "Cash Out",
    "Credit Card Out",
    "Old Day Out",
  ];
  paymentTypeList: string[] = ["Cash", "Credit Card", "Chip"];
  recordTypeList: string[] = ["Credit", "Cancel Credit", "JackPot"];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 50;

  stardDayIn: any = 0;
  endDayIn: any = 0;

  daysList: any[] = [];
  staffList: any[] = [];
  currencyList: any[] = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {
    this.debounceSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.filteredFirstPanelData = this.firstPanelData.filter((x) =>
          x.customerName.toLowerCase().includes(this.searchQuery.trim())
        );
      });
  }

  ngOnInit() {
    this.isLoading = true;
    this.breadCrumbItems = [
      { label: "Customer Transaction" },
      { label: "Slot", active: true },
    ];
    this.getDays();
    this.getStaffs();
    this.getCurrencies();
    this.fetchData();
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

  getStaffs() {
    this.dataService.getStaff().subscribe((resp) => {
      const arr = resp.filter((x) => x.role === "Attendant");
      this.staffList = arr;
      console.log(this.staffList);
    });
  }

  fetchData() {
    this.getAllCustomerStats();
    this.getCustomerTransactionsById();
    this.getCustomerExtrasById();
    this.getAllStatistics();
  }

  // 1ST PANEL

  getAllCustomerStats() {
    this.dataService
      .getCustomersAllStat(this.stardDayIn, this.endDayIn, this.searchQuery)
      .subscribe((resp) => {
        this.firstPanelData = resp;
        this.filteredFirstPanelData = resp;
        this.isLoading = false;
      });
  }

  get form() {
    return this.addCustomerTransactionForm.controls;
  }

  handleFirstPanelRowClick(selectedObj) {
    // if (this.selectedCustomer === selectedObj) {
    //   this.selectedCustomer = null;
    //   this.secondPanelData = [];
    //   this.thirdPanelData = [];
    //   return;
    // }
    // if (this.selectedCustomer !== selectedObj) {
    this.selectedCustomer = selectedObj;
    this.getCustomerTransactionsById();
    this.getCustomerExtrasById();
    // }
  }

  initializeAddCustomerTransactionForm() {
    this.addCustomerTransactionForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      staffId: [this.authService.currentUser.id],
      customerId: [this.selectedCustomer.id],
      currencyId: [this.currencyList[0].id],
      transactionType: [this.transactionTypeIn[0]],
      rate: [this.currencyList[0].rate],
      note: [""],
    });
  }

  createCustomerTransaction() {
    if (this.addCustomerTransactionForm.valid) {
      const form = this.addCustomerTransactionForm.getRawValue();
      form.currencyId = parseInt(form.currencyId);
      form.rate = this.currencyList.find((x) => x.id === form.currencyId).rate;
      console.log(form);
      this.dataService.createCustomerTransaction(form).subscribe(
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

  // 2ND PANEL
  getCustomerTransactionsById() {
    if (!this.selectedCustomer) return;
    this.dataService
      .getCustomerTransactionsById(
        this.stardDayIn,
        this.endDayIn,
        this.selectedCustomer.id
      )
      .subscribe((resp) => {
        this.secondPanelData = resp;
        console.log(this.secondPanelData);
        this.isLoading = false;
      });
  }

  get editF() {
    return this.editTransactionForm.controls;
  }

  setRate(event) {
    const selectedId = parseInt(event.target.value);
    let rate = parseInt(
      this.currencyList.find((x) => x.id === selectedId).rate
    );
    this.editF["rate"].patchValue(rate);
    this.editF["currencyId"].patchValue(selectedId);
  }

  initializeEditTransactionForm(obj) {
    this.editTransactionForm = this.formBuilder.group({
      amount: [obj?.amount, [Validators.required, Validators.min(1)]],
      currencyId: [this.currencyList.find((x) => x.code === obj.currency).id],
      rate: [this.currencyList.find((x) => x.code === obj.currency).rate],
      credit: [obj?.credit, [Validators.required]],
      paymentType: [obj?.paymentType, [Validators.required]],
      recordType: [obj?.recordType, [Validators.required]],
      staffId: [this.staffList[0].id],
      staffEdit: [this.authService.currentUser.id],
    });
  }

  updateCustomerTransaction() {
    if (this.editTransactionForm.valid) {
      const form = this.editTransactionForm.getRawValue();
      form.credit = form.amount * this.selectedTransaction.machineCredit;
      console.log(form);
      this.dataService
        .editCustomerTransaction(form, this.selectedTransaction.id)
        .subscribe(
          (resp) => {
            this.toastr.success("Transaction edited successfully");
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

  confirmTransactionDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.dataService
          .deleteCustomerTransaction(this.selectedTransaction.id)
          .subscribe(
            (resp) => {
              this.toastr.success("Record deleted successfully");
              this.fetchData();
            },
            (err) => {
              this.toastr.error("Something went wrong");
            }
          );
      }
    });
  }

  // 3RD PANEL
  getCustomerExtrasById() {
    if (!this.selectedCustomer) return;
    this.dataService
      .getCustomerExtrasById(
        this.stardDayIn,
        this.endDayIn,
        this.selectedCustomer.id
      )
      .subscribe((resp) => {
        this.thirdPanelData = resp;
        console.log(this.thirdPanelData);
        this.isLoading = false;
      });
  }

  confirmExtraDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteCustomerExtra(this.selectedExtra.id).subscribe(
          (resp) => {
            this.toastr.success("Record deleted successfully");
            this.fetchData();
          },
          (err) => {
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }

  // 4TH PANEL
  getAllStatistics() {
    this.dataService
      .getCustomerStatistics(this.stardDayIn, this.endDayIn)
      .subscribe((resp) => {
        const arr = [];
        arr.push({
          name: "Results",
          in: resp.resultIn,
          out: resp.resultOut,
          remaining: resp.resultRemaining,
        });
        arr.push({
          name: "Balance",
          in: resp.cashIn,
          out: resp.cashOut,
          remaining: resp.cashRemaining,
        });

        arr.push({
          name: "Credit Card",
          in: resp.creditCardIn,
          out: resp.creditCardOut,
          remaining: resp.creditCardRemaining,
        });
        arr.push({
          name: "Credit",
          in: resp.creditIn,
          out: resp.creditOut,
          remaining: resp.creditRemaining,
        });

        arr.push({
          name: "Discount",
          in: resp.discountIn,
          out: resp.discountOut,
          remaining: resp.discountRemaining,
        });

        arr.push({
          name: "Live",
          in: resp.liveIn,
          out: resp.liveOut,
          remaining: resp.liveRemaining,
        });

        arr.push({
          name: "JackPot",
          in: resp.jackPotIn,
          out: resp.jackPotOut,
          remaining: resp.jackPotRemaining,
        });

        arr.push({
          name: "VIP",
          in: resp.vipIn,
          out: resp.vipOut,
          remaining: resp.vipRemaining,
        });

        arr.push({
          name: "Chip",
          in: resp.chipIn,
          out: resp.chipOut,
          remaining: resp.chipRemaining,
        });
        this.fourthPanelData = arr;
        this.isLoading = false;
      });
  }
}

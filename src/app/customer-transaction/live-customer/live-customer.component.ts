import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, startWith } from "rxjs/operators";
import Swal from "sweetalert2";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { DataService } from "../../shared/services/data.service";

@Component({
  selector: "app-live-customer",
  templateUrl: "./live-customer.component.html",
  styleUrls: ["./live-customer.component.scss"],
})
export class LiveCustomerComponent implements OnInit {
  @ViewChild("addCustomerTransaction") addCustomerTransactionModal: any;
  @ViewChild("addLiveCustomerTransaction") addLiveCustomerTransactionModal: any;

  searchQuery: any;
  debounceSubject = new Subject<any>();

  breadCrumbItems: Array<{}>;

  addCustomerTransactionForm: FormGroup;
  addLiveCustomerTransactionForm: FormGroup;

  isIn: boolean = true;
  transactionType: string = "Live In";
  isCreditCard: boolean = false;

  realityDrop: number = 0;

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
    {
      label: "Live Transaction",
      icon: "pi pi-fw pi-plus-circle",
      command: () => {
        this.initializeAddLiveTransactionForm();
        this.modalService.open(this.addLiveCustomerTransactionModal);
        this.submitted = false;
      },
    },
  ];

  items2 = [
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
  chipList: any[] = [];
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
      { label: "Live", active: true },
    ];
    this.getDays();
    this.getCurrencies();
    this.getChips();
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

  compare(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }

  getChips() {
    this.dataService.getChipType().subscribe((resp) => {
      const arr = resp;
      arr.sort(this.compare);
      this.chipList = arr;
      console.log(this.chipList);
    });
  }

  fetchData() {
    this.getAllCustomerStats();
    this.getCustomerTransactionsById();
    this.getCustomerExtrasById();
    this.getCustomerRealityDrop();
  }

  // 1ST PANEL

  calculateWinLossLive(liveRec) {
    let TotalDiscount = liveRec.disountOut - liveRec.discountIn;
    liveRec.liveCreditCard =
      liveRec.liveInCreditCard - liveRec.liveOutCreditCard;
    liveRec.totalChip100TL =
      liveRec.chip100TLOut +
      liveRec.chip100TLKasaOut -
      (liveRec.chip100TLKasaIN + liveRec.chip100TLIn);
    liveRec.totalChip500TL =
      liveRec.chip500TLOut +
      liveRec.chip500TLKasaOut -
      (liveRec.chip500TLKasaIN + liveRec.chip500TLIn);
    liveRec.totalChip100EU =
      liveRec.chip100EUOut +
      liveRec.chip100EUKasaOut -
      (liveRec.chip100EUKasaIN + liveRec.chip100EUIn);
    liveRec.totalChip500EU =
      liveRec.chip500EUOut +
      liveRec.chip500EUKasaOut -
      (liveRec.chip500EUKasaIN + liveRec.chip500EUIn);
    liveRec.totalCash =
      liveRec.tableCash + liveRec.liveInKasa + liveRec.liveInCreditCard;
    liveRec.winLoss =
      liveRec.liveOutKasa +
      liveRec.disountOut +
      liveRec.liveOutCreditCard -
      (liveRec.totalCash + liveRec.discountIn);
  }

  getAllCustomerStats() {
    this.dataService
      .getCustomersLiveStat(this.stardDayIn, this.endDayIn, this.searchQuery)
      .subscribe((resp) => {
        const arr = resp;
        arr.forEach((x) => {
          this.calculateWinLossLive(x);
        });
        this.firstPanelData = arr;
        this.filteredFirstPanelData = arr;
        this.isLoading = false;
      });
  }

  get form() {
    return this.addCustomerTransactionForm.controls;
  }

  get form2() {
    return this.addLiveCustomerTransactionForm.controls;
  }

  get chipRecords() {
    return this.addLiveCustomerTransactionForm.controls[
      "chipRecords"
    ] as FormArray;
  }

  setRate(event) {
    const selectedId = parseInt(event.target.value);
    let rate = this.currencyList.find((x) => x.id === selectedId).rate;
    this.form2["rate"].patchValue(rate);
    this.form2["currencyId"].patchValue(selectedId);
  }

  initializeAddLiveTransactionForm() {
    this.addLiveCustomerTransactionForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      staffId: [this.authService.currentUser.id],
      customerId: [this.selectedCustomer.id],
      currencyId: [this.currencyList[0].id],
      transactionType: [""],
      rate: [this.currencyList[0].rate],
      note: [""],
      chipRecords: this.formBuilder.array([]),
    });

    this.chipList.forEach((x) => {
      this.addChip(x.id, x.name, x.value, x.currency);
    });
  }

  calculateAmount() {
    let amount = 0;
    const chipRecords = this.chipRecords
      .getRawValue()
      .filter((x) => x.quantity > 0);
    if (chipRecords.length < 1) return amount;
    const selectedCurrency = this.currencyList.find(
      (x) =>
        x.id ===
        this.addLiveCustomerTransactionForm.controls["currencyId"].value
    );
    const selectedRate =
      this.addLiveCustomerTransactionForm.controls["rate"].value;
    const euRate = this.currencyList.find((x) => x.code === "EURO").rate;
    const euroRateToDivide = selectedRate / euRate;

    chipRecords.forEach((x) => {
      if (x.currency === "TL") {
        amount += (x.quantity * x.value) / selectedRate;
      }
      if (x.currency === "EURO") {
        amount += (x.quantity * x.value) / euroRateToDivide;
      }
    });
    this.addLiveCustomerTransactionForm.controls["amount"].patchValue(
      parseInt(amount.toFixed(2))
    );
    return amount;
  }

  returnSelectedCurrency() {
    return this.currencyList.find(
      (x) =>
        x.id ===
        this.addLiveCustomerTransactionForm.controls["currencyId"].value
    ).code;
  }

  addChip(chipId, chipName, chipValue, chipCurrency) {
    const eventForm = this.formBuilder.group({
      quantity: [0, [Validators.required, Validators.min(0)]],
      chipId: [chipId, [Validators.required]],
      name: [chipName, [Validators.required]],
      value: [chipValue, [Validators.required]],
      currency: [chipCurrency, [Validators.required]],
    });
    this.chipRecords.push(eventForm);
  }

  createLiveTransaction() {
    if (this.addLiveCustomerTransactionForm.valid) {
      const form = this.addLiveCustomerTransactionForm.getRawValue();
      form.chipRecords.forEach((x) => {
        delete x.value;
        delete x.currency;
        delete x.name;
      });

      if (this.transactionType === "Live In" && this.isCreditCard) {
        form.transactionType = "Live Credit Card In";
      }

      if (this.transactionType === "Live In" && !this.isCreditCard) {
        form.transactionType = "Live In";
      }

      if (this.transactionType === "Live Out" && this.isCreditCard) {
        form.transactionType = "Live Credit Card Out";
      }

      if (this.transactionType === "Live Out" && !this.isCreditCard) {
        form.transactionType = "Live Out";
      }
      this.dataService.createLiveCustomerTransaction(form).subscribe(
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
      this.toastr.info("Select some chips");
      this.submitted = true;
    }
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
    this.getCustomerRealityDrop();
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
      .getCustomerLiveTransactionsById(
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
  getCustomerRealityDrop() {
    if (!this.selectedCustomer) return;
    this.dataService
      .getCustomerRealityDrop(this.selectedCustomer.id)
      .subscribe((resp) => {
        this.realityDrop = resp;
        this.isLoading = false;
      });
  }
}

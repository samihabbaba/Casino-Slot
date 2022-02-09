import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AuthenticationService } from "../shared/services/authentication.service";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-chip-transfer",
  templateUrl: "./chip-transfer.component.html",
  styleUrls: ["./chip-transfer.component.scss"],
})
export class ChipTransferComponent implements OnInit {
  formData: FormGroup;

  transferType = false;

  get form() {
    return this.formData.controls;
  }

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 15;

  stardDayIn: any = 0;
  selectedMachine: any = 0;

  daysList: any[] = [];
  machineList: any[] = [];
  chipList: any[] = [];

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
    this.getTables();
    this.fetchData();
  }

  openModal(content: any) {
    this.initializeAddForm();
    this.getChips(parseInt(this.selectedMachine));
    this.modalService.open(content);
    this.submitted = false;
  }

  get chips() {
    return this.formData.controls["chips"] as FormArray;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      chips: this.formBuilder.array([]),
    });
  }

  addChip(chipId, chipValue, chipCurrency) {
    const eventForm = this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      chipId: [chipId, [Validators.required]],
      value: [chipValue, [Validators.required]],
      currency: [chipCurrency, [Validators.required]],
    });
    this.chips.push(eventForm);
  }

  addTransfer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();

      this.dataService
        .transferChip(
          form.chips,
          this.transferType,
          this.selectedMachine,
          this.authService.currentUser.id
        )
        .subscribe(
          (resp) => {
            this.toastr.success("Transfer successful");
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

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
    });
  }

  getTables() {
    this.dataService.getLiveTable().subscribe((resp) => {
      this.machineList = resp;
      this.selectedMachine = this.machineList[0].id;
    });
  }

  getChips(tableId) {
    tableId = parseInt(tableId);
    const table = this.machineList.find((x) => x.id === tableId);
    this.dataService.getChipsForCurrency(table.currencyId).subscribe((resp) => {
      this.chipList = resp;
      this.chips.clear();
      this.chipList.forEach((x) => {
        this.addChip(x.id, x.value, x.currency);
      });
    });
  }

  resetAddForm() {
    this.initializeAddForm();
    this.selectedMachine = parseInt(this.selectedMachine);
    const table = this.machineList.find((x) => x.id === this.selectedMachine);
    this.dataService.getChipsForCurrency(table.currencyId).subscribe((resp) => {
      this.chipList = resp;
      this.chipList.forEach((x) => {
        this.addChip(x.id, x.value, x.currency);
      });
    });
  }

  fetchData() {
    this.dataService.getChipTransfers(this.stardDayIn).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
    });
  }
}

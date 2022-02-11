import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { DataService } from "src/app/shared/services/data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-chip",
  templateUrl: "./chip.component.html",
  styleUrls: ["./chip.component.scss"],
})
export class ChipComponent implements OnInit {
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

  tlChips: any[] = [];
  euroChips: any[] = [];
  tlCurrentChips: any[] = [];
  euroCurrentChips: any[] = [];

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
      { label: "Chips", active: true },
    ];
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

  get chips() {
    return this.formData.controls["chips"] as FormArray;
  }

  initializeAddForm() {
    this.formData = this.formBuilder.group({
      chips: this.formBuilder.array([]),
    });

    this.tlChips.forEach((x) => {
      this.addChip(x.chipId, x.value, x.stringValue, x.amount, x.currency);
    });

    this.euroChips.forEach((x) => {
      this.addChip(x.chipId, x.value, x.stringValue, x.amount, x.currency);
    });
  }

  addChip(chipId, chipValue, stringValue, amount, chipCurrency) {
    const eventForm = this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      chipId: [chipId, [Validators.required]],
      value: [chipValue, [Validators.required]],
      stringValue: [stringValue, [Validators.required]],
      amount: [amount, [Validators.required]],
      currency: [chipCurrency, [Validators.required]],
    });
    this.chips.push(eventForm);
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      form.chips.forEach((x) => {
        x.amount = x.quantity * x.value;
      });
      console.log(form.chips);
      this.dataService.editKasaChips(form.chips).subscribe(
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

  // initializeEditForm(obj) {
  //   this.editForm = this.formBuilder.group({
  //     quantity: [obj?.quantity, [Validators.required, Validators.min(0)]],
  //     isOpen: [false],
  //   });
  // }

  // editCustomer() {
  //   if (this.editForm.valid) {
  //     const form = this.editForm.getRawValue();

  //     this.dataService.editKasaDrops(form, this.editedObj.id).subscribe(
  //       (resp) => {
  //         this.toastr.success("Drop edited successfully");
  //         this.modalService.dismissAll();
  //         this.fetchData();
  //       },
  //       (err) => {
  //         this.toastr.error("Something went wrong");
  //       }
  //     );
  //   } else {
  //     this.submitted = true;
  //   }
  // }

  fetchData() {
    this.dataService.getKasaChips().subscribe((resp) => {
      this.euroChips = [];
      this.tlChips = [];
      resp.forEach((x) => {
        if (x.currency === "EURO") {
          this.euroChips.push(x);
        }
        if (x.currency === "TL") {
          this.tlChips.push(x);
        }
      });
    });

    this.dataService.getCurrentKasaChips().subscribe((resp) => {
      this.tlCurrentChips = [];
      this.euroCurrentChips = [];
      resp.forEach((x) => {
        if (x.currency === "EURO") {
          this.euroCurrentChips.push(x);
        }
        if (x.currency === "TL") {
          this.tlCurrentChips.push(x);
        }
        this.isLoading = false;
      });
    });
  }
}

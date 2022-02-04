import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  formData: FormGroup;
  submitted = false;
  isLoading: boolean = false;

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
    this.initializeForm();
    this.fetchData();
  }

  fetchData() {
    this.dataService.getCustomers(this.searchQuery).subscribe((resp) => {
      this.tableData = resp;
      this.isLoading = false;
      console.log(this.tableData);
    });
  }

  get form() {
    return this.formData.controls;
  }

  initializeForm() {
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      grade: ["D", [Validators.required]],
      identity: [""],
      avarageBet: [0],
      birthday: [""],
      mobile: ["05"],
    });
  }

  openModal(content: any) {
    this.toastr.success('Have fun storming the castle!', 'Miracle Max Says')
    this.modalService.open(content);
  }

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      this.dataService.addCustomer(form).subscribe(
        (resp) => {
          this.initializeForm();
          this.fetchData();
        },
        (err) => {}
      );
    }
    this.submitted = true;
  }
}

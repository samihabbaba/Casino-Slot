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
  selector: "app-machine",
  templateUrl: "./machine.component.html",
  styleUrls: ["./machine.component.scss"],
})
export class MachineComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

  gamesList: any[] = [
    "BlackJack",
    "Roulette",
    "Poker",
    "Texas",
    "Tournament",
    "Card Game",
  ];

  submitted = false;
  isLoading: boolean = false;
  passwordsNotMatch: boolean = false;

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
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.initializeAddForm();
    this.fetchData();
  }

  fetchData() {
    this.dataService.getMachines().subscribe((resp) => {
      this.tableData = resp;
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


  initializeAddForm() {
    this.formData = this.formBuilder.group({
      game: [this.gamesList[0], [Validators.required]],
      currencyId: ['', [Validators.required]],
      number: [0],
      minAmount: [0],
      maxAmount: [0],
      isActive: [true],
    });
  }

  initializeEditForm(obj) {
    console.log(obj);
    this.editForm = this.formBuilder.group({
      game: [obj.game],
      currencyId: [obj?.currencyId, [Validators.required]],
      number: [obj?.number, [Validators.required]],
      minAmount: [obj?.minAmount, [Validators.required]],
      maxAmount: [obj?.maxAmount, [Validators.required]],
      isActive: [obj?.isActive],
      code: [obj.code],
      isDeleted: [false],
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
      this.dataService.editMachine(form, this.editedId).subscribe(
        (resp) => {
          this.toastr.success("Machine edited successfully");
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

  saveCustomer() {
    if (this.formData.valid) {
      const form = this.formData.getRawValue();
      this.dataService.addMachine(form).subscribe(
        (resp) => {
          this.toastr.success("Machine added successfully");
          this.modalService.dismissAll();
          this.initializeAddForm();
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
      text: "You want to delete this machine?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteMachine(obj.id).subscribe(
          (resp) => {
            this.toastr.success("Machine deleted successfully");
            this.fetchData();
          },
          (err) => {
            obj.isBaned = false;
            this.toastr.error("Something went wrong");
          }
        );
      }
    });
  }
}

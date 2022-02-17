import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../../shared/services/data.service";

@Component({
  selector: 'app-close-day',
  templateUrl: './close-day.component.html',
  styleUrls: ['./close-day.component.scss']
})
export class CloseDayComponent implements OnInit {
  breadCrumbItems: any;
  formData: FormGroup;
  editForm: FormGroup;
  editedId: string = "";

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 50;

  stardDayIn: any = 0;

  daysList: any[] = [];


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.breadCrumbItems = [
      { label: "Live Data" },
      { label: "Close Day", active: true },
    ];
    this.getDays();
    this.fetchData();
  }

  getDays() {
    this.dataService.getDays().subscribe((resp) => {
      this.daysList = resp;
    });
  }

  fetchData() {
    this.dataService
      .getTableCloseDays(this.stardDayIn)
      .subscribe((resp) => {
        this.tableData = resp;
        this.isLoading = false;
        console.log(this.tableData);
      });
  }



}

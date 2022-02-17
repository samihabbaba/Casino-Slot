import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-live-data",
  templateUrl: "./live-data.component.html",
  styleUrls: ["./live-data.component.scss"],
})
export class LiveDataComponent implements OnInit {
  formData: FormGroup;
  editForm: FormGroup;
  editedId: any = 0;
  editedSession: any;
  copyOfEditedSession: any = { chip5: 0, chip25: 0 };

  submitted = false;
  isLoading: boolean = false;

  tableData: any[] = [];
  sessionData: any[] = [];

  // Pagination
  currentpage: number = 1;
  pageSize: number = 50;

  stardDayIn: any = 0;

  breadCrumbItems: any;
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
      { label: "Sessions", active: true },
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
    this.dataService.getSessionsById(this.stardDayIn).subscribe((resp) => {
      this.tableData = resp;
      this.sessionData = [];
      this.editedSession = undefined;
      this.copyOfEditedSession = { chip5: 0, chip25: 0 };
      this.isLoading = false;
      console.log(this.tableData);
    });
  }

  getSessionData(session) {
    this.editedId = session.id;
    this.dataService.getSessionsBySessionId(session.id).subscribe((resp) => {
      this.sessionData = resp;
    });
  }

  selectSession(session) {
    this.editedSession = session;
    this.copyOfEditedSession = session;
  }

  addSessionData() {
    if (
      this.copyOfEditedSession.chip5 < 0 ||
      this.copyOfEditedSession.chip25 < 0
    ) {
      this.toastr.error("Chip values can't be negative");
      return;
    }
    let form = [
      {
        tableId: this.copyOfEditedSession.tableId,
        sessionId: this.copyOfEditedSession.sessionId,
        chipId: this.copyOfEditedSession.chip5Id,
        quantity: this.copyOfEditedSession.chip5,
      },
      {
        tableId: this.copyOfEditedSession.tableId,
        sessionId: this.copyOfEditedSession.sessionId,
        chipId: this.copyOfEditedSession.chip25Id,
        quantity: this.copyOfEditedSession.chip25,
      },
    ];
    this.dataService.addSessionData(form).subscribe(
      (resp) => {
        this.toastr.success("Successful");
      },
      () => {
        this.toastr.error("Something went wrong");
      }
    );
  }
}

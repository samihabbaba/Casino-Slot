import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor(private loaderService: LoaderService) {

    // this.loaderService.isLoading.subscribe((v) => {
    //   setTimeout(() => {
    //     this.loading = v;
    //   }, 1500);
    // });
  }
  ngOnInit(): void {
  }

}

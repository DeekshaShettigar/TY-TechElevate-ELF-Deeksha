import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowimageService } from '../showimage.service';
import { Router } from '@angular/router';
import { BillableEmployeesService } from '../billable-employees.service';
import { ClientsDetailsService } from '../clients-details.service';
import { ClientsdataComponent } from '../clientsdata/clientsdata.component';

@Component({
  selector: 'app-clients-logo',
  templateUrl: './clients-logo.component.html',
  styleUrls: ['./clients-logo.component.css']
})
export class ClientsLogoComponent implements OnInit {

  constructor(private showimageservice: ShowimageService, private clientsService: ClientsDetailsService, private router: Router) { this.getBillableToClient() }
  images: any;
  billableClientsCount: any = [];

  //  @ViewChild(ClientsdataComponent,{static:false}) clientsDataComponent:ClientsdataComponent;

  ngOnInit() {
    this.showimageservice.showImage()
      // tslint:disable-next-line: variable-name
      .subscribe((result_imagename) => {
        this.images = result_imagename.imagename;
        console.log(this.images);
      },
        (err) => {
          console.log(err);
        });
  }

  getBillableToClient() {
    this.clientsService.getBillableToClientCount().subscribe(billableCount => {
      console.log(billableCount);
      this.billableClientsCount = billableCount;
    }, err => {
      console.log(err);
    }, () => {
      console.log("Billable Count ")
    })
  }

  sendClientId(clientId) {
    this.clientsService.getBillableToClientData(clientId);
  }

  sendClientName(clientName, clientId) {
    console.log(clientName, clientId);
    this.clientsService.getBillableClientName(clientName, clientId);
    // this.clientsService.getBillableBasedOnExperience(clientName);
  }

}



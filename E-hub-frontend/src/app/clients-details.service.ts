import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientsDetailsService {
  clientsDetails: any;
  backendUrl = 'http://localhost:4000';
  billableClients: any;

  billableStackDetails: any = [];
  billableExperienceDetails: any = [];
  constructor(private http: HttpClient, private router: Router) {
    this.getBillableToClientCount();
    this.getBillableToClientData('clientId');
    // this.getBillableClientName('clientName', 'clientId');

  }

  postClientDetails(details, imagename): Observable<any> {
    const obj = {
      details,
      imagename
    };
    return this.http.post(`${this.backendUrl}/postClientDetails`, obj);
  }



  getClientsDetails() {
    return this.http.get(`${this.backendUrl}/getClientDetails`);
  }

  updateClientDetails(clientsDetails): Observable<any> {

    return this.http.post(`${this.backendUrl}/updateClientDetails`, clientsDetails);
  }

  deleteClientdetails(id) {
    return this.http.delete(`${this.backendUrl}/deleteClientDetails/${id}`);

  }
  getBillableToClientCount() {
    return this.http.get(`${this.backendUrl}/getBillEmployeesBasedOnClient`);
  }

  getBillableToClientData(clientId) {
    return this.http.get(`${this.backendUrl}/getBillableToClientData/${clientId}`).subscribe(billableData => {
      console.log(billableData);
      this.billableClients = billableData;
    }, err => {
      console.log(err)
    }, () => {
      console.log("Billable data got");
    })
  }

  getBillableClientName(clientName, clientId) {
    console.log(clientName);
    return this.http.get(`${this.backendUrl}/getBillableDeployToClient/${clientName}`).subscribe(billableStackDetails => {
      this.billableStackDetails = billableStackDetails;
      return this.http.get(`${this.backendUrl}/getBillableEmpExperience/${clientId}`).subscribe(billableExperienceDetails => {
        this.billableExperienceDetails = billableExperienceDetails;
        this.router.navigateByUrl('/clientsdata');
      }, err => {
        console.log(err);
      }, () => {
        console.log("Stack and Experience details got");
      });
    })
  }

  getClientsToBillableExpDetails() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeeExp`);
  }


}

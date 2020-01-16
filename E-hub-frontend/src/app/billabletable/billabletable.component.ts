import { Component, OnInit } from '@angular/core';
import { ClientsDetailsService } from '../clients-details.service';

@Component({
  selector: 'app-billabletable',
  templateUrl: './billabletable.component.html',
  styleUrls: ['./billabletable.component.css']
})
export class BillabletableComponent implements OnInit {

  constructor(private clientsService:ClientsDetailsService) {}
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-address',
  templateUrl: './confirm-address.component.html',
  styleUrls: ['./confirm-address.component.scss']
})
export class ConfirmAddressComponent implements OnInit {
  editFlag=false;
  constructor() { }

  ngOnInit(): void {
  }

}

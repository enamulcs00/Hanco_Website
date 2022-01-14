import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fireworks-night',
  templateUrl: './fireworks-night.component.html',
  styleUrls: ['./fireworks-night.component.scss']
})
export class FireworksNightComponent implements OnInit {

  data : any;
  type: any;
  constructor() { }

  ngOnInit(): void {
    this.type = this.data.type;
    this.data = this.data.data;
  }

}

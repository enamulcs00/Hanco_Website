import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  userTypeValue:any="1";
  constructor(private dialog: MatDialog,private commonData:ModalService) { }
  
  ngOnInit(): void {
    console.log('profile');
  }

  openCongrats(){
    this.dialog.closeAll();
    this.commonData.congrats();
  }
 
  updateUser(e){
  this.userTypeValue=e.target.value;
  }

}

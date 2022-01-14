import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main/main.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports:[]
})
export class MainModule { }

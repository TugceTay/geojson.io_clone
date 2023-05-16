import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GeojsonviewerComponent } from './geojsonviewer/geojsonviewer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopupComponent } from './popup/popup.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    MapComponent,
    GeojsonviewerComponent,
    NavbarComponent,
    PopupComponent,
   
  
  ],
  imports: [
    CommonModule,
    FormsModule 
  ],
  exports:[
    MapComponent,
    GeojsonviewerComponent,
    NavbarComponent,
    PopupComponent
   
  ]
})
export class ComponentsModule { }

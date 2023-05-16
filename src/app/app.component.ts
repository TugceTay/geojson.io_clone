import { Component, ViewChild } from '@angular/core';
import { GeojsonviewerComponent } from './components/geojsonviewer/geojsonviewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('geojsonviewer') geojsonviewer!: GeojsonviewerComponent;

  updateGeoJSONData(geoJSONData: any): void {
    this.geojsonviewer.geojsonData = geoJSONData;
  }
}

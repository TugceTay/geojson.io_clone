import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-geojsonviewer',
  templateUrl: './geojsonviewer.component.html',
  styleUrls: ['./geojsonviewer.component.css']
})
export class GeojsonviewerComponent {
  @Input() geojsonData: any;
}

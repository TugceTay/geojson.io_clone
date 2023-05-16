import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  Renderer2,   
  ElementRef
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { PopupComponent } from '../popup/popup.component';
import { LayerProperties } from '../popup/popup.component';

interface ExtendedLayer extends L.Layer {
  feature?: {
    properties: any;
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private drawnItems!: L.FeatureGroup;

  @Output() geoJSONData = new EventEmitter<any>();
  @ViewChild('popupContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.initDrawControl();

    this.map.on('draw:created', (e: any) => {
      const layer = e.layer as ExtendedLayer;
      layer.feature = { properties: {} }; // Initialize the feature properties object
      this.drawnItems.addLayer(layer);
    
      layer.on('click', (e: L.LeafletMouseEvent) => {
        this.handleMapClick(e, layer);
      });
    
      this.geoJSONData.emit(this.drawnItems.toGeoJSON());
    });
    
  }

  private handleMapClick(e: any, clickedLayer: ExtendedLayer): void {
    if (clickedLayer && clickedLayer.feature) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        const componentRef = factory.create(this.container.injector);
        componentRef.instance.layer = clickedLayer;

        componentRef.instance.onSave.subscribe((properties: LayerProperties) => {
            clickedLayer.feature!.properties[properties.key] = properties.value;
            this.geoJSONData.emit(this.drawnItems.toGeoJSON());
        });
      
      
      componentRef.instance.onDelete.subscribe(() => {
        this.drawnItems.removeLayer(clickedLayer);
        this.geoJSONData.emit(this.drawnItems.toGeoJSON());
        this.map.closePopup();
      });

      const div = this.renderer.createElement('div');
      this.renderer.appendChild(div, componentRef.location.nativeElement);

      clickedLayer.bindPopup(div).openPopup();

      this.map.on('popupclose', () => {
        componentRef.destroy();
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.262218, 34.801472],
      zoom: 13,
      zoomControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    this.drawnItems = L.featureGroup().addTo(this.map);
  }

  private initDrawControl(): void {
    const drawControl = new L.Control.Draw({
      position: 'topright',
      edit: {
        featureGroup: this.drawnItems,
      },
    }).addTo(this.map);
  }}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { NgZone } from '@angular/core';

export interface LayerProperties {
  key: string;
  value: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() layer!: L.Layer;
  @Output() onSave = new EventEmitter<LayerProperties>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  properties: LayerProperties = { key: '', value: '' };

  logSubmit(): void {
    console.log('Form submitted');
  }
  
  constructor(private zone: NgZone) {}

  save(): void {
    console.log('Input Key:', this.properties.key);
    console.log('Input Value:', this.properties.value);
    console.log('Saving properties: ', this.properties);
    this.onSave.emit(this.properties);
    this.properties = { key: '', value: '' }; // Reset the form
  }

  cancel(): void {
    this.onCancel.emit();
    this.properties = { key: '', value: '' }; // Reset the form
  }

  delete(): void {
    this.onDelete.emit();
  }
}

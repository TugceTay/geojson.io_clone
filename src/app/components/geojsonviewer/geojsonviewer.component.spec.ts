import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeojsonviewerComponent } from './geojsonviewer.component';

describe('GeojsonviewerComponent', () => {
  let component: GeojsonviewerComponent;
  let fixture: ComponentFixture<GeojsonviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeojsonviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeojsonviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

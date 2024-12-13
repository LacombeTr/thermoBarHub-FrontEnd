import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualiserComponent } from './data-visualiser.component';

describe('DataVisualiserComponent', () => {
  let component: DataVisualiserComponent;
  let fixture: ComponentFixture<DataVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidFormComponent } from './solid-form.component';

describe('SolidFormComponent', () => {
  let component: SolidFormComponent;
  let fixture: ComponentFixture<SolidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolidFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitComposComponent } from './submit-compos.component';

describe('SubmitComposComponent', () => {
  let component: SubmitComposComponent;
  let fixture: ComponentFixture<SubmitComposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitComposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitComposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintRegisterComponent } from './complaint-register.component';

describe('ComplaintRegisterComponent', () => {
  let component: ComplaintRegisterComponent;
  let fixture: ComponentFixture<ComplaintRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

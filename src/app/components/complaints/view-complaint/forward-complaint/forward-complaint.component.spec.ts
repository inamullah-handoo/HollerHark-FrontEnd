import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardComplaintComponent } from './forward-complaint.component';

describe('ForwardComplaintComponent', () => {
  let component: ForwardComplaintComponent;
  let fixture: ComponentFixture<ForwardComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

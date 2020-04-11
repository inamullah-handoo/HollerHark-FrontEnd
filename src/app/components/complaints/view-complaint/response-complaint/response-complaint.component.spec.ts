import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComplaintComponent } from './response-complaint.component';

describe('ResponseComplaintComponent', () => {
  let component: ResponseComplaintComponent;
  let fixture: ComponentFixture<ResponseComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

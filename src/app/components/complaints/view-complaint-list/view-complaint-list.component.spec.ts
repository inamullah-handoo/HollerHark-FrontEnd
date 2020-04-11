import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplaintListComponent } from './view-complaint-list.component';

describe('ViewComplaintListComponent', () => {
  let component: ViewComplaintListComponent;
  let fixture: ComponentFixture<ViewComplaintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComplaintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

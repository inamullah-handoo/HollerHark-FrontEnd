import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComplaintComponent } from './modify-complaint.component';

describe('ModifyComplaintComponent', () => {
  let component: ModifyComplaintComponent;
  let fixture: ComponentFixture<ModifyComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

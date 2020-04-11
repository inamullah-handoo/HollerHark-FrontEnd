import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintLogComponent } from './complaint-log.component';

describe('ComplaintLogComponent', () => {
  let component: ComplaintLogComponent;
  let fixture: ComponentFixture<ComplaintLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

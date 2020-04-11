import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByDashboardComponent } from './by-dashboard.component';

describe('ByDashboardComponent', () => {
  let component: ByDashboardComponent;
  let fixture: ComponentFixture<ByDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

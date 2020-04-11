import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanRegisterComponent } from './dean-register.component';

describe('DeanRegisterComponent', () => {
  let component: DeanRegisterComponent;
  let fixture: ComponentFixture<DeanRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeanRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

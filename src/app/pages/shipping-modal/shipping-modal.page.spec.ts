import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingModalPage } from './shipping-modal.page';

describe('ShippingModalPage', () => {
  let component: ShippingModalPage;
  let fixture: ComponentFixture<ShippingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

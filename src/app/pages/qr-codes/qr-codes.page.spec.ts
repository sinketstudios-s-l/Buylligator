import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodesPage } from './qr-codes.page';

describe('QrCodesPage', () => {
  let component: QrCodesPage;
  let fixture: ComponentFixture<QrCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

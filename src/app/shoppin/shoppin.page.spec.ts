import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppinPage } from './shoppin.page';

describe('ShoppinPage', () => {
  let component: ShoppinPage;
  let fixture: ComponentFixture<ShoppinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

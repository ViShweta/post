import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewpostPage } from './viewpost.page';

describe('ViewpostPage', () => {
  let component: ViewpostPage;
  let fixture: ComponentFixture<ViewpostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoClaraComponent } from './logo-clara.component';

describe('LogoClaraComponent', () => {
  let component: LogoClaraComponent;
  let fixture: ComponentFixture<LogoClaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoClaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoClaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

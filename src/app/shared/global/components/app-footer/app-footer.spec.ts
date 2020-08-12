import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFooterComponent } from './app-footer.component';

describe('AppFooter', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});

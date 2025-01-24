import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusnavComponent } from './aboutusnav.component';

describe('AboutusnavComponent', () => {
  let component: AboutusnavComponent;
  let fixture: ComponentFixture<AboutusnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPostComponent } from './footer-post.component';

describe('FooterPostComponent', () => {
  let component: FooterPostComponent;
  let fixture: ComponentFixture<FooterPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterPostComponent]
    });
    fixture = TestBed.createComponent(FooterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

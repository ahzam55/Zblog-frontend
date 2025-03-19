import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogregComponent } from './blogreg.component';

describe('BlogregComponent', () => {
  let component: BlogregComponent;
  let fixture: ComponentFixture<BlogregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogregComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

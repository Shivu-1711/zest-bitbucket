import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogcontrolComponent } from './blogcontrol.component';

describe('BlogcontrolComponent', () => {
  let component: BlogcontrolComponent;
  let fixture: ComponentFixture<BlogcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

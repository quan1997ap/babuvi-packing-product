import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationDetailComponent } from './collaboration-detail.component';

describe('CollaborationDetailComponent', () => {
  let component: CollaborationDetailComponent;
  let fixture: ComponentFixture<CollaborationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

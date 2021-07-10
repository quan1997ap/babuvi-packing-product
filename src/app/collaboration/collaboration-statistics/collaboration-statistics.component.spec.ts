import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationStatisticsComponent } from './collaboration-statistics.component';

describe('CollaborationStatisticsComponent', () => {
  let component: CollaborationStatisticsComponent;
  let fixture: ComponentFixture<CollaborationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

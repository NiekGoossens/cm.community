import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { Workshop } from '../../../../workshop';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkshopService } from '../../../services/workshop/workshopService';
import { of } from 'rxjs';
import { User } from '../../../../user';
import { UserService } from '../../../services/user/userService';

describe('WorkshopDetailComponent', () => {
  let component: WorkshopDetailComponent;
  let fixture: ComponentFixture<WorkshopDetailComponent>;

  const workshopStub = {
    get() {
        const params = new ActivatedRouteStub().paramMap;
        const workshopId = 1;
        const subjectId = 1;
        const workshop = <Workshop>{
            id: 1,
            name: 'test',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: [],
            description: '',
            subjectId: 1,
            image: '',
            topics: [],
            owner: 1
        };
        const user = <User>{
            id: 1,
            firstName: 'test',
            lastName: 'test',
            email: 'test',
            password: 'test',
            role: 'student',
            amountOfPayedWorkshops: 0,
            followedWorkshops: []
        };
      return of(  params, workshopId, subjectId, workshop, user );
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [WorkshopDetailComponent],
        imports: [RouterTestingModule],
        providers: [
            { provide: ActivatedRoute, useValue: { snapshot: { paramMap:  { get: () => 1 } } } },
            { provide: WorkshopService
                // , useValue: { getWorkshop: () => of({}) }
             },
            { provide: UserService },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            { provide: Router, useValue: workshopStub}
            
        ]
    })
        .compileComponents();
    fixture = TestBed.createComponent(WorkshopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

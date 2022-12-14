import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkshopEditComponent } from './workshop-edit.component';
import { Workshop } from '../../../../workshop';
import { WorkshopService } from '../../../services/workshop/workshopService';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { of } from 'rxjs';
import * as exp from 'constants';
import { User } from '../../../../user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../services/user/userService';

describe('WorkshopEditComponent', () => {
    let component: WorkshopEditComponent;
    let fixture: ComponentFixture<WorkshopEditComponent>;
    const testForm = <NgForm>{
        value: {
            id: -1,
            name: 'test',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: [],
            description: '',
            subjectId: 1,
            image: '',
            topics: [],
            owner: 1
        }
    };

    const workshopStub = {
        get() {
            const params = new ActivatedRouteStub().paramMap;
            const workshopId = -1;
            const subjectId = 1;
            const workshop = <Workshop>{
                id: -1,
                name: 'test',
                uploadDate: new Date(),
                isFree: false,
                requiredTools: ["test", "test"],
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
          return of(  params, workshopId, subjectId, workshop, user, testForm );
        }
      };

    // let router: Router;

    // let  route = new ActivatedRouteStub().setParamMap({ id: 1 });
 



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkshopEditComponent],
            imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
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
            

        fixture = TestBed.createComponent(WorkshopEditComponent);


        component = fixture.componentInstance;
        fixture.detectChanges();

    });



        // await TestBed.configureTestingModule({
        //     declarations: [WorkshopEditComponent
        //     ],
        //     imports: [RouterTestingModule],
        //     providers: [WorkshopService,{
        //         provide: ActivatedRoute,
        //         useValue: {
        //             snapshot: {
        //                 paramMap: {
        //                     get: () => {
        //                         return 1;
        //                     }
        //                 }
        //             }
        //         }
        //     }, ],
      
      
    

        // router = TestBed.get(Router);
        // route = TestBed.get(ActivatedRoute);
        // formBuilder = TestBed.get(FormBuilder);
        // ngForm = TestBed.get(NgForm);




    it('should create', () => {
        expect(component).toBeTruthy();
        // expect(component).toBeTruthy();
        // component.save();

    });

    it('should submit', () => {
        component.onSubmit(testForm);
        expect(component.workshop).toEqual(testForm.value);
        });

        it('should remove tool ', () => {
            const length = component.workshop.requiredTools.length;
            component.removeTool(1);
            expect(component.workshop.requiredTools.length).toEqual(length - 1 );
        });

        it('should add tool ', () => {
            const length = component.workshop.requiredTools.length;
            component.addTool();

            expect(component.workshop.requiredTools.length).toEqual(length + 1);
        });

        it('should delete workshop ', () => {
            component.delete(-2);
            expect(component.workshop.id).toBe(-2);
        });



});

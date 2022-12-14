import { TestBed } from '@angular/core/testing';

import { WorkshopService } from './workshopService';

describe('WorkshopService', () => {
  let service: WorkshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('should return a list of workshops', () => {
    expect(service.getWorkshops()).toHaveProperty('length');
  }
  );

  it('should return a workshop by id', () => {
    expect(service.getWorkshopById(1)).toHaveProperty(
      'id',
      1
    );
  }
  );

  it('should return the highest id', () => {
    expect(service.getHighestId()).toBeTruthy();
  }
  );

  it('should add a workshop', () => {
    const length = service.getWorkshops().length;
    const workshop = {
      id: 0,
      name: 'test',
      uploadDate: new Date(),
      isFree: false,
      requiredTools: [],
      description: '',
      subjectId: 0,
      image: '',
      owner: 0,
      topics: []
    };
    service.AddWorkshop(workshop);
    expect(service.getWorkshops().length).toBe(length + 1);
  }
  );

  it('should update a workshop', () => {
    const workshop = {
      id: 1,
      name: 'test',
      uploadDate: new Date(),
      isFree: false,
      requiredTools: [],
      description: '',
      subjectId: 0,
      image: '',
      owner: 0,
      topics: []
    };
    service.updateWorkshop(workshop);
    expect(service.getWorkshopById(1)).toHaveProperty(
      'name',
      'test'
    );
  }
  );

  it('should delete a workshop', () => {
    const length = service.getWorkshops().length;
    service.deleteWorkshop(1);
    expect(service.getWorkshops().length).toBe(length - 1);
  }
  );

  it('should return a list of workshops by subject id', () => {
    expect(service.getWorkshopsBySubjectId(1)).toHaveProperty('length');
  }
  );

  it('should return a list of topics by workshopId', () => {
    expect(service.getTopicsByWorkshopId(1)).toHaveProperty('length');
  });

  it('add topic to workshop', () => {
    const length = service.getTopicsByWorkshopId(1).length;
    service.addTopicToWorkshop(1, 1);
    expect(service.getTopicsByWorkshopId(1).length).toBe(length + 1);
  });

  it('remove topic from workshop', () => {
    const length = service.getTopicsByWorkshopId(1).length;
    service.removeTopicFromWorkshop(1, 1);
    expect(service.getTopicsByWorkshopId(1).length).toBe(length - 1);
  }
  );

});

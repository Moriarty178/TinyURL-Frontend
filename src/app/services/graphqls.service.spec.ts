import { TestBed } from '@angular/core/testing';

import { GraphqlsService } from './graphqls.service';

describe('GraphqlsService', () => {
  let service: GraphqlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

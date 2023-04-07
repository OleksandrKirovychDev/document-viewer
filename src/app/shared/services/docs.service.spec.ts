import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocsService } from './docs.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const httpClientSpyObj: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
  'HttpClient',
  ['get', 'post', 'delete', 'patch']
);

describe('DocsService', () => {
  let service: DocsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpyObj }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DocsService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: loadDocuments', () => {
    it('should make a get request', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of([]));
      service.loadDocuments().subscribe({
        next: (res) => {
          expect(res).toEqual([]);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('Method: getDocumentById', () => {
    it('should filter values', () => {
      spyOn(service['_docs$'].value, 'find').and.callThrough();
      service.getDocumentById(1);
      expect(service['_docs$'].value.find).toHaveBeenCalled();
    });
  });
});

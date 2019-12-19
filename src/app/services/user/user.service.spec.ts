// import { TestBed } from '@angular/core/testing';

// import { UserService } from './user.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { OAuthModule } from 'angular-oauth2-oidc';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpErrorResponse } from '@angular/common/http/src/response';

// describe('UserService', () => {
//   let service: UserService;
//   let backend: HttpTestingController;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, OAuthModule.forRoot(), RouterTestingModule],
//     });
//     service = TestBed.get(UserService);
//     backend = TestBed.get(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should get user details', () => {
//     const mockResponse: any = {
//       UId: '4229577c-4d24-3ca0-78c1-38c48a6d31c1',
//       Id: '25',
//       ReferenceId: '2c0a00bd-07ee-4ed6-a37b-7a53c2ca4403',
//       IsAuthorized: true,
//       RowVersion: 'AAAAAAAAB/Q=',
//       DisplayName: 'Michael Johanson',
//     };

//     service.getUserDetails().subscribe(data => {
//       expect(data).toEqual(mockResponse);
//     });

//     backend
//       .expectOne(request => {
//         return request.url.match(/ums/) && request.method === 'GET';
//       })
//       .flush(mockResponse);

//     backend.verify();
//   });

//   it('on failure', () => {
//     const emsg = 'simulated network error';
//     const mockError = new ErrorEvent('Network error', {
//       message: emsg,
//     });

//     service.getUserDetails().subscribe(
//       data => fail('should have failed with the network error'),
//       (errorResponse: HttpErrorResponse) => {
//         expect(errorResponse.error.message).toEqual(emsg, 'message');
//       },
//     );

//     backend
//       .expectOne(request => {
//         return request.url.match(/ums/) && request.method === 'GET';
//       })
//       .error(mockError);
//   });
// });

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Photo } from '../models/photo';
import { PaginatedResult } from '../models/pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {

    //create new PaginatedResult<User[]> instance to store the pagination header from server
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    //create new HttpParams() for the get function 
    let params = new HttpParams();

    //check if there is params , if does intialize them
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    //return paginatedResult using params
    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        //using the map operator to convert the response header from JSON to TS object
        map(response => {

          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );



  }


  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }


  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain", {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id)
  }


}

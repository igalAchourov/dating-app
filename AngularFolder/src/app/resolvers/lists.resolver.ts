import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../Core/user.service';
import { AlertifyService } from '../Core/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class ListsResolver implements Resolve<User[]>{

    pageNumber = 1;
    pageSize = 5;
    likeParams='Likers';

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {

    }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber,this.pageSize,null,this.likeParams).pipe(catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return of(null);

        }))
    }


}
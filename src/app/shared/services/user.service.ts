import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {map} from 'rxjs/internal/operators';

interface CreateResponse {
  name:  String
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    static url ='https://ungers-demo-auth.firebaseio.com/users';

    constructor(private http: HttpClient) {
    }

    getUserByLogin(login: string): Observable<User> {

        return this.http.get<User>(`${UserService.url}.json`)
            .pipe(map((users) => {
              if(!users) {
                return null
              } else {
                let key = Object.keys(users).filter(key => users[key]['login'] === login)[0];
                return key ? users[key]  : undefined
              }
            }));
    }

    createNewUser(user: User): Observable<any> {
        return this.http.post<User>(`${UserService.url}.json`, user);
    }
}

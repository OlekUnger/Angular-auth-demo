import {Injectable} from '@angular/core';
import {User} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    login(user: any) {
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        window.localStorage.clear();
    }

}

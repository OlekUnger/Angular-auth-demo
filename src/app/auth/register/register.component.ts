import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/interfaces';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    sub: Subscription;

    constructor(private userService: UserService, private router: Router, private title: Title) {
        title.setTitle('Регистрация');
    }

    ngOnInit() {
        this.form = new FormGroup({
            'login': new FormControl(null, [Validators.required], this.loginExists.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(3)]),
            'organization': new FormControl(null, [])
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit() {
        this.sub = this.userService.createNewUser(this.form.value)
            .subscribe((user: User) => {
                this.router.navigate(['/login']);
            });
    }

    loginExists(control: FormControl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getUserByLogin(control.value)
                .subscribe((user: User) => {
                    if (user) {
                        resolve({loginExists: true});
                    } else {
                        resolve(null);
                    }
                });
        });
    }

}

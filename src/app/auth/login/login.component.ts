import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {Message, User} from '../../shared/interfaces';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    message: Message;
    sub: Subscription;

    constructor(private userService: UserService,
                private authService: AuthService, private router: Router, private title: Title) {
        title.setTitle('Вход');
    }
    private showMessage(type: string, text: string) {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 2000);
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'login': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit() {
        const formData = this.form.value;
        this.sub = this.userService.getUserByLogin(formData.login)
            .subscribe((user: User) => {
              console.log(user)

                if (user) {
                    if (user.password === formData.password) {
                        this.authService.login(user);
                        this.router.navigate(['/home']);
                    } else {
                        this.showMessage('danger', 'Неправильный пароль');
                    }
                } else {
                    this.showMessage('danger', 'Такого пользователя не существует');
                }
            });
    }


}

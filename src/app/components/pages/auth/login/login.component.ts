import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  response: String = ''
  form: FormGroup
  isLoad: Boolean = false


  constructor(private router: Router, private api: ApiService) {
    this.validateSession()
    this.form = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }


  ngOnInit(): void { }

  validateSession() {
    if (sessionStorage.getItem('ud') && sessionStorage.getItem('ud') != '') {
      this.router.navigate(['/'])
    }
  }

  onLogin() {
    this.isLoad = true
    this.response = ''

    if (!this.form.invalid) {
        let data = {
          email: this.email.value,
          password: this.password.value,
          service: 'auth/login',
          type: 'post'
        }
        this.api.api(data).subscribe((result: any) => {
          this.isLoad = false
          if (result) {    
            sessionStorage.setItem('ud', JSON.stringify(result))        
            this.router.navigate(['/']);
          }
        },
        error => {
          this.isLoad = false
          this.api.c('Error', error)     
          if (error.status == 401){
            this.response = 'Revise sus datos'
          }
        });

    }
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }


}

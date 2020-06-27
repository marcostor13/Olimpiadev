import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoad: Boolean = false
  user: any; 


  constructor(private router: Router, private api: ApiService) {
    this.validateSession()
   }

  ngOnInit(): void {
  }

  validateSession() {
    if (!sessionStorage.getItem('ud') || sessionStorage.getItem('ud') == '') {
      this.router.navigate(['/login'])
    }else{
      this.user = JSON.parse(sessionStorage.getItem('ud'))
      this.api.c('validateSession', this.user.token.original.access_token)
      this.api.c('validateSession', this.user.user.original.name)
    }
  }

  onLogin() {
    this.isLoad = true
    let data = {      
      service: 'auth/login',
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.isLoad = false
      this.api.c('onLogin', result)
    },
    error => {
      this.isLoad = false
      this.api.c('Error', error)
      if (error.status == 401) {
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login']);
      }
    });

    
  }

}

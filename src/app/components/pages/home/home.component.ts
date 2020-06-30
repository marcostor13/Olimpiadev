import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoad: Boolean = false
  user: any; 


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
   }

  ngOnInit(): void {
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

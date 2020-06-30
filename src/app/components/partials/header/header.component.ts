import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHeader: Boolean = false

  @Input() user: any;

  constructor(private router: Router, private api: ApiService, private general: GeneralService) { 
    this.user = this.general.validateSession()    
  }

  ngOnInit(): void {
  }

  toogleMenu(){
    this.menuHeader = this.menuHeader ? false: true
  }

  salir(){
 
      let data = {
        token: this.user.token.original.access_token,       
        service: 'auth/logout',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {        
        if (result) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        }
      },
        error => {      
          this.api.c('Error', error)
          if (error.status == 401) {
            sessionStorage.setItem('ud', '')
            this.router.navigate(['/login']);
          }
        });

    
  }

}

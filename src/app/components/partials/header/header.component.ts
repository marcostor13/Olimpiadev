import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHeader: Boolean = false

  @Input() user: any;

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  toogleMenu(){
    this.menuHeader = this.menuHeader ? false: true
  }

}

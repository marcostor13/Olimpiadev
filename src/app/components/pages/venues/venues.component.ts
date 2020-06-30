import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  venues:any = []

  //Events to child modal

  eventsSubject: any = new Subject();


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
   }

  ngOnInit(): void {
    this.getVenues()
  }

  onAddClick(){
    
    this.dataModal = {
      title: 'Agregar Sedes', 
      type: 'venues',     
    }

    this.isVisibleModal = true

  }

  onEditClick(id) {

    this.getVenueById(id)   

  }

  dataOutputChild(data:any){
    if(data.event == 'closeModal'){
      this.isVisibleModal = false
    } else if (data.event == 'add-venue' || data.event == 'edit-venue'){
      this.addEditVenues(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getVenues(){
    let data = {     
      token: this.user.token.original.access_token,
      service: 'services/get-venues',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getVenues', result)
      if (result.status === true) {        
        //OK
        this.venues = result.data
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    },
    error => {
      this.api.c('Error getVenues', error)
      if (error.status == 401) {
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    });
  }

  addEditVenues(d){

    if (d.name == '' || d.year == '' || d.cost == ''){
      this.eventsSubject.next('Debe ingresar todos los datos')
    }else{
      let data = {
        name: d.name,
        year: d.year,
        cost: d.cost,
        venueid: d.venueid || null,
        token: this.user.token.original.access_token,
        service: d.event == 'edit-venue' ? 'services/edit-venue' : 'services/add-venue',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {     
        this.api.c('addVenues', result)
        if (result.status === true){
          //OK
          this.eventsSubject.next(result.message)
          this.getVenues()
        } else if (result.status === false){
          this.eventsSubject.next(result.message)
        } else if (result.status == 301){
          this.api.c('Error', result.message)
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        } 
      },
      error => {      
        this.api.c('Error addVenues', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
    }
    
  }

  getVenueById(id){
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-venue-by-id',
      venueid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {   
      this.api.c('getVenueById', result)   
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Sedes',
          type: 'venues',
          data: result.data
        }
        this.isVisibleModal = true
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    },
      error => {        
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }



  


}

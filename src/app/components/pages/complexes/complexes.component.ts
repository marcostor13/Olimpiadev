import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-complexes',
  templateUrl: './complexes.component.html',
  styleUrls: ['./complexes.component.scss']
})
export class ComplexesComponent implements OnInit {

  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  complexes: any = []

  //Events to child modal
  eventsSubject: any = new Subject();

  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
  }

  ngOnInit(): void {
    this.getAll()
  }

  onAddClick() {

    this.dataModal = {
      title: 'Agregar Complejo',
      type: 'complexes',
    }
    this.isVisibleModal = true

  }

  onEditClick(id) {

    this.getById(id)

  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-complex' || data.event == 'edit-complex') {
      this.addEdit(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getAll() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-complexes',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {    
      
      this.api.c('getAll', result)
      if (result.status === true) {
        //OK
        this.complexes = result.data
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

  addEdit(d) {

    if (d.name == '' || d.typeComplex == '' || d.venueid == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        typeComplex: d.typeComplex,       
        venueid: d.venueid || null,
        token: this.user.token.original.access_token,
        complexid: d.event == 'edit-complex' ? d.complexid : '',
        service: d.event == 'edit-complex' ? 'services/edit-complex' : 'services/add-complex',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {   
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getAll()
        } else if (result.status === false) {
          this.eventsSubject.next(result.message)
        } else if (result.status == 301) {
          this.api.c('Error', result.message)
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        }
      },
        error => {
          this.api.c('Error', error)
          if (error.status == 401) {
            sessionStorage.setItem('ud', '')
            this.router.navigate(['/login'])
          }
        });
    }

  }

  getById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-complex-by-id',
      complexid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {  
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Complejo',
          type: 'complexes',
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

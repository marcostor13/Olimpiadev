import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-commissars',
  templateUrl: './commissars.component.html',
  styleUrls: ['./commissars.component.scss']
})
export class CommissarsComponent implements OnInit {
  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  commissars: any = []

  //Events to child modal

  eventsSubject: any = new Subject();


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
  }

  ngOnInit(): void {
    this.getCommissars()
  }

  onAddClick() {

    this.dataModal = {
      title: 'Agregar Comisarios',
      type: 'commissars',
    }

    this.isVisibleModal = true

  }

  onViewEvents(id){
    this.getEventsById(id)
  }

  onEditClick(id) {

    this.getCommissarById(id)

  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-commissar' || data.event == 'edit-commissar') {
      this.addEditCommissars(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getCommissars() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-commissars',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getCommissars', result)
      if (result.status === true) {
        //OK
        this.commissars = result.data
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    },
      error => {
        this.api.c('Error getCommissars', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }

  addEditCommissars(d) {

    if (d.name == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        commissarid: d.event == 'edit-commissar' ? d.commissarid : '',
        token: this.user.token.original.access_token,
        service: d.event == 'edit-commissar' ? 'services/edit-commissar' : 'services/add-commissar',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {
        this.api.c('addEditCommissars', result)
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getCommissars()
        } else if (result.status === false) {
          this.eventsSubject.next(result.message)
        } else if (result.status == 301) {
          this.api.c('Error', result.message)
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        }
      },
        error => {
          this.api.c('Error addEditCommissars', error)
          if (error.status == 401) {
            sessionStorage.setItem('ud', '')
            this.router.navigate(['/login'])
          }
        });
    }

  }

  getCommissarById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-commissar-by-id',
      commissarid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getCommissarById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Comisarios',
          type: 'commissars',
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

  getEventsById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-events_commissars-by-id',
      commissarid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getCommissarById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Eventos2',
          type: 'commissars-events',
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

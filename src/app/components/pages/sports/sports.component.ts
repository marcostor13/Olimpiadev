import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  sports: any = []

  //Events to child modal

  eventsSubject: any = new Subject();


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
  }

  ngOnInit(): void {
    this.getSports()
  }

  onAddClick() {

    this.dataModal = {
      title: 'Agregar Deportes',
      type: 'sports',
    }

    this.isVisibleModal = true

  }

  onEditClick(id) {

    this.getSportById(id)

  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-sport' || data.event == 'edit-sport') {
      this.addEditSports(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getSports() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-sports',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getSports', result)
      if (result.status === true) {
        //OK
        this.sports = result.data
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    },
      error => {
        this.api.c('Error getSports', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }

  addEditSports(d) {

    if (d.name == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        sportid: d.event == 'edit-sport' ? d.sportid : '',             
        token: this.user.token.original.access_token,
        service: d.event == 'edit-sport' ? 'services/edit-sport' : 'services/add-sport',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {
        this.api.c('addSports', result)
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getSports()
        } else if (result.status === false) {
          this.eventsSubject.next(result.message)
        } else if (result.status == 301) {
          this.api.c('Error', result.message)
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        }
      },
        error => {
          this.api.c('Error addSports', error)
          if (error.status == 401) {
            sessionStorage.setItem('ud', '')
            this.router.navigate(['/login'])
          }
        });
    }

  }

  getSportById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-sport-by-id',
      sportid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getSportById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Deportes',
          type: 'sports',
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

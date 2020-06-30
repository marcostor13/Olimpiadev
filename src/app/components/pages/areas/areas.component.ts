import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  areas: any = []

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
      title: 'Agregar Área',
      type: 'areas',
    }
    this.isVisibleModal = true

  }

  onEditClick(id) {

    this.getById(id)

  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-area' || data.event == 'edit-area') {
      this.addEdit(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getAll() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-areas',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {

      this.api.c('getAll', result)
      if (result.status === true) {
        //OK
        this.areas = result.data
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
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

  addEdit(d) {

    if (d.name == '' || d.complexid == '' || d.sportid == '' || d.ubication == '' || d.totalarea == '' || d.manager == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        complexid: d.complexid,
        sportid: d.sportid,
        ubication: d.ubication,
        totalarea: d.totalarea,
        manager: d.manager,       
        token: this.user.token.original.access_token,        
        service: d.event == 'edit-area' ? 'services/edit-area' : 'services/add-area',
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
      service: 'services/get-area-by-id',
      areaid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Área',
          type: 'areas',
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

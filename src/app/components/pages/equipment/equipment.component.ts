import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  equipments: any = []

  //Events to child modal

  eventsSubject: any = new Subject();


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
  }

  ngOnInit(): void {
    this.getEquipments()
  }

  onAddClick() {

    this.dataModal = {
      title: 'Agregar equipamiento',
      type: 'equipments',
    }

    this.isVisibleModal = true

  }

  onEditClick(id) {

    this.getEquipmentById(id)

  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-equipment' || data.event == 'edit-equipment') {
      this.addEditEquipments(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getEquipments() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-equipments',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('get', result)
      if (result.status === true) {
        //OK
        this.equipments = result.data
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

  addEditEquipments(d) {

    if (d.name == '' || d.eventid == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        eventid: d.eventid,
        equipmentid: d.event == 'edit-equipment' ? d.equipmentid : '',
        token: this.user.token.original.access_token,
        service: d.event == 'edit-equipment' ? 'services/edit-equipment' : 'services/add-equipment',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {
        this.api.c('add', result)
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getEquipments()
        } else if (result.status === false) {
          this.eventsSubject.next(result.message)
        } else if (result.status == 301) {
          this.api.c('Error', result.message)
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login']);
        }
      },
        error => {
          this.api.c('Error add', error)
          if (error.status == 401) {
            sessionStorage.setItem('ud', '')
            this.router.navigate(['/login'])
          }
        });
    }

  }

  getEquipmentById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-equipment-by-id',
      equipmentid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getEquipmentById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar Equipamiento',
          type: 'equipments',
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

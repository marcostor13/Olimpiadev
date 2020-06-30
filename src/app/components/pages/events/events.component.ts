import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  titleModal: String = 'Agregar'
  isVisibleModal: Boolean = false
  user: any
  dataModal = {}
  events: any = []

  //Events to child modal

  eventsSubject: any = new Subject();


  constructor(private router: Router, private api: ApiService, private general: GeneralService) {
    this.user = this.general.validateSession()
  }

  ngOnInit(): void {
    this.getEvents()
  }

  onAddClick() {

    this.dataModal = {
      title: 'Agregar eventos',
      type: 'events',
    }

    this.isVisibleModal = true

  }

  onEditClick(id) {
    this.getEventById(id)
  }

  onViewCommissarsClick(id){
    this.getCommissarsById(id)
  }

  onAddCommissarsClick(id) {
    this.sendEventAddCommissarsById(id)
  }

  dataOutputChild(data: any) {
    if (data.event == 'closeModal') {
      this.isVisibleModal = false
    } else if (data.event == 'add-event' || data.event == 'edit-event') {
      this.addEditEvents(data)
    } else if (data.event == 'add-commissar'){
      this.addCommissarToEvent(data)
    }
  }

  emitEventToChild() {
    this.eventsSubject.next('error')
  }

  getEvents() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-events',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('get', result)
      if (result.status === true) {
        //OK
        this.events = result.data
      } else if (result.status === false) {
        this.api.c('Error', result)
      } else if (result.status == 301) {
        this.api.c('Error', result.message)
        sessionStorage.setItem('ud', '')
        this.router.navigate(['/login'])
      }
    },
      error => {
        this.api.c('Error getEvents', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }

  addEditEvents(d) {

    if (d.name == '' || d.complexid == '' || d.sportid == '' || d.date == '' || d.participants == '' || d.dutarion == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        name: d.name,
        complexid: d.complexid,
        sportid: d.sportid,
        date: d.date,
        participants: d.participants,
        duration: d.duration,
        eventid: d.event == 'edit-event' ? d.eventid : '',
        token: this.user.token.original.access_token,
        service: d.event == 'edit-event' ? 'services/edit-event' : 'services/add-event',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {
        this.api.c('add', result)
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getEvents()
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

  addCommissarToEvent(d){

    if (d.commissarid == '' || d.eventid == '' || d.task == '') {
      this.eventsSubject.next('Debe ingresar todos los datos')
    } else {
      let data = {
        commissarid: d.commissarid,
        eventid: d.eventid,
        task: d.task,
        token: this.user.token.original.access_token,
        service: 'services/add-commissar-to-event',
        type: 'post'
      }
      this.api.api(data).subscribe((result: any) => {
        this.api.c('add', result)
        if (result.status === true) {
          //OK
          this.eventsSubject.next(result.message)
          this.getEvents()
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

  getEventById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-event-by-id',
      eventid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getEventById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Editar evento',
          type: 'events',
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


  getCommissarsById(id) {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-commissars_events-by-id',
      eventid: id,
      type: 'post'
    }
    this.api.api(data).subscribe((result: any) => {
      this.api.c('getCommissarsById', result)
      if (result.status === true) {
        //OK
        this.dataModal = {
          title: 'Ver comisarios',
          type: 'view-commissars',
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


  sendEventAddCommissarsById(id) {
    this.dataModal = {
      title: 'Agregar Commisario',
      type: 'add-commissar',
      eventid: id     
    }
    this.isVisibleModal = true
  }



  
  






}


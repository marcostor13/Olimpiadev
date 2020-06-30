import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() data: any;
  @Input() events: Observable<void>;
  @Output() event = new EventEmitter();

  response: String = ''
  isLoad:Boolean = false
  user: any;
  
  // variables venue
  venues: any = []
  name: any = ''
  year: any = ''
  cost: any = ''

  //variables complexes

  typeComplex: any = ''
  venueid: any = ''
  complexes: any = []
  complexid: any = ''

  //variables sports

  sports: any = []
  sportid: any = ''

  //variables areas

  manager: any = ''
  totalarea: any = ''
  ubication: any = ''


  //variables eqquipment

  eventid: any = ''
  eventsGet: any = []
  
  //Variables events

  date: any = ''
  participants: any = ''
  duration: any = ''

  //Variables Commissars

  commissarid: any = ''
  commissars: any = []
  task: any = ''
  eventidCommissar:any = ''

  private eventsSubscription: Subscription;


  constructor(private api: ApiService, private router: Router, private general: GeneralService) {
    this.user = this.general.validateSession()
   }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((message) => this.sendResponse(message));
    this.getInputsValues()
    this.getVenues()
    this.getComplexes()
    this.getSports()
    this.getEvents()
    this.getCommissars()

    this.api.c('Data', this.data)
  }

  closeModal(){
    this.event.emit({
      event: 'closeModal'
    })
  }

  getInputsValues(){

    if (this.data.data){
      switch (this.data.type) {
        case 'venues':
          this.name = this.data.data.name
          this.year = this.data.data.year
          this.cost = this.data.data.cost
          break;

        case 'complexes':
          this.name = this.data.data.name
          this.typeComplex = this.data.data.type
          this.venueid = this.data.data.venueid
          break;

        case 'sports':          
          this.name = this.data.data.name         
          break;

        case 'areas':
          this.name = this.data.data.name
          this.complexid = this.data.data.complexid
          this.sportid = this.data.data.sportid
          this.manager = this.data.data.manager
          this.totalarea = this.data.data.totalarea
          this.ubication = this.data.data.ubication
          break;
        
        case 'commissars':
          this.name = this.data.data.name
          break;

        case 'equipments':
          this.name = this.data.data.name
          this.eventid = this.data.data.eventid
          break;

        case 'events':
          this.name = this.data.data.name
          this.complexid = this.data.data.complexid
          this.sportid = this.data.data.sportid
          this.date = this.data.data.date
          this.participants = this.data.data.participants
          this.duration = this.data.data.duration
          break;

        case 'add-commissar':
          this.api.c('dsasdas', this.data.eventid)
          this.eventidCommissar = this.data.eventid
          break;
        default:
          break;
      }
    }else{
      switch (this.data.type) {        
        case 'add-commissar':
          this.api.c('dsasdas', this.data.eventid)
          this.eventidCommissar = this.data.eventid
          break;
        default:
          break;
      }
    }
  }

  

  sendDataToParent(data){
    this.response = ''
    this.isLoad = true
    this.event.emit(data)
  }

  sendResponse(message){
    this.api.c('sendResponse', message)
    this.isLoad = false
    this.response = message
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }



  //SELECTS

  getVenues() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-venues',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
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

  getComplexes() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-complexes',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
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

  getSports() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-sports',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
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
        this.api.c('Error getVenues', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }

  getEvents() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-events',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
      if (result.status === true) {
        //OK
        this.eventsGet = result.data
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

  getCommissars() {
    let data = {
      token: this.user.token.original.access_token,
      service: 'services/get-commissars',
      type: 'get'
    }
    this.api.api(data).subscribe((result: any) => {
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
        this.api.c('Error getVenues', error)
        if (error.status == 401) {
          sessionStorage.setItem('ud', '')
          this.router.navigate(['/login'])
        }
      });
  }


  



}

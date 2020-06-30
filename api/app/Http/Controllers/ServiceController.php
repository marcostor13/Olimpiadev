<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venue;
use App\Complex;
use App\Sport;
use App\Area;
use App\Commissar;
use App\Equipment;
use App\Event;
use DB;

class ServiceController extends Controller
{

    //VENUES

    public function addVenue(Request $request){

        $venueCurrent = Venue::where('name', $request->name)->first();

        if($venueCurrent){
            return ['status' => false, 'message' => 'La sede ya existe'];
        }

        $venue = new Venue;
        $venue->name = $request->name;
        $venue->year = $request->year;
        $venue->cost = $request->cost;
        $venue->save();
        return ['status' => true, 'message' => 'Sede Agregada'];
    }

    public function editVenue(Request $request){
        Venue::where('id', $request->venueid)->update([
            "name" => $request->name,
            "year" => $request->year,
            "cost" => $request->cost
        ]);
        return ['status' => true, 'message' => 'Sede actualizada'];
    }

    public function getVenueById(Request $request){
        return ['status' => true, 'data' => Venue::where('id', $request->venueid)->first()];       
    }

    public function getVenues(){
        return ['status' => true, 'data' => Venue::get()];       
    }


    //COMPLEXES

    public function addComplex(Request $request){

        $complexCurrent = Complex::where('name', $request->name)->first();

        if($complexCurrent){
            return ['status' => false, 'message' => 'El complejo ya existe'];
        }

        $complex = new Complex;
        $complex->name = $request->name;
        $complex->type = $request->typeComplex;     
        $complex->venueid = $request->venueid;     
        $complex->save();
        return ['status' => true, 'message' => 'Complejo agregado'];
    }

    public function editComplex(Request $request){
        Complex::where('id', $request->complexid)->update([
            "name" => $request->name,
            "type" => $request->typeComplex,     
            "venueid" => $request->venueid,                 
        ]);

        return ['status' => true, 'message' => 'Complejo actualizado'];
    }

    public function getComplexes(){
        return ['status' => true, 'data' => Complex::select('complexes.*', 'venues.name as venue', 'venues.year as year')->join('venues', 'venues.id', '=', 'complexes.venueid')->get()];       
    }

    public function getComplexById(Request $request){
        return ['status' => true, 'data' => Complex::where('id', $request->complexid)->first()];       
    }


    //SPORTS

    public function addSport(Request $request){

        $currentSport = Sport::where('name', $request->name)->first();

        if($currentSport){
            return ['status' => false, 'message' => 'El deporte ya existe'];
        }

        $complex = new Sport;
        $complex->name = $request->name;     
        $complex->save();
        return ['status' => true, 'message' => 'Deporte agregado'];
    }

    public function editSport(Request $request){
        Sport::where('id', $request->sportid)->update([
            "name" => $request->name                
        ]);

        return ['status' => true, 'message' => 'Deporte actualizado'];
    }

    public function getSports(){
        return ['status' => true, 'data' => Sport::get()];       
    }

    public function getSportById(Request $request){
        return ['status' => true, 'data' => Sport::where('id', $request->sportid)->first()];       
    }


    //SPORTS

    public function addArea(Request $request){

        $currentArea = Area::where('name', $request->name)->first();

        if($currentArea){
            return ['status' => false, 'message' => 'El deporte ya existe'];
        }

        $area = new Area;
        $area->name = $request->name;     
        $area->complexid = $request->complexid;     
        $area->sportid = $request->sportid;     
        $area->ubication = $request->ubication;     
        $area->manager = $request->manager;     
        $area->totalarea = $request->totalarea;     
        $area->save();
        return ['status' => true, 'message' => 'Área agregada'];
    }

    public function editArea(Request $request){
        Area::where('id', $request->sportid)->update([
            "name" => $request->name,  
            "complexid" => $request->complexid,  
            "sportid" => $request->sportid,  
            "ubication" => $request->ubication,  
            "manager" => $request->manager,  
            "totalarea" => $request->totalarea
        ]);

        return ['status' => true, 'message' => 'Área actualizada'];
    }

    public function getAreas(){
        return [
            'status' => true, 
            'data' => 
            Area::select('areas.*', 'sports.name as sport', 'complexes.name as complex')
            ->join('sports', 'sports.id', '=', 'areas.sportid')
            ->join('complexes', 'complexes.id', '=', 'areas.complexid')
            ->get()
        ];       
    }

    public function getAreaById(Request $request){
        return ['status' => true, 'data' => Area::where('id', $request->areaid)->first()];       
    }

    //COMMISSARS

    public function addCommissar(Request $request){

        $currentCommissar = Area::where('name', $request->name)->first();

        if($currentCommissar){
            return ['status' => false, 'message' => 'El comisario ya existe'];
        }

        $commissar = new Commissar;
        $commissar->name = $request->name;              
        $commissar->save();
        return ['status' => true, 'message' => 'Comisario agregado'];
    }

    public function editCommissar(Request $request){
        Commissar::where('id', $request->commissarid)->update([
            "name" => $request->name        
        ]);

        return ['status' => true, 'message' => 'Comisario actualizado'];
    }

    public function getCommissars(){
        $commissars = Commissar::get();
        $res = [];        
        foreach ($commissars as $commissar) {
            $eventsids = DB::table('commissars_events')
            ->where('commissarid', $commissar->id)
            ->join('events', 'events.id', '=', 'commissars_events.eventid')
            ->get();
            $commissar['events'] = $eventsids;
            $res[] = $commissar;
        }        
        return ['status' => true, 'data' =>  $res ];       
    }

    public function getCommissarById(Request $request){
        return ['status' => true, 'data' => Commissar::where('id', $request->commissarid)->first()];       
    }


    public function getEventsCommissarById(Request $request){
        return [
            'status' => true, 
            'data' => DB::table('commissars_events')            
            ->where('commissarid', $request->commissarid)
            ->join('events', 'events.id', '=', 'commissars_events.eventid')
            ->get()
        ];       
    }

    public function getCommissarsEventsById(Request $request){
        return [
            'status' => true, 
            'data' => DB::table('commissars_events')            
            ->where('eventid', $request->eventid)
            ->join('commissars', 'commissars.id', '=', 'commissars_events.commissarid')
            ->get()
        ];       
    }

    public function addCommissarToEvent(Request $request){
        $event_commissar = DB::table('commissars_events')            
            ->where('commissarid', $request->commissarid)
            ->where('eventid', $request->eventid)           
            ->first();

        if($event_commissar){
            return ['status' => false, 'message' => 'El comisario ya existe en el evento'];
        }

        DB::table('commissars_events')->insert([
            [
                'commissarid' => $request->commissarid, 
                'eventid' => $request->eventid,
                'task' => $request->task
            ]          
        ]);
        
        return ['status' => true, 'message' => 'Comisario agregado'];
    }



    //EQUIPMENT

    public function addEquipment(Request $request){

        $currentEquipment = Equipment::where('name', $request->name)->first();

        if($currentEquipment){
            return ['status' => false, 'message' => 'El equipamiento ya existe'];
        }

        $equipment = new Equipment;
        $equipment->name = $request->name;     
        $equipment->eventid = $request->eventid;     
        $equipment->save();
        return ['status' => true, 'message' => 'Equipamiento agregado'];
    }

    public function editEquipment(Request $request){
        Equipment::where('id', $request->equipmentid)->update([
            "name" => $request->name,
            "eventid" => $request->eventid            
        ]);

        return ['status' => true, 'message' => 'Equipamiento actualizado'];
    }

    public function getEquipments(){
        return ['status' => true, 'data' => Equipment::get()];       
    }

    public function getEquipmentById(Request $request){
        return ['status' => true, 'data' => Equipment::where('id', $request->equipmentid)->first()];       
    }


    //EVENTS

    public function addEvent(Request $request){

        $currentEvent = Event::where('name', $request->name)->first();

        if($currentEvent){
            return ['status' => false, 'message' => 'El evento ya existe'];
        }

        $event = new Event;
        $event->name = $request->name;     
        $event->complexid = $request->complexid;     
        $event->sportid = $request->sportid;     
        $event->date = $request->date;     
        $event->participants = $request->participants;     
        $event->duration = $request->duration;     
        $event->save();
        return ['status' => true, 'message' => 'Evento agregado'];
    }

    public function editEvent(Request $request){
        Events::where('id', $request->eventid)->update([
            "name" => $request->name,
            "complexid" => $request->complexid,            
            "sportid" => $request->sportid,            
            "date" => $request->date,            
            "participants" => $request->participants,            
            "duration" => $request->duration,            
        ]);

        return ['status' => true, 'message' => 'Evento actualizado'];
    }

    public function getEvents(){
        return ['status' => true, 'data' => Event::get()];       
    }

    public function getEventById(Request $request){
        return ['status' => true, 'data' => Event::where('id', $request->eventid)->first()];       
    }


    

    


}

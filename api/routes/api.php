<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('register', 'JWTAuthController@register');
    Route::post('login', 'JWTAuthController@login');
    Route::post('logout', 'JWTAuthController@logout');
    Route::post('refresh', 'JWTAuthController@refresh');
    Route::get('profile', 'JWTAuthController@profile');
    
    
});

Route::group([
    'middleware' => ['jwt.verify'],
    'prefix' => 'services'
    
], function ($router) {
    
    //VENUES
    Route::post('add-venue', 'ServiceController@addVenue');   
    Route::post('edit-venue', 'ServiceController@editVenue');   
    Route::get('get-venues', 'ServiceController@getVenues');   
    Route::post('get-venue-by-id', 'ServiceController@getVenueById');   

    //COMPLEXES
    Route::post('add-complex', 'ServiceController@addComplex');   
    Route::post('edit-complex', 'ServiceController@editComplex');   
    Route::get('get-complexes', 'ServiceController@getComplexes');
    Route::post('get-complex-by-id', 'ServiceController@getComplexById');   
    
    //SPORTS
    Route::post('add-sport', 'ServiceController@addSport');   
    Route::post('edit-sport', 'ServiceController@editSport');   
    Route::get('get-sports', 'ServiceController@getSports');
    Route::post('get-sport-by-id', 'ServiceController@getSportById');

    //AREAS
    Route::post('add-area', 'ServiceController@addArea');   
    Route::post('edit-area', 'ServiceController@editArea');   
    Route::get('get-areas', 'ServiceController@getAreas');
    Route::post('get-area-by-id', 'ServiceController@getAreaById');

    //COMMISSARS
    Route::post('add-commissar', 'ServiceController@addCommissar');   
    Route::post('edit-commissar', 'ServiceController@editCommissar');   
    Route::get('get-commissars', 'ServiceController@getCommissars');
    Route::post('get-commissar-by-id', 'ServiceController@getCommissarById');
    Route::post('get-events_commissars-by-id', 'ServiceController@getEventsCommissarById');   
    Route::post('get-commissars_events-by-id', 'ServiceController@getCommissarsEventsById');   
    Route::post('add-commissar-to-event', 'ServiceController@addCommissarToEvent');   
    
    //EQUIPMENTS
    Route::post('add-equipment', 'ServiceController@addEquipment');   
    Route::post('edit-equipment', 'ServiceController@editEquipment');   
    Route::get('get-equipments', 'ServiceController@getEquipments');
    Route::post('get-equipment-by-id', 'ServiceController@getEquipmentById');

    //EVENTS
    Route::get('get-events', 'ServiceController@getEvents');
    Route::post('add-event', 'ServiceController@addEvent');   
    Route::post('edit-event', 'ServiceController@editEvent');   
    Route::post('get-event-by-id', 'ServiceController@getEventById');

    


});


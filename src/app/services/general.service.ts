import { Injectable } from '@angular/core';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  httpBuildQuery(params) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
      params = {};
      return params;
    }

    var query = '?';
    var index = 0;

    for (var i in params) {
      index++;
      var param = i;
      var value = params[i];
      if (index == 1) {
        query += param + '=' + value;
      } else {

        query += '&' + param + '=' + value;
      }

    }
    return query;
  }

  searchElementByNameKey(array, key, value){
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] == value){
        return element
      }      
    }
  }

  searchIndexByNameKey(array, key, value) {
    var res:any = false;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] == value) {
        res =  i
      }
    }

    return res
  }

  getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  
  //Inserta un objeto a partir de una posisión, 
  insertObjectInPositionArray(obj, array, indexPosPrev){

    let res = []
    
    for (let i = 0; i < indexPosPrev; i++) {
      res.push(array[i])      
    }

    res.push(obj)

    if (indexPosPrev < array.length){
      for (let i = indexPosPrev; i < array.length; i++) {
        res.push(array[i])
      }
    }


    return res

  } 


  //FORMAT:   separator_1   ===> get 1

  getIndexToId(e){
    e = e.split('_');
    return e[e.length-1]
  }


  //ELIMINAR UN ELEMENTO DEL ARRAY POR ID

  deleteElementOfArray(value, array){
    
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.id == value){
        array.splice(index, 1)
      }
      
    }
    return array
  }

  deleteElementOfArrayintoArray(parentId, id, array){
    for (let index = 0; index < array.length; index++) {
      if (array[index].id == parentId) {
        for (let x = 0; x < array[index].elements.length; x++) {
          if (array[index].elements[x].id == id) {
            array[index].elements.splice(x, 1)
          }
        }
      }

    }
    return array
  }

  getParametersURL(url){

    let params = url.split('?')[1].split('&');
    var res = [] 

    for (let index = 0; index < params.length; index++) {
      let ele = params[index].split('=');
      res.push({
        name: ele[0],
        value: ele[1]
      })
    }
    return res;

  }


}

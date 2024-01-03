import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Clases } from '../Modelo/Clases';

@Injectable()
export class ProjectService{
    public url:string;
    public clasesAux:Clases[];


    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this.clasesAux=[];
    }

    getCampus(id):any{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'campus/cargar-campus/'+id+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.get<String>(serviceURL, {headers: headers});        
    }

    getEdificiobyCampus(id){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'campus/obtener-edificios/'+id+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.get<String>(serviceURL, {headers: headers});            
    }
    
    getClases(id):Observable<Clases[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'campus/listar-campus/'+id+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.get<Clases[]>(serviceURL, {headers: headers});
    }
 
    getClasesMap(id):Observable<Map<String,Map<String, []>>>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'campus/listar-campus/'+id+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.get<Map<String,Map<String, []>>>(serviceURL, {headers: headers});
    }
  
    getNombreEdificio(id):Observable<String []>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'campus/listar-edificio/'+id+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.get<String []>(serviceURL, {headers: headers});
    }

    crearClaseV2(formValue,id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'/aulas/crear-aula/'+id+'/v2';
        console.log("********** "+serviceURL+" **********");
        return this._http.post(serviceURL,formValue, {headers: headers});
    }

    crearClase(formValue,id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'/aulas/crear-aula/'+id+'/v1';
        console.log("********** "+serviceURL+" **********");
        return this._http.post(serviceURL,formValue, {headers: headers});
    }

    añadirRotos(listas, clase, edificio, campusId):any{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'aulas/modificar-rotos/'+edificio+"/"+campusId+"/"+clase+"/v1";
        console.log("********** "+serviceURL+" **********");
        return this._http.post(serviceURL, listas, {headers: headers});    
    }

    convertirAClase(clase): Clases{
        let clas: Clases= new Clases('',0,0);
        clase.forEach((element, index) => {
            if(index==0)
                clas.edificio=element.toString();
            else if(index==1)
                clas.planta=parseInt(element);
            else
                clas.numClases=parseInt(element);
        });
        //console.log(clas);
        return clas;
    }




    pintarClase(campus, aula, edificio):any{
        let edificio2 = edificio.replace(" ", "_");
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let serviceURL = this.url+'aulas/pintar-aula/'+edificio2+'/'+campus+'/'+aula+'/v1';
        console.log("********** "+serviceURL+" **********");
        return this._http.get<any[]>(serviceURL, {headers: headers});

        //return this._http.get(this.url+'aulas/pintar/'+campus+'/'+aula, {headers: headers});
    }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/ProjectServices';


@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css'], 
  providers: [ProjectService]
})
export class CampusComponent implements OnInit {

  public campusId: number;
  public campus:String;
  public nombreEdificio:String;
  public clases: any[];
  public mostrarAulas: boolean;
  public mostrarPlantas: boolean;
  public mostrarClases: boolean;
  public nombreEdificios: String[];
  public clase= new Map();
  public edificio= new Map();
  public edificio2= new Map();
  public plantas: string[] =[];
  public clases2: any[] =[];
  public plantaG: any;
  public pAula: any;
  public pPlanta: any;

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute
  ) {
    this.clases=[];
  }

  ngOnInit(): void {


    this.mostrarAulas=false;
    this.mostrarClases=false;
    this.mostrarPlantas=false;

    this._route.params.subscribe(params => {
      this.getCampus(params.id);
      this.getClases(params.id);
      this.getNombreEdificio(params.id);
    });
  }

  getCampus(id){
    //this.campus=Global.campus[id];
    this._projectService.getCampus(id).subscribe(
      response => {
        this.campus=response.nombre;
        console.log("--------");
        console.log(this.campus);
      },
      error => {
        console.log(<any>error);
      }
    );
    this.campusId=id;
    this.mostrarAulas=false;
  }

  getClases(id){
    this._projectService.getClasesMap(id).subscribe(
      result => {
        let edificioAux = new Map();
        console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
        edificioAux.set(1, result);
        console.log(typeof edificioAux);
        this.edificio2=edificioAux.get(1);
        for (var [clave, valor] of this.edificio2.entries()) {
            this.edificio.set(valor.key,valor.listaPlantas);
        }
        console.log(this.edificio);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getNombreEdificio(id){
    this._projectService.getNombreEdificio(id).subscribe(
      result => {
        this.nombreEdificios=result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getMostrarAula(cond){
    this.mostrarAulas=cond;
    this.mostrarClases=false;
    this.mostrarPlantas=false;

    if(cond)
      this.getClases;
  }
  seleccionarEdificio(edificioP, p){

    console.log(this.edificio);
    this.activasSeleccion(p, "AULA");
    this.plantas=[];
    
    this.clase=this.edificio.get(edificioP);

    for (var [clave, valor] of this.clase.entries()) {
      this.plantas.push(valor.key);
    }

    this.nombreEdificio=edificioP;
    this.mostrarPlantas=true;
    this.mostrarClases=false;
  }

  seleccionarPlanta(planta, p){
    this.plantaG=planta;
    var clasesAux:string[] =[];

    this.activasSeleccion(p, "PLANTA");
  //  this.clases2=this.clase.get(planta);
    for (var [clave, valor] of this.clase.entries()) {
      if(valor.key==planta){
        clasesAux.push(valor.listaClases);
      }
    }
    this.getDameClases(clasesAux);
    console.log(this.clases2);
    this.mostrarClases=true;
  }

  getDameClases(clasesAux){
    this.clases2=[];

    clasesAux[0].forEach(element => {
      if(element > 0)
        this.clases2.push(element);
    });

  }

  seleccionarClase(clase){
    console.log("LLEGO A CLASE "+clase);
  }

  activasSeleccion(p, tipo){
    if(tipo == "AULA"){
      if(this.pAula == null){
        this.pAula=p;
      }else{
        this.pAula.style.color='black';
        this.pAula=p;
        if(this.pPlanta != null){
          this.pPlanta.style.color='black';
        }
      }
    }else if(tipo == "PLANTA"){
      if(this.pPlanta == null){
        this.pPlanta=p;
      }else{
        this.pPlanta.style.color='black';
        this.pPlanta=p;
      }
    }
    p.style.color='red';
  }

}

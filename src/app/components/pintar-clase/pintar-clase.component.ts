import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/ProjectServices';
import { Global } from '../../Services/global';

@Component({
  selector: 'app-pintar-clase',
  templateUrl: './pintar-clase.component.html',
  styleUrls: ['./pintar-clase.component.css'],
  providers: [ProjectService]
})
export class PintarClaseComponent implements OnInit {

  public campus: string;
  public clase: string;
  public distribucion: any[];
  public campusId:string;
  public edificio:string;
  public listaRotos:any[];
  public listaRotosNuevos:any[];
  public listaRotosIniciales:any[];
  public listaArreglados:any[];
  public rotosIniciales:Number;
  public tipoClase:Number;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.campusId=params.campus;
      this.campus=Global.campus[params.campus];
      this.edificio=params.edificio;
      this.clase=params.clase;
      this.listaRotos=[];
      this.listaRotosNuevos=[];
      this.listaRotosIniciales=[];
      this.listaArreglados=[];
      this.rotosIniciales=0;
      this.dameAula(this.campusId, this.clase, this.edificio);
      console.log(this.distribucion);
    });
  }

  onSubmit(){

    let listas: any[] = [];

    let url = "http://localhost:4200/aula/"+this.edificio.replace(' ','%20')+"/"+this.campusId+"/"+this.clase

    listas.push(this.listaRotosNuevos);
    listas.push(this.listaArreglados);
    this._projectService.añadirRotos(listas, this.clase, this.edificio, this.campusId).subscribe(
      response => {
        console.log("Servicio completado correctamnete y la respuesta del servicio es -> "+response);
        window.location.href = url;
        //setTimeout(function() {window.location.href = url;}, 2000);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  dameAula(campus, aula, edificio){
    this._projectService.pintarClase(campus, aula, edificio).subscribe(
      response => {
        this.distribucion=this.getDistribucion(response);
        console.log(this.distribucion);
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getDistribucion(response){

    let distribucionAux=[];
    let contador=0;
    let contadorRotos=0;

    response.forEach((elemento,indice) => {
      let distribucionAux2=[];
      if (indice != 0){
        elemento.forEach((element, index) => {
          contador++;
          let variable={
            valor: element,
            posicion: contador,
            fila:indice,
            columna:index
          };
          if(element==1){
            contadorRotos++;
            this.listaRotos.push(variable);
            this.listaRotosIniciales.push(variable);
          }
          
          distribucionAux2.push(variable);
        });  
      } else{
        this.tipoClase=elemento[0];
      }
      distribucionAux.push(distribucionAux2);
    });
    this.rotosIniciales=contadorRotos;
    return distribucionAux;
  }

  getMarcar(sitio){

    let agregar:boolean;
    console.log(sitio);
    if(sitio.valor==0){
      sitio.valor=1;
      agregar=true;
      console.log("HAY QUE AGREGAR EL SITIO");
    }
    else{
      sitio.valor=0;
      agregar=false;
      console.log("HAY QUE ELIMINAR EL SITIO");
    }

    let bool = this.borrarSitioRepetido(sitio);


    let resultado = this.esRotoInicial(sitio);
    if(resultado.inicial){
      if(agregar){
        console.log("SITIO ARREGLADO QUE SE HA VUELTO A ROMPER, QUITAMOS DE LA LISTA DE ARREGLADOS");
        this.listaArreglados.splice(this.indiceArreglados(sitio),1);
      }else{
        console.log("SITIO INICIALMENTE ROTO Y ARREGLADO, AGREGAMOS A LA LISTA DE ARREGLADOS");
        this.listaArreglados.push(sitio);
      }
    }else{
      if(agregar){
        console.log("AGREGAMOS EL NUEVO SITIO");
        this.listaRotos.push(sitio);
        this.listaRotosNuevos.push(sitio);
      }else{
        console.log("COMO EL ASIENTO SE HA ARREGLADO, NO LO AÑADIMOS");
        this.listaRotosNuevos.splice(this.indiceNuevos(sitio),1);
      }
    }
  }

  borrarSitioRepetido(sitio){
    let encontrado=false;
    let cont=0;

    while(!encontrado && cont<this.listaRotos.length){
      let element = this.listaRotos[cont];
      if(sitio.fila == element.fila && sitio.columna == element.columna && sitio.posicion == element.posicion){
        this.listaRotos.splice(cont, 1);
        console.log("ENCONTRADO EL SITIO A ACTUALIZAR EN LA POSICION: "+cont);
        encontrado=true;
      }
      cont++
    }
    console.log("EL SITIO SELECCIONADO SE TIENE QUE AGREGAR");
    return encontrado;
  }

  esRotoInicial(sitio){
    let encontrado=false;
    let cont=0;
    let sitioEncontrado={
      inicial: false,
      indice:0
    }


    while(!encontrado && cont<this.listaRotosIniciales.length){
      let element = this.listaRotosIniciales[cont];
      if(sitio.fila == element.fila && sitio.columna == element.columna && sitio.posicion == element.posicion){
        sitioEncontrado.inicial=true;
        sitioEncontrado.indice=cont;
        encontrado=true;
      }
      cont++
    }

    return sitioEncontrado;
  }

  indiceArreglados(sitio){
    let encontrado=false;
    let cont=0;
    let indice=0;

    while(!encontrado && cont<this.listaArreglados.length){
      let element = this.listaArreglados[cont];
      if(sitio.fila == element.fila && sitio.columna == element.columna && sitio.posicion == element.posicion){
        indice=cont;
        encontrado=true;
      }
      cont++
    }

    return indice;
  }

  indiceNuevos(sitio){
    let encontrado=false;
    let cont=0;
    let indice=0;

    while(!encontrado && cont<this.listaRotosNuevos.length){
      let element = this.listaRotosNuevos[cont];
      if(sitio.fila == element.fila && sitio.columna == element.columna && sitio.posicion == element.posicion){
        indice=cont;
        encontrado=true;
      }
      cont++
    }

    return indice;
  }

}

import { Component, OnInit } from '@angular/core';
import { Global } from '../../Services/global'
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/ProjectServices';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nueva-aula',
  templateUrl: './nueva-aula.component.html',
  styleUrls: ['./nueva-aula.component.css'],  
  providers: [ProjectService]
})
export class NuevaAulaComponent implements OnInit {
  public miFormulario: FormGroup;

  public colum:boolean;
  public campus: string;
  public listEdificios:any;
  public listNombresEdificios:string[];
  public listPlantas:number[];
  public itemEdificio:string;
  public itemPlanta:number;
  public filas:number;
  public asientosInhabilitados:number;
  public array:string[];
  public rotos:string[];
  public id: string;
  public ordinales:string[];
  public campusId:string;
  public clase:any;
  public tipoRotos:String;
  public maxRotos:number;
  public maxFila:number;
  public maxColumna:number;
  public mensajeError:String;

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private fb: FormBuilder 
  ) {
    console.log("CONSTRUCTOR")
    this.listEdificios=[];
    this.listNombresEdificios=[];
    this.listPlantas=[];
    this.itemEdificio='';
    this.itemPlanta=1;
    this.array=[];
    this.rotos=[];
    this.colum=false;
    this.clase={};
    this.ordinales=Global.ordinales;
   }
   
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.campusId=params.campus;
      this.getCampus(params.campus);
    });
    this.miFormulario=this.fb.group({
      tipoAula: 'Normal',
      edificio: 'Aulario 1',
      planta: '1',
      filas: [''],
      columnas: [''],
      listaFilas: this.fb.array([this.fb.group({fila: ['']})]),
      rotos: [''],
      listaRotos: this.fb.array([this.fb.group({fila: [''],
                                                columna: [''], 
                                                posicion: ['']})])
    });
    this.tipoRotos="Inicial";
    this.maxColumna=0;
    this.maxFila=0;
    this.maxRotos=0;

    console.log(this.miFormulario);
  }

  rellenarFilas(lista, limiteArray):number[]{
    var nuevaLista:number[] = []
    
    lista.forEach(element => {
      nuevaLista.push(element.fila);  
    });

    if(nuevaLista.length < limiteArray)
      for(var i=nuevaLista.length; i<limiteArray;i++){
        nuevaLista.push(0);
      }

    return nuevaLista;
  }

  onSubmit(formValue){ 

    console.log("onSubmit");
    var listaFilasAux=this.rellenarFilas(this.cleanArray(formValue.listaFilas),5);
    var listaFilasRotos=this.cleanArray(formValue.listaRotos);

    if(this.validaciones(formValue, listaFilasRotos) == ""){
      console.log("onSubmit2");

      this.clase={
        tipoAula:formValue.tipoAula,
        edificio:formValue.edificio,
        fila:formValue.filas,
        numColumnas:formValue.columnas,
        planta:formValue.planta,
        numAsientosRotos:formValue.rotos,
        listaFilas:listaFilasAux,
        estructura: 1,
        listaRotos:listaFilasRotos
      }
      console.log(this.clase);
      if(this.tipoRotos == 'Manual'){
        
        this._projectService.crearClaseV2(this.clase, this.id).subscribe(
          response => {
            console.log("Servicio completado correctamnete y la respuesta del servicio es -> "+response);
            let url = "http://localhost:4200/clase/"+response[0].replace(' ','%20')+"/"+response[1]+"/"+response[2]
            console.log(url);
            window.location.href = url;
          },
          error => {
            console.log(<any>error);
          }
        );
      } else{
        this._projectService.crearClase(this.clase, this.id).subscribe(
          response => {
            console.log("Servicio completado correctamnete y la respuesta del servicio es -> "+response);
            let url = "http://localhost:4200/crear-aula/"+this.campusId
            console.log(url);
            window.location.href = url;
          },
          error => {
            console.log(<any>error);
          }
        );
      }
      /*
      this.miFormulario.reset();
      this.ngOnInit();
      */
    } else {
      this.mensajeError = this.mensajeError+"CORRIJA LOS FALLOS PARA CONTINUAR"
      alert(this.mensajeError);
    }
  }

  get getColumn(){
    return this.miFormulario.get('listaFilas') as FormArray;
  }

  cleanArray(lista){
    let newArray=[];
    for(var i = 0, j = lista.length; i < j; i++){
        if (lista[i].fila != "" && lista[i].fila != null){
          newArray[i]=lista[i];
      }
    }
    return newArray;
  }



  getColumnas(id):any[]{
    this.array=[];
    for(let i=0;i<id;i++){
      this.array.push(this.ordinales[i+1]);
      this.addFilas()
    }
    return this.array;
  }
  getRotos(id):any[]{
    this.array=[];
    for(let i=0;i<id;i++){
      this.array.push(this.ordinales[i+1]);
      this.addRotos()
    }
    return this.array;
  }

  getCampus(id){
    this.campus=Global.campus[id];
    this.id=id;
    this._projectService.getEdificiobyCampus(id).subscribe(
      result => {
          this.listEdificios=result;
          this.listEdificios.forEach(element => {
            this.listNombresEdificios.push(element.nombre);
          });
          this.listPlantas=this.getPlantas(this.listEdificios[0].plantas);
          this.itemEdificio=this.listNombresEdificios[0];
        },
      error =>{
        console.log('error');
        console.log(error);
      }
    );
  }

  getPlantas(plantas):any[]{
    let aux:number[]=[];
    for (let index = 1; index <= plantas; index++) 
      aux.push(index);
    return aux;
  }

  getActualizar(edificio){
    for (let index = 0; index <= this.listEdificios.length; index++){
      if (this.listEdificios[index].nombre == edificio){
        this.listPlantas=this.getPlantas(this.listEdificios[index].plantas);
        break;
      }
    }
    this.miFormulario.value.planta='1';
  }

  addFilas(){
    const control = <FormArray> this.miFormulario.controls['listaFilas'];
    control.push(this.fb.group({fila: ['']}))
  }

  addRotos(){
    const control = <FormArray> this.miFormulario.controls['listaRotos'];
    control.push(this.fb.group({fila: [''],columna: [''],posicion: ['']}))
  }

  getEdificio(id):string{
    return this.listNombresEdificios[id];
  }

  getTipoRotos(form, tipo){
    console.log(tipo);
    if(tipo=="Manual"){
      this.alerta(form, tipo);
    } else {
        this.tipoRotos=tipo;
        console.log(form);
    }

  }
  alerta(clase, tipo){
    var mensaje;
    var opcion = confirm("La clase se creará con los parámetros indicados y serás redirigido a la pantalla para indicar los asientos rotos. ¿Estas seguro que deseas continuar?");
    if (opcion == true) {
        mensaje = "Has clickado OK";
        this.tipoRotos=tipo;
        this.onSubmit(clase);
    } else {
        mensaje = "Has clickado Cancelar";
    }
  }

  validaciones(form, listaRotos):String{
    this.rellenarMaximos(form);
    console.log("Numero maximo de filas = "+this.maxFila)
    console.log("Numero maximo de columnas = "+this.maxColumna)
    console.log("Numero maximo de rotos = "+this.maxRotos)
    this.mensajeError="";

    console.log(form);

    if(form.columnas > 5)
    this.mensajeError=this.mensajeError+"La aplicacion esta diseñada para poner un maximo de 5 columnas.\n\n";

    if(form.rotos > this.maxRotos){
      this.mensajeError=this.mensajeError+"El número de asientos rotos es superior al número de asientos totales.\n\n";
    }
    
    for(var i = 0, j = listaRotos.length; i < j; i++){
      if(listaRotos[i].fila < 1 || listaRotos[i].columna < 1)
        this.mensajeError=this.mensajeError+"El valor 0 o menor no está permitido.\n";
      else if(listaRotos[i].fila > this.maxFila && listaRotos[i].columna > this.maxColumna)
        this.mensajeError=this.mensajeError+"El número de fila y columna del asiento {'fila':"+listaRotos[i].fila+", 'columna':"+listaRotos[i].columna+"} es mayor al permitido.\n";
      else if(listaRotos[i].fila > this.maxFila)
        this.mensajeError=this.mensajeError+"El número de fila del asiento {'fila':"+listaRotos[i].fila+", 'columna':"+listaRotos[i].columna+"} es mayor al permitido.\n";
      else if(listaRotos[i].columna > this.maxColumna)
        this.mensajeError=this.mensajeError+"El número de columna del asiento {'fila':"+listaRotos[i].fila+", 'columna':"+listaRotos[i].columna+"} es mayor al permitido.\n";  
  }

    return this.mensajeError;
  }

  castearNegativos(id, valorPr){
    console.log("Pulsado el boton "+id+" con valor "+valorPr)
  }

  rellenarMaximos(form){

    let array = this.cleanArray(form.listaFilas);  
    this.maxFila=form.filas;
    for(var i = 0, j = array.length; i < j; i++){
        this.maxColumna= this.maxColumna+parseInt(array[i].fila);
    }
    this.maxRotos = this.maxFila * this.maxColumna;

  }
}
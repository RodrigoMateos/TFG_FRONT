import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/ProjectServices';
import { Global } from '../../Services/global';

@Component({
  selector: 'app-pintar-aulas',
  templateUrl: './pintar-aulas.component.html',
  styleUrls: ['./pintar-aulas.component.css'],
  providers: [ProjectService]
})
export class PintarAulasComponent implements OnInit {

  public campus: string;
  public clase: string;
  public distribucion: any[];
  public campusId:string;
  public edificio:string;
  public tipoClase:Number;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.campusId=params.campus;
      this.campus=Global.campus[params.campus];
      this.edificio=params.edificio;
      this.clase=params.clase;
      this.dameAula(this.campusId, this.clase, this.edificio);
      console.log(this.distribucion);
    });
  }

  dameAula(campus, aula, edificio){
    this._projectService.pintarClase(campus, aula, edificio).subscribe(
      response => {
        console.log("response 1");
        console.log(response);
        let tipo = response.splice(0, 1);
        this.tipoClase = tipo[0][0];
        this.distribucion=response;
        console.log("response 2");
        console.log(response);
        console.log(this.distribucion);
        console.log(this.tipoClase);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}

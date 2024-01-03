import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public campus: String;
  constructor() {
    this.campus="";
   }

  ngOnInit(): void {
  }

  setCampus(nombre){
    this.campus=nombre;
  }
}

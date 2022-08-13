import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toggleList():void{
    let btn_all = document.getElementById('btn_all');
    let btn_faves = document.getElementById('btn_faves');

    // @ts-ignore
    if(btn_all.classList.contains('menu_btn_active')){
      // @ts-ignore
      btn_all.classList.remove('menu_btn_active');
      // @ts-ignore
      btn_faves.classList.add('menu_btn_active');

    }else{
      // @ts-ignore
      btn_faves.classList.remove('menu_btn_active');
      // @ts-ignore
      btn_all.classList.add('menu_btn_active');

    }

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dd_selected: any = {};
  filter_exist: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(window.localStorage.getItem('filter') !==null){
      this.filter_exist = true;
      let str = JSON.parse(<string>localStorage.getItem("filter"));
      this.dd_selected ={
        icon:str.icon,
        name:str.name
      };
    }else{
      this.dd_selected ={
        icon:'"./assets/icons/none-ico.jpg"',
        name:'Select your news'
      };
    }
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

  toggleDropDown(event:any):void{
    let dd = document.getElementById('dd_list');

    // @ts-ignore
    if (dd.style.display == 'none'){
      // @ts-ignore
      dd.style.display = 'block';
      // @ts-ignore
      event.target.classList.add('menu_btn_active');
    }
    else{
      // @ts-ignore
      dd.style.display = 'none';
      // @ts-ignore
      event.target.classList.remove('menu_btn_active')
    }

  }

  selectOption(event:any):void{

    let select = event.target.value.toLowerCase();
    let name = event.target.value
    this.dd_selected = {
      icon:'./assets/icons/'+ select +'-ico.jpg',
      name: name ,
    };
      localStorage.setItem('filter',JSON.stringify(this.dd_selected));
     let box = document.getElementsByClassName('menu_btn_active');
     //console.log(box[1]);
    box[1].classList.remove('menu_btn_active');
    let dd = document.getElementById('dd_list');
    // @ts-ignore
    dd.style.display = 'none';
  }
}

import { Component, OnInit } from '@angular/core';
import {NewsServicesService} from "../../../services/news-services.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dd_selected: any = {};
  filter_exist: boolean = false;
  news_list: any[] = [];
  constructor( private newsServices : NewsServicesService) { }

  ngOnInit(): void {
    this.getNews();
    if (window.localStorage.getItem('filter') !== null) {
      this.filter_exist = true;
      let str = JSON.parse(<string>localStorage.getItem("filter"));
      this.dd_selected = {
        icon: str.icon,
        name: str.name
      };
    } else {
      this.dd_selected = {
        icon: '"./assets/icons/none-ico.jpg"',
        name: 'Select your news'
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

  async getNews(): Promise<void>{
   let news = await this.newsServices.getNews('angular', 1);
    //console.log(news.hits);
      news.hits.forEach((item: any) => {
        //console.log(item);
        let time = this.xtimeAgo(new Date(item.created_at));
        let author = item.author;
        let info = item.story_title;
        let date_sort = new Date(item.created_at);
        let icon;

        this.news_list.push({
          time:time,
          author:author,
          info: info,
          date_sort: date_sort,
        })
      });
    console.log(this.news_list);
  }
  xtimeAgo(pastDate: Date): string{
    const now = new Date(Date.now());
    const difftime = now.getTime() - pastDate.getTime();
    const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
    const [sec, min, hr, day, month] = [
      diffDate.getSeconds(),
      diffDate.getMinutes(),
      diffDate.getHours(),
      diffDate.getDate() - 1,
      diffDate.getMonth(),
    ];
    const f = (property: number, end: string) =>{
      // console.log(property,end)
      return`${property} ${end}${property > 1 ? "s" : ""} ago`;
    }
    // console.log(diffDate.toLocaleString());
    return month >= 1
      ? f(month, "month")
      : day >= 1
        ? f(day, "day")
        : hr >= 1
          ? f(hr, "hr")
          : min >= 1
            ? f(min, "min")
            : day >= 1
              ? f(sec, "sec")
              : "";

  }
}

import {Component, OnInit} from '@angular/core';
import {NewsServicesService} from "../../../services/news-services.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visibility: string = 'all';
  dd_selected: any = null;
  filter_exist: boolean = false;
  news_list: any[] = [];
  news_faves: any[] = [];
  news_pageAmount: any = "N";
  actual_page: number = 0;
  loading: boolean = false;

  constructor(private newsServices: NewsServicesService) {
  }

  ngOnInit(): void {
    window.localStorage.clear();
    if (JSON.parse(<string>window.localStorage.getItem('filter')) !== null) {
      this.filter_exist = true;
      let str = JSON.parse(<string>localStorage.getItem("filter"));
      this.dd_selected = {
        icon: str.icon,
        name: str.name
      };
    }
    if (JSON.parse(<string>window.localStorage.getItem('my_faves')) !== null) {
      this.news_faves = JSON.parse(<string>localStorage.getItem("my_faves"));
    } else {
      this.news_faves = [];
    }
    this.actual_page = 0;

    if(this.dd_selected!==null){
      this.getPages();
      this.getNews(this.dd_selected.name, this.actual_page);
    }

    // @ts-ignore
    document.getElementById('btn-first').classList.toggle('pagination_btn_active');
  }

  toggleList(): void {
    let btn_all = document.getElementById('btn_all');
    let btn_faves = document.getElementById('btn_faves');

    // @ts-ignore
    if (btn_all.classList.contains('menu_btn_active')) {
      // @ts-ignore
      btn_all.classList.toggle('menu_btn_active');
      // @ts-ignore
      btn_faves.classList.toggle('menu_btn_active');
      this.visibility = 'faves';

    } else {
      // @ts-ignore
      btn_faves.classList.toggle('menu_btn_active');
      // @ts-ignore
      btn_all.classList.toggle('menu_btn_active');
      this.visibility = 'all';
    }

  }

  toggleDropDown(event: any): void {
    let dd = document.getElementById('dd_list');

    // @ts-ignore
    if (dd.style.display == 'none') {
      // @ts-ignore
      dd.style.display = 'block';
      // @ts-ignore
      event.target.classList.toggle('menu_btn_active');
    } else {
      // @ts-ignore
      dd.style.display = 'none';
      // @ts-ignore
      event.target.classList.toggle('menu_btn_active');
    }

  }

  selectOption(event: any): void {
    this.filter_exist = true;
    this.getPages();
    let select = event.target.value.toLowerCase();
    let name = event.target.value
    this.dd_selected = {
      icon: './assets/icons/' + select + '-ico.jpg',
      name: name,
    };
    localStorage.setItem('filter', JSON.stringify(this.dd_selected));
    let box = document.getElementsByClassName('menu_btn_active');
    box[1].classList.remove('menu_btn_active');
    let dd = document.getElementById('dd_list');
    // @ts-ignore
    dd.style.display = 'none';

    this.getNews(name, 0);
    this.getPages();
  }

  async getNews(language: string, page: number): Promise<void> {
    this.loading = true;
    this.news_list = [];
    let news = await this.newsServices.getNews(language, page);
    //console.log(news.hits);
    news.hits.forEach((item: any) => {
      let time = this.xtimeAgo(new Date(item.created_at));
      let author = item.author;
      let info = item.story_title;
      let date_sort = new Date(item.created_at);
      let id = item.created_at;
      let story_url = item.story_url;
      let reaction;

      if (this.isFaves(id) !== -1) {
        reaction = "./assets/icons/reaction-active-ico.svg";
      } else {
        reaction = "./assets/icons/reaction-inactive-ico.svg";
      }
      if (item.author !== null && item.story_title !== null && item.story_url !== null && item.created_at !== null) {
        this.news_list.push({
          time: time,
          author: author,
          info: info,
          date_sort: date_sort,
          id: item.created_at,
          reaction: reaction,
          story_url: story_url,
        })
      }

    });
    this.loading = false
  }

  xtimeAgo(pastDate: Date): string {
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
    const f = (property: number, end: string) => {
      return `${property} ${end}${property > 1 ? "s" : ""} ago`;
    }
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

  reactToNews(item: any): void {

    let index = this.news_list.findIndex(data => data.id == item.id);
    if (this.isFaves(item.id) == -1) {
      if (index !== -1)
        this.news_list[index].reaction = "./assets/icons/reaction-active-ico.svg";

      item.reaction = "./assets/icons/reaction-active-ico.svg";
      this.news_faves.push(item);
      localStorage.setItem('my_faves', JSON.stringify(this.news_faves));
    } else {
      if (index !== -1)
        this.news_list[index].reaction = "./assets/icons/reaction-inactive-ico.svg";

      this.news_faves.splice(this.isFaves(item.id), 1);
      localStorage.setItem('my_faves', JSON.stringify(this.news_faves));
    }
  }

  isFaves(id: string): number {
    if (this.news_faves == null) {
      return -1;
    } else {
      return this.news_faves.findIndex(item => item.id === id);
    }
  }

  async getPages() {
    let pages = await this.newsServices.getNewsPageAmount(this.dd_selected.name);
    this.news_pageAmount = pages.nbPages;
  }

  previousPage(): void {
    if (this.actual_page > 0) {
      this.actual_page -= 1;
    }
    this.getNews(this.dd_selected.name, this.actual_page);
    this.artificialMaterial();
  }

  nextPage(): void {
    if (this.actual_page < this.news_pageAmount - 1) {
      this.actual_page += 1;
    }
    this.getNews(this.dd_selected.name, this.actual_page);
    this.artificialMaterial();
  }

  gotoPage(event: any): void {
    this.actual_page = <number>event.target.innerText - 1;
    this.getNews(this.dd_selected.name, this.actual_page);
    this.artificialMaterial();
  }

  artificialMaterial() {
    this.setPaginationText();
    this.activePaginationButton();
  }

  activePaginationButton(): void {
    let collection = Array.from(document.getElementsByClassName('pagination_button'));
    collection.forEach((item: any) => {
      item.classList.remove('pagination_btn_active');
      if (item.innerText == this.actual_page + 1) {
        item.classList.add('pagination_btn_active');
      }
    });
  }

  setPaginationText(): void {
    if (this.actual_page < 4) {
      // @ts-ignore
      document.getElementById('btn-second').textContent = '2';
      // @ts-ignore
      document.getElementById('btn-third').textContent = '3';
      // @ts-ignore
      document.getElementById('btn-fourth').textContent = '4';
      // @ts-ignore
      document.getElementById('btn-fift').textContent = '5';

    } else if (this.actual_page >= 4 && this.actual_page < (this.news_pageAmount - 1) - 3) {
      // @ts-ignore
      document.getElementById('btn-second').textContent = '...';
      // @ts-ignore
      document.getElementById('btn-sixth').textContent = '...';
      // @ts-ignore
      document.getElementById('btn-third').textContent = (this.actual_page).toString();
      // @ts-ignore
      document.getElementById('btn-fourth').textContent = (this.actual_page + 1).toString();
      // @ts-ignore
      document.getElementById('btn-fourth').classList.add('pagination_btn_active');
      // @ts-ignore
      document.getElementById('btn-fift').textContent = (this.actual_page + 2).toString();
    } else {
      // @ts-ignore
      document.getElementById('btn-second').textContent = '...';
      // @ts-ignore
      document.getElementById('btn-third').textContent = this.news_pageAmount - 4;
      // @ts-ignore
      document.getElementById('btn-fourth').textContent = this.news_pageAmount - 3;
      // @ts-ignore
      document.getElementById('btn-fift').textContent = this.news_pageAmount - 2;
      // @ts-ignore
      document.getElementById('btn-sixth').textContent = this.news_pageAmount - 1;
    }
  }
}

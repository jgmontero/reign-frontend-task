import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { MyFavesNewsComponent } from './components/my-faves-news/my-faves-news.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AllNewsComponent,
    MyFavesNewsComponent,
    PaginationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsServicesService {
  httpOptions = {
    headers: {}
  };

  constructor(private client: HttpClient) {
  }

  async getNews(language: string, page: number): Promise<any> {
    const url = 'https://hn.algolia.com/api/v1/search_by_date?query=' + language + '&page=' + page;
    return this.client.get<any[]>(url, this.httpOptions).toPromise().catch((err) => {
    });
  }
}

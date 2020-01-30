import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url = "https://api.github.com/users"


  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    let header: Headers = new Headers();
    return this.http.get(this.url)
  }

  getReposByUser(userId): Observable<any> {
    return this.http.get(this.url +'/'+ userId + '/repos')
  }
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private http: HttpClient) { }
  
postUser(data:any){
 return this.http.post(this.url,data)
}
}

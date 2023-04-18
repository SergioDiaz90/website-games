import { Injectable } from '@angular/core';
import { HttpClient }	from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  async request (
    method: string,
    url: string,
    headers: { [name: string]: string | string[] },
    body: object | null,
    query: { [ name: string ]: string | string[] }
  ) {
    const httpOptions = {
      body,
      headers,
      query
    };

    return await lastValueFrom( this.http.request( method, url, httpOptions ));
  }
}

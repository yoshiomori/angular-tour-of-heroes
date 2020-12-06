import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


import { Hero } from './hero';
import { MessageService } from './message.service';

const HEROES = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroesUrl: string = '/api/heroes/';

  getHero(id: number): Observable<Hero> {
    let url = `${this.heroesUrl}${id}/`;
    return this._httpClient.get<Hero>(url).pipe(
      tap(_=>this._log(`fetched hero id=${id}`)),
      catchError(this._handleError)
    );
  }

  constructor(private _messageService: MessageService, private _httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this._httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(_=>this._log('fetched heroes')),
      catchError(this._handleError)
    );
  }

  private _log(message: string) {
    this._messageService.addMessage(`HeroService: ${message}`);
  }

  private _handleError<T>(operation='operation', result?: T) {
    return (error: { message: any; }):Observable<T>=>{
      console.error(error);
      this._log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}

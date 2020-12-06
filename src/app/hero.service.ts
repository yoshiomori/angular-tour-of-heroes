import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
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

  updateHero(hero: Hero) {
    return this._httpClient.put(`${this.heroesUrl}${hero.id}/`, hero, httpOptions).pipe(
      tap(_=>this._log(`update hero id=${hero.id}`)),
      catchError(this._handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero) {
    return this._httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(newHero=>this._log(`add new hero w/ id=${newHero.id}`)),
      catchError(this._handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero: Hero|number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}${id}`;
    return this._httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_=>this._log(`deleted hero id=${id}`)),
      catchError(this._handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();
    if (!term){
      return of([]);
    }
    return this._httpClient.get<Hero[]>(`${this.heroesUrl}`, {params:{name:term}}).pipe(
      tap(x=>x.length?this._log(`found hero matching "${term}"`):this._log(`no heroes matching "${term}"`)),
      catchError(this._handleError<Hero[]>('searchHeroes', []))
    )
  }
}

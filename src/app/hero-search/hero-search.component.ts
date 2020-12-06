import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private _searchTerms = new Subject<string>();

  constructor(private _heroService: HeroService) { }

  search(term: string): void {
    this._searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term=>this._heroService.searchHeroes(term))
    );
  }

}

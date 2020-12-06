import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService, private _messageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this._messageService.addMessage(`HeroesComponent: Selected hero id=${hero.id}`);
    this.selectedHero = hero;
    this._router.navigate(['/detail', hero.id]);
  }

  getHeroes() {
    this._heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this._heroService.addHero({name} as Hero).subscribe(
      hero => this.heroes.push(hero)
    );
  }

  delete(hero:Hero) {
    this.heroes = this.heroes.filter(h=>h!==hero);
    this._heroService.deleteHero(hero).subscribe();
  }
}

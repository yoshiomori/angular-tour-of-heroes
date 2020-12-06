import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private _route: ActivatedRoute,
    private _heroService: HeroService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero() {
    console.log('getHero()');
    const id = +this._route.snapshot.paramMap.get('id');
    this._heroService.getHero(id).subscribe(hero=>{
      console.log(hero);
      this.hero = hero;
    });
  }
  goBack() {
    this._location.back();
  }
  save() {
    this._heroService.updateHero(this.hero).subscribe(()=>this.goBack());
  }
}

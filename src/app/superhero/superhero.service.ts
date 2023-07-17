import { Injectable } from '@angular/core';
import { WaitingService } from '../shared/waiting.service';
import { SuperHero } from './superhero.model';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService {
  private superHeroes: SuperHero[] = [
    { id: 1, name: 'SPIDERMAN' },
    { id: 2, name: 'BATMAN' },
    { id: 3, name: 'WONDERWOMAN' },
  ];

  constructor(private waitSrv: WaitingService) { }

  private makeCopy(json:any){
    return JSON.parse(JSON.stringify(json));
  }

  public getAll(): Promise<SuperHero[]> {
    return new Promise((resolve) => {
      resolve(this.makeCopy(this.superHeroes))
    });
  }



  public getById(id: number): Promise<SuperHero> {
    return new Promise((resolve, reject) => {
      this.waitSrv.startWaiting();
      // Find the superhero with the provided ID
      const superhero: SuperHero | undefined = this.superHeroes.find(hero => hero.id === id);

      this.waitSrv.stopWaiting();
      if (superhero) {
        resolve(this.makeCopy(superhero));
      } else {
        reject(new Error('Superhero not found'));
      }
    });
  }

  public getByName(name: string): Promise<SuperHero[]> {
    return new Promise((resolve, reject) => {
      this.waitSrv.startWaiting();
      // Filter superheroes based on the provided name
      const superheroes: SuperHero[] = this.superHeroes.filter(hero => hero.name.toLowerCase().includes(name.toLowerCase()));

      this.waitSrv.stopWaiting();
      if (superheroes.length > 0) {
        resolve(this.makeCopy(superheroes));
      } else {
        reject(new Error('No superheroes found'));
      }
    });
  }
  public update(sh: SuperHero): Promise<SuperHero> {
    return new Promise((resolve, reject) => {
      this.waitSrv.startWaiting();
      // Find the superhero with the provided ID
      const superheroToUpdate: SuperHero | undefined = this.superHeroes.find(hero => hero.id === sh.id);

      this.waitSrv.stopWaiting();
      if (superheroToUpdate) {
        superheroToUpdate.name = sh.name;
        resolve(this.makeCopy(superheroToUpdate));
      } else {
        reject(new Error('Superhero not found'));
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.waitSrv.startWaiting();

      const index = this.superHeroes.findIndex(hero => hero.id === id);

      if (index !== -1) {
        this.superHeroes.splice(index, 1);

        this.waitSrv.stopWaiting();
        resolve();
      } else {
        this.waitSrv.stopWaiting();
        reject(new Error('Superhero not found'));
      }
    });
  }

  public add(sh: SuperHero): Promise<SuperHero> {
    return new Promise((resolve) => {
      this.waitSrv.startWaiting();

      // Generate a new ID by incrementing the last superhero's ID
      const newId = this.superHeroes.length > 0 ? this.superHeroes[this.superHeroes.length - 1].id + 1 : 1;
      sh.id = newId

      const newSuperHero: SuperHero = sh;
      this.superHeroes.push(newSuperHero);

      this.waitSrv.stopWaiting();

      resolve(this.makeCopy(newSuperHero));
    });
  }

}

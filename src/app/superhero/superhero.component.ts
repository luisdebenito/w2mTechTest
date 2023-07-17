import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../shared/toast.service';
import { ConfirmationService } from 'primeng/api';
import { SuperHero } from './superhero.model';
import { SuperHeroService } from './superhero.service';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.scss'],
})
export class SuperheroComponent implements OnInit {
  private editingId: number = 0;

  public editDialog: boolean = false;
  public superHeroes: SuperHero[] = [];
  public form: FormGroup;
  public searchStr: string = '';

  constructor(
    private toastSrv: ToastService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private superHeroService: SuperHeroService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.superHeroService
      .getAll()
      .then((res) => {
        this.superHeroes = res;
      })
      .catch((err) => {
        this.toastSrv.showToastError(err);
      });
  }

  prepareEdit(sh: SuperHero): void {
    this.form.patchValue(sh);
    this.editingId = sh.id;
    this.editDialog = true;
  }

  prepareCreate(): void {
    this.form.reset();
    this.editingId = 0;
    this.editDialog = true;
  }

  save(): void {
    const sh: SuperHero = this.form.value;
    sh.name = sh.name.toUpperCase();
    if (this.editingId > 0) {
      sh.id = this.editingId;
      this.superHeroService
        .update(sh)
        .then((res) => {
          this.form.reset();
          const index = this.superHeroes.findIndex(
            (hero) => hero.id === res.id
          );
          this.superHeroes[index] = res;
          this.editDialog = false;
          this.toastSrv.showToastSucess('SuperHero succesfully updated');
        })
        .catch((err) => {
          this.toastSrv.showToastError('Error updating superhero');
        });
    } else {
      this.superHeroService
        .add(sh)
        .then((res) => {
          this.form.reset();
          this.editDialog = false;
          this.superHeroes.push(res);
          this.toastSrv.showToastSucess('SuperHero succesfully created');
        })
        .catch((err) => {
          this.toastSrv.showToastError('Error creating superhero');
        });
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Sure you want to delete the SH?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.superHeroService
          .delete(id)
          .then((res) => {
            this.form.reset();
            this.superHeroes = this.superHeroes.filter(
              (hero) => hero.id !== id
            );
            this.editDialog = false;
            this.toastSrv.showToastSucess('SuperHero succesfully deleted');
          })
          .catch((err) => {
            this.toastSrv.showToastError('Error deleting superhero');
          });
      },
    });
  }

  search() {
    if (!this.searchStr) {
      this.ngOnInit();
      return;
    }
    this.superHeroService
      .getByName(this.searchStr)
      .then((res) => {
        this.superHeroes = res;
      })
      .catch((err) => {
        this.toastSrv.showToastError(err);
      });
  }
}

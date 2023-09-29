import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from './components/language/language.component';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, LanguageComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})

export class CoreModule { }

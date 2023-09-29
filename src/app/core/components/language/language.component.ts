import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  constructor(private translationService: TranslationService) { }

  changeLanguage() {
    this.translationService.changeLanguage();
  }
}

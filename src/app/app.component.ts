import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['fr_FR', 'en_EN']);
    this.translate.setDefaultLang('fr_FR');
    this.translate.use('fr_FR');
  }
}

import { Component, EventEmitter } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  public ClassicEditorBuild = ClassicEditorBuild;

  public model = {
    htmlContent: {
      fr: 'Salut tout le monde',
      en: 'hello welcome'
    },
    title: {
      fr: 'title1',
      en: 'title2'
    }
  };

  public langs = {
    en: 'en',
    fr: 'fr'
  };

  public editorConfig = {};

  public readyEmitter = new EventEmitter<CKEditor5.Editor>();

  public onReady( editor: CKEditor5.Editor ) {
    console.log( this.model );
    console.log( editor );
  }


}

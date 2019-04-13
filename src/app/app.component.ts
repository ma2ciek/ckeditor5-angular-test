import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
} )
export class AppComponent {
  public Editor = ClassicEditorBuild;
  public editor: CKEditor5.Editor = null;

  public readyEmitter = new EventEmitter<CKEditor5.Editor>();

  public onReady( editor: CKEditor5.Editor ) {
    this.editor = editor;
    this.readyEmitter.emit( this.editor );
  }
}

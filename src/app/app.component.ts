import { Component } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  title = 'app';
  foo = 'bar';
  ClassicEditorBuild = ClassicEditorBuild;

  public model = {};

  public onReady( editor ) {
    const editableContainer = document.createElement( 'div' );
    const parent = editor.ui.view.editable.element.parentElement;

    parent.removeChild( editor.ui.view.editable.element );
    editableContainer.appendChild( editor.ui.view.editable.element );

    parent.appendChild( editor.ui.view.toolbar.element );
    parent.appendChild( editableContainer );
  }
}

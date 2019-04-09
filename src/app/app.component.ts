import { Component, EventEmitter } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  // @ViewChild( 'demoForm' ) demoForm: NgForm;

  public ClassicEditorBuild = ClassicEditorBuild;
  public editor: CKEditor5.Editor = null;
  public editorVisible = false;

  public readyEmitter = new EventEmitter<CKEditor5.Editor>();

  public config = {
    placeholder: 'Geben Sie Ihren Text und formatieren Sie ihn',
    language: 'de',
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo' ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
      ]
    }
  };

  public options = [ { value: 'foo', id: 'foo' }, { value: 'bar', id: 'bar' } ];

  public onReady( editor: CKEditor5.Editor ) {
    this.editor = editor;
    this.readyEmitter.emit( this.editor );
  }

  public toggleEditorVisibility() {
    this.editorVisible = !this.editorVisible;
  }
}

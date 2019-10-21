import { Component } from '@angular/core';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  public Editor = ClassicEditor;

  public config = {
    plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
    toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo', ]
  };
}

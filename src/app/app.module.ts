import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		CKEditorModule,
		ReactiveFormsModule
	],
	providers: [
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }

import { Component, Injectable } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
	constructor( private httpClient: HttpClient ) { }

	public Editor = ClassicEditorBuild;

	public config = {
		extraPlugins: [ UploadAdapterPlugin ],
		upload: {
			uploadFn: this.uploadImage.bind( this )
		}
	};

	private uploadImage( url: string, formData: FormData ): Observable<HttpEvent<ImageEndpointResponse>> {
		const headers = new HttpHeaders();
		headers.append( 'Access-Control-Allow-Origin', 'http://localhost:4200' );

		const request = new HttpRequest(
			'POST',
			url,
			formData,
			{
				reportProgress: true,
				headers
			}
		);

		return this.httpClient.request( request );
	}
}

class UploadAdapterPlugin {
	constructor( editor: any ) {
		const { uploadFn } = editor.config.get( 'upload' );

		editor.plugins.get( 'FileRepository' ).createUploadAdapter = loader => {
			// Modify your endpoint URL.
			return new UploadAdapter( loader, uploadFn, 'http://localhost:3000/image' );
		};
	}
}

class UploadAdapter {
	private sub: Subscription;

	constructor(
		private loader: UploadLoader,
		private uploadImage: any,
		private url: string
	) { }

	public async upload(): Promise<{ default: string }> {
		const file = await this.loader.file;

		return new Promise( ( resolve, reject ) => {
			const formData = new FormData();
			formData.append( 'file', file );

			this.sub = this.uploadImage( this.url, formData ).subscribe( event => {
				console.log( 1 );
				if ( event.type === HttpEventType.Response ) {
					const response = event.body;

					if ( response.error ) {
						return reject( response.error.message );
					}

					resolve( { default: response.url } );
				} else if ( event.type === HttpEventType.UploadProgress ) {
					this.loader.uploaded = event.loaded;
					this.loader.uploadTotal = event.total;
				}
			}, () => reject( 'Unknown error' ) );
		} );
	}

	public abort() {
		if ( this.sub ) {
			this.sub.unsubscribe();
		}
	}
}

// Modify to align your endpoint response.
interface ImageEndpointResponse {
	url: string;
	error?: { message: string };
}

interface UploadLoader {
	uploaded: number;
	uploadTotal: number;
	readonly file: string;
}

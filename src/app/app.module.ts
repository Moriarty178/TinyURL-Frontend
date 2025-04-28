import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UrlShortenerComponent } from './components/url-shortener/url-shortener.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    UrlShortenerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    InputTextModule,
    DialogModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    GraphQLModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

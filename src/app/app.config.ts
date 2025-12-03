import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

const scrollConfig: InMemoryScrollingOptions =
  { scrollPositionRestoration: 'top', anchorScrolling: 'enabled', };

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig =
  { providers: [
      provideRouter(routes, inMemoryScrollingFeature),
      importProvidersFrom(HttpClientModule)
    ]};




//import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
//import { provideRouter } from '@angular/router';
//import { routes } from './app.routes';
//export const appConfig: ApplicationConfig = {
//  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
//};



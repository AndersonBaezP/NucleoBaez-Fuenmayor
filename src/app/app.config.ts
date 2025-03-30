import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideFirebaseApp(() => 
    initializeApp({
      apiKey: "AIzaSyBBvnwMeI2dVr3fE52PjDIE5Hk5iSKysXM",
      authDomain: "app-angular-nucleo.firebaseapp.com",
      projectId: "app-angular-nucleo",
      storageBucket: "app-angular-nucleo.firebasestorage.app",
      messagingSenderId: "17311166179",
      appId: "1:17311166179:web:a37a6b6f4dd8b1945a1fd6"
    })), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())]
};


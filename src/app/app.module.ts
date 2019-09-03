import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// FIREBASE CONFIG & IMPORTS

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { CategoriesPageModule } from './pages/categories/categories.module';

// MODALS
import { UploadPageModule } from './pages/upload/upload.module';
import { LoginPageModule } from './pages/login/login.module';

// FIREBASE CLOUD MESSAGE
import { FCM } from '@ionic-native/fcm/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyB2GtWVNIv2Scjg8zTGxFDvRHaB_VByAWo",
  authDomain: "buylligator.firebaseapp.com",
  databaseURL: "https://buylligator.firebaseio.com",
  projectId: "buylligator",
  storageBucket: "",
  messagingSenderId: "888470690948",
  appId: "1:888470690948:web:76e47bab0a76e956"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    UploadPageModule,
    CategoriesPageModule,
    LoginPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    ModalController,
    MenuController,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

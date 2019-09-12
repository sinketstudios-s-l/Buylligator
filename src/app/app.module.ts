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
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

// MODALS
import { UploadPageModule } from './pages/upload/upload.module';
import { LoginModalPageModule } from './pages/login-modal/login-modal.module';
import { UploadPage } from './pages/upload/upload.page';
import { CategoriesPageModule } from './pages/categories/categories.module';


// FIREBASE CLOUD MESSAGE
import { FCM } from '@ionic-native/fcm/ngx';
import { SessionService } from './services/session.service';

// QR SERVICES
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

// PAYMENT
import { PaymentService } from './services/payment.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { PayPal } from '@ionic-native/paypal/ngx'
import { SettingsPageModule } from './pages/settings/settings.module';

var firebaseConfig = {
  apiKey: "AIzaSyB2GtWVNIv2Scjg8zTGxFDvRHaB_VByAWo",
  authDomain: "buylligator.firebaseapp.com",
  databaseURL: "https://buylligator.firebaseio.com",
  projectId: "buylligator",
  storageBucket: "buylligator.appspot.com",
  messagingSenderId: "888470690948",
  appId: "1:888470690948:web:76e47bab0a76e956"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [UploadPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    UploadPageModule,
    CategoriesPageModule,
    LoginModalPageModule,
    SettingsPageModule,
    NgxQRCodeModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    SessionService,
    PaymentService,
    ModalController,
    MenuController,
    FCM,
    Stripe,
    PayPal,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

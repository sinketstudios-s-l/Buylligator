import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class AdMobFreeService {

  platID
  constructor(
    private adModFree: AdMobFree,
    public platform: Platform
  ) { 

    if(this.platform.is('cordova') || platform.is('ios') || platform.is('android')){
      platform.ready().then(() => {
        this.BannerAd()
      })
    }

  }

  BannerAd(){

    let ios = "ca-app-pub-3993710682934611/1104271916"
    let android = "ca-app-pub-3993710682934611/7386802758"

    if(this.platform.is('ios')){
      this.platID = ios.toString()
    } else if(this.platform.is('cordova')){
      this.platID = android.toString()
    }

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-3993710682934611/1104271916"
    };
    this.adModFree.banner.config(bannerConfig);

    this.adModFree.banner.prepare().then(() => {
      
    }).catch(e => alert(e));
  }
}

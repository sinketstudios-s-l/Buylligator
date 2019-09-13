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


    platform.ready().then(() => {

      this.platID = platform.is.name

      this.BannerAd()

    })

  }

  BannerAd(){
    let ios = "ca-app-pub-3993710682934611/1104271916"
    let android = "ca-app-pub-3993710682934611/7386802758"

    if(this.platID == "ios"){
      this.platID = ios
    } else {
      this.platID = android
    }

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id: "ca-app-pub-3993710682934611/1104271916"
    };
    this.adModFree.banner.config(bannerConfig);

    this.adModFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }
}

import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded,setTestDeviceIDAsync,isAvailableAsync} from 'expo-ads-admob';


export const displayAd = async() => {
    console.log(await isAvailableAsync())
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
  
  }
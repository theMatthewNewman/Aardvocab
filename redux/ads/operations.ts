import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded,setTestDeviceIDAsync,isAvailableAsync} from 'expo-ads-admob';
import * as Device from 'expo-device';
import { Platform } from "react-native";
import { dataState } from "./dataTypes";

const testID = 'ca-app-pub-3940256099942544/8691691433'

const productionID:any = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-1814005393488222/2771577301',
    // https://developers.google.com/admob/android/test-ads
    android: 'ca-app-pub-1814005393488222~3928447580',
});

const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;

const loadAd = () => async(dispatch:Dispatch) => {
    await AdMobRewarded.setAdUnitID(testID);
    AdMobRewarded.requestAdAsync();
    dispatch<Actions>(actions.loadAd())
}
const playAd = (ad:dataState) => async(dispatch:Dispatch) => {
    if (ad.countDown >0){
        loadAd() (dispatch)
        dispatch<Actions>(actions.setCount(false))
        return;
    } // Test ID, Replace with your-admob-unit-id
    try {
        
        await AdMobRewarded.showAdAsync();
    } catch(error) {
        console.log(error)
    }
    dispatch<Actions>(actions.setCount(true))
    
}

export const adAction = {
    loadAd,
    playAd
}
import { View, StyleSheet, ScrollView, Button } from "react-native";
import { useSelector } from "../../redux/hooks";
import LessonPath from "./lessons/LessonPath/LessonPath";
import Results from "./Results/Results";
import Profile from "./profile/Profile";
import { useEffect } from "react";

import Message from "../componants/Alert/Message";
import {pageAction}from "../../redux/pages";

import Navbar from "../componants/Navbar/Navbar";

//authentication
import {auth} from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Auth/Login";

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';





function Home() {
    const [user] = useAuthState(auth)
    const page = useSelector(state => state.page)

    return ( 
        <View style={styles.container}>
            
            
            {user? 
                <>
                
                <Navbar />
                <View style={styles.pages}>
                    {page.page==="Lessons"? <LessonPath/>: null}
                    {page.page==="Results"? <Results/> : null}
                    {page.page==="Profile"? <Profile/> : null}
                </View>
                
                </>
            :<Login/>}
            <Message message={page.message.message} active={page.message.active} type={page.message.type}/>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'cornflowerblue',
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",


      },
      pages: {
        width:'100%',
        flex:1,
        
        
      }
    })

export default Home;
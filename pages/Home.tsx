import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "../logic/store";
import LessonPath from "./lessons/LessonPath/LessonPath";
import Results from "./Results/Results";
import Profile from "./profile/Profile";

import Navbar from "../componants/Navbar/Navbar";

//authentication
import {auth} from "../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Auth/Login";
import Chat from "./Chat/Chat";



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
                    {page.page==="Chat"? <Chat/>: null}
                </View>
                
                </>
            : <Login/>}
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
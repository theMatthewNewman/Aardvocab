import { Text, StyleSheet, View, Image, Pressable} from "react-native";
import { useState } from 'react';
import LessonBar from "./LessonBar";
import * as middleware from "../logic/pageHandleing/middleware"
import { useDispatch } from "../logic/store";


function Navbar() {
    const [lessonbar, setLessonbar] = useState(false)
    const dispatch = useDispatch()

    const swapState = () => {
        if (lessonbar) setLessonbar(false);
        if (!lessonbar) setLessonbar(true);
    }

    return ( 
        <>
        <View style={styles.navbar}>
            <View style={styles.navElement}>
            <Image style={styles.navImage} source={require('../images/logo.png')} />
            </View>
            <View >
            <Pressable style={styles.navButton} onPress={() => {middleware.changePage("Profile") (dispatch)}} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text>Profile</Text>
            </Pressable>
            </View>
            
            <View >
            <Pressable style={styles.navButton} onPress={() => {middleware.changePage("Testing") (dispatch)}} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text>Testing</Text>
            </Pressable>
            </View>
            <View >
            <Pressable style={styles.navButton} onPress={() => {middleware.changePage("Results") (dispatch)}}android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text>Results</Text>
            </Pressable>
            </View>
            <View >
            <Pressable style={styles.navButton} onPress={swapState} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text>Lessons</Text>
            </Pressable>
            </View>
        </View>
        {lessonbar? <LessonBar pager={setLessonbar}/>: null}
        </>
     );
}
const styles = StyleSheet.create({
    navbar: {
      flexDirection:"row-reverse",
      backgroundColor: 'rgb(255,255,255)',
      alignItems: 'center',
      borderBottomWidth:1,
      borderColor:'rgb(200,200,200)',
      marginTop:20,
      position:'absolute'
    },
    navImage: {
        height:40,
        width:40,
    },
    navButton: {
        top:10,
        marginHorizontal:5,
        paddingHorizontal:15,
        paddingVertical:10,
    },
    navElement: {
        margin: 10,
        top:10,
    }
  });
  

export default Navbar;
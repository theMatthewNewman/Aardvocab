import { View, StyleSheet, Text, TouchableHighlight, ScrollView } from "react-native";
import {size, color} from "../../../../componants/globalStyle"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useState } from "react";




function Info() {
    const [active, setActive] = useState(false);

    const handlePress = () => {
        
        if (expand.value===0){
            expand.value=withTiming(1)
            setActive(true)
        } else{
            expand.value=withTiming(0)
            setActive(false)
        }
        
    }


    const expand = useSharedValue(0)
    const animation = useAnimatedStyle(() => {
        return{
            width:(size.largest-size.medium)+(size.fullWidth-(size.largest-size.medium))*expand.value,
            height:(size.largest-size.medium)+(size.full*expand.value),
            margin:-size.smaller*expand.value,
            borderRadius:(((size.largest-size.medium)/2)-(expand.value*((size.largest-size.medium)/2))),
            padding:size.smaller*expand.value
        }
    })


    return ( 
        <Animated.View style={[styles.box,animation]}>
            <TouchableHighlight onPress={handlePress} style={styles.highlight}>
                <Text style={styles.question}>?</Text>
            </TouchableHighlight>

            {active?
            <View style={styles.textBox}>
                <View style={styles.text}>
                <Text style={styles.title}>-- Hello --</Text>
                <Text style={styles.writ}>I created AardVocab to share my desire to become a better writer.</Text>
                <Text style={styles.writ}>I wanted a way to learn grammar, spelling, and vocabulary, that was more entertaining than a style guide.</Text>
                <Text style={styles.writ}>If you have any suggestions, feel free to reach out to me on social media. Let's make learning grammar fun!</Text>
                </View>
            </View>
            :null}

        </Animated.View>
     );
}

export default Info;

const styles = StyleSheet.create({
    box:{
        backgroundColor:'white',
        position:'absolute',
        right:size.smaller,
        top:size.smaller,
        
    },
    question:{
        color:'white',
        alignSelf:'center',
        fontSize:size.larger,
    },
    highlight:{
        width:(size.largest-size.medium),
        height:(size.largest-size.medium),
        borderRadius:((size.largest-size.medium)/2),
        backgroundColor:color.darkBlue,
        display:'flex',
        justifyContent:'space-evenly'
    },
    textBox:{
        marginTop:size.small,
        padding:size.small,
        backgroundColor:color.darkBlue,
        borderRadius:size.small,
    },
    text:{
        backgroundColor:'white',
        padding:size.smaller,
        margin:size.smaller,
        borderRadius:size.small,
        borderWidth:size.thin,
        
    },
    writ:{
        fontSize:size.small,
        marginBottom:size.small,
        marginHorizontal:size.smallest
    },
    title:{
        fontSize:size.medium,
        margin:size.small,
        color:'cornflowerblue',
        alignSelf:'center',
    }
})
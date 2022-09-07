import { View, StyleSheet, Text, TouchableHighlight, ScrollView, Linking } from "react-native";
import {size, color} from "../../../../componants/globalStyle"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useState } from "react";
import Buttons from "../../../../componants/Buttons/Button";




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
                <Text style={styles.writ}>The process of writing a thoughtfull and compelling narative is a thuroughly enjoyable one,
                                            or at least it should be.</Text>
                <Text style={styles.writ}>I have felt conflicted about my poor spelling and grammar for most of my life.
                                            I would often write simple and uncreative sentences, just to avoid making an error.</Text>
                <Text style={styles.writ}>When I went to find help, the available resources were often lacking.</Text>
                <Text style={styles.writ}>Writing tutors are expensive,
                                            style guids are dull,
                                            and grammar checkers aren't that great at checking grammar.</Text>
                <Text style={styles.writ}>This app is my attempt to build something more entertaining.</Text>
                <View style={styles.links}>
                    <Buttons onPress={() => {Linking.openURL('https://www.facebook.com/profile.php?id=100078253692120')}} title='Twitter' style="Strong"/>
                    <Buttons onPress={() => {Linking.openURL('https://twitter.com/AardVocab')}} title='Facebook' style="Strong"/>
                    <Buttons onPress={() => {Linking.openURL('https://aardvocab.com')}} title='AardVocab.com' style="Strong"/>
                </View>
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
    },
    links:{
        display:'flex',
        flexDirection:'row',
    }
})
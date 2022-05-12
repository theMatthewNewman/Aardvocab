import {View, Text, StyleSheet} from 'react-native';
import {Audio} from 'expo-av';
import { useEffect } from 'react';

type correctType = {
    active:boolean
    setActive:any
}

function CorrectMessage({active, setActive}:correctType) {
    useEffect(() => {
        setTimeout(() => {
            setActive(false)
        }, 1000)
    },[active])

    return ( 
        <View>
            {active?
                <View style={correctStyle.box}>
                    <Text style={correctStyle.text}>Correct!</Text>
                </View>
            : null}
        </View>
     );
}

const correctStyle = StyleSheet.create({
    box:{
        backgroundColor:'#89ff89',
        borderTopWidth:2,
        padding:10,
        position:"absolute",
        bottom:0,
        width:"100%",
        minHeight:100,
    },
    text:{
        color:'black',
        fontSize:30,
    }
})
export default CorrectMessage;
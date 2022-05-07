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
        backgroundColor:'white',
        borderWidth:3,
        borderColor:'mediumseagreen',
        borderRadius:10,
        padding:10,
        margin:20,
    },
    text:{
        color:'mediumseagreen',
        fontSize:20,
    }
})
export default CorrectMessage;
import {View, Text, Image, StyleSheet} from 'react-native';

import {useEffect, useState} from 'react';

type activeType = {
    active:boolean
    setActive:any
}

function IncorrectMessage({active, setActive}:activeType) {

    useEffect(() => {
        setTimeout(() => {setActive(false)},5000)
    },[active])
    
    
    return ( 
        <View>
            {active? 
                <View style={IncorrectStyle.box}>
                    <Text style={IncorrectStyle.text}>Sorry, That Answer was Incorrect.</Text>
                </View>
            : null }
        </View>
     );
}
const IncorrectStyle = StyleSheet.create({
    box:{
        backgroundColor:'white',
        borderWidth:3,
        borderColor:'coral',
        borderRadius:10,
        padding:10,
        margin:20,

    },
    text:{
        color:'coral',
        fontSize:20,

    }
})


export default IncorrectMessage;
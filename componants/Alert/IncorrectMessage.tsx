import {View, Text, Image, StyleSheet} from 'react-native';

import {useEffect, useState} from 'react';

type activeType = {
    active:boolean
    setActive:any
}

function IncorrectMessage({active, setActive}:activeType) {

    useEffect(() => {
        setTimeout(() => {setActive(false)},1000)
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
        backgroundColor:'#ff8989',
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


export default IncorrectMessage;
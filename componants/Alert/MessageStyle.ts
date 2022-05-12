import { StyleSheet } from "react-native"

export const BoxStyle = StyleSheet.create({
    Correct:{
        backgroundColor:'black',
        borderWidth:3,
        borderColor:'mediumseagreen',
        padding:10,
        position:"absolute",
        top:0,
        width:"100%",
    },
    Wrong:{
        backgroundColor:'white',
        borderWidth:3,
        borderColor:'coral',
        borderRadius:10,
        padding:10,
        margin:20,
    },
    default:{

    }
})

export const TextStyle = StyleSheet.create({
    Correct:{
        color:'mediumseagreen',
        fontSize:20,

    },
    Wrong:{
        color:'coral',
        fontSize:20,
    },
    default:{

    }
    
})
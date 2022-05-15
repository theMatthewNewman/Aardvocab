import { StyleSheet } from "react-native"

export const ButtonStyles = StyleSheet.create({
    Nav:{
        paddingHorizontal:15,
        paddingVertical:10, 
    },
    NavSelected:{
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"lightgray",
        borderRadius:5,
    },
    Strong:{
        backgroundColor:'#3c427c',
        alignSelf:'center',
        padding:10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        margin:4,
    },
    default:{
        
    }
})

export const TextStyles = StyleSheet.create({
    Strong:{
        color:'white',
    },
    default:{

    }
})
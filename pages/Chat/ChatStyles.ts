import { StyleSheet } from "react-native"

export const ChatStyles = StyleSheet.create({
    input:{
        borderWidth:2,
        borderColor:'black',
        padding:2,
        borderRadius:5,
        backgroundColor:"lightgray",
        width:"60%",
    },
    enter:{
        backgroundColor:"white",
        position:"absolute",
        width:"100%",
        bottom:0,
        paddingBottom:20,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        
    },
    all:{
        backgroundColor:"red",
        
    },
    img:{
        width:50,
        height:50,
    },
    self:{
        display:"flex",
        flexDirection:"row-reverse",
        alignContent:"flex-end",
        margin:5,
        marginBottom:40,
        marginRight:60,
        backgroundColor:"white",
        borderRadius:20,
        padding:10,
        
    },
    selfText:{
        fontSize:15,
        margin:5,
        marginRight:30,

    },
    other:{
        display:"flex",
        flexDirection:"row",
        alignContent:"flex-end",
        margin:5,
        marginRight:15,
        marginBottom:40,
        backgroundColor:'#3c427c',
        borderRadius:20,
        padding:10,

    },
    otherText:{
        color:"white",
        fontSize:15,
        margin:5,
        marginLeft:30,
    }
})
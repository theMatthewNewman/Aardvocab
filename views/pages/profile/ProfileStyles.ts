import { StyleSheet } from "react-native"

export const ProfileStyles = StyleSheet.create({
    input:{ 
        backgroundColor:"gray",
        borderRadius:10,
        fontSize:25,
        paddingVertical:5,
        paddingHorizontal:5,
        marginBottom:25,
        color:'white',
        textAlign:'center',
    },
    date:{
        textAlign:'center',
    },
    pic:{
        height:130,
        width:130,
        resizeMode:"stretch",
    },
    info:{
        backgroundColor:'lightgray',
        display:"flex",
        flexDirection:'row',
        margin:20,
        padding:25,
        borderRadius:25,
    },
    buttons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    userName:{
        fontSize:25,
        paddingVertical:5,
        marginBottom:25,
        paddingHorizontal:5,
        textAlign:'center',
    },
    about:{
        paddingHorizontal:15,
        flex:1,
        
    }
})
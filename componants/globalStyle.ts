import { StyleSheet } from "react-native";

export const AardVocabBlue = '#3c427c'

export const globalStyling = StyleSheet.create({
    head:{
        backgroundColor:AardVocabBlue,
        color:'white',
        textAlign:'center',
        width:'100%',
        fontSize:25,
        marginBottom:5,
    },
    box:{
        backgroundColor:'white',
        borderWidth:2,
        marginHorizontal:20,
        marginTop:'40%',
        borderRadius:20,
        padding:20,
        paddingTop:0,
    },
    view:{
        display:'flex',
        width:'100%',
        height:'100%',
        backgroundColor:'cornflowerblue',
    },
    promptTitle:{
        color:'white',
        fontSize:30,
        alignSelf:'center',
        marginBottom:20,
        
    },
    answer:{
        fontSize:20,
        alignSelf:'center',
        margin:20,
    },
    textBox:{
        color:'black',
        fontSize:20,
        backgroundColor:'lightgray',
        alignSelf:'center',
        padding:20,
        marginVertical:10,
        width:'90%',
        borderRadius:5,
        borderWidth:2,
        borderColor:'black',

    },
})

export const buttons = StyleSheet.create({
    strong:{
        backgroundColor:AardVocabBlue,
        alignSelf:'center',
        padding:10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        margin:4,
    },
    strongText:{
        color:'white',
        fontSize:20,
    },
    light:{

    },
    small:{

    },
    minimal:{

    },
    MultiChoice:{
        backgroundColor:'white',
        alignSelf:'center',
        padding:10,
        marginVertical:10,
        width:'90%',
        borderRadius:10,
        borderWidth:2,
        borderColor:'black',
    },
    MultiChoiceText:{
        color:'black',
        fontSize:20,
        textAlign:'center',
    },
    
    buildUp:{
        backgroundColor:'white',
        borderRadius:20,
        borderWidth:2,
        borderColor:'black',
        padding:10,
        margin:10,
    },
    buildUpText:{
        color:'black',
        fontSize:20,
        textAlign:'center',
    }
})

export const textInput = StyleSheet.create({
    form:{
        margin:5,
        marginBottom:20,
        borderWidth:2,
        borderColor:'black',
        padding:2,
        borderRadius:5,
    }

})

export const images = StyleSheet.create({
    promptImage:{
        width:150,
        height:150,
        alignSelf:'center',
    }
})

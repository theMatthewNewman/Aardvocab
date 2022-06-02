import { StyleSheet, Dimensions } from "react-native";

export const AardVocabBlue = '#3c427c'

const {height, width} = Dimensions.get("window");

export const size = {
    thin:height/250,
    smallest:height/120,
    smaller:height/90,
    small:height/60,
    medium:height/40,
    large:height/30,
    larger:height/20,
    
    largest:height/10,
    huge:height/8,
    giant:height/5,
    gianter:height/4,
    half:height/2,
    full:height,

    Wthin:width/180,
    Wsmallest:width/30,
    Wsmaller:width/26,
    Wsmall:width/12,
    Wmedium:width/8,
    Wlarge:width/6,
    Wlarger:width/3,
    Whalf:width/2,
    Wlargest:width/1.4,
    Wlargester:width/1.2,

    curve:16,

    fullWidth:width

}
export const color = {
    darkBlue:'#3c427c'
}

const headWidth = (3*width)
export const globalStyling = StyleSheet.create({
    head:{
        backgroundColor:AardVocabBlue,
        alignSelf:'center',
        color:'white',
        textAlign:'center',
        width:headWidth,
        fontSize:25,
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

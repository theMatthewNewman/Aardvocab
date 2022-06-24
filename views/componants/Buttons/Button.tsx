import {View, Text, Pressable,TouchableHighlight, StyleSheet} from 'react-native';
import {size} from "../globalStyle"

type propsType= {
    onPress:any
    style:"Nav" | "NavSelected" | "Strong" | "Choice" |"correct"
    title:string
}

function Buttons(props:propsType) {

    var ButtonStyle = ButtonStyles.default
    var TextStyle = TextStyles.default

    switch (props.style) {
        case "Nav":
            ButtonStyle = ButtonStyles.Nav
        break;
        case "NavSelected": 
            ButtonStyle = ButtonStyles.NavSelected
        break;
        case "Strong": 
            ButtonStyle = ButtonStyles.Strong;
            TextStyle = TextStyles.Strong;
        break;
        case "Choice":
            ButtonStyle = ButtonStyles.Choice;
            TextStyle = TextStyles.Choice;
        break;
        case 'correct':
            ButtonStyle = ButtonStyles.correct;
            TextStyle = TextStyles.correct;
    }

    return (    
        <View>
            {props.style==='correct'|| props.style==='Strong'||props.style==='Choice'?
            <TouchableHighlight onPress={props.onPress} style={ButtonStyle}>
                <View>
                    <Text style={TextStyle}>{props.title}</Text>
                </View>
            </TouchableHighlight>:
            <Pressable onPress={props.onPress} style={ButtonStyle}>
            <View>
                <Text style={TextStyle}>{props.title}</Text>
            </View>
            </Pressable>}
        </View>
     );
}
const ButtonStyles = StyleSheet.create({
    Nav:{
        paddingHorizontal:size.small,
        paddingVertical:size.smaller
    },
    NavSelected:{
        paddingHorizontal:size.small,
        paddingVertical:size.smaller,
        backgroundColor:"lightgray",
        borderRadius:size.smallest,
    },
    Strong:{
        backgroundColor:'#3c427c',
        alignSelf:'center',
        padding:size.smaller,
        borderRadius:size.smallest,
        margin:size.smallest
    },
    Choice:{
        backgroundColor:'white',
        borderRadius:size.smaller,
        borderWidth:size.thin,
        borderColor:'black',
        width:"100%",
        padding:size.smallest,
        
        
    },
    correct:{
        backgroundColor:'#27ae60',
        padding:size.small,
        borderRadius:size.small,
        marginVerticle:size.larger,
        borderWidth:size.thin,

        
    },
    default:{
        
    }
})

const TextStyles = StyleSheet.create({
    Strong:{
        color:'white',
    },
    Choice:{
        textAlign:"center",
        fontSize:size.medium,

    },
    correct:{
        textAlign:"center",
        fontSize:size.large,
        color:"white",
    },
    default:{

    }
})

export default Buttons;
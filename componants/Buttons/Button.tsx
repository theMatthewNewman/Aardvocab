import {View, Text, Pressable, StyleSheet} from 'react-native';


type propsType= {
    onPress:any
    style:"Nav" | "NavSelected" | "Strong" | "Choice"
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
    }

    return (    
        <View>
            <Pressable onPress={props.onPress} style={ButtonStyle}>
                <View>
                    <Text style={TextStyle}>{props.title}</Text>
                </View>
            </Pressable>
        </View>
     );
}
const ButtonStyles = StyleSheet.create({
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
    Choice:{
        backgroundColor:'white',
        borderRadius:10,
        borderWidth:2,
        borderColor:'black',
        width:"100%",
        padding:5,
        
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
        fontSize:20,

    },
    default:{

    }
})
export default Buttons;
import {View, Text, Pressable} from 'react-native';
import {ButtonStyles, TextStyles} from "./ButtonStyles";


type propsType= {
    onPress:any
    style:"Nav" | "NavSelected" | "Strong"
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

export default Buttons;
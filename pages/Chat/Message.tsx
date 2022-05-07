import {View, Text, Image} from "react-native";

import {ChatStyles} from "./ChatStyles";

function Message(props:any){
    const {text, uid, photoURL, displayName} = props.message;
    const selfUid = props.user.uid
  
  
    
    return (
        <View style={uid===selfUid? ChatStyles.self: ChatStyles.other}>
            <Image source={{uri: photoURL }} style={ChatStyles.img}/>
            <View>
                <Text style={uid===selfUid? ChatStyles.selfText: ChatStyles.otherText}>{displayName}</Text>
                <Text style={uid===selfUid? ChatStyles.selfText: ChatStyles.otherText}>{text}</Text>
            </View>
        </View>
    )
  }

  export default Message;
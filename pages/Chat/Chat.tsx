import { View, Text, TextInput, ScrollView } from "react-native";
import {db, fire} from "../../firebase.config";
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore';
import { useState, useRef, useEffect } from "react";

import {useDispatch, useSelector} from "../../logic/store";

import { ChatStyles } from "./ChatStyles";

import Message from "./Message";
import Buttons from "../../componants/Buttons/Button";

function Chat() {
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(8);
    const [formValue, setFormValue] = useState('')
    const user = useSelector(state => state.user)

    const [messages, loading, error] = useCollectionData(query, {idField: 'id'});

    

  const sendMessage = async(e:any) => {
    e.preventDefault();

    await messagesRef.add({
      text:formValue,
      createdAt: fire.firestore.FieldValue.serverTimestamp(),
      uid:user.uid,
      photoURL:user.photoUrl,
      displayName:user.displayName,
    })

    setFormValue('')
    }
    return ( 
        <>  
        <ScrollView>
            {messages? messages.map(msg => <Message message={msg} user={user}/>) : null}
            </ScrollView>
            <View style={ChatStyles.enter}>
            <TextInput style={ChatStyles.input}
                       onChangeText={(msg)=>{setFormValue(msg)}}
                       onSubmitEditing={(event)=>{sendMessage(event)}}/>
            <Buttons title="Post" onPress={(event:any)=>{sendMessage(event)}} style="Strong"/>
            </View>
        </>
     );
}
export default Chat;
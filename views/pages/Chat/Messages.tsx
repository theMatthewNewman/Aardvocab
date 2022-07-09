import produce from 'immer';
import { useState } from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { dataAction } from '../../../redux/data';
import { userMessage } from '../../../redux/data/dataTypes';
import { useSelector, useDispatch } from '../../../redux/hooks'
import { userAction, userState } from '../../../redux/user';
import Buttons from '../../componants/Buttons/Button';
import { size, textInput } from '../../componants/globalStyle';
import { styles } from '../Auth/Signup';
import { leaderStyles } from '../profile/LeaderBoard';

type props = {
    otherUser:userState|{active:false}
}

function Messages({otherUser}:props) {
    const messages = useSelector(state  => state.graph.messages)
    const user = useSelector(state => state.user)
    const [active, setActive] = useState(false)
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessage=async() => {
        
        if (!otherUser.active){return;}
        
        const sentMessage = produce(messages, draft => {
        var newMessage:userMessage={
            uid:otherUser.uid,
            sent:true,
            message,
            displayName:otherUser.displayName,
            photoURL:otherUser.photoURL
        }
        if (draft.active){
            draft.messages.push(newMessage)
        }
        if (!draft.active){
            draft = {active:true, messages:[newMessage]}
        }
        
        return(draft);
        })
        const receivedMessage = produce(sentMessage, draft => {
            if (!draft.active ||!sentMessage.active){return(draft)}
            draft.messages = sentMessage.messages.map(message => {
                return({
                    uid:user.uid,
                    sent:!message.sent,
                    message:message.message,
                    photoURL:user.photoURL,
                    displayName:user.displayName
                })
            })
        return(draft);
        })
        dataAction.setMessagesFirebase(otherUser, receivedMessage)
        await dataAction.setMessagesFirebase(user,sentMessage)
        setMessage('')
        dataAction.updateData(user) (dispatch)
        

    }
    

    return ( 
        <View style={otherUser.active?{...leaderStyles.all, marginBottom:size.giant, flex:1,display:'flex'}:{...leaderStyles.all,flex:1,marginBottom:size.half}}>
            <View style={messageStyles.all}>
            {user.uid==='QZ4DAXWWJcdywxbxoidHphggR4F3'? 
                <>
                    <Text style={messageStyles.select}>Log into an account to use chat.</Text>
                </>:
                <>
                {otherUser.active? 
                    <>
                        <View style={messageStyles.otherUser}>
                            <Image source={{uri:otherUser.photoURL}} style={leaderStyles.image}/>
                            <Text style={messageStyles.name}>{otherUser.displayName}</Text>
                        </View>
                        {messages.active?
                        <ScrollView style={messageStyles.text}>
                            {messages.messages.filter((message) => {return(message.uid===otherUser.uid||message.uid===user.uid);}).slice(-10).map((message, index) => 
                                <Text key={index} style={message.sent? messageStyles.sent: messageStyles.received}>{message.message}</Text>
                            )}
                        </ScrollView>
                        :null}
                        <View style={messageStyles.input}>
                            <TextInput value={message} onChangeText={(e) => {setMessage(e)}} style={{...textInput.form, flex:1,marginVertical:size.smaller}}/>
                            <Buttons onPress={sendMessage} style='Strong' title="Send Message"/>
                        </View>
                    </>
                    :
                    <Text style={messageStyles.select}>Select a person to have a conversation.</Text>
                }
                </>
                }
            
            </View>
        </View>
     );
}

export default Messages;

const messageStyles = StyleSheet.create({
    all:{
        marginTop:size.small,
        backgroundColor:'white',
        flex:1,
        borderRadius:size.curve,
        display:'flex',
        justifyContent:'space-between',
    
    
    },
    sent:{
        textAlign:'right',
        fontSize:size.small,
        marginVertical:size.thin,
        marginHorizontal:size.small,
        backgroundColor:'cornflowerblue',
        color:'white',
        paddingHorizontal:size.small,
        paddingVertical:size.smallest,
        maxWidth:size.Whalf,
        alignSelf:'flex-end',
        borderRadius:size.smallest,
    },
    received:{
        fontSize:size.small,
        marginVertical:size.thin,
        marginHorizontal:size.small,
        backgroundColor:'lightgrey',
        paddingHorizontal:size.small,
        paddingVertical:size.smallest,
        maxWidth:size.Whalf,
        alignSelf:'flex-start',
        borderRadius:size.smallest,

    },
    input:{
        display:'flex',
        flexDirection:'row',
        aligncontent:'center',
    },
    otherUser:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:size.small,
        backgroundColor:'lightgray',
        borderTopLeftRadius:size.curve,
        borderTopRightRadius:size.curve,
        borderBottomWidth:size.thin,
    },
    name:{
        fontSize:size.large
    },
    text:{
        
        overflow:'hidden',
        
    },
    select:{
        fontSize:size.large,
        textAlign:'center',
        margin:size.medium,
        backgroundColor:'yellow',
        padding:size.small,
        borderRadius:size.curve,
        borderWidth:size.thin
    }
})
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "../../../redux/hooks";
import { color, size } from "../../componants/globalStyle";
import {userAction, userState} from "../../../redux/user"

import Buttons from "../../componants/Buttons/Button";
import {pageAction, pageState} from "../../../redux/pages";
import {useDispatch} from "../../../redux/hooks";

type props = {
    action:any
    type:'Send message'
}|{
    action:'View profile'
    type:'View profile'
}

function LeaderBoard({action,type}:props) {
    const users = useSelector(state => state.graph)
    const dispatch =useDispatch()

    return ( 
        <View style={leaderStyles.all}>
            <Text style={leaderStyles.head}>Leader Board</Text>
            <View style={leaderStyles.board}>
            {users.dailyTopUsers.map((value, index:number) => 
                <View key={index} style={leaderStyles.user}>
                    <>
                        <Image source={{uri:value.photoURL}} style={leaderStyles.image}/>
                        <Text style={leaderStyles.name}>{value.displayName}</Text>
                        
                        
                        <View style={leaderStyles.button}>
                            {type==='View profile'?
                                <Buttons style="Strong" onPress={() => {userAction.setOtherUser(value.uid) (dispatch);pageAction.changePage("OtherProfile") (dispatch)}} title='View profile'/>
                            : null}
                            {type==="Send message"?
                                <Buttons style="Strong" onPress={() => {action(value)}} title='Send Message'/>
                            : null}
                            <Text style={leaderStyles.xp}>{users.dailyTopUsers[index].time*15}xp</Text>
                        </View>
                        
                    </>
                </View>

            )}
            </View>
        </View>
     );
}

export default LeaderBoard;

export const leaderStyles=StyleSheet.create({
    title:{
        fontSize:size.huge
    },
    image:{
        height:size.larger,
        width:size.larger,
        resizeMode:'contain'
    },
    all:{
        backgroundColor:color.darkBlue,
        margin:size.small,
        padding:size.small,
        borderRadius:size.curve,
        marginBottom:size.giant,
    },
    head:{
        color:'white',
        fontSize:size.large,
        textAlign:'center'
    },
    board:{
        backgroundColor:'white',
        padding:size.small,
        borderRadius:size.curve,
        borderWidth:size.thin,
    
    },
    user:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:size.smaller,
        borderBottomWidth:size.thin,
        borderColor:'lightgray'
    },
    name:{
        fontSize:size.medium,
        marginHorizontal:size.smaller,
        maxWidth:size.huge
    },
    button:{
        flex:1,
        display:'flex',
        flexDirection:'row-reverse',
        alignItems:'center',
        
    },
    xp:{
        fontSize:size.medium,
        color:'purple',
    }
})
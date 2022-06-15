import { useState } from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native'
import {Prompt, shuffleArray} from '../../../../../../redux/lessons';
import Buttons from '../../../../../componants/Buttons/Button';
import {size} from '../../../../../componants/globalStyle';
import {pageAction} from '../../../../../../redux/pages';
import {useDispatch, useSelector} from '../../../../../../redux/hooks';
import {Audio} from 'expo-av';
import {userAction} from '../../../../../../redux/user'

type input = {
    prompt:Extract<Prompt, {type:"match"}>
}

function Match({prompt}:input) {
    const [active, setActive] = useState({id:0, type:'deactive'})
    const [oldIndex, setOldIndex] =useState(0)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [from, setFrom]:any = useState(shuffleArray(prompt.match.map(obj => {
        return(obj.from)
    })))

    const [to, setTo]:any = useState(shuffleArray(prompt.match.map(obj => {
        return(obj.to)
    })))

    const handlePress = async(id:number, type:string, index:number) => {
        if (active.type===type){
            setActive({id:0,type:'deactive'})
            return;
        }
        if (active.type==='deactive'){
            setActive({id,type})
            setOldIndex(index)
            return;
        }
        if (active.id!==id){
            console.log(active,id,type)
            userAction.loseHeart(user) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Wrong.mp3')
            );
            sound.playAsync();
            return;
        }
        if (active.id===id && type==='from'){
            from.splice(index,1)
            to.splice(oldIndex,1)
            setActive({id:0,type:'deactive'})
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Correct.mp3')
            );
            sound.playAsync();
        }
        if (active.id===id && type==='to'){
            from.splice(oldIndex,1)
            to.splice(index,1)
            setActive({id:0,type:'deactive'})
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Correct.mp3')
            );
            sound.playAsync();
        }
        if (from.length===0){
            pageAction.updateMessage({active:true, type:"correct"}) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Correct.mp3')
            );
            sound.playAsync();
        }

    }

    return ( 
        <View style={styles.all}>
            <View style={styles.column}>
                {from.map((choice:any, id:number) => 
                    <Pressable key={id} onPress={() =>{handlePress(choice.id,'from',id)}} style={active.type==='from'&& active.id===choice.id? styles.choiceActive:styles.choice}>
                        <Text style={styles.choiceText}>{choice.title}</Text>
                    </Pressable>
                )}
            </View>
            <View style={styles.column}>
                {to.map((choice:any, id:number) => 
                    <Pressable key={id} onPress={() =>{handlePress(choice.id,'to',id)}} style={active.type==='to'&& active.id===choice.id? styles.choiceActive:styles.choice}>
                        <Text style={styles.choiceText}>{choice.title}</Text>
                    </Pressable>
                )}
            </View>
        </View>
     );
}

export default Match;

const styles = StyleSheet.create({
    all:{
        justifyContent:'space-evenly',
        flexDirection:'row',
    },
    choice:{
        backgroundColor:'white',
        borderRadius:size.smaller,
        borderWidth:size.thin,
        borderColor:'black',
        padding:size.smallest,
        width:size.Wlarger+size.Wmedium,
    },
    choiceText:{
        fontSize:size.medium,
        alignSelf:'center',
    },
    column:{
        display:'flex',
        justifyContent:'space-evenly',
        height:size.half+size.huge,
        marginTop:size.large
    },
    choiceActive:{
        backgroundColor:'grey',
        borderRadius:size.smaller,
        borderWidth:size.thin,
        borderColor:'black',
        padding:size.smallest,
        width:size.Wlarger+size.Wmedium,
    }

})
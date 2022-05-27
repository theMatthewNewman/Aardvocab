import { View } from "react-native";
import {size} from "../../../../componants/globalStyle";

type progressType = {
    progress:number
}

function ProgressBar({progress}:progressType) {
    return ( 
    <View style={{
        margin:size.small,
        backgroundColor:'lightgray',
        height:size.small,
        borderRadius:size.smaller,}}>

        <View style={{
            height:size.small,
            backgroundColor:'#3c427c',
            width:`${progress}%`,
            borderRadius:size.smaller,}}>
        </View>
    </View>
     );
}

export default ProgressBar;
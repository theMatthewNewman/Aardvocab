import {View, Text, Image, StyleSheet} from "react-native";
import { LineChart} from 'react-native-chart-kit'
import { useSelector } from "../../../../redux/hooks";


import { chartConfig} from "../../../../redux/graphs"
import {useState} from 'react'

import { size } from "../../../componants/globalStyle";



const LessonGraph = () => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    const data = useSelector(state => state.graph.bucketedLevels);
    const selfIndex = useSelector(state => state.graph.selfIndex)
    const user = useSelector(state => state.user);
    

    

    return(
        <> 
        
        <View style={styles.graph}>
        <View style={styles.graphicVert}>
            <View style={styles.graphicHoriz} >
                
                <Text style={{fontSize:size.Wsmallest}}>Number of Users</Text>
            <LineChart
                data={{labels:[""],datasets:[{data}]}}
                width={size.Wlargest}
                withHorizontalLines={false}
                withVerticalLines={false}
                height={size.Wlarger + size.Wlarge}
                fromZero={false}
                getDotColor={(dataPoint, dataPointIndex) => {
                    if(dataPointIndex === selfIndex) 
                    return 'red';
                    else  return 'rgb(1,1,1,0)';
                }}
                chartConfig={chartConfig}
                style={{
                    paddingBottom:-size.Wsmallest,
                    borderRadius:size.curve
                    
                }}></LineChart>
            </View>
            <Text style={styles.xLabel}>Levels Completed</Text>
            </View>
            
            <View style={styles.key}>
            <Image style={styles.dot} source={require('../../../../images/userDot.png')}/>
            <Text style={styles.note}>Your Current Level</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({

    graph:{
        alignItems:'center',
        backgroundColor:'#3c427c',
        margin:size.Wsmaller,
        padding:size.Wsmaller,
        borderRadius:size.curve,
    },
    graphicHoriz:{
        backgroundColor:'white',
        borderRadius: size.curve,
        display:"flex",
        alignItems:"center",
        justifyContent:'space-evenly'

    },
    graphicVert:{
        borderRadius: size.curve,
        borderWidth:size.Wthin,
        backgroundColor:'white',
        width:size.Wlargester
    },
    xLabel:{
        textAlign:'center',
        marginBottom:size.Wsmall,
        fontSize:size.Wsmallest

    },
    dot:{
        height:size.medium,
        width:size.medium,
        resizeMode:'contain',
        marginTop:size.smallest,
        marginHorizontal:size.smaller
    },
    key:{
        display:'flex',
        flexDirection:'row',
    },
    note:{
        color:"white",
        fontSize:size.medium,
    }
})

export default LessonGraph;
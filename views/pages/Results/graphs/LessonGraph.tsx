import {View, Text, Image, StyleSheet} from "react-native";
import { LineChart} from 'react-native-chart-kit'
import { useSelector } from "../../../../redux/hooks";


import { chartConfig} from "../../../../redux/graphs"
import {useState} from 'react'




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
                
                <Text style={{
                transform: [{ rotate: '-90deg' },
                            { translateY: (70) }],
                marginRight:-80
                }}>Number of Users</Text>
            <LineChart
                data={{labels:[""],datasets:[{data}]}}
                width={300}
                withHorizontalLines={false}
                withVerticalLines={false}
                height={220}
                fromZero={false}
                getDotColor={(dataPoint, dataPointIndex) => {
                    if(dataPointIndex === selfIndex) 
                    return 'red';
                    else  return 'rgb(1,1,1,0)';
                }}
                chartConfig={chartConfig}
                style={{
                    paddingTop:10,
                    paddingHorizontal:8,


                    
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
        margin:10,
        paddingVertical:8,
        borderRadius:16
    },
    graphicHoriz:{
        backgroundColor:'white',
        borderRadius: 16,
        display:"flex",
        flexDirection:"row",
        maxWidth:'100%'
    },
    graphicVert:{
        borderRadius: 16,
        borderWidth:3,
        backgroundColor:'white',
    },
    xLabel:{
        textAlign:'center',
        marginBottom:20,
        marginTop:-20,

    },
    dot:{
        height:20,
        width:20,
        marginRight:10,
    },
    key:{
        display:'flex',
        flexDirection:'row',
        marginVertical:5
    },
    note:{
        color:"white",
        fontSize:15,
    }
})

export default LessonGraph;
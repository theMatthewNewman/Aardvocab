import {View, Text, Dimensions, Image} from "react-native";
import { LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit'
import LessonGraph from "./ProgressCharts/LessonGraph";
import { Slider } from 'react-native';

const Results = () => {


    return(
        <View>
          <LessonGraph/>
        </View>
          )
}

export default Results;
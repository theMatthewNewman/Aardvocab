import {View, Text, Dimensions, Image} from "react-native";
import { LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit'
import LessonGraph from "./ProgressCharts/LessonGraph";


const Results = () => {


    return(
        <View>
          <LessonGraph/>
        </View>
          )
}

export default Results;
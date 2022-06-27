import { userState } from "../user";
import { gLesson } from "./dataTypes";


export const shuffleArray = (originalArray:any) => {
  var array = [].concat(originalArray);
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const checkActive = (user:userState, lesson:gLesson) => {
          
if (user.lessonData[lesson.id].percentage>=100){
    return(false);
}

switch(lesson.concept){
    case 'Grammar':{
        if (lesson.level<=user.grammarLevel){
            return(true);
        }
        return(false);
    }
    case 'Pros':{
        if (lesson.level<=user.prosLevel){
            return(true);
        }
        return(false);
    }
    case 'Spelling':{
        if (lesson.level<=user.spellingLevel){
            return(true);
        }
        return(false);
    }
    case 'Vocabulary':{
        if (lesson.level<=user.vocabLevel){
            return(true);
        }
        return(false);
    }
    case 'any':{
        if (lesson.level<=user.level){
            return(true);
        }
        return(false);
    }
  }
}

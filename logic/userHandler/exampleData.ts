import { userState } from "./types";



export const exampleUser:userState = {
    uid:"exampleUser1",
    displayName:"Aarty",
    email:"example@email.com",
    photoUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1",
    emailVerified:true,
    phoneNumber:"anon",
    createdAt:new Date(),
    datasets:{
        lessonResults:[],
        lessonProgress:0,

    },
    hearts:5,
}

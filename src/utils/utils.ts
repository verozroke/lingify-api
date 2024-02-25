import { GetChatCompletionAnswerInputDTO } from "src/chat-completion-api/model/chat-completion-answer.dto"

export const generatePrompt = ({ courseName, keyWords, lessonDescription, lessonName, userInfo }: GetChatCompletionAnswerInputDTO) => {
  return `

    
    You need to create 5 questions for the quiz based on the information that i will provide you. 
    My app is language-learning system and you need to generate me this array based on Course name: ${courseName}, 
    lessonName: ${lessonName}, 
    lessonDescription: ${lessonDescription}, 
    keyWords: ${keyWords}. 
    If you going to get the same message, don't repeat the questions. 
    Also, i want to give you a salt, so that your response will be 100% unique. Information about user: ${userInfo}

    Type of object: 
    {
        question: string,
        correctAnswer: string,
        selectedVariant: string,
        variants: {
            letter: 'A' | 'B' | 'C' | 'D' ,
            answer: string
        }[]
    }
    
    DO NOT GENERATE ME ANY TEXT BEFORE AND GENERATE WHOLE JSON ARRAY
    GENERATE TEXT IN RUSSIAN
    correctAnswer MUST BE A LETTER
    selectedVariant IS ALWAYS EMPTY STRING
    FIELD NAMES MUST BE VALID TO JSON AND HAVE DOUBLE-QUOTES
  `
}
import {
  CreateLessonsGetChatCompletionAnswerInputDTO,
  CreateMaterialsGetChatCompletionAnswerInputDTO,
  CreateTestGetChatCompletionAnswerInputDTO,
} from "src/chat-completion-api/dto/chat-completion-answer.dto";

export type PromptBody =
  | CreateLessonsGetChatCompletionAnswerInputDTO
  | CreateMaterialsGetChatCompletionAnswerInputDTO
  | CreateTestGetChatCompletionAnswerInputDTO;

const propmts = {
  Lessons: generateLessons,
  Materials: generateMaterials,
  Test: generateTest,
};

export const generatePrompt = (modelName: string, data: PromptBody) =>
  propmts[modelName](data);

export function generateLessons({
  courseLanguage,
  languageLevel,
  nativeLanguage,
}: CreateLessonsGetChatCompletionAnswerInputDTO): string {
  return `
    You need to create 5 lessons based on the information that i will provide you. 
    My app is language-learning system and you need to generate me this array based on Course language: ${courseLanguage}, 
    languageLevel: ${languageLevel}
    Type of object: 

    {
        name: string,
        description: string,
        keyWords: string
    }

    DO NOT GENERATE ME ANY TEXT BEFORE AND GENERATE WHOLE JSON ARRAY
    GENERATE TEXT IN ${nativeLanguage}
    NAME MUST BE THE TOPIC OF THE LESSON
    DESCRIPTION MUST BE THE TEXT EXPLAINING THE TOPIC OF THE LESSON. 10-20 words
    FIELD NAMES MUST BE VALID TO JSON AND HAVE DOUBLE-QUOTES
    ADD BACKSLASHES IN FROM OF DOUBLE QUOTES AND SINGLE QOUTES INSIDE THE VALUE OF THE KEY
  `;
}

export function generateMaterials({
  courseName,
  keyWords,
  lessonDescription,
  lessonsName,
  nativeLanguage,
}: CreateMaterialsGetChatCompletionAnswerInputDTO): string {
  return `
    You need to create 5 materials based on the information that i will provide you. 


    My app is language-learning system and you need to generate me this array based on Course name: ${courseName}, 
    lessonName: ${lessonsName}, 
    lessonDescription: ${lessonDescription}, 
    keyWords: ${keyWords}. 

    Type of object: 
    {
        name: string,
        description: string,
    }
    DO NOT GENERATE ME ANY TEXT BEFORE AND GENERATE WHOLE JSON ARRAY
    GENERATE TEXT IN ${nativeLanguage}
    NAME MUST BE THE TOPIC OF THE MATERIAL
    DESCRIPTION MUST BE THE TEXT EXPLAINING THE TOPIC OF THE MATERIAL. MINIMUM 200 words on description
    FIELD NAMES MUST BE VALID TO JSON AND HAVE DOUBLE-QUOTES
    ADD BACKSLASHES IN FROM OF DOUBLE QUOTES AND SINGLE QOUTES INSIDE THE VALUE OF THE KEY
  `;
}

export function generateTest({
  courseName,
  lessonName,
  lessonDescription,
  nativeLanguage,
  keyWords,
  userInfo,
}: CreateTestGetChatCompletionAnswerInputDTO): string {
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
      GENERATE TEXT IN ${nativeLanguage}
      correctAnswer MUST BE A LETTER
      selectedVariant IS ALWAYS EMPTY STRING
      FIELD NAMES MUST BE VALID TO JSON AND HAVE DOUBLE-QUOTES
  `;
}

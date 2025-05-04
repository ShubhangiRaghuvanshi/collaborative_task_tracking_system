const {GoogleGenAI} = require("@google/genai");
const dotenv=require('dotenv');
dotenv.config();
const ai=new GoogleGenAI({
    apiKey:process.env.API_KEY,
  
});
async function generateTaskDescription(prompText)
{
    try{
    const response=await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:prompText,
    });
    console.log('AI response:', response);  
   return response.text;
}
catch(error)
{
    console.error('Error generating task description:', error);
    throw new Error('Failed to generate task description');
}
}
module.exports={
    generateTaskDescription
}
// import { useEffect, useState } from "react";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// const useTranslate = ( sourceText, selectedLanguage ) => {
//   const [targetText, setTargetText] = useState("");

//   useEffect(() => {
//     const handleTranslate = async (sourceText) => {
//       try {
//         const response = await openai.chat.completions.create({
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "user",
//               content: `You will be provided with a sentence. This sentence : ${sourceText}.
//                Your Task are to:
//                -detect what language the sentence is in
//                -translate the sentence into ${selectedLanguage} langugae
//                do not return anything else other than the translated sentence`,
//             },
//           ],
//         });
//         const data = response.choices[0].message.content;
//         setTargetText(data);
//       } catch (error) {
//         console.log("Error translating text", error);
//       }
//     };

//     if (sourceText.trim()) {
//       const timeoutId = setTimeout(() => {
//         handleTranslate(sourceText);
//       }, 500);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [sourceText, selectedLanguage]);

//   return targetText;
// };

// export default useTranslate;

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        const prompt = ` You will be provided with a sentence. 
        Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}.
              Do not return anything other than the translated sentence.
              The sentence is : 
              ${sourceText}. `;
        const result = await model.generateContent(prompt);
        const data = result.response.text();
        setTargetText(data);
      } catch (error) {
        
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 1500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;

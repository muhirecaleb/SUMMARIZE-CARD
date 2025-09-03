import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";



export const processFile = async (file, setErrorMessage, setisLoading,setStorage,navigate) => {
  
  

  if (!file) return;
  setErrorMessage(false);
  setisLoading(true);

  const API_KEY = "" //put your GEMINI API HERE
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    let parts = [];

    if (file.size <= 20 * 1024 * 1024) {
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64String,
        },
      });
    } else {
      const uploadResponse = await genAI.files.upload({
        file: file,
        config: {
          mimeType: file.type,
          displayName: file.name,
        },
      });

      parts.push({
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          uri: uploadResponse.file.uri,
        },
      });
    }

    const result = await model.generateContent([
      {
        text: `
You are a summarization assistant.

Summarize the uploaded document into key sections and give good example.

For each section, return the output in this exact structure:
- title: [short heading]
- description: [4–7 sentence summary]
- category: [the most relevant and specific subject/category for the content in this section. For example, if the section is about integration in mathematics, use "calculus". If it's about APIs in Node.js, use "node.js" or "API design". If it's a business strategy, use "business strategy". Choose the most precise category that fits.]

Be as specific as possible with the category. Use real-world technical or academic fields, such as:
"algebra", "calculus", "statistics", "machine learning", "history", "biology", "node.js", "react", "api design", "php", "sql", "mongodb", "project planning", "software architecture", "business strategy", "marketing", "finance", "exam preparation", "backend design", "frontend development", etc.


Respond ONLY with a valid JSON array.

Do NOT include any code blocks, markdown formatting, or backticks.
And also the category or the subject for example if it is about math put math as the category

Output example:
[
  {
    "title": "Introduction to Cloud Computing",
    "description": "This section introduces the concept of cloud computing, explaining the benefits of on-demand computing resources and different deployment models like public, private, and hybrid clouds.",
    "category": "cloud computing"
  },
  {
    "title": "Benefits of Microservices Architecture",
    "description": "This section highlights the advantages of microservices, including independent deployment, improved scalability, and easier maintenance compared to monolithic applications.",
    "category": "software architecture"
  }
]
`,
      },
      ...parts,
    ]);

    const responseText = await result.response.text();
    const cleanText = JSON.parse(
      responseText.replace(/```json|```/g, "").trim()  
    );

    const cardsWithId = cleanText.map((card) => ({
      id: crypto.randomUUID(),
      ...card,
    }));

    const localCards = JSON.parse(localStorage.getItem("cards")) || [];

    // const updatedLocalStorage = localCards.length === 0 ? [...cardsWithId] : [[...localCards],[...cardsWithId]]
    const updatedLocalStorage =
      localCards.length === 0
        ? [
            {
              unique: crypto.randomUUID(),
              summary: [...cardsWithId],
            },
          ]
        : [
            ...localCards,
            {
              unique: crypto.randomUUID(),
              summary: [...cardsWithId],
            },
          ];

    localStorage.setItem("cards", JSON.stringify(updatedLocalStorage));
    setStorage(JSON.parse(localStorage.getItem("cards") || []))

     const firstCardId = updatedLocalStorage.at(-1).unique;
    navigate(`/cards/${firstCardId}`);
   toast.success('Cards are created successful')

    setisLoading(false);
  } catch (e) {
    console.log(e);
    setisLoading(false);
    setErrorMessage(true);
  }
};

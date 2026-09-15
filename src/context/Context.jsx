import { createContext, useState } from "react";
import runChat from "../config/aivora";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setRecentPrompt("");
    setResultData("");
  };

  const onSent = async (prompt) => {

    const currentPrompt = prompt?.trim() || input?.trim();

    if (!currentPrompt) {
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    // Add prompt to recent prompts
    setPrevPrompts((prev) => {
      // Prevent duplicate prompts
      if (prev.includes(currentPrompt)) {
        return prev;
      }

      return [...prev, currentPrompt];
    });

    try {

      const response = await runChat(currentPrompt);

      if (!response) {
        throw new Error("No response received from Gemini.");
      }

      /*
       * Convert Gemini markdown-style formatting
       * into plain readable text.
       *
       * We intentionally don't use dangerouslySetInnerHTML
       * because Main.jsx renders resultData as normal text.
       */

      let formattedResponse = response;

      // Remove bold markdown
      formattedResponse = formattedResponse.replace(
        /\*\*(.*?)\*\*/g,
        "$1"
      );

      // Convert single-star emphasis to normal text
      formattedResponse = formattedResponse.replace(
        /(?<!\*)\*(?!\*)/g,
        ""
      );

      setResultData(formattedResponse);

    } catch (error) {

      console.error("Chat Error:", error);

      /*
       * Display a user-friendly error instead of
       * allowing an uncaught promise error.
       */

      if (error?.status === 429 || error?.code === 429) {

        setResultData(
          "⚠️ Gemini API quota exceeded. Please wait and try again later."
        );

      } else if (
        error?.status === 503 ||
        error?.code === 503
      ) {

        setResultData(
          "⚠️ Gemini is temporarily busy. Please try again in a few moments."
        );

      } else {

        setResultData(
          "⚠️ Something went wrong while contacting Gemini."
        );
      }

    } finally {

      setLoading(false);
      setInput("");

    }
  };

  const contextValue = {
    input,
    setInput,

    recentPrompt,
    setRecentPrompt,

    prevPrompts,
    setPrevPrompts,

    showResult,
    setShowResult,

    loading,
    setLoading,

    resultData,
    setResultData,

    onSent,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
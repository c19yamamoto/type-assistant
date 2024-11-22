import { ChangeEvent, useEffect, useState } from "react";
import { TypeAssistantPresenter } from "./presenter";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GPT_MODEL = import.meta.env.VITE_GPT_MODEL;

export const TypeAssistantContainer = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [timer, setTimer] = useState<number | null>(null);
  const [tabPressed, setTabPressed] = useState<boolean>(false);

  if (!OPENAI_API_KEY) {
    return <h1>OpenAI API key not found</h1>
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        if (generatedText) {
          setCurrentText((prevText) => prevText + generatedText);
          setGeneratedText("");
          setTabPressed(true);
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [generatedText]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    if (!tabPressed) {
      setTimer(window.setTimeout(() => handleGeneration(currentText), 2000));
    } else {
      setTabPressed(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentText]);

  const handleGeneration = async (text: string) => {
    try {
      const APIBody = {
        model: GPT_MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content:
              "Keyboard typing in progress. Predicting one common following string of characters down to the punctuation.(Complete the sentence with a period or comma.), target:" +
              text,
          },
        ],
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify(APIBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedText(data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (tabPressed) {
      setTabPressed(false);
    }
    setCurrentText(e.target.value);
  };

  return (
    <TypeAssistantPresenter
      currentText={currentText}
      generatedText={generatedText}
      onChange={handleChange}
    />
  );
};

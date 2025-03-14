import { useState, useEffect, useRef } from "react";
import { getText } from "./api/getText";
import "./App.css";

const App = () => {
  // const API_KEY = import.meta.env.VITE_API_KEY;
  const [text, setText] = useState("");
  const [writtenValue, setWrittenValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchText = async () => {
      const data = await getText("business", "words", 150);
      if (data) {
        setText(data);
      }
    };

    fetchText();

    //   const response = axios
    //     .get("https://randommer.io/api/Text/LoremIpsum", {
    //       params: {
    //         loremType: "business",
    //         type: "words",
    //         number: 50,
    //       },
    //       headers: {
    //         accept: "*/*",
    //         "X-Api-Key": API_KEY,
    //       },
    //     })
    //     .then((response) => setText(response.data))
    //     .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Start timer when user types
  useEffect(() => {
    if (writtenValue.length === 1 && !startTime) {
      let start = Date.now();
      setStartTime(start);

      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - start);
      }, 10);
    }

    return () => {
      if (isFinished) clearInterval(timerRef.current);
    };
  }, [writtenValue, startTime]);

  //calculate words per minutes and accuracy
  useEffect(() => {
    const wordsTyped = writtenValue.trim().split(/\s+/).length;
    const minutes = elapsedTime / 60000;
    if (minutes > 0) {
      setWPM(Math.round(wordsTyped / minutes));
    }

    //Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < writtenValue.length; i++) {
      if (text[i] === writtenValue[i]) {
        correctChars++;
      }
    }

    if (writtenValue.length > 0) {
      setAccuracy(((correctChars / writtenValue.length) * 100).toFixed(2));
    } else {
      setAccuracy(100);
    }

    if (writtenValue && writtenValue === text) {
      setIsFinished(true);
      clearInterval(timerRef.current);
    }
  }, [writtenValue, elapsedTime]);

  const finishTest = () => {
    setIsFinished(true);
    clearInterval(timerRef.current);
  };

  const resetTest = () => {
    setWrittenValue("");
    setStartTime(null);
    setElapsedTime(0);
    setWPM(0);
    setAccuracy(100);
    setIsFinished(false);
    clearInterval(timerRef.current);
  };

  return (
    <div className="main-wrapper">
      <h2>Typing Speed Test</h2>
      <p className="inputText">
        {text.split("").map((char, index) => {
          let color = "black";
          if (index < writtenValue.length) {
            color = writtenValue[index] === char ? "black" : "red";
          }
          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>
      <textarea
        rows="4"
        value={writtenValue}
        onChange={(e) => setWrittenValue(e.target.value)}
        disabled={isFinished}
        placeholder="Start typing..."
      ></textarea>
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Time:</strong> {(elapsedTime / 1000).toFixed(2)}s
        </p>
        <p>
          <strong>Words Per Minute:</strong> {WPM}
        </p>
        <p>
          <strong>Accuracy:</strong> {accuracy}%
        </p>
        {isFinished && (
          <p style={{ color: "green", fontWeight: "bold" }}>Test Complete!</p>
        )}
      </div>
      <button onClick={resetTest}>Reset Test</button>
      {writtenValue && !isFinished && (
        <button onClick={finishTest}>Finish Test</button>
      )}
    </div>
  );
};

export default App;

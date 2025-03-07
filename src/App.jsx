import { useState, useEffect } from "react";
import { getText } from "./api/getText";
import "./App.css";

const App = () => {
  // const API_KEY = import.meta.env.VITE_API_KEY;
  const [text, setText] = useState("");
  const [writtenValue, setWrittenValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

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
      setStartTime(Date.now());

      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [writtenValue]);

  //calculate words per minutes and accuracy
  useEffect(() => {
    const wordsTyped = writtenValue.trim().split(" ").length;
    const minutes = timer / 60;
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

    // Check if test is complete
    if (writtenValue >= 1 && writtenValue === text) {
      setIsFinished(true);
    }
  }, [writtenValue, timer]);

  const resetTest = () => {
    setWrittenValue("");
    setStartTime(null);
    setTimer(0);
    setWPM(0);
    setAccuracy(100);
    setIsFinished(false);
  };

  return (
    <div className="main-wrapper">
      <div>
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
      </div>
      <div>
        <textarea
          rows="4"
          value={writtenValue}
          onChange={(e) => {
            setWrittenValue(e.target.value);
          }}
          disabled={isFinished}
          placeholder="start typing.................."
        ></textarea>
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Time:</strong> {timer}s
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
      </div>
    </div>
  );
};

export default App;

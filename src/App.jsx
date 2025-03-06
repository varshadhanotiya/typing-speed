import { useState, useEffect } from "react";

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [text, setText] = useState("");
  const [writtenValue, setWrittenValue] = useState("");

  useEffect(() => {
    fetch(
      "https://randommer.io/api/Text/LoremIpsum?loremType=business&type=words&number=200",
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "X-Api-Key": API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setText(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div>
        <h2>Typing Speed Test</h2>
        <p>{text}</p>
      </div>
      <div>
        <textarea
          value={writtenValue}
          onChange={(e) => {
            setWrittenValue(e.target.value);
          }}
          placeholder="start typing.................."
        ></textarea>
      </div>
    </div>
  );
};

export default App;

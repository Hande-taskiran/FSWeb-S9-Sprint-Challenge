import React, { useState } from "react";

// önerilen başlangıç stateleri
//const initialMessage = ''
//const initialEmail = ''
//const initialSteps = 0
//const initialIndex = 4 //  "B" nin bulunduğu indexi
const gridSize = 3;
export default function AppFunctional(props) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [steps, setSteps] = useState(0);
  const [index, setIndex] = useState(4);

  function getXY() {
    return {
      x: `Math.floor(index / gridSize) + 1`,
      y: `(index % gridSize) + 1`,
    };
  }

  function getXYMesaj() {
    const xy = getXY();
    return `Coordinates (${xy.x}, ${xy.y})`;
  }

  function reset() {
    setIndex(4);
    setSteps(0);
    setEmail("");
    setMessage("");
  }

  function sonrakiIndex(yon) {
    const x = Math.floor(index / gridSize) + 1;
    const y = (index % gridSize) + 1;
    if (yon === "sol" && x > 1) return index - 1;
    if (yon === "sağ" && x < gridSize) return index + 1;
    if (yon === "yukarı" && y > 1) return index - gridSize;
    if (yon === "aşağı" && y < gridSize) return index + gridSize;

    return index;
  }

  function ilerle(evt) {
    const yon = evt.target.id;
    const newIndex = sonrakiIndex(yon);
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
    }
    setMessage(`You moved ${steps} times`);
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // POST request
    console.log(`E-posta gönderildi: ${email}`);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{`You moved ${steps} times`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">SOL</button>
        <button id="up">YUKARI</button>
        <button id="right">SAĞ</button>
        <button id="down">AŞAĞI</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

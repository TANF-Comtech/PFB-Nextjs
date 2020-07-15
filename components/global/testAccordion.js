import React, { useRef } from "react";
import ReactDOM from "react-dom";

import Accordion from "./accordion/accordion";

export default function App() {
  return (
    <div className="App">
      <Accordion title="What is your return policy?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

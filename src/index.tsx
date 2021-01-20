import React from "react";
import ReactDOM from "react-dom";

require("./styles/index.css");

const App: React.FC = () => {
   return <div className="main">Hello App </div>;
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
   module.hot.accept();
}

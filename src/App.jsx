import React from "react";

import Board from "./components/Board/Board";

import s from "./styles/common.scss";

const App = () => {
   return (
      <div className={s.appContainer}>
         <Board />
      </div>
   );
};

export default App;

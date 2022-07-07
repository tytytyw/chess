import { useState, useEffect } from "react";
import './App.css';
import BoardComponent from './components/BoardComponent'
import { Board } from './modals/Board';

function App() {
  const [board, setBoard] = useState(new Board())

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  useEffect(() => {
    restart()
  }, [])


  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

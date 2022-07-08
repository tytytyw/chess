import { useState, useEffect } from "react";
import './App.css';
import BoardComponent from './components/BoardComponent'
import LostFiguresComponent from "./components/LostFiguresComponent";
import { Board } from './models/Board';
import { ColorNames, Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE, ColorNames.WHITE))
  const [blackPlayer] = useState<Player>(new Player(Colors.BLACK, ColorNames.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer)


  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer => currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  useEffect(() => {
    restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="App">
      <div className="App__wrapper">
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <div className="statistic">
          {<div className="lostFigures">
            <LostFiguresComponent figures={board.lostWhiteFigures} title='белые' />
            <LostFiguresComponent figures={board.lostBlackFigures} title='черные' />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;

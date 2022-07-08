import React, { FC, useState, useEffect } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player;
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const onCellClick = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigre(cell);
      setSelectedCell(null)
      swapPlayer()
    } else if (cell.figure && currentPlayer.color === cell.figure?.color) {
      setSelectedCell(prevCell => prevCell === cell ? null : cell)
    }
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  const highLightCells = () => {
    board.highLightCells(selectedCell);
    updateBoard()
  }

  useEffect(() => {
    highLightCells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])


  return (
    <div className='BoardComponent'>
      <h3 className='BoardComponent__title'>Ходят <span>{currentPlayer.colorName}</span></h3>
      <div className='BoardComponent__board'>
        {board.cells.map((row, index) => <React.Fragment key={index}>
          {row.map(cell =>
            <CellComponent
              cell={cell}
              key={cell.id}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              selectedCell={selectedCell}
              onCellClick={onCellClick}
            />
          )}
        </React.Fragment>)}
      </div ></div>
  )
}

export default BoardComponent
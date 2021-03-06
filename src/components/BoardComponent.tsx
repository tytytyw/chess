import React, { FC, useState, useEffect } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';
import SwapFigureComponent from './SwapFigureComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player;
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const [swapFigure, setSwapFigure] = useState<Cell | null>(null)

  const onCellClick = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
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

  // TODO:
  useEffect(() => {
    // board.cells.length && setSwapFigure(board.getCell(0, 1))
  }, [board])

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
      </div >
      {swapFigure ? <SwapFigureComponent cell={swapFigure} currentPlayer={currentPlayer} /> : ""}
    </div>
  )
}

export default BoardComponent
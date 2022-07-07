import React, { FC, useState, useEffect } from 'react'
import { Board } from '../modals/Board'
import { Cell } from '../modals/Cell';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const onCellClick = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigre(cell);
      setSelectedCell(null)
    } else if (cell.figure) {
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
    <div className='board'>
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
  )
}

export default BoardComponent
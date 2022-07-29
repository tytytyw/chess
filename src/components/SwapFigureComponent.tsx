import { FC } from 'react'
import { Cell } from '../models/Cell'
import { Bishop } from '../models/figures/Bishop'
import { Knight } from '../models/figures/Knight'
import { Queen } from '../models/figures/Queen'
import { Rook } from '../models/figures/Rook'
import { Player } from '../models/Player'

interface SwapFigureComponentProps {
    cell: Cell;
    currentPlayer: Player
}

const SwapFigureComponent: FC<SwapFigureComponentProps> = ({ cell, currentPlayer }) => {
    const queen = new Queen(currentPlayer.color, cell)
    const bishop = new Bishop(currentPlayer.color, cell)
    const rook = new Rook(currentPlayer.color, cell)
    const knight = new Knight(currentPlayer.color, cell)

    return (
        <div className='SwapFigureComponent'>
            <h5 className="title">Выберите новую фигуру</h5>
            <div className="figures">
                {<div className='figure'><img className='figure__logo' src={queen.logo ?? ''} alt=''></img></div>}
                {<div className='figure'><img className='figure__logo' src={rook.logo ?? ''} alt=''></img></div>}
                {<div className='figure'><img className='figure__logo' src={bishop.logo ?? ''} alt=''></img></div>}
                {<div className='figure'><img className='figure__logo' src={knight.logo ?? ''} alt=''></img></div>}
            </div>
        </div>
    )
}

export default SwapFigureComponent
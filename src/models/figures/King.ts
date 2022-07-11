import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
    isFirstStep = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if (dx <= 1 && dy <= 1) return true

        // Castling
        if (this.isFirstStep && dy === 0 && (this.cell.x - target.x === 3 || this.cell.x - target.x === -2)) {
            target.isCastling = true
            return true
        }

        return false
    }

    moveFigure(target: Cell) {

        // Castling
        // TODO: cancel castling when row in under attack
        if (target.isCastling) {
            let dx;
            let castlingRook = null;

            if (target.x === 6) {
                castlingRook = target.board.getCell(7, target.y).figure?.name === FigureNames.ROOK ? target.board.getCell(7, target.y) : null
                dx = -2
            }

            if (target.x === 1) {
                castlingRook = target.board.getCell(0, target.y).figure?.name === FigureNames.ROOK ? target.board.getCell(0, target.y) : null
                dx = 2
            }

            if (castlingRook && dx) castlingRook.moveFigure(target.board.getCell(castlingRook.x + dx, castlingRook.y))
        }
        
        this.isFirstStep = false
    }
}
import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-pawn.png'
import whiteLogo from '../../assets/white-pawn.png'

export class Pawn extends Figure {
    isFirstStep = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = direction * 2
        const step = this.cell.y + direction
        const firstStep = this.cell.y + firstStepDirection

        // simpe step
        if ((target.y === step || (this.isFirstStep && (target.y === firstStep)))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) return true
        // attack step
        // TODO: en passant
        if ((target.y === this.cell.y + direction)
            && (target.x === this.cell.x + 1 || (target.x === this.cell.x - 1))
            && this.cell.isEnemy(target)) return true

        // TODO: Promotion 

        return false
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}
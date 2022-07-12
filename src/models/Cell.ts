import { Figure, FigureNames } from './figures/Figure';
import { Board } from './Board';
import { Colors } from './Colors';
export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board
    available: boolean;
    id: string;
    isCastling: boolean;
    playerColor?: Colors

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null, available: boolean, id?: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = available
        // TODO:
        this.id = `${x}_${y}`;
        this.isCastling = false;

    }

    public isEmpty(): boolean {
        return this.figure === null
    }

    public isEnemy(target: Cell): boolean {
        return !!target.figure && this.figure?.color !== target.figure?.color
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }

        return true
    }

    public isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }

        return true
    }

    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)

        if (absX !== absY) return false

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) return false
        }

        return true
    }

    public setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    public addLostFigure(figure: Figure) {
        this.board.addLostFigure(figure)
    }

    public moveFigure(target: Cell): void {

        if (this?.figure?.canMove(target)) {
            this.figure.moveFigure(target)
            if (target.figure) this.addLostFigure(target.figure)
            target.setFigure(this.figure)
            if (target === target.board.enPassantCell && this.figure?.name === FigureNames.PAWN) this.enPassantAttackMove(target)
            this.figure = null

            // en passant aviable only fo next move
            if (target.figure?.color !== this.board.enPassantCell?.playerColor) this.board.enPassantCell = null
        }
    }

    private enPassantAttackMove(targetCell: Cell) {
        const targetFigure = this.board.getCell(targetCell.x, targetCell.y + (targetCell.figure?.color === Colors.BLACK ? -1 : 1))
        targetFigure.figure && this.addLostFigure(targetFigure.figure)
        targetCell.available = false
        targetFigure.figure = null
    }
}
import { Figure } from './figures/Figure';
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

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null, available: boolean, id?: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = available
        // TODO:
        this.id = `${x}_${y}`;
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    isEmptyVertical(target: Cell): boolean {
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

    isEmptyHorizontal(target: Cell): boolean {
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

    isEmptyDiagonal(target: Cell): boolean {
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

    setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    moveFigre(target: Cell): void {
        if (this?.figure?.canMove(target)) {
            this.figure.moveFigure(target)
            target.figure = this.figure
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}
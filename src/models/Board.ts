import { Rook } from './figures/Rook';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Queen } from './figures/Queen';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { Pawn } from './figures/Pawn';
import { Figure, FigureNames } from './figures/Figure';


export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Array<Figure> = []
    lostWhiteFigures: Array<Figure> = []
    enPassantCell: Cell | null = null

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = []
            for (let x = 0; x < 8; x++) {
                if ((x + y) % 2 !== 0) {
                    row.push(new Cell(this, x, y, Colors.BLACK, null, false)) // black
                } else {
                    row.push(new Cell(this, x, y, Colors.WHITE, null, false)) // white
                }
            }
            this.cells.push(row);
        }

    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x]
    }

    private addPawns(): void {
        for (let x = 0; x < 8; x++) {
            new Pawn(Colors.BLACK, this.getCell(x, 1))
            // if (x !== 1) new Pawn(Colors.BLACK, this.getCell(x, 1))
            // new Pawn(Colors.WHITE, this.getCell(x, x === 1 ? 1 : 6))
            new Pawn(Colors.WHITE, this.getCell(x, 6))
        }
    }

    private addKings(): void {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addQueens(): void {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addBishops(): void {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }

    private addKnights(): void {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    public addRooks(): void {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))

    }

    public addFigures(): void {
        this.addBishops()
        this.addKings()
        this.addKnights()
        this.addPawns()
        this.addQueens()
        this.addRooks()
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard
    }


    public addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.lostBlackFigures.push(figure)
            : this.lostWhiteFigures.push(figure)
    }

    public highLightCells(selectedCell: Cell | null) {
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y]
            for (let x = 0; x < this.cells.length; x++) {
                const target = row[x];
                target.available = !!selectedCell?.figure?.canMove(target)
                if (target === target.board.enPassantCell
                    && selectedCell?.figure?.name === FigureNames.PAWN
                    && Math.abs(target.x - selectedCell.x) === 1
                    && Math.abs(target.y - selectedCell.y) === 1) {
                    this.highLightCell(this.getCell(target.x, selectedCell.y))
                }
            }
        }
    }

    private highLightCell(target: Cell) {
        if (target.figure?.aviableToEnPassant) target.available = true
    }
}

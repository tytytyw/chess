import { Queen } from './figures/Queen';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { Pawn } from './figures/Pawn';


export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = []
            for (let x = 0; x < 8; x++) {
                if ((x + y) % 2 !== 0) {
                    row.push(new Cell(this, x, y, Colors.BLACK, null, true)) // black
                } else {
                    row.push(new Cell(this, x, y, Colors.WHITE, null, true)) // white
                }
            }
            this.cells.push(row);
        }

    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public addFigures() {
        new Queen(Colors.WHITE, this.getCell(3, 4))
        new Pawn(Colors.BLACK, this.getCell(5, 4))
    }
}

import { Colors } from './Colors';
import { Cell } from './Cell';


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
}

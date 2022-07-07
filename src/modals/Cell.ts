import { Figure } from './figures/Figure';
import { Board } from './Board';
import { Colors } from './Colors';
export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board
    avilable: boolean;
    id: string;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null, avilable: boolean, id?: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.avilable = avilable
        // TODO:
        this.id = `${x}_${y}`;
    }
}
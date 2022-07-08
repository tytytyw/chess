import { Colors } from './Colors';

export class Player {
    color: Colors;
    colorName: string;

    constructor(color: Colors, colorName: string) {
        this.color = color;
        this.colorName = colorName;
    }
}
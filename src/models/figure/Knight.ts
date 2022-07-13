import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackImeg from '../../img/knight_b.png'
import whiteImeg from '../../img/knight_w.png'


export class Knight extends Figure{
    
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.KNIGHT
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)
        return (dx === 1 && dy ===2) || (dx === 2 && dy === 1)
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if(super.attackedCells(target, position)) {
            return true
        }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)
        return (dx === 1 && dy ===2) || (dx === 2 && dy === 1)
    }
}
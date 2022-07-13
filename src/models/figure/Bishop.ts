import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackImeg from '../../img/bishop_b.png'
import whiteImeg from '../../img/bishop_w.png'


export class Bishop extends Figure{

    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.BISHOP
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        if(this.cell.isEmptyDiagonal(target))
            return true
        return false
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if(super.attackedCells(target, position)) {
            return true
        }
        if(this.cell.isEmptyDiagonal(target))
            return true
        return false
    }
}
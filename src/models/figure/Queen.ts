import { Figure, FigureName } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackImeg from '../../img/queen_b.png'
import whiteImeg from '../../img/queen_w.png'

export class Queen extends Figure{
    
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.QUEEN
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target))
        return true
        return false
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if(super.attackedCells(target, position)) {
            return true
        }
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target))
        return true
        
        return false
    }
}
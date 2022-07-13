import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackImeg from '../../img/rook_b.png'
import whiteImeg from '../../img/rook_w.png'

export class Rook extends Figure{

    isFirstStep: boolean = true;
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.ROOK
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        if(this.cell.isEmptyHorizontal(target) || this.cell.isEmptyVertical(target))
            return true
        
        return false
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if(super.attackedCells(target, position)) {
            return true
        }
        if(this.cell.isEmptyHorizontal(target) || this.cell.isEmptyVertical(target)){
            return true
        }
        return false
    }

    firstMoveFigure(target: Cell) {
        super.firstMoveFigure(target);
        this.isFirstStep = false;
      }
}
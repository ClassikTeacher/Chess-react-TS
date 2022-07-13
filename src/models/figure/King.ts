import { Figure, FigureName } from "./Figure";
import blackImeg from '../../img/king_b.png'
import whiteImeg from '../../img/king_w.png'
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { Player } from "../Player";


export class King extends Figure{
    
    isFirstStep: boolean = true;
    checkKing: boolean
     
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.KING
        this.checkKing = false
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        const colorAttaced = this.color === Colors.BLACK ? target.cellIsAttackedWhite : target.cellIsAttackedBlack
        if(colorAttaced){
            return false
        }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)
        return (dx === 1 && dy ===1) || (dx === 0 && dy === 1)|| (dx === 1 && dy === 0)
        return true
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if(super.attackedCells(target, position)) {
            return true
        }
            const dx = Math.abs(this.cell.x - target.x)
            const dy = Math.abs(this.cell.y - target.y)
            return (dx === 1 && dy ===1) || (dx === 0 && dy === 1)|| (dx === 1 && dy === 0)
        return false
    }

    checkToKing(currentPlayer: Player | null): boolean{
        super.checkToKing(currentPlayer)
        const cellIsAttacked = currentPlayer?.color === Colors.BLACK ? this.cell.cellIsAttackedWhite : this.cell.cellIsAttackedBlack
        if(cellIsAttacked){
            return true
        }
        return false
    }

    firstMoveFigure(target: Cell) {
        super.firstMoveFigure(target);
        this.isFirstStep = false;
      }
}
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Queen } from './Queen'
import { Figure, FigureName } from "./Figure";
import blackImeg from '../../img/pawn_b.png'
import whiteImeg from '../../img/pawn_w.png'


export class Pawn extends Figure{

    isFirstStep: boolean = true;
    
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.imeg = color === Colors.BLACK ? blackImeg : whiteImeg;
        this.name = FigureName.PAWN
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
          return false;
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
    
        if ((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
          && target.x === this.cell.x
          && this.cell.board.getCell(target.x, target.y).isEmpty()) {
              
          return true;
        }
    
        if(target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
        && this.cell.isEnemy(target)) {
          return true;
        }
    
        return false;
      }

    attackedCells(target: Cell, position: Cell): boolean{
      const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
      if(super.attackedCells(target, position)) {
           return true
      }
      if(target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)) {
          return true;
        }
      return false
  }
    
    transformPawn(target: Cell){
      if(target.y === 7 || target.y === 0){
        return true
      }
    }
         
    firstMoveFigure(target: Cell) {
        super.firstMoveFigure(target);
        this.isFirstStep = false;
      }

    
}
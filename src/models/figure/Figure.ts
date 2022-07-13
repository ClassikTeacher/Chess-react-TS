import imeg from '../../img/pawm_w.png'
import { Cell } from '../Cell';
import { Colors } from '../Colors'
import { Player } from '../Player';
import { Queen } from './Queen'


export enum FigureName{
    FIGURE = 'Figure',
    KING =  "king",
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    BISHOP = 'Bishop',
    ROOK = 'Rook',
    QUEEN = 'Queen'

}
export class Figure{
    color: Colors;
    imeg: typeof imeg | null;
    cell: Cell;
    name: FigureName;
    id: number;


    constructor(color:Colors, cell:Cell){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.imeg = null;
        this.name = FigureName.FIGURE;
        this.id = Math.random()
    }
    canMove(target: Cell): boolean{
        if(target.figure?.color === this.color)
            return false
        
        if(target.figure?.name === FigureName.KING)
            return false
        
        
        return true
    }

    attackedCells(target: Cell, position: Cell): boolean{
        if((target.cellIsAttackedBlack && position.figure?.color === Colors.BLACK) || (target.cellIsAttackedWhite && position.figure?.color === Colors.WHITE))
            return true
        
        return false
    }

    checkToKing(currentPlayer: Player | null): boolean {
        return false
    }


    transformPawn(target: Cell){
        if((target.y === 7 || target.y === 0) && this.name === FigureName.PAWN){
          return true
        }
      }

    firstMoveFigure(target: Cell){
       
    }
}

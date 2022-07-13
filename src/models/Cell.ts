import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figure/Figure";
import { Queen } from "./figure/Queen";

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    cellIsAttackedWhite: boolean;
    cellIsAttackedBlack: boolean;
    available: boolean;
    id: number

    constructor(board: Board, x: number, y: number, color:Colors, figure: Figure | null){
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.cellIsAttackedBlack = false;
        this.cellIsAttackedWhite = false;
        this.id = Math.random()

    }

    addLostFigure(figure: Figure){
        figure.color === Colors.BLACK
        ? this.board.lostBlackFigures.push(figure)
        : this.board.lostWhiteFigures.push(figure)
    }

    moveFigure(target: Cell){
        if(this.figure && this.figure.canMove(target)){
            this.figure.canMove(target)
            this.figure.firstMoveFigure(target)
            
            if (target.figure){
                this.addLostFigure(target.figure)
            }
            if(this.figure.transformPawn(target)){
                this.figure = new Queen(this.color, this.board.getCell(target.x, target.y))
                this.figure.cell = this
                this.figure = null
            } else{
                target.setFigure(this.figure)
                this.figure = null
                }
        }
    }

    setFigure(figure:Figure){
        this.figure = figure;
        this.figure.cell = this
    }

   
    isEmpty(){
        return this.figure === null;
    }

    
    isEnemy(target: Cell): boolean {
        if (target.figure) {
          return this.figure?.color !== target.figure.color;
        }
        return false;
      }

    isEmptyHorizontal(target:Cell): boolean{
        if(this.y !== target.y){
            return false
        }

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for(let x = min+1; x < max; x++){
            if(!this.board.getCell(x, this.y).isEmpty()){
                return false
            }
        }
        return true
    }

    isEmptyVertical(target:Cell): boolean{
        if(this.x !== target.x){
            return false
        }

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for(let y = min+1; y < max; y++){
            if(!this.board.getCell(this.x, y).isEmpty()){
                return false
            }
        }
        return true
    }

    isEmptyDiagonal(target:Cell): boolean{
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if(absX !== absY) return false;

        const dX = this.x < target.x ? 1 : -1
        const dY = this.y < target.y ? 1 : -1

        for (let i = 1; i < absX; i++){
            if(!this.board.getCell(this.x + dX*i, this.y + dY*i).isEmpty())
            return false
        }

        return true
    }

   
}
import { Cell } from "./Cell"
import { Colors } from "./Colors"
import { Bishop } from "./figure/Bishop"
import { Figure, FigureName } from "./figure/Figure"
import { King } from "./figure/King"
import { Knight } from "./figure/Knight"
import { Pawn } from "./figure/Pawn"
import { Queen } from "./figure/Queen"
import { Rook } from "./figure/Rook"
import { Player } from "./Player"

export class Board {
    cells: Cell[][] = []
    figures: Cell[] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []

    public initCells(){
        for (let i = 0; i < 8; i++){
            const row: Cell[] = []
            for(let j = 0; j < 8; j++){
                if((i+j) % 2 !== 0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // white
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // black
                }
            }
            this.cells.push(row)
        }
    }

    public availableCells(selectedCell:Cell | null){
        for (let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public setFigures(){
        const arrFigure = []
        if(this.cells.length){
        for (let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                const target = this.cells[i][j]
                if(target.figure){
                arrFigure.push(target)
                }
            }
        }}
        this.figures = arrFigure
    }

    public attackedCell(board: Board){
        if(board.cells.length !== 0){
            board.removeAttackedCells(board)
            const arrFigures = board.figures
            for (let i = 0; i < arrFigures.length; i++){                
                    const target = board.figures[i]
                    if(target.figure){
                    board.attackedCells(target)
                    }
            }
        }
       
    }

    public attackedCells(position:Cell | null){
        const color: Colors | undefined = position?.figure?.color
        for (let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j]
                if(target.id !== position?.id){
                if(color === Colors.BLACK){
                    target.cellIsAttackedBlack = !!position?.figure?.attackedCells(target, position)
                    
                } else if(color === Colors.WHITE){
                    target.cellIsAttackedWhite = !!position?.figure?.attackedCells(target, position)
                    
                }
                }
            }
        }
    }

    public checkToKing(currentPlayer: Player | null, candidateBoard: Board){
        let check: boolean = false
        for (let i = 0; i < candidateBoard.figures.length; i++){
                const target = candidateBoard.figures[i]
                if(target.figure?.name === FigureName.KING && target.figure.color === currentPlayer?.color){
                  check = !!target.figure?.checkToKing(currentPlayer)
                }
        }
        return check
    }

    public checkingCheckForCurrentPlayer(currentPlayer: Player | null){
        const candidateBoard = this.getCopyBoard()
        this.removeAttackedCells(candidateBoard)
        this.attackedCell(candidateBoard)
        const check: boolean = !!this.checkToKing(currentPlayer, candidateBoard)
        return check
    }

    public getLastBoard(){
        
        const lastBoard = new Board
        
        lastBoard.cells = [...this.cells]
        
        lastBoard.figures =[...this.figures]
        lastBoard.lostBlackFigures = [...this.lostBlackFigures]
        lastBoard.lostWhiteFigures = [...this.lostWhiteFigures]
        return lastBoard
    }

    public getCopyBoard(): Board{
        const newBoard = new Board;
        newBoard.cells = this.cells
        newBoard.figures = this.figures
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        return newBoard
    }
    
   

    public removeAttackedCells(board: Board){
        for (let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                const target = board.cells[i][j]
                
                target.cellIsAttackedBlack = false
                target.cellIsAttackedWhite = false
               
            }
        
        }
    }

    public copyFigure(origiBboard: Board){
         origiBboard.cells.map((row) =>{
            row.map((item) =>{
              const figure = item.figure

                switch(figure?.name){
                case FigureName.BISHOP :
                    new Bishop(figure.color, this.getCell(item.x, item.y))
                    break;
                case FigureName.PAWN :
                    new Pawn(figure.color, this.getCell(item.x, item.y))
                    break;
                case FigureName.KING :
                    new King(figure.color, this.getCell(item.x, item.y))
                    break;
                case FigureName.KNIGHT :
                    new Knight(figure.color, this.getCell(item.x, item.y))
                    break;
                case FigureName.ROOK :
                    new Rook(figure.color, this.getCell(item.x, item.y))
                    break;
                case FigureName.QUEEN :
                    new Queen(figure.color, this.getCell(item.x, item.y))
                    break;
                // default:
                //     this.cells[item.x][item.y].figure = null
            }   
            })
           

        })

    }



    public getCell(x: number, y:number){
        return this.cells[y][x]
    }

    private addPawn(){
        for(let i = 0; i < 8; i++){
            new Pawn(Colors.BLACK, this.getCell(i,1) )
            new Pawn(Colors.WHITE, this.getCell(i,6) )
        }
    
    }

    private addRook(){
        new Rook(Colors.BLACK, this.getCell(0,0))
        new Rook(Colors.BLACK, this.getCell(7,0))
        new Rook(Colors.WHITE, this.getCell(0,7))
        new Rook(Colors.WHITE, this.getCell(7,7))
    }

    private addQueen(){
        new Queen(Colors.BLACK, this.getCell(3,0))
        new Queen(Colors.WHITE, this.getCell(3,7))
    }

    private addKing(){
        new King(Colors.BLACK, this.getCell(4,0))
        new King(Colors.WHITE, this.getCell(4,7))
    }

    private addBishop(){
        new Bishop(Colors.BLACK, this.getCell(2,0))
        new Bishop(Colors.BLACK, this.getCell(5,0))
        new Bishop(Colors.WHITE, this.getCell(2,7))
        new Bishop(Colors.WHITE, this.getCell(5,7))
    }

    private addKnight(){
        new Knight(Colors.BLACK, this.getCell(1,0))
        new Knight(Colors.BLACK, this.getCell(6,0))
        new Knight(Colors.WHITE, this.getCell(1,7))
        new Knight(Colors.WHITE, this.getCell(6,7))
        
    }

    

    public addFigures(){
        this.addPawn()
        this.addRook()
        this.addKing()
        this.addQueen()
        this.addBishop()
        this.addKnight()

    }

  
    
    // public addFigutePattern(){

    // }
}
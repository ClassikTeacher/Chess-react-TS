import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    step: number;
    setStep: (number: number)=>void
    currentPlayer: Player | null;
    swapPlayer: ()=> void;
    listBoard: Board[];
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, listBoard, step, setStep})=>{
    
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [leftBoard, setLeftBoard] = useState(new Board)

    function click(cell: Cell){
        console.log(selectedCell)
        console.log(board.checkingCheckForCurrentPlayer(currentPlayer))
        console.log(cell)
            if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
                
                
                selectedCell.moveFigure(cell)
                if(board.checkingCheckForCurrentPlayer(currentPlayer)){
                    console.log('шах')
                    const newBoard = new Board()
                    newBoard.initCells()
                    newBoard.copyFigure(listBoard[step])
                    newBoard.setFigures()
                    console.log(newBoard)
                    setBoard(newBoard)
                    setSelectedCell(null)                   
                } else {
                    
                    swapPlayer()
                    selectedCell.figure?.firstMoveFigure(cell)
                    setSelectedCell(null)  
                    setStep(step + 1)      
                    console.log('ok')
                    
                }

                
            } else if(selectedCell && selectedCell == cell){
                setSelectedCell(null)
                console.log('3q if')
                
            } else 
                if(cell.figure && cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
                console.log('4q if')}
            
        
    }

    useEffect(()=>{
        
        console.log(step)
        console.log(listBoard)
        // setList([...list, listBoards])
        
       
        // board.checkToKing(currentPlayer, board)  для мата королю
        // console.log(board.figures)
    },[currentPlayer])

    useEffect(()=>{
        board.setFigures()
        attackedCell()
        availableCells()
        
    },[selectedCell])

    function attackedCell(){
        board.attackedCell(board)
    }

   

    function availableCells(){
        board.availableCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }


    return(
        <div className='board'>
            {board.cells.map((row, index)=>
            <React.Fragment key={index}>
                {row.map(cell=>
                    <CellComponent 
                        click={click}
                        cell={cell}
                        key={cell.id}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />    
                )}
            </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent
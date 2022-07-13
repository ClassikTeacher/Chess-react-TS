import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigureComponent from './components/LostFigureComponent';
import NumberX from './components/NumberX';
import NumberY from './components/NumberY';
import SidebarComponents from './components/SidebarComponents';
import StatisticBarComponent from './components/StatisticBarComponent';
import {Board} from './models/Board'
import { Cell } from './models/Cell';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board())
  const [lastBoard, setLastBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState <Player | null> (null)
  const [startedTime, setStartedTime] = useState<number | null>(null)
  const [seed, setSeed] = useState<number | null>(null)
  const [listBoard, setListBoard] = useState<Board[]>([])
  const [step, setStep] = useState(0)

  useEffect(()=>{
    newGame()
  },[])

  useEffect(() => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.copyFigure(board)
    newBoard.setFigures()
    setLastBoard(newBoard)
    const list:Board[] = [...listBoard]
    list.push(newBoard)
    setListBoard(list)
    
  },[step])

  function newStartTimer(){
    newGame() 
  }
  // useEffect(() =>{
  //   initLastBoard()
  // },[currentPlayer])

  function initLastBoard(){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.copyFigure(board)
    newBoard.setFigures()
    setLastBoard(newBoard)
    console.log(newBoard)
  }
  
  function newGame() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    newBoard.setFigures()
    setCurrentPlayer(whitePlayer)
    setBoard(newBoard)
    setSeed(Math.random())
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }
  
  return (
    <div className='App'>
     
      <SidebarComponents/>
      <div className='App-container'>
      
        <div className='board-contaider'>
      <LostFigureComponent
        
        figures={board.lostWhiteFigures}
      />
      <NumberY/>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        listBoard={listBoard}
        step={step}
        setStep={setStep}
      />
        <NumberX/>
      <LostFigureComponent
        
        figures={board.lostBlackFigures}
      />
      </div>
      <StatisticBarComponent
      currentPlayer={currentPlayer}
      newStartTimer={newStartTimer}
      startedTime={startedTime}
      setStartedTime={setStartedTime}
      seed={seed}
      />
      </div>
      
      
    </div>
  );
}

export default App;

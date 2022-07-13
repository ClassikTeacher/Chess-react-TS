import React, { FC, useEffect, useRef, useState  } from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors';


interface TimerComponentProps{
    currentPlayer: Player | null;
    startedTime: number | null
    newStartTimer:()=> void
    setStartedTime: (startedTime:number | null)=> void
    seed: number | null
}

const TimerWhiteComponent: FC<TimerComponentProps> = ({currentPlayer, newStartTimer, startedTime, setStartedTime, seed})=>{
    const [whiteTimer, setWhiteTimer] = useState<number | null>(null)
    const [endTime, setEndTime] = useState<boolean>(true)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    let minit = Math.floor(whiteTimer!/60) 
    let second = Math.floor(whiteTimer!) % 60
    function soloTime(time: number | null){
        return time! < 10 ? `0${time!}` : time!
    }
    const secondBlack = soloTime(second)
    let realTime = whiteTimer
        useEffect(()=>{
            
            startTimer()
            activePlayer()

        },[currentPlayer,endTime, startedTime])
        
        useEffect(()=>{
            setWhiteTimer(startedTime)
            startTimer()
            activePlayer()
           },[startedTime,seed])
        
        function  activePlayer(){
            let activeColor = document.querySelector('.timer_white')
            if(currentPlayer?.color === Colors.WHITE){
                activeColor?.classList.add('__active')
            } else {
                activeColor?.classList.remove('__active')
            }
        }
        function startTimer(){
           if(whiteTimer !== null) {if (timer.current){
                clearInterval(timer.current)
                setEndTime(true)
            }
            
            if(endTime){
            timer.current = setInterval(()=>{
                if(currentPlayer?.color === Colors.WHITE && realTime! > 0){
                    realTime!--
                    decrementTimer()
                } else {setEndTime(false)}},1000)
            } else if(realTime === 0 && !endTime){
                console.log('white end time')
                
            }}
        }

        function decrementTimer(){
            
            setWhiteTimer( sec => sec! -1)
        }
    return(
        <div className='timer timer_white'>
            <span>{minit}:{secondBlack}</span>
        </div>
    )
}
export default TimerWhiteComponent
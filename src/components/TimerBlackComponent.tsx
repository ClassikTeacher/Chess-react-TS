import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'


    interface TimerComponentProps{
        currentPlayer: Player | null;
        startedTime: number | null
        newStartTimer:()=> void
        setStartedTime: (startedTime:number | null)=> void
        seed: number | null
    }
    
    const TimerBlackComponent: FC<TimerComponentProps> = ({currentPlayer, newStartTimer, startedTime, setStartedTime, seed})=>{
        const [blackTimer, setBlackTimer] = useState<number | null>(startedTime)
        const [endTime, setEndTime] = useState<boolean>(true)
        const timer = useRef<null | ReturnType<typeof setInterval>>(null)
        let realTime = blackTimer
        let minit = Math.floor(blackTimer!/60) 
        let second = Math.floor(blackTimer!) % 60
        function soloTime(time: number | null){
            return time! < 10 ? `0${time!}` : time!
        }
        const secondBlack = soloTime(second)
        useEffect(()=>{
            startTimer()
            activePlayer()
        },[currentPlayer, endTime, startedTime])

        useEffect(()=>{
            setBlackTimer(startedTime)
            startTimer()
            activePlayer()
           },[startedTime,seed])

        function  activePlayer(){
            let activeColor = document.querySelector('.timer_black')
            if(currentPlayer?.color === Colors.BLACK){
                activeColor?.classList.add('__active')
            } else {
                activeColor?.classList.remove('__active')
            }
           }
        function startTimer(){
          if(startedTime !== null) { if (timer.current){
                clearInterval(timer.current)
                setEndTime(true)
            }
            if(endTime){
            timer.current = setInterval(()=>{
                if(currentPlayer?.color === Colors.BLACK && realTime! > 0){
                    realTime!--
                    decrementTimer()
                }else {setEndTime(false)}},1000)
            } else if(realTime === 0 && !endTime) {
                console.log('black end time')
            }}
        }

        function decrementTimer(){
            setBlackTimer( sec => sec! -1)
        }

    return(
        <div className='timer timer_black'>
            <span>{minit}:{secondBlack}</span>
        </div>
    )
    }

export default TimerBlackComponent
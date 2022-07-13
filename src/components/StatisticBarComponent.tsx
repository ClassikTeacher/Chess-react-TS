import React, { FC } from 'react'
import { Player } from '../models/Player';
import ButtonStart from './ButtonStart';
import TimerBlackComponent from './TimerBlackComponent'
import TimerWhiteComponent from './TimerWhiteComponent'

interface TimerComponentProps{
    currentPlayer: Player | null;
    newStartTimer:()=> void
    startedTime: number | null
    setStartedTime: (startedTime:number | null)=> void
    seed: number | null
}

const StatisticBarComponent: FC<TimerComponentProps> = ({currentPlayer, newStartTimer, startedTime, setStartedTime, seed})=>{

    
    return(
        <div className='statisticBar'>
            <TimerBlackComponent
               currentPlayer={currentPlayer}
               startedTime={startedTime}
               newStartTimer={newStartTimer}
               setStartedTime={setStartedTime}
               seed={seed}
            />
            <ButtonStart
                newStartTimer={newStartTimer}
                startedTime={startedTime}
                setStartedTime={setStartedTime}
            />
            <TimerWhiteComponent
            currentPlayer={currentPlayer}
            startedTime={startedTime}
            newStartTimer={newStartTimer}
            setStartedTime={setStartedTime}
            seed={seed}
            />
        </div>
    )
}
export default StatisticBarComponent
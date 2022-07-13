import React, { FC } from 'react'


interface ButtonStartProps{
    newStartTimer:()=> void
    startedTime: number | null 
    setStartedTime: (startedTime:number | null)=> void
}
const ButtonStart: FC<ButtonStartProps> = ({newStartTimer, startedTime, setStartedTime})=>{

    function startNewGame(){
        
        
        newStartTimer()
        setStartedTime(300)
        
    }

    return(
        <div >
            <button className='Button' onClick={startNewGame}>New party</button>
        </div>
    )
}
export default ButtonStart
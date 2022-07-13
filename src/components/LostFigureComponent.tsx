import React, { FC } from 'react'
import { Figure } from '../models/figure/Figure';

interface LostFigureComponentProps{
    // title:string;
    figures: Figure[];
}

const LostFigureComponent: FC<LostFigureComponentProps>= ({figures})=>{
    return(
        <div className='lostFigure'>
            {/* <span>{title}</span> */}
            {figures.map((figure)=>
            <div key={figure.id}>
                {figure.imeg && <img width={30} height={30} src={figure.imeg}/>}
            </div>)}
        </div>
    )
}
export default LostFigureComponent
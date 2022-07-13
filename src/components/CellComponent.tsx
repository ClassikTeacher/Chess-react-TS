import React, { FC } from 'react'
import {Cell} from '../models/Cell'

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click})=>{
    return(
        <div 
        className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
        onClick={()=>click(cell)}
        >
            {cell.available && !cell.figure && <div className={'available'}></div>}
            {cell.cellIsAttackedWhite &&  <div className={'attackedCellW'}></div>}
            {/* {cell.cellIsAttackedBlack && <div className={'attackedCellB'}></div>} */}
            {cell.figure?.imeg && <img src={cell.figure.imeg}/>}
        </div>
    )
}
export default CellComponent
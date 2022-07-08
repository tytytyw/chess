import { Cell } from "../models/Cell"
import React, { FC } from 'react'
import classNames from "classnames"


interface CellProps {
    cell: Cell;
    selected: boolean;
    onCellClick: (cell: Cell) => void;
    selectedCell: Cell | null
}

const CellComponent: FC<CellProps> = ({ cell, selected, onCellClick, selectedCell }) => {

    return (
        <div
            className={classNames('cell', cell.color, selected ? 'selected' : '', selectedCell && cell.available && cell.figure ? 'available' : '')}
            onClick={() => onCellClick(cell)}
        >
            {selectedCell && !cell.figure && cell.available && <div className={"available"} />}
            {cell.figure?.logo && <img
                className={classNames("figure__logo", cell.figure?.name)}
                src={cell.figure.logo}
                alt='' />}
        </div>
    )
}

export default CellComponent
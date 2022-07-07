import { Cell } from "../modals/Cell"
import React, { FC } from 'react'
import classNames from "classnames"


interface CellProps {
    cell: Cell
}

const CellComponent: FC<CellProps> = ({ cell }) => {

    return (
        <div className={classNames('cell', cell.color)}></div>
    )
}

export default CellComponent
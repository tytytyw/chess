import { Cell } from "../modals/Cell"
import React, { FC } from 'react'
import classNames from "classnames"


interface CellProps {
    cell: Cell
}

const CellComponent: FC<CellProps> = ({ cell }) => {

    return (
        <div className={classNames('cell', cell.color)}>
            {cell.figure?.logo && <img className={classNames("figure__logo", cell.figure?.name)} src={cell.figure.logo} alt='' />}
        </div>
    )
}

export default CellComponent
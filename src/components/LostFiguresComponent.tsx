import { FC } from 'react'
import { Figure } from '../models/figures/Figure'

interface LostFiguresProps {
    figures: Figure[];
    title: string
}

const LostFiguresComponent: FC<LostFiguresProps> = ({ figures }) => {
    return (
        <div className='LostFiguresComponent'>

            {figures.map((figure) => (
                <div className='lost-figure' key={figure.id}>
                    {figure.logo && <img className='lost-figure__logo' src={figure.logo} alt='' />}
                </div>
            ))}
        </div>
    )
}

export default LostFiguresComponent
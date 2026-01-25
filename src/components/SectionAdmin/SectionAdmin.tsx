import circleIcon from '../../assets/Admin/circle-icon.svg';
import checkMarkIcon from '../../assets/Admin/check_mark-icon.svg';
import { useState } from "react";
import Headling from "../../components/Headling/Headling";
import styles from './SectionAdmin.module.css';
import type { SectionAdminProps } from "./SectionAdmin.props";
import cn from 'classnames';

export function SectionAdmin ({ children, title }: SectionAdminProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const toggleOpen = () => {
        setIsOpen(prevState => !prevState)
    }

    return <>
        <div className={styles.container}>
            <div className={styles.head} onClick={toggleOpen}>
                <img src={circleIcon} alt="иконка круга" className={styles.icon}/>
                <Headling appearence = 'admin' className={styles.title} >{title}</Headling>
                <img src={checkMarkIcon} alt="кнопка открытия выпадающего окна" className={cn(styles['check-mark'],
                    {[styles['check-mark-rotate']]: isOpen
                    })} />
            </div>
            {isOpen && <div className={styles.content}>
                {children}
            </div>}
        </div>    
    </>
}
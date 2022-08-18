import React, {FC} from 'react';
import {Link, NavLink} from 'react-router-dom';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as farStar} from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.css';

const Header: FC = () => {
    return (
        <header>
            <Link to="/">
                <div className={style.logo}>
                    <i><FontAwesomeIcon icon={faCirclePlay}/></i>
                    <span>Movies</span>
                </div>
            </Link>
            <div>
                <NavLink
                    to="my_favorite"
                    children={({isActive}) => {
                        return (
                            <div
                                className={
                                    cn(style.menu_item, style.button, {
                                        [`${style.active}`]: isActive
                                    })
                                }
                            >
                                <span>My favorite</span>
                                <i><FontAwesomeIcon icon={isActive ? farStar : faStar}/></i>
                            </div>
                        );
                    }}
                />
            </div>
        </header>
    )
};

export default Header;

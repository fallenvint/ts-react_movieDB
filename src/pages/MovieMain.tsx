import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import List from './poster_list/List';
import Favorite from './favorite/Favorite';
import Modal from './modal/Modal';

const routeList = [
    {path: '/', element: <List/>},
    {path: '/:page', element: <List/>},
    {path: '/1', element: <Navigate to="/" replace/>},
    {path: 'my_favorite', element: <Favorite/>},
    {path: '/:page/movie/:id', element: <Modal/>}
];

const MovieMain: FC = () => {
    return (
        <main>
            <Routes>
                {
                    routeList.map((route) => {
                        return (
                            <Route path={route.path} element={route.element} key={route.path}/>
                        )
                    })
                }
            </Routes>
        </main>
    )
};

export default MovieMain;

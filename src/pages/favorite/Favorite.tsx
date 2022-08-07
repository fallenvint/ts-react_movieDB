import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {favStore} from '../../stores';
import style from './Favorite.module.css';
import noposter from '../../img/no-image.png';

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const Favorite: React.FC = () => {
    useEffect(() => {
        favStore.updateFavList();
        document.title = 'My favorites';
    }, []);

    if (!!favStore.jsFavList.length) {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className={`${style.favorites} page-content`}>
                    {
                        favStore.jsFavList.map((movie: {
                            id: number,
                            title: string,
                            overview: string,
                            poster_path: string
                        }) => {
                            return (
                                <div className={style.favorite} key={movie.id}>
                                    <div className={style.favorite_movie}>
                                        <div className={style.favorite_movie__poster}>
                                            <img
                                                src={!movie.poster_path ? noposter : posterUrl + movie.poster_path}
                                                alt={movie.title}
                                                title={movie.title}
                                            />
                                        </div>
                                        <div className={style.favorite_movie__info}>
                                            <div>
                                                <button
                                                    className={style.button}
                                                    onClick={() => favStore.removeMovie(movie.id)}
                                                >
                                                    Unfavorite
                                                </button>
                                            </div>
                                            <div className={style.favorite_movie__title}>{movie.title}</div>
                                            <div className={style.favorite_movie__overview}>{movie.overview}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className="empty">Favorite movies list is empty!</div>
            </div>
        )
    }
};

export default observer(Favorite);

import React, {FC, useCallback, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {favoriteStorage, movieStorage} from '../../stores';
import style from './Modal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import noposter from '../../img/no-image.png'

const posterUrl = 'https://image.tmdb.org/t/p/w342';

export interface IModalParams {
    readonly page?: string;
    readonly id?: string;
}

const Modal: FC = () => {
    const {page = 1, id = 1} = useParams() as IModalParams;
    const currentMovie = movieStorage.results?.[movieStorage.movieIndex];

    useEffect(() => {
        favoriteStorage.updateFavList();
        movieStorage.setMovieId(+id);
        movieStorage.fetchPage(+page);
        movieStorage.setNpMovieId(+page);
    }, [page, id]);

    useEffect(() => {
        document.title = currentMovie?.title;
    }, [currentMovie?.title]);

    const date = new Date(currentMovie?.release_date);
    const lastMovie = movieStorage.results?.length === movieStorage.movieIndex + 1 && movieStorage.totalPages === +page;

    const compare = useCallback((element: { id: number }) => element.id === +id, [id]);

    return currentMovie && (
        <div className={style.modal}
             style={{backgroundImage: `url(${posterUrl + currentMovie.backdrop_path})`}}>
            <div className={style.modal_container}>
                <div className={style.modal_nav}>
                    <Link to={`/${page}`}>
                        <button>
                            <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                            <span>Back to list</span>
                        </button>
                    </Link>

                    {
                        (!lastMovie) &&
                        <Link
                            to={
                                (movieStorage.movieIndex < movieStorage.results?.length - 1)
                                    ? `/${+page}/movie/${movieStorage.results?.[movieStorage.movieIndex + 1]?.id}`
                                    : `/${+page + 1}/movie/${movieStorage.npMovieId}`
                            }>
                            <button>
                                <span>Next movie</span>
                                <i><FontAwesomeIcon icon={faChevronRight}/></i>
                            </button>
                        </Link>
                    }
                </div>
                <div className={style.modal_movie}>
                    <div className={style.modal_movie__poster}>
                        <img
                            src={!currentMovie.poster_path ? noposter : posterUrl + currentMovie.poster_path}
                            alt={currentMovie.title}
                        />
                    </div>
                    <div className={style.modal_movie__info}>
                        <div className={style.modal_movie__favorite}>
                            <button
                                className={style.button}
                                onClick={() => {
                                    favoriteStorage.favList.some(compare) ? favoriteStorage.removeMovie(+id) : favoriteStorage.addMovie({
                                        id: +id,
                                        title: currentMovie.title,
                                        overview: currentMovie.overview,
                                        poster_path: currentMovie.poster_path
                                    });
                                }}>
                                {favoriteStorage.favList.some(compare) ? 'Unfavorite' : 'Add to favorite'}
                            </button>
                        </div>
                        <div className={style.modal_movie__title}>
                            {currentMovie.title}
                            <span>({date.toLocaleDateString('en-Us', {year: 'numeric'})})</span>
                        </div>
                        <div className={style.modal_movie__rate}>
                            <div
                                className="rate_score">Score:<span>{currentMovie.vote_average}</span>
                            </div>
                            <div className="rate_date">Release Date:
                                <span>
                                    {date.toLocaleDateString('en-Us', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className={style.modal_movie__overview}>{currentMovie.overview}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default observer(Modal);

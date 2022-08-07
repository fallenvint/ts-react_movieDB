import React, {useCallback, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {favStore, fetStore} from '../../stores';
import style from './Modal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import noposter from '../../img/no-image.png'

const posterUrl = 'https://image.tmdb.org/t/p/w342';

export interface IModalParams {
    readonly page?: string;
    readonly id?: string;
}

const Modal: React.FC = () => {
    const {page = 1, id = 1} = useParams() as IModalParams;
    const currentMovie = fetStore.results?.[fetStore.movieIndex];

    useEffect(() => {
        favStore.updateFavList();
        fetStore.setMovieId(+id);
        fetStore.fetchPage(+page);
        fetStore.setNpMovieId(+page);
    }, [page, id]);

    useEffect(() => {
        document.title = currentMovie?.title;
    }, [currentMovie?.title]);

    const date = new Date(currentMovie?.release_date);
    const lastMovie = fetStore.results?.length === fetStore.movieIndex + 1 && fetStore.totalPages === +page;

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
                                (fetStore.movieIndex < fetStore.results?.length - 1) ? `/${+page}/movie/${fetStore.results?.[fetStore.movieIndex + 1]?.id}` : `/${+page + 1}/movie/${fetStore.npMovieId}`
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
                                    favStore.favList.some(compare) ? favStore.removeMovie(+id) : favStore.addMovie({
                                        id: +id,
                                        title: currentMovie.title,
                                        overview: currentMovie.overview,
                                        poster_path: currentMovie.poster_path
                                    });
                                }}>
                                {favStore.favList.some(compare) ? 'Unfavorite' : 'Add to favorite'}
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

import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {fetStore} from '../../stores';
import ListPoster from './ListPoster';
import Pagination from '../../components/pagination/Pagination';
import style from './List.module.css';

const List: React.FC = () => {
    const {page} = useParams();

    useEffect(() => {
        fetStore.fetchPage((!page) ? 1 : +page);
    }, [page]);

    useEffect(() => {
        document.title = 'Movie DB';
    }, []);

    return (
        <>
            {
                !!fetStore.totalPages &&
                <div>
                    <div className="page-title">Latest Releases</div>
                    <div className={`${style.posters} page-content`}>
                        {
                            fetStore.results?.map((movie: { id: number }) => {
                                return (
                                    <ListPoster
                                        key={movie.id}
                                        movieItem={movie}
                                        page={(!page) ? 1 : +page}/>
                                );
                            })
                        }
                    </div>
                    <Pagination page={(!page) ? 1 : +page} totalPage={fetStore.totalPages}/>
                </div>
            }
        </>
    )
};

export default observer(List);

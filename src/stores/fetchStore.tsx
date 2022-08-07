import {action, computed, makeObservable, observable, runInAction, toJS} from 'mobx';
import axios from 'axios';

const fetchStore = () => {
    return makeObservable({
        data: {},
        movieId: 1,
        npMovieId: 1,
        get totalPages() {
            return this.data.total_pages;
        },
        get results() {
            return toJS(this.data.results);
        },
        get movieIndex() {
            return this.results?.map((object: { id: number }) => object.id).indexOf(this.movieId);
        },
        setMovieId(id: number) {
            this.movieId = id;
        },
        fetchPage(page: number) {
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`)
                .then((json) => {
                    runInAction(() => {
                        this.data = json.data;
                    });
                });
        },
        setNpMovieId(page: number) {
            page < this.totalPages &&
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page + 1}`)
                .then(
                    json => {
                        runInAction(() => {
                            this.npMovieId = json.data.results[0]?.id
                        });
                    }
                );
        }
    }, {
        data: observable,
        movieId: observable,
        npMovieId: observable,
        totalPages: computed,
        results: computed,
        movieIndex: computed,
        setMovieId: action.bound,
        fetchPage: action.bound,
        setNpMovieId: action.bound,
    });
};

export const fetStore = fetchStore();

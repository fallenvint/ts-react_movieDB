import {observable, action, computed, makeObservable, toJS} from 'mobx';

const favoriteStore = () => {
    return makeObservable({
        favList: [],
        get jsFavList() {
            return toJS(this.favList);
        },
        updateFavList() {
            this.favList = JSON.parse((localStorage.getItem('fav-movies') || '{}'));
        },
        addMovie(item: object) {
            const newArray = [item].concat(...this.jsFavList);

            localStorage.setItem('fav-movies', JSON.stringify(newArray));
            this.favList = JSON.parse((localStorage.getItem('fav-movies') || '{}'));
        },
        removeMovie(id: number) {
            localStorage.setItem('fav-movies', JSON.stringify(this.jsFavList.filter((item: { id: number }) => item.id !== id)));
            this.favList = JSON.parse((localStorage.getItem('fav-movies') || '{}'));
        }
    }, {
        favList: observable,
        jsFavList: computed,
        updateFavList: action.bound,
        addMovie: action.bound,
        removeMovie: action.bound
    });
};

export const favoriteStorage = favoriteStore();

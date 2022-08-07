import React, {FC} from 'react';
import Header from './components/header/Header';
import MovieMain from './pages/MovieMain';

const App: FC = () => {
    return (
        <>
            <Header/>
            <MovieMain/>
        </>
    );
};

export default App;

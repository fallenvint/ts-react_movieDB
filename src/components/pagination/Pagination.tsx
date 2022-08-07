import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import cn from 'classnames';
import style from './Pagination.module.css';

export interface IPaginationProps {
    page: number;
    totalPage: number;
}

const Pagination: FC<IPaginationProps> = ({page, totalPage}) => {
    const navigate = useNavigate();

    const handlePageClick = (event: { selected: number }): void => {
        navigate(`/${event.selected + 1}`, {replace: true});
    }

    return (
        <ReactPaginate
            pageCount={totalPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            previousLabel="prev"
            breakLabel="..."
            nextLabel="next"
            containerClassName={style.pagination}
            activeLinkClassName={
                cn(style.current, {
                    [`${style.first}`]: page === 1,
                    [`${style.last}`]: page === totalPage
                })
            }
            previousLinkClassName={style.prev}
            nextLinkClassName={style.next}
            breakLinkClassName={style.separator}
            disabledClassName={`hide`}
        />
    )
};

export default Pagination;

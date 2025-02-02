import React from "react";
import { useSearchParams } from "react-router"

interface IPaginationParams{
    arrayCount: number;
    arrayTotal: number;
}

export const PaginationComponent = ({arrayCount, arrayTotal}:IPaginationParams) => {

    const [searchParams, setSearchParams] = useSearchParams();
    let skip = Number(searchParams.get('skip') || '0');
    let limit = Number(searchParams.get('limit') || '30');
    const searchStr = searchParams.get('q') || '';

    const selectedValue = limit.toString();

    const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        limit = Number(event.target.value);
        searchParams.set('limit', (limit).toString());
        if (searchStr) {searchParams.set('q', searchStr);}
        setSearchParams(searchParams);
    }

    const handleBtnPrevOnClick = () => {
        if (skip<limit) {skip = 0} else {skip = skip-limit}
        searchParams.set('skip', (skip).toString());
        if (searchStr) {searchParams.set('q', searchStr);}
        setSearchParams(searchParams);

    }
    const handleBtnNextOnClick = () => {
        if ((skip+limit)<arrayTotal) {
            searchParams.set('skip', (skip+limit).toString());
            if (searchStr) {searchParams.set('q', searchStr);}
            setSearchParams(searchParams);
        }
    }

    return(
        <div className="pag_panel flex items-center gap-4 pl-4">
            <button onClick={handleBtnPrevOnClick}
            className="underline border border-orange-600 rounded-sm px-4" 
            >Prev</button>

            <button onClick={handleBtnNextOnClick}
            className="underline border border-orange-600 rounded-sm px-4" 
            >Next</button>

            <h2>{skip+1} - {skip+arrayCount} / {arrayTotal}</h2>

            <select value={selectedValue} onChange={handleSelectOnChange}>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
            </select>
        </div>
    )
}
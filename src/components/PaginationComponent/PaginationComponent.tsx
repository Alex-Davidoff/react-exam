import React from "react";
import { useSearchParams } from "react-router"
import { getLSSearchParams } from "../../services/local.storage";

interface IPaginationParams{
    arrayCount: number;
    arrayTotal: number;
    lsName: string;
}

export const PaginationComponent = ({arrayCount, arrayTotal, lsName}:IPaginationParams) => {

    const [searchParams, setSearchParams] = useSearchParams(getLSSearchParams(lsName));
    const skip:number = Number(searchParams.get('skip') || '0');
    let limit:number = Number(searchParams.get('limit') || '30');
    const selectedValue = limit.toString()


    const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        limit = Number(event.target.value);
        setSearchParams({skip: (skip).toString(), limit: (limit).toString()});
    }

    return(
        <div className="pag_panel flex items-center gap-4 pl-4">
            <button onClick={() => {
                if (skip>=limit) {
                    setSearchParams({skip: (skip-limit).toString(), limit: (limit).toString()});
                }
            }}
            className="underline border border-orange-600 rounded-sm px-4" 
            >Prev</button>

            <button onClick={() => {
                if ((skip+limit)<arrayTotal) {
                       setSearchParams({skip: (skip+limit).toString(), limit: (limit).toString()}); 
                }
            }}
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
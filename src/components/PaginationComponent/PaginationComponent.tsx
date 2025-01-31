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
        <div className="pag_panel flex items-center gap-4">
            <button onClick={() => {
                if (skip>=limit) {
                    setSearchParams({skip: (skip-limit).toString(), limit: (limit).toString()});
                }
            }}
            className="" 
            >Prev</button>

            <button onClick={() => {
                if ((skip+limit)<arrayTotal) {
                       setSearchParams({skip: (skip+limit).toString(), limit: (limit).toString()}); 
                }
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
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
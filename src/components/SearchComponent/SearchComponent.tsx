import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { searchValidator } from "../../validators/search.validator";
import { useSearchParams } from "react-router";

interface ISearchByParams{
    searchBy: string
}

const SearchComponent = ({searchBy}: ISearchByParams) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {handleSubmit, register, formState: {errors}} = 
       useForm<ISearchByParams>({mode: 'all', resolver: joiResolver(searchValidator)});
    
    const customHandler = async (formDataProps: ISearchByParams) => {
        setSearchParams({q: formDataProps.searchBy});
        }

    return(
        <div className="component_search mb-0.5 pl-4">
            <form onSubmit={handleSubmit(customHandler)} className="flex gap-4">
                <p>Search {searchBy}</p>
                <input type="text" {...register('searchBy')} className="border"/>
                <button className="border border-black rounded w-24">Find</button>
                <p className="error_container">{errors?.searchBy?.message}</p>
            </form>
        </div>
    )
};

export default SearchComponent;
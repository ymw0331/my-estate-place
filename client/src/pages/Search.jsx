import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../contexts/search";
import AdCard from '../components/cards/AdCard'

export const Search = () => {
    const [search, setSearch] = useSearch()

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Search</h1>
            <SearchForm />

            <div className="container">

                <div className="row">
                    {search.results?.length > 0 ?
                        (
                            <div className="col-md-12 text-center p-5">
                                Found {search.results?.length} results
                            </div>
                        )
                        :
                        (
                            <div className="col-md-12 text-center p-5">
                                No properties found
                            </div>
                        )}

                </div>

                <div className="row">
                    {search.results?.map(item =>
                        (<AdCard ad={item} key={item._id} />)
                    )}
                </div>

            </div>
        </>
    )
}

export default Search;
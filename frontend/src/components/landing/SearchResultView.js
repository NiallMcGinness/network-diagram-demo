import React  from 'react';
import DiagramCard from './DiagramCard';

const SearchResultView = ({searchResults}) => {


    const resultsFound  = () => {
       
        const  data = searchResults.results
       // let n = searchResult.results.length()

        return (
            <div name="searchResults" className="flex  flex-wrap p-3 m-10 " >
            {data.map(item => (
                <DiagramCard item={item} />
              ))}
            </div>
        )
    }

    const noResultsFound = () => {

        const getSearchTerm = searchResults => {
            try {
                let sr = searchResults.searchTerm
                return ( <div> for {sr} </div>  )
            }
            catch (err) {
                return ""
            }
        }

        return (
            <div>
                0 results found {getSearchTerm()} 

            </div>
        )
    }

    const haveResultsBeenFound = (searchResults) => {
       //resultsFound: n ,results: result.data
       try {
        let n = searchResults.resultsFound
        let b =  false;
        if (n > 0  )  b = true 

        return b

       }catch(err){
           return false
       }
       
    }

    return (
        <div>
             {(haveResultsBeenFound(searchResults)) ? resultsFound() : noResultsFound() }
        </div>    
    )


}

export default SearchResultView
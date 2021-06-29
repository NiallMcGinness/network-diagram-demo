import React , {useState} from 'react';
import axios from 'axios';
import {fetchErrorUI} from './LandingError'  
import config from "../../config.js"

const SearchBox = ({setSearchResults}) => {

   const [searchBoxValue, setSearchBoxValue] = useState("")

const handleSearch = () => {

    console.log(` searchBoxValue  ${searchBoxValue} `);
    if (searchBoxValue.length < 1 ) {
        // set to null if  nothing submitted , this will reload initial page
        setSearchResults(null)
    } else {
        fetchData(searchBoxValue)
    }
   
}
const handleKeyPress = event => {
    console.log(` event.key  ${event.key}  event.shiftKey ${event.shiftKey} `);



    if ( event.key === "Enter" ) {
        handleSearch()
    }

    // event.shiftKey
}




const fetchData = async (searchTerm) => {

    const url = `${config.backend}/searchName/${config.es_index}`

    const payload = {
        
            "data": {
                "searchTerm": searchTerm
            },
           // "searchTerm": searchTerm,
            "type": "searchName"
        
    }
    try {
      const result = await axios.post(
       url,
       payload
      );

     // console.log(`result from fetchData ${ result.data} ${JSON.stringify(result.data)}`)
      if(!result.data ) {
        //setFetchDataError(true)
        console.log(`!result.data ${ result.data} ${JSON.stringify(result.data)}`)
        setSearchResults({ resultsFound: 0, results: null });
      } else {
        console.log(`result.data ${ result.data.length} ${JSON.stringify(result.data)}`)
        let n =  result.data.length

        setSearchResults({ resultsFound: n ,results: result.data});
      }
      
    }
    catch(err){
      //setFetchDataError(true)
      console.log(`catch(err) : ${ err} `)
    }
   
  
}

return (
    <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only ">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input id="search" className="block w-full pl-10 pr-3 py-2 border border-gray-500 border-1 rounded-md leading-5 bg-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white sm:text-sm transition duration-150 ease-in-out" placeholder="Search" type="search"
            onChange={event => setSearchBoxValue(event.target.value)}
            value={searchBoxValue}
            onKeyPress={event => handleKeyPress(event) } />
          </div>
         
        </div>
        <button className="rounded border-2 border-black bg-white  text-black mx-2 px-2" type="button" onClick={handleSearch} > search</button>
      </div>
)
}

export default SearchBox
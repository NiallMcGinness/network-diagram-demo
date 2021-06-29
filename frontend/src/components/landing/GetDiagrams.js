import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import DetailsContext from '../../contexts/DetailsContext';
import {fetchErrorUI} from './LandingError'  

import config from "../../config.js"
import DiagramCard from './DiagramCard';
import SearchResultView from './SearchResultView'

function GetDiagrams({searchResults, setSearchResults }) {

  const { dispatch } = useContext(DetailsContext)
  const [data, setData] = useState([]);
  const [fetchDataError, setFetchDataError] = useState(false);
  useEffect(() => {
    const getallUrl = `${config.backend}/getall/${config.es_index}`
    console.log(` fetching diagrams from ${ getallUrl}`)
    const fetchData = async () => {
      try {
        const result = await axios(
          getallUrl,
        );
        console.log(`result from fetchData ${ result.data} ${JSON.stringify(result.data)}`)
        if(result.data.Body === "error") {
          setFetchDataError(true)
        } else {
          setData(result.data);
        }
        
      }catch(err){
        setFetchDataError(true)
      }
     
    };
    fetchData();
  }, []);

  const initialLandingPageResults = () => {

    return (
      <div name="searchResults" className="flex  flex-wrap p-3 m-10 " >
       {data.map(item => (
            <DiagramCard item={item} />
          ))}
      </div >
    )
  } 

  return (

   
      <div>
        {searchResults? < SearchResultView searchResults={ searchResults} /> : initialLandingPageResults() }
      </div>
   
  

    
  );
}
export default GetDiagrams;


//<div class="panel_element" >{item.Tags[0]}</div>

/*

<div key={item.uniqueId} className="px-2  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <Link to="/details" onClick={() => dispatch({ type: "SELECT_NEW_DIAGRAM", payload: item })}>
                <img src={`${config.backend}/diagram/${item.Filename}`} className="w-full"></img>
              </Link>
              <div name="imageMetaData" className="">
                <div className="font-bold text-xl mb-2 text-center" >{item.Description}</div>
                <div className="px-6 py-4">
                  {item.Tags.map(tag => (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
*/

/*

 <div>
        {fetchDataError ? fetchErrorUI() : "" }
    </div>
      <>

*/
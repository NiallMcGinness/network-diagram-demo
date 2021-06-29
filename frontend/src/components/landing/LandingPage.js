import React, {useState} from 'react';


import GetDiagrams from "./GetDiagrams";
import NavBar from './NavBar';



const LandingPage = () => {

    const [ searchResults, setSearchResults ] = useState(null)  

    return (
        <div>
            <NavBar setSearchResults={setSearchResults}/>


            <GetDiagrams searchResults= {searchResults} setSearchResults={setSearchResults} />


        </div>

    )
}

export default LandingPage
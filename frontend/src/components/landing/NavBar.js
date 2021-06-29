import React, {useState} from 'react';
import { Link } from '@reach/router';
import UploadIcon from '../icons/UploadIcon';
import SearchBox from "./SearchBox"

const NavBar = ({setSearchResults}) => {

    

    return (

        <nav className="bg-green-600 text-white  shadow border-b-2 border-black" role="navigation" >
            <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
                <div className="mr-4 md:mr-8 font-bold">
                    Network Diagrams
                </div>

                <div className="ml-4 md:ml-8">
                    <Link to="/uploadform">
                        <UploadIcon />
                    </Link>

                </div>

                <SearchBox setSearchResults={setSearchResults} />

            </div>


        </nav>
    )
}

export default NavBar;
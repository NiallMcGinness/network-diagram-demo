
import React, { useContext } from 'react';
import DetailsContext from '../../contexts/DetailsContext';
import { Link } from '@reach/router';
import Back from '../icons/Back';
import config from "../../config.js"

const DetailsPage = () => {

    const { state } = useContext(DetailsContext)
    console.log(` DetailsPage loading   ${JSON.stringify(state)}  `);

    return (
        <>



            <nav className="bg-green-600 text-white" role="navigation">



                <div className="container mx-auto p-2 m-4 flex flex-wrap items-center md:flex-no-wrap">

                    <div className="font-bold text-xl mb-2 text-left mr-4 md:mr-8">
                        <Link to="/">
                            <Back />
                        </Link>
                    </div>
                    <div className="font-bold text-xl mb-2 text-center ml-20 mr-4 md:mr-8">
                        {state.Description}
                    </div>

                </div>
            </nav>

            <img src={`${config.backend}/diagram/${state.Filename}` } alt="diagram" ></img>

        </>
    )
}

export default DetailsPage

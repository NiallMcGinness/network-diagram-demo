import React , {useContext } from 'react';
import { Link } from '@reach/router';
import DetailsContext from '../../contexts/DetailsContext';
import config from "../../config.js"

const DiagramCard = ({item}) => {

    const { dispatch } = useContext(DetailsContext)
    return (
        <div key={item.uniqueId} className="px-2  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
    )
}

export default DiagramCard 
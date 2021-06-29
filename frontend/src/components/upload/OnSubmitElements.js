import React from 'react'


function defaultSubmitButton() {
    return (
        <button type="submit" className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded"
            name="submit" > submit </button>
    )
}

function loadingSubmit() {
    return (
        <span className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded"
            name="submit" > Loading ...  </span>
    )
}

function submitErrorElement() {
    return (
        <div className="my-2 border border-red-500 bg-yellow-100 text-center rounded-sm" >

            error : new diagram was not submitted  please contact us at support@radiant.net </div>
    )
}


export { defaultSubmitButton, loadingSubmit, submitErrorElement }
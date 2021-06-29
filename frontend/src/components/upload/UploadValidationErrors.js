import React from 'react'

const errorStyle = "rounded-sm border border-red-700 bg-orange-300 text-center m-1"

function descriptionError() {
    return (
        <div className={errorStyle} name="descriptionFormError"> please enter company name or a one or two word description </div>
    )
}

function tagError() {
    return (
        <div className={errorStyle} name="tagFormError">  please enter at least one tag  </div>
    )
}

function diagramError() {
    return (
        <div className={errorStyle} name="diagramFormError">  please drag and drop or click to upload the diagram   </div>
    )
}

function fileTypeError() {
    return (
        <div className={errorStyle} name="fileTypeFormError">  only png or jpeg filetypes are supported   </div>
    )
}

export { descriptionError, tagError, diagramError, fileTypeError }


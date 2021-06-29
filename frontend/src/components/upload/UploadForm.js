import React, { useState, useContext, useReducer } from 'react';
import { Link } from '@reach/router';
import Dropzone from "./Dropzone";

import UploadFilesContext from "../../contexts/UploadFilesContext"
import UploadFilesReducer from "../../reducers/UploadFilesReducer"
import axios from "axios"
import path from 'path'

import { descriptionError, tagError, diagramError, fileTypeError } from "./UploadValidationErrors"
import { defaultSubmitButton, loadingSubmit, submitErrorElement } from "./OnSubmitElements"
import Back from '../icons/Back';
import config from "../../config.js"

export default function Upload() {

    const [description, setDescription] = useState("")
    const [version, setVersion] = useState("1.0")
    const [tags, setTags] = useState("")


    const initialState = useContext(UploadFilesContext)
    const [state, dispatch] = useReducer(UploadFilesReducer, initialState)

    const [loadingStatus, setloadingStatus] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        console.log(`  handle submit triggered  ${event}  `);
        let isFormValid = validateForm()


        if (!isFormValid) return

        const f = new FormData()
        f.append('diagram', state[0])
        f.append('description', description)
        f.append('version', version)
        f.append('tags', tags)
        setloadingStatus(true)
        sendRequest(f)

    }



    const [validationError, setValidationError] = useState({
        description: false,
        version: false,
        tags: false,
        diagram: false,
        filename: false
    })


    function validateForm() {
        let [badDescription, badTag, badDiagram, badFilename] = Array(4).fill(false);

        let isFormValid = true;

        const description_entered = (description.length > 1) || false;
        if (!description_entered) { badDescription = true; isFormValid = false }

        const tag_entered = (tags.length > 1) || false;
        if (!tag_entered) { badTag = true; isFormValid = false }


        if (!state[0]) { badDiagram = true; isFormValid = false }

        if (state[0]) {
            if (!checkFileType(state[0].name)) { badFilename = true; isFormValid = false }
        }



        setValidationError({ ...validationError, ...{ description: badDescription, tags: badTag, diagram: badDiagram, filename: badFilename } })

        return isFormValid;

    }

    function checkFileType(fileName) {

        let acceptableFileTypes = { '.jpeg': true, '.jpg': true, '.png': true }

        let ext = path.extname(fileName)

        ext = ext.toLowerCase()

        console.log(` filename ${fileName}  ext ${ext}`)

        let isFiletypeAcceptable = acceptableFileTypes[ext] || false

        return isFiletypeAcceptable
    }

    async function sendRequest(formData) {
        const uploadUrl = `${config.backend}/upload/${config.es_index}`
        console.log(` uploading diagrams to ${uploadUrl}`)
        try {
            const response = await axios({
                method: 'post',
                url: uploadUrl,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            submitSuccess(response)
        }
        catch (err) {
            console.log(`  error posting formdata ${err}`)
            submitError(err)
        }

    }

    const [responseStatus, setResponseStatus] = useState("")

    const submitSuccess = response => {
        console.log(`  submitSuccess  response ${response} `);
        console.log(`  submitSuccess  json stringify ${JSON.stringify(response)} `);

        setloadingStatus(false)
        //setResponseStatus(JSON.stringify(response))
        window.location.href = '/'

    }

    const submitError = error => {

        console.error(`error returned from submit ${error}`);
        setloadingStatus(false)
        const errmsg = submitErrorElement()
        setResponseStatus(errmsg)

    }

    return (
        <>
        <nav className="bg-green-600 shadow text-white" role="navigation">
          <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">   <Link to="/">
                <Back />
            </Link></div>
         
            </nav> 
     
        <div>  

            <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
                onSubmit={handleSubmit}
            >   <div className="mt-4">
                    <p>full company name </p>
                    <input type="text" placeholder="add the company name"
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        onChange={event => setDescription(event.target.value)}
                        value={description} name="description" id="description" />
                    {(validationError.description) ? descriptionError() : " "}
                </div>
                <div className="mt-4">
                    <p>Add a version number or description if this is for a new design or a deviation from a standard design</p>
                    <input type="text" placeholder="1.0"
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        onChange={event => setVersion(event.target.value)}
                        value={version} name="version" />

                </div>
                <div className="mt-4">
                    <p>Enter tags separated by a comma to describe the set up, eg sd-wan, velocloud, meraki</p>
                    <input type="text" placeholder="add tags to describe set up"
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        onChange={event => setTags(event.target.value)}
                        value={tags} name="tags" />
                    {(validationError.tags) ? tagError() : " "}
                </div>
                <div className="mt-4">
                    <UploadFilesContext.Provider value={{ state, dispatch }}>
                        <Dropzone />
                    </UploadFilesContext.Provider>

                    {(validationError.diagram) ? diagramError() : " "}
                    {(validationError.filename) ? fileTypeError() : " "}
                </div>
                <div className="mt-4">
                    {(loadingStatus) ? loadingSubmit() : defaultSubmitButton()}
                    {responseStatus}
                </div>

            </form>
        </div>
         </>
    )

}


import React, { useContext, useState, useRef } from "react";
import UploadFilesContext from "../../contexts/UploadFilesContext"



export default function DZ1() {


    const { state, dispatch } = useContext(UploadFilesContext)

    const onDrop = event => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log(`  ondrop ${files[0].name}`)
        const array = fileListToArray(files);
        dispatch({ action: "ADD_NEW_FILES", payload: array })

    }

    function fileListToArray(list) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    const fileInputRef = useRef();

    const openFileDialog = () => {
        fileInputRef.current.click();
    }

    const onFilesAdded = event => {
        console.log(` onFilesAdded `)
        const files = event.target.files;
        const array = fileListToArray(files);
        dispatch({ type: "ADD_NEW_FILES", payload: array })
    }

    return (
        <div
            className={`justify-center w-full bg-blue-100 text-center`}
            onDrop={onDrop}
            onClick={openFileDialog}

        >
            <input
                ref={fileInputRef}
                className="FileInput invisible"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <div className="justify-center" >

                <span>{state[0] ? `file selected : ${state[0].name}` : 'click here to upload diagram, jpeg or png files only'}</span>
            </div>



        </div>
    )

}


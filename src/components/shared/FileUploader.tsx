import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader: React.FC = () => {

    const [fileUrl, setfFileUrl] = useState("")
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    return (
        <div {...getRootProps()} className='block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"'>
            <input {...getInputProps()} />
            {
                fileUrl ? (
                    <div>test 1</div>
                ) : (
                    <div className='flex items-center gap-y-1 flex-col justify-center'>
                        <img
                            width={96}
                            src="/assets/icons/file-upload.svg"
                            alt="file-upload"
                        />
                        <h2 className='font-semibold'>Drag photo here</h2>
                        <p className='text-gray-500 text-sm'>SVG,PNG,JPG</p>
                    </div>
                )
            }
        </div >
    )

}
export default FileUploader

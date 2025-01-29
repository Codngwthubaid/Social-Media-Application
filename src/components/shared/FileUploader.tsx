import { useState, useCallback } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'


type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

    const [fileUrl, setfFileUrl] = useState("")
    const [file, setFile] = useState<File[]>([])
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setfFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })


    return (
        <div {...getRootProps()} className='block py-5 w-full rounded-md bg-gray-800 px- text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"'>
            <input {...getInputProps()} />
            {
                fileUrl ? (
                    <div className='px-5'>
                        <img
                            className='rounded-md'
                            src={fileUrl}
                            alt="image" 
                        />
                        <p className='text-gray-300 text-base bg-gray-900 mx-auto p-3 rounded-md mt-3 w-fit'>Click or drag photo for replace</p>
                    </div>
                ) : (
                    <div className='flex items-center gap-y-1 flex-col justify-center'>
                        <img
                            width={96}
                            src="/assets/icons/file-upload.svg"
                            alt="file-upload"
                        />
                        <h2 className='font-semibold'>Drag photo here</h2>
                        <p className='text-gray-500 text-sm'>SVG, PNG, JPG, JPEG</p>
                        <button className='border border-gray-900 cursor-pointer rounded-md p-3 bg-gray-900 font-semibold'>Select from computer</button>
                    </div>
                )
            }
        </div >
    )

}
export default FileUploader

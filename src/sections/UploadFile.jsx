import React, {useState} from 'react'
import { storage } from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

export default function UploadFile() {
    const [fileUpload, setFileUpload] = useState(null)
    const uploadFile = async () => {
        if (!fileUpload) return
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
    </div>
  )
}

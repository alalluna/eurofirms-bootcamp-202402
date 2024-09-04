import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.js'
import sharp from 'sharp'

export async function uploadFile(file) {
    console.log('Original file:', file)
    if (!file || !file.buffer) {
        throw new Error('File or file buffer is undefined')
    }

    const fileBuffer = await sharp(file.buffer)
        .resize({ width: 600, fit: 'cover' })
        .toBuffer()

    console.log('Processed file buffer:', fileBuffer)

    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
    const fileRef = ref(storage, `files/${fileName}`)

    const fileMetadata = {
        contentType: file.mimetype,
    }

    const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetadata)

    await fileUploadPromise

    const fileDownloadURL = await getDownloadURL(fileRef)

    console.log('File download URL:', fileDownloadURL)

    return { ref: fileRef, downloadURL: fileDownloadURL }
}
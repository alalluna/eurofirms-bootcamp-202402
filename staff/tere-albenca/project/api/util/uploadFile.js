// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// import { storage } from '../config/firebase.js'
// import sharp from 'sharp'

// export async function uploadFile(file) {
//     console.log('Original file:', file)
//     if (!file || !file.buffer) {
//         throw new Error('File or file buffer is undefined')
//     }

//     const fileBuffer = await sharp(file.buffer)
//         .resize({ width: 600, fit: 'cover' })
//         .toBuffer()

//     console.log('Processed file buffer:', fileBuffer)

//     const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
//     const fileRef = ref(storage, `files/${fileName}`)

//     const fileMetadata = {
//         contentType: file.mimetype,
//     }

//     const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetadata)

//     await fileUploadPromise

//     const fileDownloadURL = await getDownloadURL(fileRef)

//     console.log('File download URL:', fileDownloadURL)

//     return { ref: fileRef, downloadURL: fileDownloadURL }
// }
// import Jimp from 'jimp'
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// import { storage } from '../config/firebase.js'

// export async function uploadFile(file) {
//     console.log('Original file:', file)
//     if (!file || !file.buffer) {
//         throw new Error('File or file buffer is undefined')
//     }

//     // Cargar la imagen con Jimp desde el buffer
//     const fileBuffer = await Jimp.read(file.buffer)

//     // Redimensionar la imagen a 600px de ancho, manteniendo la proporción
//     fileBuffer.resize(600, Jimp.AUTO).buffer()

//     // Obtener el buffer en formato JPEG (puedes cambiar el formato si quieres)
//     // const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)

//     console.log('Processed file buffer:', fileBuffer)

//     const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
//     const fileRef = ref(storage, `files/${fileName}`)

//     const fileMetadata = {
//         // contentType: 'image/jpeg', // aseguramos que sea JPEG
//          contentType: file.mimetype,
//     }

//     // Subimos el buffer redimensionado
//     const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetadata)

//     await fileUploadPromise

//     const fileDownloadURL = await getDownloadURL(fileRef)

//     console.log('File download URL:', fileDownloadURL)

//     return { ref: fileRef, downloadURL: fileDownloadURL }
// }
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// import { storage } from '../config/firebase.js'

// export async function uploadFile(file) {
//     console.log('Original file:', file)

//     if (!file || !file.buffer) {
//         throw new Error('File or file buffer is undefined')
//     }

//     // ✅ Importación dinámica correcta con ESM y jimp@1.6.0
//     const Jimp = await import('jimp')

//     // ✅ Verificación adicional (opcional)
//     if (!Jimp || typeof Jimp.read !== 'function') {
//         throw new Error('Failed to load Jimp properly')
//     }

//     const image = await Jimp.read(file.buffer)
//     image.resize(600, Jimp.AUTO)

//     const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)

//     const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
//     const fileRef = ref(storage, `files/${fileName}`)

//     const fileMetadata = {
//         contentType: 'image/jpeg',
//     }

//     await uploadBytesResumable(fileRef, processedBuffer, fileMetadata)

//     const fileDownloadURL = await getDownloadURL(fileRef)

//     return { ref: fileRef, downloadURL: fileDownloadURL }
// }
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase.js'

export async function uploadFile(file) {
    if (!file || !file.buffer || !file.mimetype) {
        throw new Error('Invalid file input')
    }

    // Genera nombre único
    const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
    const fileRef = ref(storage, `files/${filename}`)

    const metadata = {
        contentType: file.mimetype
    }

    // Sube el archivo directamente sin Jimp
    await uploadBytes(fileRef, file.buffer, metadata)

    // Obtén la URL de descarga
    const downloadURL = await getDownloadURL(fileRef)

    return { downloadURL }
}

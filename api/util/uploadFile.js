import cloudinary from 'cloudinary'; // Importamos Cloudinary
import dotenv from 'dotenv'; // Para cargar las variables de entorno

dotenv.config(); // Cargar variables de entorno

// Configura Cloudinary con tus credenciales
// Asegúrate de que estas variables de entorno estén definidas en tu .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadFile(file) {
    console.log('Original file:', file);
    if (!file || !file.buffer) {
        throw new Error('File or file buffer is undefined');
    }

    try {
        // Convierte el buffer del archivo a una cadena base64 para subirlo a Cloudinary
        // Cloudinary puede recibir archivos como data URIs (base64)
        const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        // Sube la imagen a Cloudinary
        // Puedes especificar transformaciones (como redimensionar) directamente aquí
        const result = await cloudinary.uploader.upload(base64File, {
            folder: 'my-app-images', // Carpeta en Cloudinary donde se guardarán tus imágenes
            // Opciones de redimensionamiento, equivalentes a sharp(file.buffer).resize({ width: 600, fit: 'cover' })
            width: 600,
            crop: 'limit', // 'limit' redimensiona manteniendo las proporciones dentro de los límites
            quality: 'auto:low', // Optimiza la calidad para web
            fetch_format: 'auto' // Sirve el formato de imagen más óptimo (webp, avif, etc.)
        });

        console.log('Cloudinary upload result:', result);

        // Cloudinary devuelve la URL segura del archivo
        const downloadURL = result.secure_url;

        console.log('File download URL:', downloadURL);

        // No es necesario devolver una referencia como en Firebase, solo la URL
        return { downloadURL: downloadURL };

    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
    }
}// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
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
//     const image = await Jimp.read(file.buffer)

//     // Redimensionar la imagen a 600px de ancho, manteniendo la proporción
//     image.resize(600, Jimp.AUTO)

//     // Obtener el buffer en formato JPEG (puedes cambiar el formato si quieres)
//     const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)

//     console.log('Processed file buffer:', processedBuffer)

//     const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
//     const fileRef = ref(storage, `files/${fileName}`)

//     const fileMetadata = {
//         contentType: 'image/jpeg', // aseguramos que sea JPEG
//     }

//     // Subimos el buffer redimensionado
//     const fileUploadPromise = uploadBytesResumable(fileRef, processedBuffer, fileMetadata)

//     await fileUploadPromise

//     const fileDownloadURL = await getDownloadURL(fileRef)

//     console.log('File download URL:', fileDownloadURL)

//     return { ref: fileRef, downloadURL: fileDownloadURL }
// }

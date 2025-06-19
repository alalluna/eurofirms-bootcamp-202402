import cloudinary from 'cloudinary' // Importamos Cloudinary
import dotenv from 'dotenv' // Para cargar las variables de entorno

dotenv.config() // Cargar variables de entorno

// Configura Cloudinary con tus credenciales
// Asegúrate de que estas variables de entorno estén definidas en tu .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadFile(file) {
    console.log('Original file:', file)
    if (!file || !file.buffer) {
        throw new Error('File or file buffer is undefined')
    }

    try {
        // Convierte el buffer del archivo a una cadena base64 para subirlo a Cloudinary
        // Cloudinary puede recibir archivos como data URIs (base64)
        const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

        // Sube la imagen a Cloudinary
        // Puedes especificar transformaciones (como redimensionar) directamente aquí
        const result = await cloudinary.uploader.upload(base64File, {
            folder: 'my-app-images', // Carpeta en Cloudinary donde se guardarán tus imágenes
            // Opciones de redimensionamiento, equivalentes a sharp(file.buffer).resize({ width: 600, fit: 'cover' })
            width: 600,
            crop: 'limit', // 'limit' redimensiona manteniendo las proporciones dentro de los límites
            quality: 'auto:low', // Optimiza la calidad para web
            fetch_format: 'auto' // Sirve el formato de imagen más óptimo (webp, avif, etc.)
        })

        console.log('Cloudinary upload result:', result)

        // Cloudinary devuelve la URL segura del archivo
        const downloadURL = result.secure_url

        console.log('File download URL:', downloadURL)

        // No es necesario devolver una referencia como en Firebase, solo la URL
        return { downloadURL: downloadURL }

    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error)
        throw new Error(`Failed to upload file to Cloudinary: ${error.message}`)
    }
}
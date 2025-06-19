import express from 'express'
import { oauth2Client } from '../../config/googleClient.js'
import logic from '../../logic/index.js'

const router = express.Router()

     // Endpoint para iniciar el flujo de autenticación con Google
router.get('/auth/google', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
    })

    res.redirect(authUrl)
})

   // Endpoint para manejar el callback de Google
router.get('/google/redirect', async (req, res, next) => {
    const { code } = req.query
    try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)

        // Aquí deberías tener alguna forma de saber a qué usuario asociar esto
        // Si guardaste en sesión o state el userId o un token personalizado
        // Ejemplo (no implementado todavía):
        // const userId = await logic.getUserIdFromOAuthFlow(code);
        // await logic.saveGoogleTokens(userId, tokens)

        res.status(200).json({ message: 'Google tokens saved successfully', tokens })
    } catch (error) {
        next(error)
    }
})

export default router

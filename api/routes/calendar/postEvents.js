import { google } from 'googleapis'
import logic from '../../logic/index.js'
import { oauth2Client } from '../../config/googleClient.js'

export default async (req, res, next) => {
    try {
        // Recupera los tokens de Google guardados en tu base de datos
        const { userId } = req
        const googleTokens = await logic.getGoogleTokens(userId)
        oauth2Client.setCredentials(googleTokens)
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
        const event = req.body
        const { data } = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        })

        res.status(201).json(data)

    } catch (error) {
        next(error)
    }
}

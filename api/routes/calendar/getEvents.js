import express from 'express'
import jwt from 'jsonwebtoken'
import { google } from 'googleapis'
import logic from '../../logic/index.js'
import { oauth2Client } from '../../config/googleClient.js'


export default async (req, res, next) => {
    try {
        let userId = null
        const { authorization } = req.headers
        if (authorization?.startsWith('Bearer ')) {
            const token = authorization.slice(7)

            try {
                const { sub } = jwt.verify(token, JWT_SECRET)
                userId = sub
            } catch (err) {
                // Token inválido: simplemente seguimos sin userId
                console.warn('Token inválido:', err.message)
            }
        }

        if (!userId) {
            return res.json([]) // O podrías devolver eventos públicos por defecto
        }

        const googleTokens = await logic.getGoogleTokens(userId)
        oauth2Client.setCredentials(googleTokens)
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
        const { data } = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        })

        res.json(data.items)

    } catch (error) {
        next(error)
    }
}

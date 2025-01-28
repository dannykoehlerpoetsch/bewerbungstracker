# Bewerbungstracker

Mein erstes Fullstack-Projekt im MERN-Stack.

## Funktionen

Hier kann man sich als User registrieren und anschließend seinen Bewerbungsprozess dokumentieren. Eine übersichtliche Nutzeroberfläche fragt alle relevanten Daten ab. Eine Detailansicht sowie eine Listenansicht sorgen für eine gute Übersicht der Bewerbungen. Eine Suchfunktion ermöglicht es herauszufinden, ob man sich bereits bei einem Unternehmen beworben hat. Die Filterfunktion zeigt entweder alle Bewerbungen, nur die Offenen, nur die Absagen oder nur Bewerbungen, die aktuell in Arbeit sind.
Zusätzlich kann man sich in der Listenansicht eine PDF herunterladen, um seine Bemühungen ggf. nachzuweisen.
Kommentare sowie der aktuelle Status einer Bewerbung können in der Detailansicht nachträglich bearbeitet werden. Das Löschen einer Bewerbung ist ebenfalls möglich.

## geplante Erweiterungen

- Nutzerauthentifizierung über Bestätigungs-E-Mail
- Nutzerprofil bearbeiten (Name und Passwort ändern)
- "Zugangsdaten vergessen?" Option
- auf Klick zusätzliche Inputfelder (z.B. Gehalt, Benefits)

## Techniken

### Frontend

- React
  - Context-API, useState, useEffect, Axios, JS-Cookies
- CSS
  - CSS Modules

### Backend

- Express.js

  - Express-Server
  - sichere Nutzerauthentifizierung
  - abgesicherte Routen, JWT, HttpCookies

- MongoDb
  - Datenbank hinter dem Backend
  - User-Model und Applications-Model

### Deployment

    - Render

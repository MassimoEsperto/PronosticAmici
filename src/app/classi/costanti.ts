// COSTANTI

// Versione applicazione
export const VERSION = "2.1"

export const WS_BASE_URL = `http://marescafantaeuropeo.altervista.org/servizi`

// Timeout richieste POST
export const REQUEST_TIMEOUT = 2 * 60 * 1000 // 2 minuti

// Tentativi richieste POST
export const REQUEST_RETRIES = 3

export const MAX_IMG = 40000

export const RETURN_OK = "OK"

export const SERVICE_TYPE = {
    ADMIN: { DATI: "/admin/dati/", EVENTI: "/admin/eventi/" },
    PLAYER: "/player/",
    AUT: "/autenticazione/"
}


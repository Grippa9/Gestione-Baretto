# Gestione-Baretto

## Avvio locale

1. Copia `.env.example` in `.env` e imposta le credenziali da usare in locale.
2. Avvia MySQL con `npm run db:up`.
3. Avvia l'applicazione con `npm start`.

All'avvio vengono create, se mancanti, le tabelle `prodotti`, `personale` e
`ordini`. Lo stato della connessione è verificabile su `/api/health`.

`ordini` registra una riga per prodotto ordinato, lo staff che ha preso l'ordine
e il prezzo unitario al momento dell'acquisto.
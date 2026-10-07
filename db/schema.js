const pool = require('./database');

const tables = [
  `CREATE TABLE IF NOT EXISTS prodotti (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    categoria VARCHAR(80) NULL,
    prezzo DECIMAL(10, 2) NOT NULL,
    giacenza INT UNSIGNED NOT NULL DEFAULT 0,
    attivo BOOLEAN NOT NULL DEFAULT TRUE,
    creato_il TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_prodotti_nome (nome),
    CONSTRAINT chk_prodotti_prezzo CHECK (prezzo >= 0)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
  `CREATE TABLE IF NOT EXISTS personale (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    cognome VARCHAR(80) NOT NULL,
    ruolo VARCHAR(80) NOT NULL,
    email VARCHAR(254) NULL,
    attivo BOOLEAN NOT NULL DEFAULT TRUE,
    creato_il TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_personale_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
  `CREATE TABLE IF NOT EXISTS ordini (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    prodotto_id BIGINT UNSIGNED NOT NULL,
    personale_id BIGINT UNSIGNED NOT NULL,
    quantita INT UNSIGNED NOT NULL,
    prezzo_unitario DECIMAL(10, 2) NOT NULL,
    totale DECIMAL(12, 2) GENERATED ALWAYS AS (quantita * prezzo_unitario) STORED,
    stato ENUM('aperto', 'completato', 'annullato') NOT NULL DEFAULT 'aperto',
    creato_il TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ordini_prodotto (prodotto_id),
    KEY idx_ordini_personale (personale_id),
    KEY idx_ordini_creato_il (creato_il),
    CONSTRAINT chk_ordini_quantita CHECK (quantita > 0),
    CONSTRAINT chk_ordini_prezzo_unitario CHECK (prezzo_unitario >= 0),
    CONSTRAINT fk_ordini_prodotto FOREIGN KEY (prodotto_id)
      REFERENCES prodotti (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_ordini_personale FOREIGN KEY (personale_id)
      REFERENCES personale (id) ON UPDATE CASCADE ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
];

async function initializeDatabase() {
  for (const statement of tables) {
    await pool.query(statement);
  }
}

module.exports = initializeDatabase;

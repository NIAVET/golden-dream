
-- Table pour l'historique des tirages EuroMillions
CREATE TABLE euromillions_draws (
  id BIGSERIAL PRIMARY KEY,
  draw_date DATE NOT NULL,
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 5),
  stars INTEGER[] NOT NULL CHECK (array_length(stars, 1) = 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour l'historique des tirages Loto
CREATE TABLE loto_draws (
  id BIGSERIAL PRIMARY KEY,
  draw_date DATE NOT NULL,
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 5),
  chance_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour l'historique des tirages EuroDreams
CREATE TABLE eurodreams_draws (
  id BIGSERIAL PRIMARY KEY,
  draw_date DATE NOT NULL,
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 6),
  dream_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour l'historique des tirages Keno
CREATE TABLE keno_draws (
  id BIGSERIAL PRIMARY KEY,
  draw_date DATE NOT NULL,
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes pour optimiser les requêtes
CREATE INDEX idx_euromillions_date ON euromillions_draws(draw_date DESC);
CREATE INDEX idx_loto_date ON loto_draws(draw_date DESC);
CREATE INDEX idx_eurodreams_date ON eurodreams_draws(draw_date DESC);
CREATE INDEX idx_keno_date ON keno_draws(draw_date DESC);

-- Insertion de données d'exemple pour EuroMillions (derniers tirages)
INSERT INTO euromillions_draws (draw_date, numbers, stars) VALUES
('2024-06-07', ARRAY[3, 12, 21, 35, 47], ARRAY[2, 9]),
('2024-06-04', ARRAY[7, 15, 28, 39, 42], ARRAY[1, 11]),
('2024-05-31', ARRAY[14, 19, 26, 33, 44], ARRAY[5, 8]),
('2024-05-28', ARRAY[6, 18, 25, 37, 49], ARRAY[3, 10]),
('2024-05-24', ARRAY[11, 22, 29, 41, 46], ARRAY[4, 7]);

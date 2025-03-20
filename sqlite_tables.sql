CREATE TABLE IF NOT EXISTS events (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      date_at_milliseconds_timestamp INTEGER NOT NULL,
                                      date_at TEXT NOT NULL,
                                      event_label TEXT NOT NULL,
                                      payload TEXT NULL,
                                      prompt TEXT NULL,
                                      llm_output TEXT null
);



CREATE TABLE IF NOT EXISTS inference_evaluations (
                                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                     date_at TEXT NOT NULL,
                                                     llm_used TEXT NOT NULL,
                                                     prompt_sent_to_llm TEXT NULL,
                                                     llm_output TEXT null,
                                                     is_output_valid INTEGER NULL,
                                                     notes TEXT NULL
);
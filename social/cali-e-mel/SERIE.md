# Calì & Mel — la serie

Video verticali (1080×1920, 20–35 s) per Instagram Reels, TikTok e YouTube Shorts.
Fatti con HyperFrames (HTML → MP4): ogni puntata è una cartella con `index.html` e `assets/`.

## Il formato

- **Personaggi:** Mel (la designer, faccia impassibile, occhiali da sole) e Calì (la gatta sulla sua testa, la vera direttrice creativa). Più il loro nemico ricorrente: **Il Cliente 👔**, che esiste solo come chat.
- **Tre mondi che si alternano:** la chat del cliente (carta a puntini), lo schermo con il design (la tela grigia), la reazione di Mel e Calì in primo piano (fondo rosa).
- **Ritmo lento, da suspense:** la richiesta assurda è già sul primo fotogramma, con la scritta "guarda fino alla fine 👀". Poi attese lunghe ("sta scrivendo…" per 3 secondi), lenti zoom su Mel, una rivelazione alla fine e Calì che chiude. Il finale chiede di commentare.
- **Suoni:** una musica comica "da suspense", i versi veri di Calì (dal sito) e pochi effetti (pop sui messaggi, fruscio sui cambi scena, salita prima della rivelazione). Volume normalizzato per i social (circa -15 LUFS).

## Musica (Creative Commons, citare l'autore)

Da incollare nella descrizione di ogni post:

- ep. 0 — "Monkeys Spinning Monkeys" Kevin MacLeod (incompetech.com), CC BY 4.0
- ep. 1 — "Fluffing a Duck" Kevin MacLeod (incompetech.com), CC BY 4.0
- ep. 2 — "Sneaky Snitch" Kevin MacLeod (incompetech.com), CC BY 4.0

Altri brani già scaricati e adatti: "Investigations", "Hidden Agenda", "The Builder", "Pixel Peeker Polka".

## Le puntate

Le storie vengono dalle lamentele e dalle richieste più strane che i designer raccontano (Creative Bloq, uxdesign.cc, Medium).

| Ep. | Titolo | La storia in una riga |
| --- | --- | --- |
| 0 | Il mio capo è un gatto | Calì giudica tre design: zampata, sbadiglio, timbro. ✅ |
| 1 | Il logo più grande | "Un po' più grande"… finché il poster è solo logo. "Ora è troppo grande, torniamo alla prima?" ✅ |
| 2 | Il nero più chiaro | "Un nero, ma più chiaro." Grigio, no. Uguale, no. "Mandami 50 neri": sceglie il 37, che è #000000. ✅ |
| 3 | Il bianco più bianco | Il gemello dell'ep. 2: alla fine Mel consegna lo stesso file, rinominato `bianco_PIU_bianco.png`. Approvato. |
| 4 | Minimal, ma con più cose | "Pulito, essenziale… e aggiungiamo il meteo, l'oroscopo e un video." |
| 5 | Ci vuole un minuto | "Una modifica veloce": dal giorno alla notte, 47 versioni, `FINALE_definitivo_v12_ORA_SI.pdf`. Calì dorme. |
| 6 | Deve diventare virale | "Mettici qualcosa che lo fa diventare virale." Mel mette Calì. Diventa virale. |
| 7 | Il logo te lo mando su WhatsApp | Una foto storta e sfocata di un biglietto da visita. "Ingrandisci e migliora": pixel giganti. |
| 8 | Fallo più pop | Glitter, neon, 9 font… vince la versione dove Calì ha camminato sulla tastiera. |
| 9 | Ti pago in visibilità | Calì prova a pagare le crocchette "in visibilità". |
| 10 | Ha visto anche Bob | Approvato. Poi Bob, la moglie di Bob, lo stagista. Infine anche Calì dà il suo feedback. |
| 11 | Lo capisco quando lo vedo | 30 versioni. Sceglie la numero 1. |
| 12 | Come Apple, ma entro venerdì | Il sito dei sogni con il budget di una pizza. |

## Rifare o modificare una puntata

```bash
cd social/cali-e-mel/ep02-il-nero-piu-chiaro
npx hyperframes@0.9.91 preview          # anteprima nel browser
npx hyperframes@0.9.91 render -o ep02.mp4
# volume per i social:
ffmpeg -i ep02.mp4 -c:v copy -af "loudnorm=I=-15:TP=-1.5:LRA=11" -c:a aac -b:a 192k ep02-social.mp4
```

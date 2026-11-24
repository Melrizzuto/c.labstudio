# Calì & Mel — la serie

Video verticali (1080×1920, 15–22 s) per Instagram Reels, TikTok e YouTube Shorts.
Fatti con HyperFrames (HTML → MP4): ogni puntata è una cartella con `index.html` e `assets/`.

## Il formato

- **Personaggi:** Mel (la designer, faccia impassibile, occhiali da sole) e Calì (la gatta sulla sua testa, la vera direttrice creativa). Più il loro nemico ricorrente: **Il Cliente 👔**, che esiste solo come chat.
- **Tre mondi che si alternano:** la chat del cliente (carta a puntini), lo schermo con il design (la tela grigia), la reazione di Mel e Calì in primo piano (fondo rosa).
- **La struttura:** richiesta del cliente nel primo fotogramma → Mel esegue → la richiesta peggiora → il design esplode → colpo di scena del cliente → reazione di Calì → finale "Hai un cliente così? Taggalo 👇".
- **Suoni:** i versi veri di Calì (dal sito) e pochi effetti (pop sui messaggi, fruscio sui cambi scena). La musica si aggiunge nell'app con un suono di tendenza.

## Le puntate

Le storie vengono dalle lamentele più comuni dei designer (Creative Bloq, uxdesign.cc, Medium).

| Ep. | Titolo | La storia in una riga |
| --- | --- | --- |
| 0 | Il mio capo è un gatto | Calì giudica tre design: zampata, sbadiglio, timbro. ✅ fatto |
| 1 | Il logo più grande | "Un po' più grande"… finché il poster è solo logo. "Ora è troppo grande, torniamo alla prima?" ✅ fatto |
| 2 | Fallo più pop | "Manca il wow": Mel aggiunge glitter, neon, 9 font. Il cliente sceglie la versione dove Calì ha camminato sulla tastiera. |
| 3 | Ci vuole un minuto | "Una modifica veloce, 5 minuti": dal giorno alla notte, 47 versioni, file `FINALE_definitivo_v12_ORA_SI.pdf`. Calì dorme. |
| 4 | Lo fa mio nipote con Canva | Il nipote 14enne contro Mel. Vince Calì. |
| 5 | Ti pago in visibilità | Calì prova a pagare le crocchette "in visibilità". Il negozio rifiuta. |
| 6 | Il logo te lo mando su WhatsApp | Arriva una foto storta e sfocata di un biglietto da visita. Mel fa "ingrandisci e migliora" come nei film: pixel giganti. |
| 7 | L'ho trovata su Google | Le foto del cliente hanno la filigrana di un sito di foto ovunque. |
| 8 | Non sono un designer, però… | …seguito da 14 modifiche. Una per ogni dito di Calì. |
| 9 | Ha visto anche Bob | Il design è approvato. Poi Bob, la moglie di Bob, lo stagista, la suocera. Infine anche Calì dà il suo feedback. |
| 10 | Lo capisco quando lo vedo | Mel mostra 30 versioni. Il cliente sceglie la numero 1. |
| 11 | Tutto centrato | Il cliente vuole tutto centrato. Anche Calì. Anche Mel. |
| 12 | Come Apple, ma entro venerdì | Il sito dei sogni, con il budget di una pizza. |

## Rifare o modificare una puntata

```bash
cd social/cali-e-mel/ep01-il-logo-piu-grande
npx hyperframes@0.9.91 preview          # anteprima nel browser
npx hyperframes@0.9.91 render -o ep01.mp4
```

# srgletterbox-peach


## History

The Technical Play currently send data in a POST request.

Video: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=video
Audio: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=audio

The POST request sends a JSON, build with a `pipe.js` script.

## Mobile version for Letterbox

The mobile team decided to use the Tag Commander architecture. Letterbox iOS and Android are already send stream measurements to WebTreck through Tag Commander with the Tag Commander SDK, integrated in SRGAnalytics libraries.

## Tag Commander

`https://v6.commandersact.com`

Peach has tags in the `Measurement lirbary (Letterbox)` container.

## Current version in production

- Peach schema version: 1.0.0               
- Peach implementation version: 0.9.0

JSON body integration is in [Tag Commander Integration document](Documentation/Tag-Commander-Integration.md).




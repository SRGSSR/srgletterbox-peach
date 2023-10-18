# srgletterbox-peach


[Peach product is from the EBU](https://peach.ebu.io/), was used by RTS for video recommendation for years.

RTS switched to an internal service on Azure and AWS, with same datas and APIs.

## History

Letterbox web currently send data in a POST request.

- Video: https://datacollection.rts.ch/api/events?s=chrts00000000006&e=video
- Audio: https://datacollection.rts.ch/api/events?s=chrts00000000006&e=audio

The POST request sends a JSON, build with a `pipe.js` script.

## Native version for Letterbox (mobile and big screen)

The mobile team uses the Tag Commander architecture. Letterbox iOS and Android are already send stream measurements to WebTrekk through Tag Commander with the Tag Commander SDK, integrated in `SRGAnalytics` libraries. One hit from the native library can be dispatch on several backends, server side.

## Tag Commander

https://app.commandersact.com/

RTS Pipe.js destinations are in the container 3666.

Destination names are like "SRGAnalytics Android-Apple / RTS Pipe.js [XXX] Event".
"RTS Pipe.js" is the service name used in User Consent tool.

## Current version in production

- Peach schema version: 1.0.0               
- Peach implementation version: 0.9.8

**Data sents to https://datacollection.rts.ch/api/events**

JSON body implementation is in [Documentation-server_v2 read me](Documentation-server_v2/ReadMe.md).




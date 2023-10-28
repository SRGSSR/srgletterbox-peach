# srgletterbox-peach


[Peach product is from the EBU](https://peach.ebu.io/), was used by RTS for video recommendation for years.

RTS switched to an internal service on Azure and AWS, with same datas and APIs.

## History

Technical Player, then [Letterbox web](https://github.com/sRGSSR/srgletterbox-web/) currently sends data in a POST request.

- Video: https://datacollection.rts.ch/api/events?s=chrts00000000006&e=video
- Audio: https://datacollection.rts.ch/api/events?s=chrts00000000006&e=audio

The POST request sends a JSON payload, built with a `pipe.js` script.

## Native version for Letterbox (mobile and big screen)

The Play mobile team uses the Tag Commander architecture from Commanders Act. Letterbox Apple and Android are already send stream measurements to WebTrekk through Tag Commander with the Commanders Act SDK, integrated in `SRGAnalytics` libraries. One hit from the native library can be dispatch on several backends, server side.

## Tag Commander

https://app.commandersact.com/

RTS Pipe.js destinations are in the container `3666`.

Destination names are like "SRGAnalytics Android-Apple / RTS Pipe.js [XXX] Event".
"RTS Pipe.js" is the service name used in User Consent tool.

## Current version in production

**Data sents to https://datacollection.rts.ch/api/events**

**On server V2: ([destinations](https://app.commandersact.com/en/3666/destinations))**

- Peach schema version: 1.0.0               
- Peach implementation version: 0.9.8

JSON body implementation is in [Documentation server v2](Documentation-server_v2/README.md) read me.

**On server V1 ([tags](https://platform.commandersact.com/en/3666/containers/edit/10/srg-analytics-android-ios-tvos/tag/267/azure-pageview-rts-prod)):** (for old apps)

- Peach schema version: 1.0.0               
- Peach implementation version: 0.9.7

JSON body implementation is in [Documentation server v1](Documentation-server_v1/README.md) read me.


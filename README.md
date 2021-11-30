# srgletterbox-peach


[Peach product is from the EBU](https://peach.ebu.io/), was used by RTS for video recommendation for years.

RTS switched to an internal service on Azure and AWS, with same datas and APIs.

## History

The Technical Player currently send data in a POST request.

- Video: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=video
- Audio: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=audio

The POST request sends a JSON, build with a `pipe.js` script.

## Native version for Letterbox (mobile and big screen)

The mobile team uses the Tag Commander architecture. Letterbox iOS and Android are already send stream measurements to WebTrekk through Tag Commander with the Tag Commander SDK, integrated in `SRGAnalytics` libraries. One hit from the native library can be dispatch on several backends, server side.

## Tag Commander

https://v6.commandersact.com

Peach had tags in the `srg-analytics-android-ios-tvos` container.

Azure RTS has tags in the same `srg-analytics-android-ios-tvos` container.

## Current version in production

- Peach schema version: 1.0.0               
- Peach implementation version: 0.9.6

**Data sents to https://datacollection.rts.ch/api/events**

JSON body integration is in [Tag Commander Integration document](Documentation/Tag-Commander-Integration.md).




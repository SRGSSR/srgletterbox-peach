# Tag Commander V5 (TC) integration

## Global

We try a [destination buider](https://doc.commandersact.com/features/destinations/destination-builder).

`Peach Environment` field define the appropriate value.

- Test RTS `peach_site_key`: `chrts00000000031`.
- Prod RTS `peach_site_key`: `chrts00000000032`.

Post body: a JSON, based on EBU specifications.
Specifications are in the `Specifications` folder.


## RTS Azure Media destination

[https://app.commandersact.com/en/3666/destinations/builder](https://community.commandersact.com/platform-x/developers/tracking/about-events/mobile-sdk-event-specificity)

### Mapping

Mapping from app events to RTS Azure is done in the JS, versionned on this repository.

Properties from iOS and Android SDKs are described [here](https://community.commandersact.com/platform-x/developers/tracking/about-events/mobile-sdk-event-specificity).

### Rules

 - TPD in destination
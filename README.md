# srgletterbox-peach


## History

The Technical Play currently send data in a POST request.

Video: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=video
Audio: https://pipe-collect.ebu.io/v1/collect?s=chrts00000000006&e=audio

The POST request sends a JSON, build with a `pipe.js` script.

## Mobile version for Letterbox

The mobile team decided to use the Tag Commander architecture. Letterbox iOS and Android are already send stream measurement to WebTreck.

## Variables

test site key: `chrts00000000031`.
Prod site key: `chrts00000000032`.

Specifications are in the `Specifications` folder.

## Current version in production

- Peach schema version: 1.0.0               
- Peach implementation version: 0.0.1

###Rules

 - Media URN not empty
 - media_enterprise_units is RTS
 - media_embedding_environment is preprod

 
### Keys

| JSON | Key | tag commander |
|:--:|:--:|:--:|:--:|
| / | #session_start_timestamp# | TC_CURRENT_VISIT_MS|
| / | #sent_timestamp# | TC_NOW_MS |
| /client/ | #client_id# | TC_UNIQUEID |
| /client/ | #client_app_id# | TC_BUNDLE_IDENTIFIER |
| /client/ | #client_name# | TC_APPLICATION_NAME |
| /client/ | #client_version# | TC_APPLICATION_VERSION |
| /client/device/ | #client_device_type# | ??? |
| /client/device/ | #client_device_vendor# | TC_MANUFACTURER |
| /client/device/ | #client_device_model# | TC_DEVICE |
| /client/device/ | #client_device_vendor# | TC_SCREEN |
| /client/device/ | #client_device_screen_size# | TC_MANUFACTURER |
| /client/device/ | #client_device_language# | TC_LANGUAGE_GA |
| /client/os/ | #client_os_name# | TC_RUNTIME_NAME |
| /client/os/ | #client_os_version# | TC_SYSVERSION |
| /events/[]/ | #event_type# | event_id |
| /events/[]/ | #event_id# | media_urn |
| /events/[]/ | #event_timestamp# | TC_NOW_MS |
| /events/[]/props/ | #event_props_playback_position_s# | media_position |
| /events/[]/context/component | #event_context_component_name# | media_player_display |
| /events/[]/context/component | #event_context_component_version# | media_player_version |
| /events/[]/context/metadata | #event_context_metadata_type# | media_type |
| /events/[]/context/metadata | #event_context_metadata_episode_id# | media_episode_id |
| /events/[]/context/metadata | #event_context_metadata_show_id# | media_show_id |
| /events/[]/context/metadata | #event_context_metadata_duration# | media_segment_length |








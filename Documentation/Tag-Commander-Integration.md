# Tag Commander (TC) integration

`#variables#` are replaced by the appropriate values.

##Rules

 - `media_urn` is not empty.
 - `event_id` is `play` || `seek` || `pause` || `stop` || `eof` || `pos`.
 - `media_enterprise_units` is `RTS`.
 - `media_embedding_environment` is `preprod`.

## URL

Get URL: `https://pipe-collect.ebu.io/v3/collect?s=#peach_site_key#&e=#peach_media_type#&d=#navigation_device#`

- Test RTS site key: `chrts00000000031`.
- Prod RTS site key: `chrts00000000032`.

| Parameter | Key | Tag Commander | Comment |
|:--:|:--:|:--:|:--:|
| s | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| e | `#peach_media_type#` | `peach_media_type` |  Transformed on `TC from `media_type` |
| d | `#navigation_device#` | `navigation_device` | Device type `phone`or `tablet` |

Post body: a JSON, based on EBU specifications.
Specifications are in the `Specifications` folder.

 
### JSON body

The file `tc_peach_letterbox_collect.json` is a saved copy of the body.
The file `tc_peach_letterbox_collect_comments.json` is a copy of EBU specification with implementation comments.

| JSON | Key | tag commander` | Comment |
|:--:|:--:|:--:|:--:|
| / | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| / | `#session_start_timestamp#` | `TC_CURRENT_VISIT_MS` | |
| / | `#sent_timestamp#` | `TC_NOW_MS` | |
| /client/ | `#client_id#` | `TC_UNIQUEID` | |
| /client/ | `#client_app_id#` | `TC_BUNDLE_IDENTIFIER` | |
| /client/ | `#client_name#` | `pretty_app_name` | Server side variable |
| /client/ | `#client_version#` | `TC_APPLICATION_VERSION` | |
| /client/device/ | `#client_device_type#` | `navigation_device` | |
| /client/device/ | `#client_device_vendor#` | `TC_MANUFACTURER` | |
| /client/device/ | `#client_device_model#` | `TC_DEVICE` | `TC_MODEL` is just "iPhone" |
| /client/device/ | `#client_device_screen_size#` | `TC_SCREEN` | |
| /client/device/ | `#client_device_language#` | `TC_LANGUAGE_GA` | |
| /client/os/ | `#client_os_name#` | `TC_RUNTIME_NAME` | `TC_SYSNAME` isn't lowercase |
| /client/os/ | `#client_os_version#` | `TC_SYSVERSION` | |
| /events/[]/ | `#event_type#` | `peach_event_type` | Transformed on TC from `event_id` |
| /events/[]/ | `#event_id#` | `media_urn` | |
| /events/[]/ | `#event_timestamp#` | `TC_NOW_MS` | |
| /events/[]/props/ | `#event_props_playback_position_s#` | `media_position` | |
| /events/[]/props/ | `#event_props_playback_timeshift_s#` | `media_timeshift` | |
| /events/[]/context| `#page_uri#` | `page_unique_name` | |
| /events/[]/context/component | `#event_context_component_name#` | `media_player_display` | |
| /events/[]/context/component | `#event_context_component_version#` | `media_player_version` | |
| /events/[]/context/metadata | `#event_context_metadata_type#` | `peach_media_type` | Transformed on TC from `media_type` |
| /events/[]/context/metadata | `#event_context_metadata_format#` | `peach_media_format` | Transformed on TC from `media_is_livestream` |
| /events/[]/context/metadata | `#event_context_metadata_duration#` | `media_segment_length` | |








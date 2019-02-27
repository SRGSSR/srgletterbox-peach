# Tag Commander (TC) integration

## Global

`#variables#` are replaced by the appropriate values.

- Test RTS `#peach_site_key#`: `chrts00000000031`.
- Prod RTS `#peach_site_key#`: `chrts00000000032`.

Post body: a JSON, based on EBU specifications.
Specifications are in the `Specifications` folder.

### Common JSON body

| JSON | Key | tag commander` | Comment |
|:--:|:--:|:--:|:--:|
| / | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| / | `#session_start_timestamp#` | `TC_CURRENT_VISIT_MS` | |
| / | `#sent_timestamp#` | `TC_NOW_MS` | |
| / | `#peach_user_id#` | `peach_user_id` | Transformed on `TC` from `user_id` |
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

## Media tag

### Rules

 - `media_urn` is not empty.
 - `event_id` is `play` || `seek` || `pause` || `stop` || `eof` || `pos`.
 - `media_enterprise_units` is `RTS`.
 - `media_embedding_environment` is `preprod` or `prod`.

### Get url

`https://pipe-collect.ebu.io/v3/collect?s=#peach_site_key#&e=#peach_media_type#&d=#navigation_device#&p=#media_playhead_position#`

| Parameter | Key | Tag Commander | Comment |
|:--:|:--:|:--:|:--:|
| s | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| e | `#peach_media_type#` | `peach_media_type` |  Transformed on `TC` from `media_type` |
| d | `#navigation_device#` | `navigation_device` | Device type `phone`or `tablet` |
| p | `#media_playhead_position#` | `media_playhead_position` | Server side variable |
 
### Post JSON body

The file `tc_peach_letterbox_media_collect.json` is a saved copy of the body.
The file `tc_peach_letterbox_media_collect_comments.json` is a copy of EBU specification with implementation comments.

| JSON | Key | tag commander` | Comment |
|:--:|:--:|:--:|:--:|
| /events/[]/ | `#event_type#` | `peach_event_type` | Transformed on TC from `event_id` |
| /events/[]/ | `#event_id#` | `media_urn` | |
| /events/[]/ | `#event_timestamp#` | `TC_NOW_MS` | |
| /events/[]/props/ | `#event_props_playback_position_s#` | `media_playhead_position` | Server side variable |
| /events/[]/context | `#event_context_page_uri#` | `page_unique_name` | Server side variable |
| /events/[]/context/component | `#event_context_component_name#` | `media_player_display` | |
| /events/[]/context/component | `#event_context_component_version#` | `media_player_version` | |
| /events/[]/metadata | `#event_metadata_type#` | `peach_media_type` | Transformed on TC from `media_type` |
| /events/[]/metadata | `#event_metadata_format#` | `peach_media_format` | Transformed on TC from `media_is_livestream` |
| /events/[]/metadata | `#event_metadata_duration#` | `media_segment_length` | |

## Page View tag

### Rules

 - `event_id` is `screen`
 - `navigation_bu_distributer` is `RTS`.
 - `navigation_environment` is `preprod` or `prod`.

### Get url

`https://pipe-collect.ebu.io/v3/collect?s=#peach_site_key#&d=#navigation_device#`

| Parameter | Key | Tag Commander | Comment |
|:--:|:--:|:--:|:--:|
| s | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| d | `#navigation_device#` | `navigation_device` | Device type `phone`or `tablet` |

### Post JSON body

The file `tc_peach_letterbox_pageview_collect.json` is a saved copy of the body.
The file `tc_peach_letterbox_pageview_collect comment.json` is a copy of EBU specification with implementation comments.

| JSON | Key | tag commander` | Comment |
|:--:|:--:|:--:|:--:|
| /events/[]/ | `#event_timestamp#` | `TC_NOW_MS` | |
| /events/[]/context | `#event_context_page_uri#` | `page_unique_name` | Server side variable |

## Continuous playback tag

### Rules

 - `event_id` is `hidden_event`
 - `navigation_app_site_name` is `rts-player-ios-v` or `rts-player-android-v` (Play RTS).
 - `event_name` is `continuous_playback`.
 - `navigation_environment` is `preprod` or `prod`.

### Get url

`https://pipe-collect.ebu.io/v3/collect?s=#peach_site_key#&d=#navigation_device#&r=#peach_reco_type#`

| Parameter | Key | Tag Commander | Comment |
|:--:|:--:|:--:|:--:|
| s | `#peach_site_key#` | Select the good one | Defined localy in `TC` |
| d | `#navigation_device#` | `navigation_device` | Device type `phone`or `tablet` |
| r | `#peach_reco_type#` | `peach_reco_type ` | Peach recommendation type, based of `event_type` |

### Post JSON body

The file `tc_peach_letterbox_continous_playback_collect.json` is a saved copy of the body.
The file `tc_peach_letterbox_continous_playback_collect comment.json` is a copy of EBU specification with implementation comments.

| JSON | Key | tag commander` | Comment |
|:--:|:--:|:--:|:--:|
| /events/[]/ | `#event_type#` | `peach_reco_type` | Transformed on `TC` from `event_type` | |
| /events/[]/ | `#event_id#` | `event_value_1` | Recommendation id |
| /events/[]/ | `#event_timestamp#` | `TC_NOW_MS` | |
| /events/[]/context | `#event_context_items_urn#` | `event_value` | Media URN displayed |
| /events/[]/context | `#event_context_hit_index#` | `peach_cp_hit_index` | Transformed on `TC` from `event_type` |
| /events/[]/context | `#event_context_page_uri#` | `page_unique_name` | Server side variable |
| /events/[]/context | `#event_context_action#` | `event_source` | |
| /events/[]/context/component | `#event_context_component_name#` | `pretty_app_name` | Server side variable |
| /events/[]/context/component | `#event_context_component_version#` | `TC_APPLICATION_VERSION` | |

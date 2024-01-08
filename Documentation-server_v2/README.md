# Tag Commander server V2 integration

# Global

`RTS Azure` tags are renamed `RTS Pipe.js` destinations in server V2.

Native Commanders Act SDKs for Android and Apple are in version 5 and more.

We tried first a [destination buider](https://doc.commandersact.com/features/destinations/destination-builder). But Spike was not validate it. We switched to webhook first, but array are not available and not easy to save implementation and versioning it. We got access to `Webhook with JSON` beta destination. Spike works and all destinations use it.

# Mapping help

Properties from Android and Apple SDKs are described [here](https://community.commandersact.com/platform-x/developers/tracking/about-events/mobile-sdk-event-specificity).

# RTS Pipe.js destinations

## Common settings

#### Request Headers (JSON)

```
{ "Content-Type": "application/json" }
```

#### Request Method

```
POST
```

#### Request Timeout (ms)

```
3000
```

## Common sources

For each destinations, select the `SRGAnalytics` sources:

- Android Dev
- Android Prod
- Apple Dev
- Apple Prod

## Page View Event destination

Destination: [SRGAnalytics Android-Apple / RTS Pipe.js Page View Event](https://app.commandersact.com/en/3666/destinations/109/settings).

### Settings

#### Destination url

Function:
```
CONCAT("https://datacollection.rts.ch/api/events?code=mj4l0aHSCHuOwabDUaa9aLbqaLh2WGYEbrJaJybYrNUkX8FkxYLqGQ==&s=", IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031"), "&d=", navigation_device, "&pui=", IF(ISEMPTY(user_id), "unknown", user_id)) 
```

#### Request Body data (JSON)

Text:

```
{
    "peach_schema_version": "1.0.0",
    "peach_implementation_version": "0.9.8",
    "site_key": "{{ IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031") }}",
    "session_start_timestamp": {{device.lifecycle.current_visit * 1000}},
    "sent_timestamp": {{device.lifecycle.current_session * 1000}},
    "user_id": "{{ IF(ISEMPTY(user_id), "unknown", user_id) }}",
    "client": {
        "id": "{{device.sdk_id}}",
        "type": "mobileapp",
        "app_id": "{{app.namespace}}",
        "name": "{{app.name}}",
        "version": "{{app.version}}",
        "device": {
            "type": "{{navigation_device}}",
            "vendor": "{{device.manufacturer}}",
            "model": "{{device.name}}",
            "screen_size": "{{device.screen.width}}x{{device.screen.height}}",
            "language": "{{device.language}}-{{device.region}}"
        },
        "os": {
            "name": "{{device.os.name}}",
            "version": "{{device.os.version}}"
        }
    },
    "event": {
        "type": "pageview",
        "event_timestamp": {{device.lifecycle.current_session * 1000}},
        "context": {
            "page_uri": "{{page_unique_name}}"
        }
    }
}
```

### Filters

#### Filters (advanced)

```
event_name = "page_view" AND EXISTS(page_unique_name) AND navigation_app_site_name STARTSWITH "rts-" AND consent_services CONTAINS "sKiYj0vEg5bgqv"
```

## Media Event destination

Destination: [SRGAnalytics Android-Apple / RTS Pipe.js Media Event](https://app.commandersact.com/en/3666/destinations/110/settings).

### Settings

#### Destination url

Function:
```
CONCAT("https://datacollection.rts.ch/api/events?code=mj4l0aHSCHuOwabDUaa9aLbqaLh2WGYEbrJaJybYrNUkX8FkxYLqGQ==&s=", IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031"), "&e=", LOWER(media_type), "&d=", navigation_device, "&p=", media_position, "&pui=", IF(ISEMPTY(user_id), "unknown", user_id), "&sid=", source_id) 
```

#### Request Body data (JSON)

Text:

```
{
    "peach_schema_version": "1.0.0",
    "peach_implementation_version": "0.9.8",
    "site_key": "{{ IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031") }}",
    "session_start_timestamp": {{device.lifecycle.current_visit * 1000}},
    "sent_timestamp": {{device.lifecycle.current_session * 1000}},
    "user_id": "{{ IF(ISEMPTY(user_id), "unknown", user_id) }}",
    "client": {
        "id": "{{device.sdk_id}}",
        "type": "mobileapp",
        "app_id": "{{app.namespace}}",
        "name": "{{app.name}}",
        "version": "{{app.version}}",
        "device": {
            "type": "{{navigation_device}}",
            "vendor": "{{device.manufacturer}}",
            "model": "{{device.name}}",
            "screen_size": "{{device.screen.width}}x{{device.screen.height}}",
            "language": "{{device.language}}-{{device.region}}"
        },
        "os": {
            "name": "{{device.os.name}}",
            "version": "{{device.os.version}}"
        }
    },
    "event": {
        "type": "{{ IF(event_name="play", "media_play", IF(event_name="pause", "media_pause", IF(event_name="seek", "media_seek", IF(event_name="stop", "media_stop", IF(event_name="eof", "media_eof", IF(event_name="pos", "media_heartbeat", null)))))) }}",
        "id": "{{media_urn}}",
        "event_timestamp": {{device.lifecycle.current_session * 1000}},
        "props": {
            "playback_position_s": "{{media_playhead_position}}"
        },
        "context": {
            "id": "{{source_id}}",
            "page_uri": "{{page_unique_name}}",
            "component": {
                "type": "player",
                "name": "{{media_player_display}}",
                "version": "{{media_player_version}}"
            }
        },
        "metadata": {
            "type": "{{ LOWER(media_type) }}",
            "format": "{{ IF(media_is_livestream = "true","livestream", "ondemand") }}",
            "duration": "{{media_segment_length}}"
        }
    }
}
```

### Filters

#### Filters (advanced)

```
EXISTS(media_urn) AND event_name IN ("play", "pause", "seek", "eof", "stop", "pos", "uptime", "segment") AND navigation_app_site_name STARTSWITH "rts-" AND consent_services CONTAINS "sKiYj0vEg5bgqv"
```

## ContinuousPlayback Event destination

Destination: [SRGAnalytics Android-Apple / RTS Pipe.js ContinuousPlayback Event](https://app.commandersact.com/en/3666/destinations/108/settings).

### Settings

#### Destination url

Function:
```
CONCAT("https://datacollection.rts.ch/api/events?code=mj4l0aHSCHuOwabDUaa9aLbqaLh2WGYEbrJaJybYrNUkX8FkxYLqGQ==&s=", IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031"), "&d=", navigation_device, "&r=", IF(event_type = "play_media","recommendation_hit", IF(event_type = "cancel","recommendation_cancelled", IF(event_type = "display","recommendation_displayed","NaN"))), "&pui=", IF(ISEMPTY(user_id), "unknown", user_id))
```

#### Request Body data (JSON)

Text:

```
{
    "peach_schema_version": "1.0.0",
    "peach_implementation_version": "0.9.8",
    "site_key": "{{ IF(source_key IN("3909d826-0845-40cc-a69a-6cec1036a45c", "1b30366c-9e8d-4720-8b12-4165f468f9ae"), "chrts00000000032", "chrts00000000031") }}",
    "session_start_timestamp": {{device.lifecycle.current_visit * 1000}},
    "sent_timestamp": {{device.lifecycle.current_session * 1000}},
    "user_id": "{{ IF(ISEMPTY(user_id), "unknown", user_id) }}",
    "client": {
        "id": "{{device.sdk_id}}",
        "type": "mobileapp",
        "app_id": "{{app.namespace}}",
        "name": "{{app.name}}",
        "version": "{{app.version}}",
        "device": {
            "type": "{{navigation_device}}",
            "vendor": "{{device.manufacturer}}",
            "model": "{{device.name}}",
            "screen_size": "{{device.screen.width}}x{{device.screen.height}}",
            "language": "{{device.language}}-{{device.region}}"
        },
        "os": {
            "name": "{{device.os.name}}",
            "version": "{{device.os.version}}"
        }
    },
    "event": {
        "type": "{{ IF(event_type = "play_media", "recommendation_hit", IF(event_type = "cancel", "recommendation_cancelled", IF(event_type = "display", "recommendation_displayed", "NaN"))) }}",
        "id": "{{event_value_1}}",
        "event_timestamp": {{device.lifecycle.current_session * 1000}},
        "context": {
            "items" : [ "{{event_value}}" ],
            "items_displayed" : 1,
            "hit_index" : {{ IF(event_type IN("play_media", "cancel"), 0, "null") }},
            "page_uri" : "{{page_unique_name}}",
            "action" : "{{event_source}}",
            "component" : {
                "type": "Player page",
                "name": "{{app.name}}",
                "version": "{{app.version}}",
                "feature": "continuous_playback"
            }
        }
    }
}
```

### Filters

#### Filters (advanced)

```
event_name = "continuous_playback" AND EXISTS(event_type) AND navigation_app_site_name STARTSWITH "rts-" AND consent_services CONTAINS "sKiYj0vEg5bgqv"
```
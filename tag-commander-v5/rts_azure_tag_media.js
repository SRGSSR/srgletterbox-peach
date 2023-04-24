const sendHttpRequest = require('sendHttpRequest');
const getAllEventData = require('getAllEventData');

const env_debug = true;

// Function to check property exist, otherwise return null
function safetyJsonProperty(property) {
    return (property !== undefined) ? property : null;
}

// Function to check property exist, otherwise return empty string
function safetyParameterString(property) {
    return (property !== undefined) ? property : '';
}

//We get the event data (all event's properties)
const eventData = getAllEventData();

// Media event array
const mediaEvents = ['play', 'pause', 'seek', 'stop', 'eof','pos'];

if (mediaEvents.indexOf(eventData.event_name) > -1) {
    if (eventData.media_urn === undefined || eventData.media_urn === null || eventData.media_urn === '') {
        data.onFailure({ status: 'filtered', detail: 'No media urn for a media event' });
        return;
    }

    const url = 'https://datacollection.rts.ch/api/events' +
        `?code=mj4l0aHSCHuOwabDUaa9aLbqaLh2WGYEbrJaJybYrNUkX8FkxYLqGQ==` +
        `&s=${safetyParameterString(data.peach_site_key)}` +
        `&e=${safetyParameterString(eventData.media_type)}` +
        `&d=${safetyParameterString(eventData.navigation_device)}` +
        `&pui=${safetyParameterString(eventData.media_position)}` +
        `&sid=${safetyParameterString(eventData.source_id)}`;

    // Json media payload
    const json = {
        "peach_schema_version": "1.0.0",
        "peach_implementation_version": "0.9.7",
        "site_key": safetyJsonProperty(data.peach_site_key),
        "session_start_timestamp": safetyJsonProperty(eventData.context.device.lifecycle.current_visit),
        "sent_timestamp": safetyJsonProperty(eventData.context.device.lifecycle.current_session),
        "user_id": safetyJsonProperty(eventData.user_id),
        "client": {
            "id": safetyJsonProperty(eventData.client_id),
            "type": "mobileapp",
            "app_id": safetyJsonProperty(eventData.context.app.namespace),
            "name": safetyJsonProperty(eventData.context.app.name),
            "version": safetyJsonProperty(eventData.context.app.version),
            "device": {
                "type": safetyJsonProperty(eventData.client_device_type),
                "vendor": safetyJsonProperty(eventData.context.device.manufacturer),
                "model": safetyJsonProperty(eventData.context.device.name),
                "screen_size": `${safetyJsonProperty(eventData.context.device.screen.width)}x${safetyJsonProperty(eventData.context.device.screen.height)}`,
                "language": safetyJsonProperty(eventData.client_device_language)
            },
            "os": {
                "name": safetyJsonProperty(eventData.context.device.os.name),
                "version": safetyJsonProperty(eventData.context.device.os.version)
            }
        },
        "events": [
            {
                "type": safetyJsonProperty(eventData.peach_event_type),
                "id": safetyJsonProperty(eventData.media_urn),
                "event_timestamp": safetyJsonProperty(eventData.context.device.lifecycle.current_session),
                "props": {
                    "playback_position_s": safetyJsonProperty(eventData.media_playhead_position)
                },
                "context": {
                    "id": safetyJsonProperty(eventData.source_id),
                    "page_uri": safetyJsonProperty(eventData.page_unique_name),
                    "component": {
                        "type": "player",
                        "name": safetyJsonProperty(eventData.media_player_display),
                        "version": safetyJsonProperty(eventData.media_player_version)
                    }
                },
                "metadata": {
                    "type": safetyJsonProperty(eventData.peach_media_type),
                    "format": safetyJsonProperty(eventData.peach_media_format),
                    "duration": safetyJsonProperty(eventData.media_segment_length)
                }
            }
        ]
    };
    // Convert json to string
    const postBody = JSON.stringify(json);
    // Send the data to server
    sendHttpRequest(url, (statusCode) => {
        if (statusCode >= 200 && statusCode < 300) {
            //send a success information to the Event Delivery report
            (env_debug == true) ? data.onSuccess({ status: 'sent', detail: `Payload: ${postBody}` }) : data.onSuccess();
        } else {
            //send an error to the Event Delivery report
            data.onFailure();
        }
    }, { headers: { 'Content-Type': 'application/json' }, method: 'POST', timeout: 1000 }, postBody);
}
else {
    //silent failure that will not send an error in the RTS data collection
    data.onFailure({ status: 'filtered', detail: 'Not a media event' });
}
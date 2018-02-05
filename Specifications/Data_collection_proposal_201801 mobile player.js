// Guidelines :
// ------------
// what to send for empty keys ? => DO NOT SEND
// timestamps : milliseconds, UTC based
// duration : seconds

// Agrements :
// ------------
// - Events sent in batch will be "unpacked" server side, and stored flat
// - Events supposed to be delivered by clients, not server
// - Collection URL does not change according to event type (events can be sent in batch)


{
  "peach_schema_version": "1.0.0",                // MUST
  "peach_implementation_version":"A.B.3",         // Could
  "site_key": "chrts00000000031",                 // MUST SERVER SIDE INJECTION Taken from URL, not sent by client.

  "session_start_timestamp" : 1511802218359,      // Should Timestamp UTC
                                                  // web : non persistant cookie generation time (_pipe_st)
                                                  // mobile : last time app went to foreground / was activated
                                                  //          Recommendations : 
                                                  //          - background audio playback => same session
                                                  //          - Time threshold for new session : 1 minmute by default
                                                  //            (short interaction outside app interaction)
         
  "sent_timestamp" : 1511802219043,               // MUST Timestamp UTC 
  "collect_timestamp": 1511804006063,             // MUST SERVER SIDE injection. 
                                                  // Not sent by clients, but present in collected data
  
  "user_id" :      "3459375",                     // MUST when user is logged in. Do not send for anonymous
                                                  // note : might be swapped for a shadow user_id server side
                              
  "client": {                                     // MUST 
    
    "id" : "636c84b8",                            // MUST web : persistant cookie ID
                                                  // mobile app : Globaly unique. Stable accross reboot, restarts
                                                  //              client id for CPA, xyz for other. ...
                                                  
    "type" : "mobileapp",                         // Should mobileapp|web|
                    
    "app_id" : "ch.rts.play.playrts",             // app MUST   | web : Could "br.de/mediathek", "cms 1.3.2+",...
    "name" : "Play RTS",                          // app Should | web : Should Browser name Firefox|Chrome|Safari
    "version": "Major.Minor.hotfix",              // app Should | web : Browser version 
                                                  
    "device" :{                                   // Should
      "type":"phone",                             // MUST console|phone|tablet|desktop|hbbtv|tvbox|wearable|embedded
      "vendor": "Apple",                          // Should for apps. Apple|Samsung|HTC|...
      "model": "iPhone 3.1",                      // Should for apps. Examples : "Galaxy Nexus" (Samsung in vendor)
      "screen_size": "1680x1050",                 // Could
      "language": "en-GB",                        // Could
      "timezone": -1                              // Could
    },                                          
                                                  
    "os" :{                                       // Should
      "name": "ios",                              // Should
      "version": "Major.Minor.hotfix"             // Should
    } 
  },
  
  "events" : [                                    // MUST Will be flatten SERVER SIDE as single "event":{"type":...}
  
    {                                             // events on recommendation or other list elements
      "type": "recommendation_hit",               // MUST recommendation_displayed|recommendation_hit
                                                  // Could recommendation_loaded                                              
      "id": "io.ebu.peach:reco18",                // MUST Unique Identifier of data source
                                                  //      "io.ebu.peach:" prefix for peach based reco.
      "event_timestamp": 1511804006061,           // MUST UTC timestamp of when event was fired.  
      "page_start_timestamp": 1511804006000,      // Should when the given page was first loaded in given session   
      
      "context" : {                               // Should
        "items" : [ "URN:XXY", "URN:XXZ"],        // MUST
                                                  // recommendation_loaded: all items returned by recsys. 
                                                  // recommendation_displayed: all items displayed at least once to user
                                                  // recommendation_hit: all items displayed at least once to user
                                                  
        "items_displayed" : 8,                    // MUST Total number (accumulated) of items displayed to user
        "hit_index" : 0,                          // MUST for recommendation_hit in [0..items - 1] AVOID for other
        "page_uri" : "example.org/section1/path", // Should URL or unique identifier of app section
        "source" : "main-section.news.reco3",     // Should UI definittion of source module, list,...
                                                  // Can be as simple / complex as needed. ex : "video-reco"
                                                  
        "component" : {                           // Should for reco
          "type": "carousel",                     // MUST
          "name": "SuperCarousel",                // MUST
          "version": "2.3.4"                      // Should
        }
      }              
    },
  
    {                                             // =========================== video or audio ========================
      "type": "media_play",                       // MUST media_play|media_paused|media_stop
                                                  // Should media_seek 
                                                  // Could media_video_mode_changed|media_audio_changed
      
      "id": "URN:XXX",                            // MUST globaly unique identifier of most specific part (clip)
      "event_timestamp": 1511804006061,           // MUST UTC timestamp of when event was fired.  
      "page_start_timestamp": 1511804006000,      // Should when the given page was first loaded in given session   
      
      "props" : {                                 // MUST
        "time_spent_s": 123.3,                    // Should [seconds] Total time spent by the user watching this media
                                                  //                  in current session
        "playback_position_s": 12.9,              // Should [seconds] Live : 0.0. Timeshift in past : negative.
        "previous_playback_position_s": 2.9,      // Could [seconds] Live : 0.0. Timeshift in past : negative.
        "playback_timeshift_s": 0,                // Could [seconds] Distance in second to the live
        
        "video_mode" : "normal",                  // Should bar|mini|normal|wide|pip|fullscreen|cast|preview
        "audio_mode" : "normal",                  // Should normal|background|muted
        "playback_rate" : 1.0,                    // Could Relative speed to normal : 0.5 for 2x slow mo 
        "volume" : 0.5,                           // Could from 0.0 (muted) to 1.0 (full volume)
        "qos" : {}                                // Future...
      },
                          
      "context" : {                               // Should
        "id": "io.ebu.peach:reco18",              // Should Identifier in data source (reco or list provider)
        "referrer": "http://facebook.com/...",    // Should for web.
        "page_uri" : "example.org/section1/path", // for web player : where it is included, not iFrame location.
        "source" : "main-section.news.reco3",     // Should UI definittion of source module, list,...
                                                  // Can be as simple / complex as needed. ex : "video-reco"
                                                  
        "component" : {                           // MUST for player
          "type": "player",                       // MUST
          "name": "ExoPlayer",                    // MUST
          "version": "Major.Minor.hotfix"         // Should
        }
      },
      
      "metadata" : {                              // Recommended : keep this as small as possible.
                                                  // Only meant for data filtering
                                                  // Do not display to end user: 
                                                  // Rogue data can be ingested by malicious clients.
        "type": "video",                          // Should [audio|video|article|page] 
        "format": "ondemand",                     // Could for audio/video: ondemand|livestream
        "episode_id": "ID",                       // Could.
        "show_id": "ID",                          // Could.
        "producer": "RTS",                        // Could.
        "duration": 1779.8,                       // Should [seconds] , 0 for live.  
        "title" : "xyz"                           // AVOID                    
      }
    },
      
    { 
      "type": "media_seek",                       // MUST media_play|media_paused|media_stop
                                                  // Could media_seek|media_video_mode_changed|media_audio_changed
      
      "id": "URN:XXX",                            // MUST globaly unique identifier of most specific part (clip)
      "event_timestamp": 1511804006061,           // MUST UTC timestamp of when event was fired.  
      "page_start_timestamp": 1511804006000,      // Should when the given page was first loaded in given session   
      
      "props" : {                                 // MUST
        "time_spent_s": 123.3,                    // Should [seconds] Total time spent by the user watching this media
                                                  //                  in current session
        
                                                  // Case : watch 1 minute, then seek to minute 10.                                          
                                                  // Understanding : "I'm about to jump"                                          
                                                  // Why? duration = playback_position_s - previous_playback_position_s
                                                  // Take care: next event will NOT have previous_playback_position_s
                                                  //            equals to this event playback_position_s
        "playback_position_s": 60,                // Should [seconds] Position before jump
        "previous_playback_position_s": 0,        // Could [seconds] Position of previous
        "playback_timeshift_s": 0,                // Could [seconds] Distance in second to the live
        "playback_position_s": 60,                // Should [seconds] Position before jump 
        "seek_to_position_s": 600,                // Could [seconds] Position after jump  
                                                          
        "video_mode" : "normal",                  // Should bar|mini|normal|wide|pip|fullscreen|cast|preview
        "audio_mode" : "normal",                  // Should normal|background|muted
        "playback_rate" : 1.0,                    // Could Relative speed to normal : 0.5 for 2x slow mo 
        "volume" : 0.5,                           // Could from 0.0 (muted) to 1.0 (full volume)
        "qos" : {}                                // Future...
      },
      
      "context" : {                               // Should
        "id": "io.ebu.peach:reco18",              // Should Identifier in data source (reco or list provider)
        "referrer": "http://facebook.com/...",    // Should for web.
        "page_uri" : "example.org/section1/path", // for web player : where it is included, not iFrame location
        "source" : "main-section.news.reco3",     // Should UI definittion of source module, list,...
                                                  // Can be as simple / complex as needed. ex : "video-reco"
                                                  
        "component" : {                           // MUST for player
          "type": "player",                       // MUST
          "name": "ExoPlayer",                    // MUST
          "version": "Major.Minor.hotfix"         // Should
        }
      },
      
      "metadata" : {                              // Recommended : keep this as small as possible.
                                                  // Only meant for data filtering
                                                  // Do not display to end user: 
                                                  // Rogue data can be ingested by malicious clients.
        "type": "video",                          // Should [audio|video|article|page] 
        "format": "ondemand",                     // Could for audio/video: ondemand|livestream
        "episode_id": "ID",                       // Could.
        "show_id": "ID",                          // Could.
        "producer": "RTS",                         // Could.
        "duration": 1779.8,                       // Should [seconds] , 0 for live.  
        "title" : "xyz"                           // AVOID                    
      }
    },

    {                                             // =========================== Articles ==============================        
      "type": "article_end",                      // article_start, article_end      
      "id": "URN:XXX",                            // MUST URN / id 
      "event_timestamp": 1511804006061,           // MUST UTC timestamp of when event was fired.  
      "page_start_timestamp": 1511804006000,      // Should when the given page was first loaded in given session   
      
      "props" : {                                 // MUST
        "time_spent_s": 123.3,                    // Should [seconds] Total time spent by the user watching this media
                                                  //                  in current session
        
        "completion_ratio" : 0.8,                 // Should How much of the article was seen in total : 
                                                  //        Read article and scroll to top for nav yiels 1.0
        "position_ratio" : 0.4                    // Could Were the user was
                                                  //        Read article and scroll to top for nav yiels 0.0
      },
      
      
      "context" : {                               // Should
        "id": "io.ebu.peach:reco18",              // Should Identifier in data source (reco or list provider)
        "page_uri" : "example.org/section1/path", // for player : where it is included, not iFrame location.
        "source" : "main-section.news.reco3",      // Should UI definittion of source module, list,...
                                                  // Can be as simple / complex as needed. ex : "video-reco"
                                                  
        "component" : {                           // Could
          "type": "newsTicker",                   // MUST
          "name": "bbcnewsTicker",                // MUST
          "version": "Major.Minor.hotfix"         // Should
        }
      },
      
      "metadata" : {                              // Recommended : keep this as small as possible.
                                                  // Only meant for data filtering
                                                  // Do not display to end user: 
                                                  // Rogue data can be ingested by malicious clients.
        "type": "article",                        // MUST
        "format" : "storytelling",                // Should
        "length": 27878,                          // Should chars
        "sectionId": "URN:XXX",                   // Could
        "title" : "xyz"                           // AVOID                    
      }
    }
  ]      
}
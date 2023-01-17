/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Assets = {};

// export default class ShakaAssets {
//
// }

Assets.Encoder = {
    UNKNOWN: 'Unknown',
    SHAKA_PACKAGER: 'Shaka packager',
    AXINOM: 'Axinom',
    UNIFIED_STREAMING: 'Unified Streaming',
    WOWZA: 'Wowza',
    BITCODIN: 'Bitcodin',
    NIMBLE_STREAMER: 'Nimble Streamer',
    AZURE_MEDIA_SERVICES: 'Azure Media Services',
    MP4BOX: 'MP4Box',
    APPLE: 'Apple',
    UPLYNK: 'Verizon Digital Media Services',
    ANEVIA: 'Anevia',
};

Assets.Source = {
    CUSTOM: 'Custom',
    SHAKA: 'Shaka',
    AXINOM: 'Axinom',
    UNIFIED_STREAMING: 'Unified Streaming',
    DASH_IF: 'DASH-IF',
    WOWZA: 'Wowza',
    BITCODIN: 'Bitcodin',
    NIMBLE_STREAMER: 'Nimble Streamer',
    AZURE_MEDIA_SERVICES: 'Azure Media Services',
    GPAC: 'GPAC',
    UPLYNK: 'Verizon Digital Media Services',
};


Assets.KeySystem = {
    CLEAR_KEY: 'org.w3.clearkey',
    PLAYREADY: 'com.microsoft.playready',
    WIDEVINE: 'com.widevine.alpha',
};

Assets.Feature = {
    SEGMENT_BASE: 'SegmentBase',
    SEGMENT_LIST_DURATION: 'SegmentList w/ @duration',
    SEGMENT_LIST_TIMELINE: 'SegmentList w/ SegmentTimeline',
    SEGMENT_TEMPLATE_DURATION: 'SegmentTemplate w/ @duration',
    SEGMENT_TEMPLATE_TIMELINE: 'SegmentTemplate w/ SegmentTimeline',
    SEGMENT_TEMPLATE_TIMELINE_TIME: 'SegmentTemplate w/ SegmentTimeline $Time$',
    SEGMENT_TEMPLATE_TIMELINE_NUMBER: 'SegmentTemplate w/ SegTimeline $Number$',

    PSSH: 'embedded PSSH',
    MULTIKEY: 'multiple keys',
    MULTIPERIOD: 'multiple Periods',
    ENCRYPTED_WITH_CLEAR: 'mixing encrypted and unencrypted periods',
    AESCTR_16_BYTE_IV: 'encrypted with AES CTR Mode using a 16 byte IV',
    AESCTR_8_BYTE_IV: 'encrypted with AES CTR Mode using a 8 byte IV',
    TRICK_MODE: 'special trick mode track',
    XLINK: 'xlink',

    SUBTITLES: 'subtitles',
    CAPTIONS: 'captions',
    SEGMENTED_TEXT: 'segmented text',
    EMBEDDED_TEXT: 'embedded text',
    MULTIPLE_LANGUAGES: 'multiple languages',
    OFFLINE: 'offline',

    LIVE: 'live',
    WEBM: 'WebM',
    MP4: 'mp4',
    MP2TS: 'MPEG-2 TS',
    TTML: 'TTML',
    WEBVTT: 'WebVTT',

    HIGH_DEFINITION: 'high definition',
    ULTRA_HIGH_DEFINITION: 'ultra-high definition',

    SURROUND: 'surround sound',

    DASH: 'DASH',
    HLS: 'HLS',
};

Assets.ExtraText;


/**
 * @typedef {{
 *   name: string,
 *   manifestUri: string,
 *   certificateUri: (string|undefined),
 *   focus: (boolean|undefined),
 *   disabled: (boolean|undefined),
 *   extraText: (!Array.<Assets.ExtraText>|undefined),
 *
 *   iconUri: (string|undefined),
 *   shortName: (string|undefined),
 *   description: (string|undefined),
 *   isFeatured: (boolean|undefined),
 *
 *   encoder: Assets.Encoder,
 *   source: Assets.Source,
 *   drm: !Array.<Assets.KeySystem>,
 *   features: !Array.<Assets.Feature>,
 *
 *   licenseServers: (!Object.<string, string>|undefined),
 *   licenseRequestHeaders: (!Object.<string, string>|undefined),
 *   requestFilter: (shaka.extern.RequestFilter|undefined),
 *   responseFilter: (shaka.extern.ResponseFilter|undefined),
 *   drmCallback: (shaka.extern.DashContentProtectionCallback|undefined),
 *   clearKeys: (!Object.<string, string>|undefined),
 *
 *   extraConfig: (Object|undefined)
 * }}
 *
 * @property {string} name
 *   The name of the asset.  This does not have to be unique and can be the
 *   same if the asset is encoded different ways (or by different encoders).
 * @property {string} manifestUri
 *   The URI of the manifest.
 * @property {(string|undefined)} certificateUri
 *   The URI of the DRM server certificate, if required to play this asset.
 * @property {(boolean|undefined)} focus
 *   (optional) If true, focuses the integration test for this asset and selects
 *   this asset in the demo app.
 * @property {(boolean|undefined)} disabled
 *   (optional) If true, disables tests for this asset and hides it in the demo
 *   app.
 * @property {(!Array.<Assets.ExtraText>|undefined)} extraText
 *   (optional) An array of extra text sources (e.g. external captions).
 *
 * @property {string} iconUri
 *   An URI pointing to an icon.
 * @property {string} shortName
 *   A shorter, snappier name for the asset.
 * @property {string} description
 *   A line or two of text describing the asset.
 * @property {(boolean|undefined)} isFeatured
 *   (optional) If this is true, the asset will appear in the main page.
 *
 * @property {Assets.Encoder} encoder
 *   The encoder that created the asset.
 * @property {Assets.Source} source
 *   The source of the asset.
 * @property {!Array.<Assets.KeySystem>} drm
 *   An array of key-systems that the asset uses.
 * @property {!Array.<Assets.Feature>} features
 *   An array of features that this asset has.
 *
 * @property {(!Object.<string, string>|undefined)} licenseServers
 *   (optional) A map of key-system to license server.
 * @property {(!Object.<string, string>|undefined)} licenseRequestHeaders
 *   (optional) A map of headers to add to license requests.
 * @property {(shaka.extern.RequestFilter|undefined)}
 *     requestFilter
 *   A filter on license requests before they are passed to the server.
 * @property {(shaka.extern.ResponseFilter|undefined)}
 *     responseFilter
 *   A filter on license responses before they are passed to the CDM.
 * @property {(shaka.extern.DashContentProtectionCallback|undefined)}
 *   drmCallback
 *   A callback to use to interpret ContentProtection elements.
 * @property {(!Object.<string, string>|undefined)} clearKeys
 *   A map of key-id to key to use with clear-key encryption.
 *
 * @property {(Object|undefined)} extraConfig
 *   Arbitrary player config to be applied after all other settings.
 */
Assets.AssetInfo;
// }}}


// Custom callbacks {{{
/**
 * A response filter for VDMS Uplynk manifest responses.
 * This allows us to get the license prefix that is necessary
 * to later generate a proper license response.
 * @param {shaka.net.NetworkingEngine.RequestType} type
 * @param {shaka.extern.Response} response
 * The uplynk_prefix attribute is set on the Assets object
 * and is later referenced in the UplynkRequestFilter.
 */
Assets.UplynkResponseFilter = function(type, response) {
    if (type == shaka.net.NetworkingEngine.RequestType.MANIFEST) {
        // Parse a custom header that contains a value needed to build a proper
        // license server URL.
        if (response.headers['x-uplynk-prefix']) {
            Assets.uplynk_prefix = response.headers['x-uplynk-prefix'];
        } else {
            Assets.uplynk_prefix = '';
        }
    }
};


/**
 * A license request filter for VDMS Uplynk license requests.
 * @param {shaka.net.NetworkingEngine.RequestType} type
 * @param {shaka.extern.Request} request
 * The uplynk_prefix variable is retrieved from the Assets
 * object, and requires that the uplynk manifest response filter also be set.
 */
Assets.UplynkRequestFilter = function(type, request) {
    if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
        // Modify the license request URL based on our cookie.
        if (request.uris[0].includes('wv') &&
            Assets.uplynk_prefix) {
            request.uris[0] = Assets.uplynk_prefix.concat('/wv');
        } else if (request.uris[0].includes('ck') &&
            Assets.uplynk_prefix) {
            request.uris[0] = Assets.uplynk_prefix.concat('/ck');
        } else if (request.uris[0].includes('pr') &&
            Assets.uplynk_prefix) {
            request.uris[0] = Assets.uplynk_prefix.concat('/pr');
        }
    }
};
// }}}


/** @const {!Array.<Assets.AssetInfo>} */
Assets.testAssets = [
    // Shaka assets {{{
    {
        id: 0,
        name: 'Angel One (multicodec, multilingual)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/angel_one.png',
        shortName: 'Angel One',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 1,
        name: 'Angel One (multicodec, multilingual, Widevine)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/angel_one.png',
        shortName: 'Angel One',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [Assets.KeySystem.WIDEVINE],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
        },
    },
    {
        id: 2,
        name: 'Angel One (multicodec, multilingual, ClearKey server)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-clearkey/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/angel_one.png',
        shortName: 'Angel One',

        disabled: true,

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [Assets.KeySystem.CLEAR_KEY],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'org.w3.clearkey': 'https://cwip-shaka-proxy.appspot.com/clearkey?_u3wDe7erb7v8Lqt8A3QDQ=ABEiM0RVZneImaq7zN3u_w',
        },
    },
    {
        id: 3,
        name: 'Angel One (HLS, MP4, multilingual)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/angel_one.png',
        shortName: 'Angel One',
        description: 'A clip from a classic Star Trek TNG episode, presented in ' +
            'HLS.',
        isFeatured: true,

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 4,
        name: 'Angel One (HLS, MP4, multilingual, Widevine)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine-hls/hls.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/angel_one.png',
        shortName: 'Angel One',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [Assets.KeySystem.WIDEVINE],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
        },
    },
    {
        id: 5,
        name: 'Sintel 4k (multicodec)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 6,
        name: 'Sintel w/ trick mode (MP4 only, 720p)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-trickplay/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TRICK_MODE,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 7,
        name: 'Sintel 4k (WebM only)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-webm-only/dash.mpd',
        // NOTE: hanging in Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1291451

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 8,
        name: 'Sintel 4k (MP4 only)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-mp4-only/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 9,
        name: 'Sintel 4k (multicodec, Widevine)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',
        description: 'A Blender Foundation short film, protected by Widevine ' +
            'encryption.',
        isFeatured: true,

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [Assets.KeySystem.WIDEVINE],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.PSSH,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
        },
    },
    {
        id: 10,
        name: 'Sintel 4k (multicodec, VTT in MP4)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-mp4-wvtt/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBM,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 11,
        name: 'Sintel w/ 44 subtitle languages',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-many-subs/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 12,
        name: 'Heliocentrism (multicodec, multiperiod)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/heliocentricism.png',
        shortName: 'Heliocentrism',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.WEBM,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 13,
        name: 'Heliocentrism (multicodec, multiperiod, xlink)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism-xlink/heliocentrism.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/heliocentricism.png',
        shortName: 'Heliocentrism',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.WEBM,
            Assets.Feature.XLINK,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 14,
        name: '"Dig the Uke" by Stefan Kartenberg (audio only, multicodec)',
        // From: http://dig.ccmixter.org/files/JeffSpeed68/53327
        // Licensed under Creative Commons BY-NC 3.0.
        // Free for non-commercial use with attribution.
        // http://creativecommons.org/licenses/by-nc/3.0/
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke-clear/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/audio_only.png',
        shortName: 'Dig the Uke',
        description: 'An audio-only presentation performed by Stefan Kartenberg.',
        isFeatured: true,

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.WEBM,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 15,
        name: '"Dig the Uke" by Stefan Kartenberg (audio only, multicodec, Widevine)',  // eslint-disable-line max-len
        // From: http://dig.ccmixter.org/files/JeffSpeed68/53327
        // Licensed under Creative Commons BY-NC 3.0.
        // Free for non-commercial use with attribution.
        // http://creativecommons.org/licenses/by-nc/3.0/
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/audio_only.png',
        shortName: 'Dig the Uke',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [Assets.KeySystem.WIDEVINE],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.WEBM,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
        },
    },
    {
        id: 16,
        name: 'Tears of Steel (multicodec, TTML)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TTML,
            Assets.Feature.WEBM,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 17,
        name: 'Tears of Steel (multicodec, surround + stereo)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/tos-surround/dash.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.SURROUND,
            Assets.Feature.WEBM,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 18,
        name: 'Shaka Player History (multicodec, live, DASH)',
        manifestUri: 'https://storage.googleapis.com/shaka-live-assets/player-source.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/shaka.png',
        shortName: 'Shaka Player History',
        description: 'A self-indulgent DASH livestream.',
        isFeatured: true,

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.WEBM,
        ],
    },
    {
        id: 19,
        name: 'Shaka Player History (live, HLS)',
        manifestUri: 'https://storage.googleapis.com/shaka-live-assets/player-source.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/shaka.png',
        shortName: 'Shaka Player History',

        encoder: Assets.Encoder.SHAKA_PACKAGER,
        source: Assets.Source.SHAKA,
        drm: [],
        features: [
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.HLS,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
        ],
    },
    // }}}

    // Axinom assets {{{
    // Src: https://github.com/Axinom/dash-test-vectors
    {
        id: 20,
        name: 'Multi-DRM',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
            'com.microsoft.playready': 'https://drm-playready-licensing.axtest.net/AcquireLicense',
        },
        licenseRequestHeaders: {
            'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA',  // eslint-disable-line max-len
        },
    },
    {
        id: 21,
        name: 'Multi-DRM, multi-key',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-MultiKey/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.MULTIKEY,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
            'com.microsoft.playready': 'https://drm-playready-licensing.axtest.net/AcquireLicense',
        },
        licenseRequestHeaders: {
            'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiODAzOTliZjUtOGEyMS00MDE0LTgwNTMtZTI3ZTc0OGU5OGMwIiwiZW5jcnlwdGVkX2tleSI6ImxpTkpxVmFZa05oK01LY3hKRms3SWc9PSJ9LHsiaWQiOiI5MDk1M2UwOS02Y2IyLTQ5YTMtYTI2MC03YTVmZWZlYWQ0OTkiLCJlbmNyeXB0ZWRfa2V5Ijoia1l0SEh2cnJmQ01lVmRKNkxrYmtuZz09In0seyJpZCI6IjBlNGRhOTJiLWQwZTgtNGE2Ni04YzNmLWMyNWE5N2ViNjUzMiIsImVuY3J5cHRlZF9rZXkiOiI3dzdOWkhITE1nSjRtUUtFSzVMVE1RPT0ifSx7ImlkIjoiNTg1ZjIzM2YtMzA3Mi00NmYxLTlmYTQtNmRjMjJjNjZhMDE0IiwiZW5jcnlwdGVkX2tleSI6IkFjNFVVbVl0Qko1blBROU4xNXJjM2c9PSJ9LHsiaWQiOiI0MjIyYmQ3OC1iYzQ1LTQxYmYtYjYzZS02ZjgxNGRjMzkxZGYiLCJlbmNyeXB0ZWRfa2V5IjoiTzZGTzBmcVNXb3BwN2JqYy9ENGxNQT09In1dfX0.uF6YlKAREOmbniAeYiH070HSJhV0YS7zSKjlCtiDR5Y',  // eslint-disable-line max-len
        },
    },
    {
        id: 22,
        name: 'Multi-DRM, multi-key, multi-Period',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-MultiKey-MultiPeriod/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.MULTIKEY,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
            'com.microsoft.playready': 'https://drm-playready-licensing.axtest.net/AcquireLicense',
        },
        licenseRequestHeaders: {
            'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiMDg3Mjc4NmUtZjllNy00NjVmLWEzYTItNGU1YjBlZjhmYTQ1IiwiZW5jcnlwdGVkX2tleSI6IlB3NitlRVlOY3ZqWWJmc2gzWDNmbWc9PSJ9LHsiaWQiOiJjMTRmMDcwOS1mMmI5LTQ0MjctOTE2Yi02MWI1MjU4NjUwNmEiLCJlbmNyeXB0ZWRfa2V5IjoiLzErZk5paDM4bXFSdjR5Y1l6bnQvdz09In0seyJpZCI6IjhiMDI5ZTUxLWQ1NmEtNDRiZC05MTBmLWQ0YjVmZDkwZmJhMiIsImVuY3J5cHRlZF9rZXkiOiJrcTBKdVpFanBGTjhzYVRtdDU2ME9nPT0ifSx7ImlkIjoiMmQ2ZTkzODctNjBjYS00MTQ1LWFlYzItYzQwODM3YjRiMDI2IiwiZW5jcnlwdGVkX2tleSI6IlRjUlFlQld4RW9IT0tIcmFkNFNlVlE9PSJ9LHsiaWQiOiJkZTAyZjA3Zi1hMDk4LTRlZTAtYjU1Ni05MDdjMGQxN2ZiYmMiLCJlbmNyeXB0ZWRfa2V5IjoicG9lbmNTN0dnbWVHRmVvSjZQRUFUUT09In0seyJpZCI6IjkxNGU2OWY0LTBhYjMtNDUzNC05ZTlmLTk4NTM2MTVlMjZmNiIsImVuY3J5cHRlZF9rZXkiOiJlaUkvTXNsbHJRNHdDbFJUL0xObUNBPT0ifSx7ImlkIjoiZGE0NDQ1YzItZGI1ZS00OGVmLWIwOTYtM2VmMzQ3YjE2YzdmIiwiZW5jcnlwdGVkX2tleSI6IjJ3K3pkdnFycERWM3hSMGJKeTR1Z3c9PSJ9LHsiaWQiOiIyOWYwNWU4Zi1hMWFlLTQ2ZTQtODBlOS0yMmRjZDQ0Y2Q3YTEiLCJlbmNyeXB0ZWRfa2V5IjoiL3hsU0hweHdxdTNnby9nbHBtU2dhUT09In0seyJpZCI6IjY5ZmU3MDc3LWRhZGQtNGI1NS05NmNkLWMzZWRiMzk5MTg1MyIsImVuY3J5cHRlZF9rZXkiOiJ6dTZpdXpOMnBzaTBaU3hRaUFUa1JRPT0ifV19fQ.BXr93Et1krYMVs-CUnf7F3ywJWFRtxYdkR7Qn4w3-to',  // eslint-disable-line max-len
        },
    },
    {
        id: 23,
        name: 'Clear, single-Period',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 24,
        name: 'Clear, multi-Period',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest_MultiPeriod.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 25,
        name: 'Clear, Live DASH',
        manifestUri: 'https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/weird_rainbow_test_pattern.png',
        shortName: 'Test Pattern',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [],
        features: [
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.WEBVTT,
        ],
    },
    {
        id: 26,
        name: 'Clear, Live HLS',
        manifestUri: 'https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/weird_rainbow_test_pattern.png',
        shortName: 'Test Pattern',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.WEBVTT,
        ],
    },
    // }}}

    // Unified Streaming {{{
    // Src: http://demo.unified-streaming.com/features.html
    {
        id: 27,
        name: 'Tears of Steel',
        manifestUri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.UNIFIED_STREAMING,
        source: Assets.Source.UNIFIED_STREAMING,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 28,
        name: 'Tears of Steel (Widevine)',
        manifestUri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.UNIFIED_STREAMING,
        source: Assets.Source.UNIFIED_STREAMING,
        drm: [
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
        },
    },
    {
        id: 29,
        name: 'Tears of Steel (PlayReady)',
        manifestUri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-dash-playready.ism/.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.UNIFIED_STREAMING,
        source: Assets.Source.UNIFIED_STREAMING,
        drm: [
            Assets.KeySystem.PLAYREADY,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
        ],

        licenseServers: {
	    'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx',
	    // 'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(playright:true,simple:true)',
            // 'com.microsoft.playready': 'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1',
        },
    },
    {
        id: 30,
        name: 'Tears of Steel (subtitles)',
        manifestUri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-en.ism/.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.UNIFIED_STREAMING,
        source: Assets.Source.UNIFIED_STREAMING,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.EMBEDDED_TEXT,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.SEGMENTED_TEXT,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TTML,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.OFFLINE,
        ],
    },
    // }}}

    // DASH-IF assets {{{
    // Src: http://dashif.org/test-vectors/
    {
        id: 31,
        name: 'Big Buck Bunny',
        manifestUri: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/big_buck_bunny.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 32,
        name: 'Live sim (2s segments)',
        manifestUri: 'https://livesim.dashif.org/livesim/utc_head/testpic_2s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    {
        id: 33,
        name: 'Live sim SegmentTimeline w $Time$ (6s segments)',
        manifestUri: 'https://livesim.dashif.org/livesim/segtimeline_1/utc_head/testpic_6s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE_TIME,
        ],
    },
    {
        id: 34,
        name: 'Live sim SegmentTimeline w $Number$ (6s segments)',
        manifestUri: 'https://livesim.dashif.org/livesim/segtimelinenr_1/utc_head/testpic_6s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE_NUMBER,
        ],
    },
    {
        id: 35,
        name: 'Live sim SegmentTimeline StartOver [-20s, +20s] (2s segments)',
        manifestUri: 'https://livesim.dashif.org/livesim/segtimeline_1/startrel_-20/stoprel_20/timeoffset_0/testpic_2s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE_TIME,
        ],
    },
    {
        id: 36,
        name: 'Live sim StartOver SegTmpl Duration [-20s, +20s] (2s segments)',
        manifestUri: 'https://livesim.dashif.org/livesim/startrel_-20/stoprel_20/timeoffset_0/testpic_2s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    {
        id: 37,
        name: 'Live sim SegTmpl Duration (multi-period 60s)',
        manifestUri: 'https://livesim.dashif.org/livesim/utc_head/periods_60/testpic_2s/Manifest.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    {
        id: 38,
        name: 'Live sim TTML Image Subtitles embedded (VoD)',
        manifestUri: 'https://livesim.dashif.org/dash/vod/testpic_2s/img_subs.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/dash_if_test_pattern.png',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.DASH_IF,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SUBTITLES,
            Assets.Feature.TTML,
        ],
    },
    // }}}

    // Wowza assets {{{
    // Src: http://www.dash-player.com/demo/streaming-server-and-encoder-support/
    {
        id: 39,
        name: 'Big Buck Bunny (Live)',
        manifestUri: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/big_buck_bunny.png',
        shortName: 'Big Buck Bunny',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Encoder.WOWZA,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.LIVE,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
        ],
    },
    // }}}

    // bitcodin assets {{{
    // Src: http://www.dash-player.com/demo/streaming-server-and-encoder-support/
    // Src: https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
    {
        id: 40,
        name: 'Art of Motion (DASH)',
        manifestUri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/art_of_motion.png',
        shortName: 'Art of Motion',

        encoder: Assets.Encoder.BITCODIN,
        source: Assets.Source.BITCODIN,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 41,
        name: 'Art of Motion (HLS, TS)',
        manifestUri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/art_of_motion.png',
        shortName: 'Art of Motion',

        encoder: Assets.Encoder.BITCODIN,
        source: Assets.Source.BITCODIN,
        drm: [],
        features: [
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.HLS,
            Assets.Feature.MP2TS,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 42,
        name: 'Sintel (HLS, TS, 4k)',
        manifestUri: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',
        shortName: 'Sintel',

        encoder: Assets.Encoder.BITCODIN,
        source: Assets.Source.BITCODIN,
        drm: [],
        features: [
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.HLS,
            Assets.Feature.MP2TS,
            Assets.Feature.ULTRA_HIGH_DEFINITION,
            Assets.Feature.OFFLINE,
        ],
    },
    // }}}

    // Nimble Streamer assets {{{
    // Src: http://www.dash-player.com/demo/streaming-server-and-encoder-support/
    {
        id: 43,
        name: 'Big Buck Bunny',
        manifestUri: 'https://video.wmspanel.com/local/raw/BigBuckBunny_320x180.mp4/manifest.mpd',
        // As of 2017-08-04, there is a common name mismatch error with this site's
        // SSL certificate.  See https://github.com/google/shaka-player/issues/955
        disabled: true,

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/big_buck_bunny.png',

        encoder: Assets.Encoder.NIMBLE_STREAMER,
        source: Assets.Source.NIMBLE_STREAMER,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
        ],
    },
    // }}}

    // Azure Media Services assets {{{
    // Src: http://amp.azure.net/libs/amp/latest/docs/samples.html
    {
        id: 44,
        name: 'Azure Trailer',
        manifestUri: 'https://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=mpd-time-csf)',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/azure.png',

        encoder: Assets.Encoder.AZURE_MEDIA_SERVICES,
        source: Assets.Source.AZURE_MEDIA_SERVICES,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 45,
        name: 'Big Buck Bunny',
        manifestUri: 'https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest(format=mpd-time-csf)',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/big_buck_bunny.png',

        encoder: Assets.Encoder.AZURE_MEDIA_SERVICES,
        source: Assets.Source.AZURE_MEDIA_SERVICES,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.OFFLINE,
        ],

        licenseServers: {
            'com.widevine.alpha': 'https://amssamples.keydelivery.mediaservices.windows.net/Widevine/?KID=1ab45440-532c-4399-94dc-5c5ad9584bac',
            'com.microsoft.playready': 'https://amssamples.keydelivery.mediaservices.windows.net/PlayReady/',
        },
    },
    {
        id: 46,
        name: 'Tears Of Steel (external text)',
        manifestUri: 'https://ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TearsOfSteel_WAMEH264SmoothStreaming720p.ism/manifest(format=mpd-time-csf)',
        extraText: [
            {
                uri: 'https://ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TOS-en.vtt',
                language: 'en',
                kind: 'subtitle',
                mime: 'text/vtt',
            },
            {
                uri: 'https://ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TOS-es.vtt',
                language: 'es',
                kind: 'subtitle',
                mime: 'text/vtt',
            },
            {
                uri: 'https://ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TOS-fr.vtt',
                language: 'fr',
                kind: 'subtitle',
                mime: 'text/vtt',
            },
        ],

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/tears_of_steel.png',
        shortName: 'Tears of Steel',

        encoder: Assets.Encoder.AZURE_MEDIA_SERVICES,
        source: Assets.Source.AZURE_MEDIA_SERVICES,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_TIMELINE,
            Assets.Feature.SUBTITLES,
            Assets.Feature.WEBVTT,
            Assets.Feature.OFFLINE,
        ],
    },
    // }}}

    // GPAC assets {{{
    // Src: https://gpac.wp.mines-telecom.fr/2012/02/23/dash-sequences/
    // NOTE: The assets here using the "live profile" are not actually
    // "live streams".  The content is still static, as is the timeline.
    {
        id: 47,
        name: 'live profile',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-live/mp4-live-mpd-AV-BS.mpd',
        // NOTE: Multiple SPS/PPS in init segment, no sample duration
        // NOTE: Decoder errors on Mac
        // https://github.com/gpac/gpac/issues/600
        // https://bugs.webkit.org/show_bug.cgi?id=160459
        disabled: true,

        // TODO: Get actual icon?
        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    {
        id: 48,
        name: 'live profile with five periods',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-live-periods/mp4-live-periods-mpd.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 49,
        name: 'main profile, single file',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-main-single/mp4-main-single-mpd-AV-NBS.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_LIST_DURATION,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 50,
        name: 'main profile, mutiple files',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-main-multi/mp4-main-multi-mpd-AV-BS.mpd',
        // NOTE: Multiple SPS/PPS in init segment, no sample duration
        // NOTE: Decoder errors on Mac
        // https://github.com/gpac/gpac/issues/600
        // https://bugs.webkit.org/show_bug.cgi?id=160459
        disabled: true,

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_LIST_DURATION,
        ],
    },
    {
        id: 51,
        name: 'onDemand profile',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-onDemand/mp4-onDemand-mpd-AV.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_BASE,
            Assets.Feature.OFFLINE,
        ],
    },
    {
        id: 52,
        name: 'main profile, open GOP',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-main-ogop/mp4-main-ogop-mpd-AV-BS.mpd',
        // NOTE: Segments do not start with keyframes
        // NOTE: Decoder errors on Safari
        // https://bugs.webkit.org/show_bug.cgi?id=160460
        disabled: true,

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    {
        id: 53,
        name: 'full profile, gradual decoding refresh',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-full-gdr/mp4-full-gdr-mpd-AV-BS.mpd',
        // NOTE: segments do not start with keyframes
        // NOTE: Decoder errors on Safari
        // https://bugs.webkit.org/show_bug.cgi?id=160460
        disabled: true,

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/gpac_test_pattern.png',

        encoder: Assets.Encoder.MP4BOX,
        source: Assets.Source.GPAC,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.SEGMENT_TEMPLATE_DURATION,
        ],
    },
    // }}}

    // Verizon Digital Media Services (VDMS) assets {{{
    {
        id: 54,
        name: 'Multi DRM - 8 Byte IV',
        // Reliable Playready playback requires Edge 16+
        // The playenabler and sl url parameters allow for playback in VMs
        manifestUri: 'https://content.uplynk.com/847859273a4b4a81959d8fea181672a4.mpd?pr.version=2&pr.playenabler=B621D91F-EDCC-4035-8D4B-DC71760D43E9&pr.securitylevel=150',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/azure.png',

        encoder: Assets.Encoder.UPLYNK,
        source: Assets.Source.UPLYNK,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.PSSH,
            Assets.Feature.MULTIKEY,
            Assets.Feature.AESCTR_8_BYTE_IV,
            Assets.Feature.SEGMENT_LIST_DURATION,
            Assets.Feature.HIGH_DEFINITION,
        ],
        licenseServers: {
            'com.microsoft.playready': 'https://content.uplynk.com/pr',
            'com.widevine.alpha': 'https://content.uplynk.com/wv',
        },
        requestFilter: Assets.UplynkRequestFilter,
        responseFilter: Assets.UplynkResponseFilter,
    },
    {
        id: 55,
        name: 'Multi DRM - MultiPeriod - 8 Byte IV',
        // Reliable Playready playback requires Edge 16+
        // The playenabler and sl url parameters allow for playback in VMs
        manifestUri: 'https://content.uplynk.com/054225d59be2454fabdca3e96912d847.mpd?ad=cleardash&pr.version=2&pr.playenabler=B621D91F-EDCC-4035-8D4B-DC71760D43E9&pr.securitylevel=150',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',

        encoder: Assets.Encoder.UPLYNK,
        source: Assets.Source.UPLYNK,
        drm: [
            Assets.KeySystem.PLAYREADY,
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.PSSH,
            Assets.Feature.MULTIKEY,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.SEGMENT_LIST_DURATION,
            Assets.Feature.AESCTR_8_BYTE_IV,
            Assets.Feature.HIGH_DEFINITION,
        ],
        licenseServers: {
            'com.microsoft.playready': 'https://content.uplynk.com/pr',
            'com.widevine.alpha': 'https://content.uplynk.com/wv',
        },
        requestFilter: Assets.UplynkRequestFilter,
        responseFilter: Assets.UplynkResponseFilter,
    },
    {
        id: 56,
        name: 'Widevine - 16 Byte IV',
        manifestUri: 'https://content.uplynk.com/224ac8717e714b68831997ab6cea4015.mpd',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/big_buck_bunny.png',

        encoder: Assets.Encoder.UPLYNK,
        source: Assets.Source.UPLYNK,
        drm: [
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.PSSH,
            Assets.Feature.MULTIKEY,
            Assets.Feature.AESCTR_16_BYTE_IV,
            Assets.Feature.SEGMENT_LIST_DURATION,
            Assets.Feature.HIGH_DEFINITION,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://content.uplynk.com/wv',
        },
        requestFilter: Assets.UplynkRequestFilter,
        responseFilter: Assets.UplynkResponseFilter,
    },
    {
        id: 57,
        name: 'Widevine - 16 Byte IV - (mix of encrypted and unencrypted periods)',
        // Unencrypted periods interspersed with protected periods
        // Doesn't work on Chrome < 58
        manifestUri: 'https://content.uplynk.com/1eb40d8e64234f5c9879db7045c3d48c.mpd?ad=cleardash&rays=cdefg',

        iconUri: 'https://storage.googleapis.com/shaka-asset-icons/sintel.png',

        encoder: Assets.Encoder.UPLYNK,
        source: Assets.Source.UPLYNK,
        drm: [
            Assets.KeySystem.WIDEVINE,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.MULTIPLE_LANGUAGES,
            Assets.Feature.SEGMENT_LIST_DURATION,
            Assets.Feature.PSSH,
            Assets.Feature.HIGH_DEFINITION,
            Assets.Feature.MULTIPERIOD,
            Assets.Feature.MULTIKEY,
            Assets.Feature.AESCTR_16_BYTE_IV,
            Assets.Feature.ENCRYPTED_WITH_CLEAR,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://content.uplynk.com/wv',
        },
        requestFilter: Assets.UplynkRequestFilter,
        responseFilter: Assets.UplynkResponseFilter,
    },
    //COMCAST MODIFICATONS BEGIN
    {
        id: 58,
        name: 'HLS/ts Generated Test Content (2s segments)',
        manifestUri: 'https://cpetestutility.stb.r53.xcal.tv/VideoTestStream/main.m3u8',

        iconUri: 'https://www.hackingchinese.com/wp-content/uploads/2013/05/audacity.jpg',
        shortName: 'HLS/ts (2s segments)',
        description: 'Generated multi-profile multi-audio clear HLS/ts test content with baked in media timestamps and resolution.',
        isFeatured: true,

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,
            Assets.Feature.ENCRYPTED_WITH_CLEAR,
        ],
    },
    {
        id: 59,
        name: 'NBCU Test Content (from Eugene, HLS, MP4)',
        manifestUri: 'https://nbcu-west.nbc.origin.istreamplanet.net/live/NBCSN/clear/master.m3u8',

        iconUri: '',
        shortName: 'NBCU Test Content',
        description: '',
        isFeatured: true,

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,
        ],
    },
    {
        id: 60,
        name: 'Big Bunny (from Eugene, HLS, TS)',
        manifestUri: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',

        iconUri: '',
        shortName: 'Big Bunny',
        description: '',
        isFeatured: true,

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP2TS,
        ],
    },


    //TODO add content from https://hls-js.netlify.com/demo/

    ////// content from DASH.JS BEGIN
    {
        id: 61,
        name: '1080p with Widevine DRM, license expired after 60s',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd',

        iconUri: '',
        shortName: 'Widevine 1080p',
        description: '',

        encoder: Assets.Encoder.AXINOM,
        source: Assets.Source.AXINOM,
        drm: [
            Assets.KeySystem.WIDEVINE,
            Assets.KeySystem.PLAYREADY,
        ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
        },
        licenseRequestHeaders: {
            'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU',
        },
    },
    {
        id: 62,
        name: 'Widevine Dynamic SegmentList',
        manifestUri: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny-enc-wv.stream/manifest_mvlist.mpd',

        iconUri: '',
        shortName: 'Big Buck Bunny',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.LIVE,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 63,
        name: 'Widevine Static SegmentTimeline',
        manifestUri: 'https://wowzaec2demo.streamlock.net/vod/elephantsdream_1100kbps-enc-wv.mp4/manifest_mvtime.mpd',

        iconUri: '',
        shortName: 'Elephants Dream',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 64,
        name: 'Widevine Static SegmentTemplate',
        manifestUri: 'https://wowzaec2demo.streamlock.net/vod/elephantsdream_1100kbps-enc-wv.mp4/manifest_mvnumber.mpd',

        iconUri: '',
        shortName: 'Elephants Dream',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 65,
        name: 'Widevine Static SegmentList',
        manifestUri: 'https://wowzaec2demo.streamlock.net/vod/elephantsdream_1100kbps-enc-wv.mp4/manifest_mvlist.mpd',

        iconUri: '',
        shortName: 'Elephants Dream',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 66,
        name: 'Widevine Dynamic SegmentTimeline',
        manifestUri: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny-enc-wv.stream/manifest_mvtime.mpd',

        iconUri: '',
        shortName: 'Big Buck Bunny',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.LIVE,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 67,
        name: 'Widevine Dynamic SegmentTemplate',
        manifestUri: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny-enc-wv.stream/manifest_mvnumber.mpd',

        iconUri: '',
        shortName: 'Big Buck Bunny',
        description: '',

        encoder: Assets.Encoder.WOWZA,
        source: Assets.Source.WOWZA,
        drm: [ Assets.KeySystem.WIDEVINE ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
            Assets.Feature.LIVE,
        ],
        licenseServers: {
            'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
    },
    {
        id: 68,
        name: 'Playready 2.0, HLS',
        manifestUri: 'http://profficialsite.origin.mediaservices.windows.net/c51358ea-9a5e-4322-8951-897d640fdfd7/tearsofsteel_4k.ism/manifest(format=m3u8-aapl)',

        iconUri: '',
        shortName: 'Tears of Steel',
        description: '',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [ Assets.KeySystem.PLAYREADY ],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,

        ],
        licenseServers: {
            'com.microsoft.playready': 'http://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(persist:false,sl:150)',
        },
    },
    {
        id: 69,
        name: 'Playready 2.0, HLS',
        manifestUri: 'http://cdn-demo.anevia.com/vod/localdisk/Chaos_Chapter1/_/hls_playready/Chaos_Chapter1.m3u8',

        iconUri: '',
        shortName: 'Chaos Ch.1',
        description: '',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [ Assets.KeySystem.PLAYREADY ],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,

        ],
        licenseServers: {
            'com.microsoft.playready': 'http://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(persist:false,sl:150)',
        },
    },



////// content from DASH.JS END
    {
        id: 70,
        name: 'Dolby Vision Dash',
        manifestUri: 'http://d3rlna7iyyu8wu.cloudfront.net/DolbyVision_Atmos/profile8.1_DASH/p8.1.mpd',

        iconUri: '',
        shortName: 'Glass Blowing',
        description: 'Glass Blowing @59.94fps: Dolby Vision Profile 8.1 – Dolby Atmos',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [ ],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.MP4,
        ],
        licenseServers: {
        },
    },
    {
        id: 71,
        name: 'Dolby Vision HLS',
        manifestUri: 'http://d3rlna7iyyu8wu.cloudfront.net/DolbyVision_Atmos/profile5_HLS/master.m3u8',

        iconUri: '',
        shortName: 'Glass Blowing',
        description: 'Glass Blowing @59.94fps: Dolby Vision Profile 5 – Dolby Atmos',

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [ ],
        features: [
            Assets.Feature.HLS,
            Assets.Feature.MP4,
        ],
        licenseServers: {
        },
    },
    {
        id: 72,
        name: 'mpd Test Content (2s segments)',
        manifestUri: 'https://cpetestutility.stb.r53.xcal.tv/VideoTestStream/main.mpd',

        iconUri: 'https://www.hackingchinese.com/wp-content/uploads/2013/05/audacity.jpg',
        shortName: 'DASH (2s segments)',
        description: 'Generated multi-profile multi-audio clear DASH test content with baked in media timestamps and resolution.',
        isFeatured: true,

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [],
        features: [
            Assets.Feature.DASH,
            Assets.Feature.ENCRYPTED_WITH_CLEAR,
        ],
    },
    {
        id: 73,
        name: 'fragmented mp4 test content (2s segments)',
        manifestUri: 'https://cpetestutility.stb.r53.xcal.tv/VideoTestStream/main_mp4.m3u8',

        iconUri: 'https://www.hackingchinese.com/wp-content/uploads/2013/05/audacity.jpg',
        shortName: 'fragmented mp4 (2s segments)',
        description: 'Generated multi-profile multi-audio clear fragmented MP4 test content with baked in media timestamps and resolution.',
        isFeatured: true,

        encoder: Assets.Encoder.UNKNOWN,
        source: Assets.Source.CUSTOM,
        drm: [],
        features: [
            Assets.Feature.MP4,
            Assets.Feature.ENCRYPTED_WITH_CLEAR,
        ],
    },
    //COMCAST MODIFICATONS END


    // }}}
];

//add ID
for (let i = 0; i < Assets.testAssets.length; i++) {
    if (Assets.testAssets[i].id !== i) {
      throw Error(
        'Mismatch identified, check the asset : #' +
          Assets.testAssets[i].id +
          ' ' +
          Assets.testAssets[i].shortName +
          ' [' +
          Assets.testAssets[i].name +
          ']'
      );
    }
    console.log("Asset #" + i + ": " + Assets.testAssets[i].shortName + " [" + Assets.testAssets[i].name + "]");
}

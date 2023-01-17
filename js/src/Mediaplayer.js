/*
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import ShakaDemoUtils from "../shaka/ShakaDemoUtils.js";
import AAMPPlayer from "../aamp/UVEMediaPlayer.js";

export default class Mediaplayer extends lng.Component {

    static _template() {
        return {
            Debug: {

                visible: true,

                StatusRect: {
                    x: 0, y: 0,
                    w: 30, h: 30,
                    rect: true,
                    color: 0xFFFF0000,
                },

                PlayerLabelRect: {
                    x: 50, y: 30,
                    w: 100, h: 30,
                    rect: true,
                    color: 0xFF000000,
                    PlayerLabel: {text: {text: "{player}", fontSize: 20, textColor: 0xffFFFFFF}},
                },

                Errors: {
                    x: 50, y: 65, w: 650, h: 300,

                    visible: false,

                    ErrorsData: {x: 5, y: 35, text: {text: "", fontSize: 25, wordWrapWidth: 640, textColor: 0xffff0000, fontFace: "RobotoLight"} },

                    Background: {w: 650, h: 300, rect: true, color: 0xFFcccccc, alpha: 0.6},

                    Label: {x: 5, text: {text: "Errors", fontSize: 30}},
                },

                Stats: {
                    x: 1200, y: 50, w: 600, h: 600,

                    Background: {w: 500, h: 600, rect: true, color: 0xffcccccc, alpha: 0.6},

                    Label: {x: 5, text: {text: "Stats", fontSize: 30}},

                    StatsData: {
                        x: 5,
                        y: 35,
                        text: {
                            text: "",
                            fontSize: 25,
                            wordWrapWidth: 490,
                            textColor: 0xffffffff,
                            fontFace: "RobotoLight"
                        },

                    }
                }
            }
        };
    }

    _init() {

        this.videoEl = document.createElement('video');
        this.videoEl.setAttribute('id', 'video-player');
        this.videoEl.style.position = 'absolute';
        this.videoEl.style.zIndex = '1';
        this.videoEl.setAttribute('width', '100%');
        this.videoEl.setAttribute('height', '100%');

        this.videoEl.style.visibility = 'visible';

        const events = ['timeupdate', 'error', 'ended', 'loadeddata', 'canplay', 'play', 'playing', 'pause', 'loadstart', 'seeking', 'seeked', 'encrypted'];
        events.forEach(event => {
            this.videoEl.addEventListener(event, (e) => {
                this.fire(event, {videoElement: this.videoEl, event: e});
            });
        });

        this._setVideoArea([0, 0, 1920, 1080]);

        document.body.appendChild(this.videoEl);

        window.player = null;

        switch(ux.Ui.getOption("player")) {
            case "AAMP":
                this.tag("PlayerLabel").text = "AAMP";
                try {
                    this._initAAMP();
                } catch (error) {
                    console.error("Fail to initialize AAMP player : " + error);
                }
                break;
            case "DASHJS":
                this.tag("PlayerLabel").text = "DASH.JS";
                this._initDASHJS();
                break;
            case "HLSJS":
                this.tag("PlayerLabel").text = "HLS.JS";
                this._initHLSJS();
                break;
            case null: //SHAKA
            default:
                this.tag("PlayerLabel").text = "SHAKA";
                this._initSHAKA();
                break;
        }
    }

    updateColorStatus(status) {
        let statusRect = this.tag("StatusRect");
        switch (status) {
            case "buffering":
                statusRect.color = 0xFFFD700; //yellow
                break;
            case "playing":
                statusRect.color = 0xFF00FF00; //green
                break;
            case "error":
            case "paused":
            case "ended":
            case "stopped":
                statusRect.color = 0xFFFF0000; //red
                break;
            default:
                console.error("unrecognized color status: " + status);
            break;
         }
    }

    //TODO rework, delete
    updateSettings(settings = {}) {
        // // The Component that 'consumes' the media player.
        this._consumer = settings.consumer;

        if (this._consumer && this._consumer.getMediaplayerSettings) {
            // Allow consumer to add settings.
            settings = Object.assign(settings, this._consumer.getMediaplayerSettings());
        }

        if (!lng.Utils.equalValues(this._stream, settings.stream)) {
            if (settings.stream && settings.stream.manifest) {
                this.open(settings.stream);
            } else {
                this.close();
            }
            this._stream = settings.stream;
        }

        this._setHide(settings.hide);
        this._setVideoArea(settings.videoPos);
    }

    _setHide(hide) {
        this.videoEl.style.visibility = hide ? 'hidden' : 'visible';
    }

    isLive() {
        switch(ux.Ui.getOption("player")) {
            case "AAMP":
                //FIXME
                return false;
            case "DASHJS":
                return player.isDynamic();
            case "HLSJS":
                //FIXME
                return false;
            case null: //SHAKA
                return player.isLive();
            default:
                return false;
        }
        return false;
    }

    open(stream) {
        console.log("MediaPlayer.open()");

        switch(ux.Ui.getOption("player")) {
            case "AAMP":
                console.log('Playing stream (AAMP): ' + stream.manifest);
                this.openAAMP(stream);
                break;
            case "DASHJS":
                console.log('Playing stream (DASHJS): ' + stream.manifest);
                this.openDASHJS(stream);
                break;
            case "HLSJS":
                console.log('Playing stream (HLSJS): ' + stream.manifest);
                this.openHLSJS(stream);
                break;
            case null: //SHAKA
            default:
                console.log('Playing stream (SHAKA): ' + stream.manifest);
                this.openShaka(stream);
                break;
        }

        // if (this.videoEl.getAttribute('src') === stream.manifest) return this.reload();
        // this.videoEl.setAttribute('src', stream.manifest);
    }


    _initAAMP() {
        console.log('Mediaplayer:_initAAMP()');

        if (!AAMPPlayer) {
            console.error("AAMPPlayer is not defined");
            return;
        }

        player = new AAMPPlayer(this.videoEl);
        player.playerStatesEnum = { "idle":0, "initializing":1, "playing":8, "paused":6, "seeking":7 };

        const events = ["playbackStateChanged", "playbackCompleted", "playbackSpeedChanged", "playbackFailed",
                        "mediaMetadata", "timedMetadata", "playbackProgressUpdate", "playbackStarted", "bufferingChanged",
                        "durationChanged", "decoderAvailable" ];

        events.forEach(event => {
            player.addEventListener(event, (e) => {
                this.fire(event, {event: e});
            });
        });


        let defaultInitConfig = {
            initialBitrate: 2500000,
            offset: 0,
            networkTimeout: 10,
            preferredAudioLanguage: "en",
            liveOffset: 15,
            drmConfig: {}
        };

        player.initConfig(defaultInitConfig);
    }

    _initSHAKA() {
        console.log("Mediaplayer._initSHAKA()");

        shaka.log.setLevel(shaka.log.Level.DEBUG);
        shaka.polyfill.installAll();  //stubAbort causes permanent artifacts on widevine webm, but fixes clear webm (Sintel 4k muticodec)
        //shaka.polyfill.MediaSource.install(); //stubAbort is needed for clear content webm

        player = new shaka.Player(this.videoEl);

        player.addEventListener('error', (event) => {
            this.reportError(event.detail);
        });

        player.addEventListener('largegap', (event) => {
           console.log("Shaka: LargeGapEvent: time: " + event.currentTime + " | gap size: " + event.gapSize);
        });
    }

    _setRequestHeaders(xhr) {

    }

    _initDASHJS() {
        player = dashjs.MediaPlayer().create();

        //TODO config
        //setSmallGapLimit()  seconds, default 0.8

        player.getDebug().setLogLevel(dashjs.Debug.LOG_LEVEL_DEBUG);

        player.initialize(this.videoEl, "", true);

        player.setBufferToKeep(5);
        player.setBufferPruningInterval(5);
        player.setBufferTimeAtTopQuality(5);
        player.setBufferTimeAtTopQualityLongForm(5);
    }

    _initHLSJS() {
        //TODO can't be reused (due to EME config implementation)
        //player = new Hls();
    }

    reportError(error) {
        console.error("reportError: code: " + error.code + " | message: " + error.message);
        this.tag("Errors").visible = true;
        this.tag("ErrorsData").text.text += "code: " + error.code + ": " + error.message + "\n";
    }

    openShaka(stream) {
        console.log('Playing manifest: ' + stream.manifest);

        this.clearDebugArea();

        if (player) {
            player.unload();
        }

        //resets config
        ShakaDemoUtils.configureShaka(stream.asset, player);

        if (!ux.Ui.enable4k()) {
            let config = { restrictions: { maxHeight: 1080 } };
            player.configure(config);
        }

        //TODO config
        //streaming: {bufferBehind: 10, bufferingGoal: 20}

        player.load(stream.manifest).then(() => {
            console.log("video has been loaded");
        }).catch(this.reportError.bind(this));
    }

    openAAMP(stream) {

        this.clearDebugArea();

        //FIXME if not stopped
        if (player) {
            //FIXME (switching to a new source)
            player.stop();
        }

        if (stream.asset.licenseServers) {
            let servers = stream.asset.licenseServers;

            if (ux.Ui.hasOption("forcePlayReady")) {
                servers.preferredKeysystem = Assets.KeySystem.PLAYREADY;
                console.log("AAMP: setting preferredKeysystem to PlayReady");
            }

            if (ux.Ui.hasOption("forceWidevine")) {
                servers.preferredKeysystem = Assets.KeySystem.WIDEVINE;
                console.log("AAMP: setting preferredKeysystem to Widevine");
            }

            console.log("AAMP: setting DRM config: " + JSON.stringify(stream.asset.licenseServers));
            player.setDRMConfig(servers);
        }

        //TODO preferredKeysystem com.microsoft.playready  (useWidevine, usePlayready)

        if (stream.asset.licenseRequestHeaders) {
            for (const [header, value] of Object.entries(stream.asset.licenseRequestHeaders)) {
                console.log("AAMP: adding header: " + header + "| value: " + value);
                player.addCustomHTTPHeader(header, value);
            }
        }

        player.load(stream.manifest);
    }

    openDASHJS(stream) {

        //TODO not needed it seems between sources
        // if (player) {
        //     player.reset();
        // }

        this.clearDebugArea();

        if (stream.asset.licenseServers) {
            let protectionData = {};
            for (var prop in stream.asset.licenseServers) {
                protectionData[prop] = { serverURL: stream.asset.licenseServers[prop] }

                if (stream.asset.licenseRequestHeaders) {
                    protectionData[prop]["httpRequestHeaders"] = stream.asset.licenseRequestHeaders;
                }
            }

            console.log("Mediaplayer (DASHJS): attaching protection data: " + JSON.stringify(protectionData));

            player.setProtectionData(protectionData);
        } else {
            player.setProtectionData({});
        }

        player.attachSource(stream.manifest);

        //TODO not supported
        // if (!ux.Ui.enable4k()) {
        //     player.setLimitBitrateByPortal(true);
        //     player.setDebugLogToConsole(true);
        // }
    }

    openHLSJS(stream) {

        this.clearDebugArea();

        if (player) {
            player.destroy();
        }

        let config = {
            maxBufferLength: 5,
            maxBufferSize: 1*1024*1024,
            enableWorker: false,
            debug: true,
        }

        if (stream.asset.licenseServers && stream.asset.licenseServers.hasOwnProperty("com.widevine.alpha")) {
            config.emeEnabled = true;
            config.widevineLicenseUrl = stream.asset.licenseServers["com.widevine.alpha"];
        }

        //TODO add headers support

        //TODO add auto recover media errors

        //TODO limit resolution

        player = new Hls(config);
        player.attachMedia(this.videoEl);

        player.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log("Video and hls.js are now bound together !");
            player.loadSource(stream.manifest);
            player.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log("Manifest loaded, found " + data.levels.length + " quality level.");
            });
        });

        player.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch(data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // try to recover network error
                        console.log(
                          'Fatal network error encountered: type - ' +
                            data.type +
                            ' details - ' +
                            data.details +
                            '.\nTrying to recover'
                        );
                        player.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log(
                          'Fatal media error encountered : type - ' +
                            data.type +
                            ' details - ' +
                            data.details +
                            '.\n Trying to recover'
                        );
                        player.recoverMediaError();
                        break;
                    default:
                        console.log("Unrecoverable error : type - " + data.type + " details - " + data.details);
                        // cannot recover
                        player.destroy();
                        break;
                }
            }
        });
    }

    closeAAMP() {
        console.log("closeAAMP");

        if (player) {
            player.stop();
            //player.destroy();
        }
    }

    closeShaka() {
        if (player) {
            player.unload();
        }
    }

    closeDASHJS() {
        if (player) {
            //HACK reset should not be used
            //player.reset();
            player.attachSource("");
        }
    }

    closeHLSJS() {
        if (player) {
            player.destroy();
        }
    }

    clearDebugArea() {
        this.tag("Errors").visible = false;
        this.tag("ErrorsData").text.text ="";

        this.tag("StatsData").text.text = "";
    }

    close() {
        console.log("MediaPlayer.close()");

        this.clearDebugArea();

        switch(ux.Ui.getOption("player")) {
            case "AAMP":
                this.closeAAMP();
                break;
            case "DASHJS":
                this.closeDASHJS();
                break;
            case "HLSJS":
                this.closeHLSJS();
                break;
            case null: //SHAKA
            default:
                this.closeShaka();
                break;
        }

        // We need to pause first in order to stop sound.
        this.videoEl.pause();
        this.videoEl.removeAttribute('src');

        // force load to reset everything without errors
        //this.videoEl.load();

        this._clearSrc();
    }

    playPause() {
        console.log("MediaPlayer.playPause()");
        if (this.isPlaying()) {
            this.doPause();
        } else {
            this.doPlay();
        }
    }

    updateStats() {
        let playerOption = ux.Ui.getOption("player");
        switch(playerOption) {
            case "AAMP":
                this._updateAAMPStats();
                break;
            case "DASHJS":
                this._updateDASHJSStats();
                break;
            case "HLSJS":
                break;
            case null: //SHAKA
            default:
                this._updateShakaStats();
                break;
        }
    }

    _updateShakaStats() {
        let stats = player.getStats();

        let drmInfo = player.drmInfo();
        let keySystem = "(clear content)";
        if (drmInfo) keySystem = "key system: " + drmInfo.keySystem;

        this.tag("StatsData").text.text = `
width: ${stats.width}
height: ${stats.height}
streamBandwidth: ${stats.streamBandwidth} bps
estimatedBandwidth: ${(stats.estimatedBandwidth / 1000 / 1000).toPrecision(3)} Mbps

decodedFrames: ${stats.decodedFrames}
droppedFrames: ${stats.droppedFrames}
loadLatency: ${stats.loadLatency}

playTime: ${stats.playTime}
bufferingTime: ${stats.bufferingTime}
${keySystem}
        `;

        //     // Deep-clone the objects as well as the arrays that contain them:
        //     switchHistory: cloneObject(this.stats_.switchHistory),
        //     stateHistory: cloneObject(this.stats_.stateHistory)

    }

    _updateAAMPStats() {
        this.tag("StatsData").text.text = `
current position: ${player.getCurrentPosition()}
current video bitrate: ${player.getCurrentVideoBitrate()}
current audio bitrate: ${player.getCurrentAudioBitrate()}

video bitrates: ${JSON.stringify(player.getVideoBitrates())}
audio bitrates: ${JSON.stringify(player.getAudioBitrates())}
supported key systems: ${JSON.stringify(player.getSupportedKeySystems())}
        `;
    }

    _updateDASHJSStats() {
        let metrics = player.getMetricsFor('video');
        let dashMetrics = player.getDashMetrics();
        let repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
        if (!metrics || !dashMetrics) return;

        let streamInfo = player.getActiveStream().getStreamInfo();
        let periodId = streamInfo.index;
        let representationId = repSwitch.to;
        let bandwidth = dashMetrics.getBandwidthForRepresentation(representationId, periodId);

        this.tag("StatsData").text.text = `
bandwidth: ${bandwidth}
periodId: ${periodId}
video rep.id: ${representationId}

buffered (s): ${player.getBufferLength()}
        `;

    }

    isPlaying() {
        console.log("MediaPlayer.isPlaying()");
        return (this._getState() === "Playing");
    }

    doPlay() {
        console.log("MediaPlayer.doPlay()");
        this.videoEl.play();
    }

    doPause() {
        console.log("MediaPlayer.doPause()");
        this.videoEl.pause();
    }

    reload() {
        console.log("MediaPlayer.reload()");
        var url = this.videoEl.getAttribute('src');
        this.close();
        this.videoEl.src = url;
    }

    getPosition() {
        console.log("MediaPlayer.getPosition()");
        return Promise.resolve(this.videoEl.currentTime);
    }

    setPosition(pos) {
        console.log("MediaPlayer.setPosition()");
        this.videoEl.currentTime = pos;
    }

    getDuration() {
        console.log("MediaPlayer.getDuration()");
        return Promise.resolve(this.videoEl.duration);
    }

    seek(time, absolute = false) {
        console.log("MediaPlayer.seek() time: " + time + " absolute: " + absolute);

        if (ux.Ui.getOption("player") === "AAMP") {
            if (absolute) {
                player.seek(time);
            } else {
                player.seek(player.getCurrentPosition() + time);
            }
            return;
        }

        if (absolute) {
            this.videoEl.currentTime = time;
        }
        else {
            this.videoEl.currentTime += time;
        }
    }

    _setVideoArea(videoPos) {

        if (typeof videoPos === "undefined") return;

        if (lng.Utils.equalValues(this._videoPos, videoPos)) {
            return;
        }

        this._videoPos = videoPos;

        const precision = this.stage.getRenderPrecision();
        this.videoEl.style.left = Math.round(videoPos[0] * precision) + 'px';
        this.videoEl.style.top = Math.round(videoPos[1] * precision) + 'px';
        this.videoEl.style.width = Math.round((videoPos[2] - videoPos[0]) * precision) + 'px';
        this.videoEl.style.height = Math.round((videoPos[3] - videoPos[1]) * precision) + 'px';
    }

    _fireConsumer(event, args) {
        if (this._consumer) {
            this._consumer.fire(event, args);
        }
    }

    _equalInitData(buf1, buf2) {
        if (!buf1 || !buf2) return false;
        if (buf1.byteLength != buf2.byteLength) return false;
        const dv1 = new Int8Array(buf1);
        const dv2 = new Int8Array(buf2);
        for (let i = 0 ; i != buf1.byteLength ; i++)
            if (dv1[i] != dv2[i]) return false;
        return true;
    }

    error(args) {
        this._fireConsumer('$mediaplayerError', args);
        this._setState("");
        this.updateColorStatus("error");
        return "";
    }

    loadeddata(args) {
        this._fireConsumer('$mediaplayerLoadedData', args);
    }

    play(args) {
        this._fireConsumer('$mediaplayerPlay', args);
    }

    playing(args) {
        this._fireConsumer('$mediaplayerPlaying', args);
        this._setState("Playing");
        this.updateColorStatus("playing");
    }

    canplay(args) {
        console.log("Mediaplayer: canplay event");
        this.videoEl.play().catch(error => {
            console.error("autoplay failed: " + error.message);
        });
        this._fireConsumer('$mediaplayerStart', args);
    }

    loadstart(args) {
        console.log("Mediaplayer: loadstart event");
        this._fireConsumer('$mediaplayerLoad', args);
    }

    seeked(args) {
        console.log("Mediaplayer: seeked event");
        this._fireConsumer('$mediaplayerSeeked', {
            currentTime: this.videoEl.currentTime,
            duration: this.videoEl.duration || 1
        });
    }

    seeking(args) {
        console.log("Mediaplayer: seeking event");
        this._fireConsumer('$mediaplayerSeeking', {
            currentTime: this.videoEl.currentTime,
            duration: this.videoEl.duration || 1
        });
    }

    durationchange(args) {
        console.log("Mediaplayer: durationchange event");
        this._fireConsumer('$mediaplayerDurationChange', args);
    }

    encrypted(args) {
        console.log("Mediaplayer: encrypted event");

        const video = args.videoElement;
        const event = args.event;
        // FIXME: Double encrypted events need to be properly filtered by Gstreamer
        if (video.mediaKeys && !this._equalInitData(this._previousInitData, event.initData)) {
            this._previousInitData = event.initData;
            this._fireConsumer('$mediaplayerEncrypted', args);
        }
    }

    // AAMP EVENTS BEING
    playbackSpeedChanged(args) {

    }

    playbackFailed(args) {
        console.log("AAMP: Media failed: description: " + args.event.description + " event: " + JSON.stringify(args.event));

        //TODO show in Errors
        this.reportError({code: args.event.code, message: args.event.description});

        this._fireConsumer('$mediaplayerError', args);
        this._setState("");
    }

    mediaMetadata(args) {
        console.log("AAMP: Media metadata event: " + JSON.stringify(args.event));
    }

    timedMetadata(args) {
        console.log("AAMP: timedMetadata event");
    }

    playbackStarted(args) {
        console.log("AAMP: playback started event");
    }

    bufferingChanged(args) {
        if (args.event.buffering === true){
            console.log("AAMP: buffering begins");
        } else {
            console.log("AAMP: buffering ends");
        }
    }

    durationChanged(args) {
        console.log("AAMP: duration changed!");
    }

    decoderAvailable(args) {
        console.log("AAMP: decoderHandleAvailable " + args.event.decoderHandle);
    }

    playbackStateChanged(args) {
        console.log("AAMP: playback state changed: state: " + args.event.state);

        switch (args.event.state) {
            case player.playerStatesEnum.idle:
                console.log("AAMP: new state: playerStatesEnum.idle");
                break;
            case player.playerStatesEnum.initializing:
                console.log("AAMP: new state: playerStatesEnum.initializing");
                break;
            case player.playerStatesEnum.playing:
                console.log("AAMP: new state: playerStatesEnum.playing");
                this._fireConsumer('$mediaplayerPlaying', args);
                this._setState("Playing");
                break;
            case player.playerStatesEnum.paused:
                console.log("AAMP: new state: playerStatesEnum.paused");
                break;
            case player.playerStatesEnum.seeking:
                console.log("AAMP: new state: playerStatesEnum.seeking");
                this._fireConsumer('$mediaplayerSeeking', args);
                break;
            default:
                console.log("State not expected, state: " + args.event.state);
                break;
        }
    }
    // AAMP EVENTS END


    static _states() {
        return [
            class Playing extends this {
                $enter() {

                }
                $exit() {

                }
                timeupdate() {
                    if (this.isLive()) {

                        //FIXME based on a player
                        let seekRange = player.seekRange();
                        this._fireConsumer('$mediaplayerProgress', {
                            start: seekRange.start,
                            end: seekRange.end,
                            currentTime: this.videoEl.currentTime,
                            duration: this.videoEl.duration || 1
                        });
                        return;

                        //TODO notify player about available seek range and current time within that range (show difference)
                        // currentTime - end of seek range (negative value), seek within that range
                    }

                    this._fireConsumer('$mediaplayerProgress', {
                        currentTime: this.videoEl.currentTime,
                        duration: this.videoEl.duration || 1
                    });

                    this.updateStats();
                }
                ended(args) {
                    this._fireConsumer('$mediaplayerEnded', args);
                    this._setState("");
                    this.updateColorStatus("ended");
                }
                pause(args) {
                    this._fireConsumer('$mediaplayerPause', args);
                    this._setState("Playing.Paused");
                    this.updateColorStatus("paused");
                }
                _clearSrc() {
                    this._fireConsumer('$mediaplayerStop', {});
                    this._setState("");
                    this.updateColorStatus("stopped");
                }


                //AAMP EVENTS BEGIN
                playbackCompleted(args) {
                    this._fireConsumer('$mediaplayerEnded', args);
                    this._setState("");
                    this.updateColorStatus("ended");
                }

                playbackProgressUpdate(args) {
                    console.log("AAMP: progress update: " + JSON.stringify(args));

                    let duration = args.event.durationMiliseconds;
                    let position = args.event.positionMiliseconds;


                    console.log("Mediaplayer.playbackProgressUpdate (AAMP): currentTime (ms): " + position);
                    this._fireConsumer('$mediaplayerProgress', {
                        currentTime: position / 1000.0,
                        duration: (duration / 1000.0) || 1
                    });

                    this.updateStats();
                }

                playbackStateChanged(args) {
                    console.log("AAMP: (state) playback state changed: " + JSON.stringify(args.event));

                    switch (args.event.state) {
                        case player.playerStatesEnum.idle:
                            break;
                        case player.playerStatesEnum.initializing:
                            break;
                        case player.playerStatesEnum.playing:
                            this.updateColorStatus("playing");
                            break;
                        case player.playerStatesEnum.paused:
                            this._fireConsumer('$mediaplayerPause', args);
                            this._setState("Playing.Paused");
                            this.updateColorStatus("paused");
                            break;
                        case player.playerStatesEnum.seeking:
                            break;
                        default:
                            console.log("State not expected");
                            break;
                    }
                }
                //AAMP EVENTS END


                static _states() {
                    return [
                        class Paused extends this {
                        }
                    ]
                }
            }
        ]
    }

}

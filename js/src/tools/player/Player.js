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

import PlayerControls from "./PlayerControls.js";
import PlayerProgress from "./PlayerProgress.js";

export default class Player extends lng.Component {

    static _template() {
        return {
            Gradient: {
                x: 0,
                y: 1080,
                h: 300,
                w: 1920,
                mountY: 1,
                colorTop: 0x00101010,
                colorBottom: 0xE6101010,
                rect: true
            },
            Controls: {
                x: 99,
                y: 890,
                type: this.PlayerControls,
                signals: {pressPlay: true, pressPrevious: true, pressNext: "_pressNext"}
            },
            Progress: {x: 99, y: 970, type: this.PlayerProgress}
        };
    }

    static get PlayerControls() {
        return PlayerControls;
    }

    static get PlayerProgress() {
        return PlayerProgress;
    }

    _setItem(item) {
        console.log("IGOR: manifest: " + item.manifest);

        this.tag("Progress").setProgress(0, 0);
        this._item = item;
        this._stream = { manifest: item.manifest, asset: item.asset };
        this.tag("Controls").title = "#" + item.id + ": " + item.title + " [" + item.username + "]";

        this._index = this._items.indexOf(item);
        this.tag("Controls").showButtons(this._index > 0, this._index < this._items.length - 1);


        this.application.updateFocusSettings();
    }

    static formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        seconds = Math.floor(seconds);
        const parts = [];
        if (hours) parts.push(hours);
        parts.push(minutes);
        parts.push(seconds);
        return parts.map(number => (number < 10 ? "0" + number : "" + number)).join(":");
    }

    _setInterfaceTimeout() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(() => {
            this._hide();
        }, 16000);
    }

    _init() {
        this._setState("Controls");
    }

    _focus() {
        this._setInterfaceTimeout();
    }

    _unfocus() {
        clearTimeout(this._timeout);
    }

    $mediaplayerEnded() {
        this._pressNext();
    }

    play({item, items}) {
        console.log("Player.play()");

        this._items = items;
        this._setItem(item);

        return !!this._stream;
    }

    pressPrevious() {
        const index = this._index - 1;
        if (index < 0) {
            this._index = this._items.length - 1;
        }
        this._setItem(this._items[index]);
    }

    _pressNext() {
        if (!this._items.length) {
            return this.signal('playerStop');
        }
        const index = (this._index + 1) % this._items.length;
        this._setItem(this._items[index]);
    }

    pressPlay() {
        this.application.mediaplayer.playPause();
    }

    $mediaplayerPause() {
        this.tag("Controls").paused = true;
    }

    $mediaplayerPlay() {
        this.tag("Controls").paused = false;
    }

    $mediaplayerStop() {
        this.signal('playerStop');
    }

    $mediaplayerProgress(args) {
        if (args.start) {
            this.tag("Progress").setProgressLive(args.start, args.end, args.currentTime);
        } else {
            this.tag("Progress").setProgress(args.currentTime, args.duration);
        }

    }

    _captureKey() {
        this._setInterfaceTimeout();
        return false;
    }

    _hide() {
        //HACK hiding is disabled
        //this._setState("Hidden");
    }

    static _states() {
        return [
            class Hidden extends this {
                $enter({prevState}) {
                    this._prevState = prevState;
                    this.setSmooth('alpha', 0);
                }
                $exit() {
                    this._setInterfaceTimeout();
                    this.setSmooth('alpha', 1);
                }
                _captureKey() {
                    this._setState(this._prevState);
                }
            },
            class Controls extends this {
            }
        ];
    }

    _getFocused() {
        return this.tag("Controls");
    }

    getMediaplayerSettings() {
        return {
            stream: this._stream
        };
    }

}


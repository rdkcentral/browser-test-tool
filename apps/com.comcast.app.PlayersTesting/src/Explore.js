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

import Grid from "./grid/Grid.js";

export default class Explore extends lng.Component {
    static _template() {
        return {
            rect: true, color: 0xff282E32, w: 1920, h: 1080,

            Wrapper: {
                y: 110, x: 0,
                Channels: {}
            },
            Top: {
                w: 1920, h: 100, rect: true,
                color: 0xff1A2022,

                Label: {
                    x: 50, y: 10,
                    color: 0xFFFFFFff,
                    text: {text: 'DASH Assets', fontSize: 60},
                }
            }
        };
    }

    get channels() {
        return this.tag('Channels').children;
    }

    _firstActive() {
        // this.api.getChannels().then((data) => {
        //     this.items = data;
        //     this.fire('ready');
        // }).catch(err => {
        //     console.error(err);
        // });
    }

    select({idx}) {
        this._idx = idx;
        this._selected = this.channels[idx];
        this.tag('Channels').patch({
            smooth: {y: idx * -440}
        });
    }

    _handleUp() {
        if (this._idx > 0) {
            this.fire('select', {idx: this._idx - 1});
        }
    }

    _handleDown() {
        if (this._idx < this.channels.length - 1) {
            this.fire('select', {idx: this._idx + 1});
        }
    }

    _getFocused() {
        return this._selected;
    }

    set items(v) {
        this._items = v;
        let children = v.map((channel, idx) => {
            return {
                type: Grid, items: channel.items, title: channel.category + ' (' + channel.items.length + ')', x: 0, y: idx * 450
            };
        });

        if (ux.Ui.useHLS()) {
            this.tag("Label").text.text = "HLS Assets";
        }

        switch(ux.Ui.getOption("player")) {
            case "AAMP":
                this.tag("Label").text.text += " (AAMP)";
                break;
            case "DASHJS":
                this.tag("Label").text.text += " (DASH.JS)";
                break;
            case "HLSJS":
                this.tag("Label").text.text += " (HLS.JS)";
                break;
            case null: //SHAKA
            default:
                this.tag("Label").text.text += " (SHAKA)";
                break;
        }

        this.patch({
            Wrapper: {
                Channels: {
                    children
                }
            }
        });

        if (v.length)
            this.fire('select', {idx: 0});
    }
}
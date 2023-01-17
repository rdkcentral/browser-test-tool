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

import App from "../App.js";

export default class GridItem extends lng.Component {
    static _template() {
        return {
            w: 400, h: 325, rect: true, color: 0xff0D1314, alpha: 0.6,
            // ID: {x: 20, y: 216, mountY: 1,  text: {text: "#33", shadowColor: 0xffCCCCCC, shadowOffsetX: 1, shadow: true}, zIndex: 10},
            Live: {x: 10, y: 10, text: {text: "\u25CF\ LIVE", fontStyle: 'bold', fontSize: 30}, color: 0xFFFF0000, zIndex: 10},
            UHD: {x: 390, y: 10, mountX: 1, text: {text: "4K",  fontSize: 30}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            Playready: {x: 390, y: 50, mountX: 1, visible: true, text: {text: "Playready",  fontSize: 15}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            Widevine: {x: 390, y: 70, mountX: 1, visible: true, text: {text: "Widevine",  fontSize: 15}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            Clearkey: {x: 390, y: 90, mountX: 1, visible: true, text: {text: "ClearKey",  fontSize: 15}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            WebM: {x: 390, y: 150, mountX: 1, visible: true, text: {text: "WebM",  fontSize: 15}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            MP4: {x: 390, y: 170, mountX: 1, visible: true, text: {text: "MP4",  fontSize: 15}, color: 0xffCCCCCC, alpha: 0.3, zIndex: 10},
            Image: {},
            Border: {
                alpha: 0, w: 400, h: 216,
                // Time: {
                //     rect: true, color: 0xffFADB23, w: 100, h: 40, x: 300, y: 280, transitions: {y: {duration: 0.3}},
                //     Label: {
                //         x: 10, y: 10, color: 0xff000000, text: {text: '00:00:00', fontSize: 19}
                //     }
                // },
                Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xffFADA24, w: 400 - 4, h: 216 - 4, x: 2, y: 2}
            },
            Title: {
                x: 10, y: 220, text: {text: '', fontSize: 35, wordWrapWidth: 360, maxLines: 1}
            },
            User: {
                x: 20,
                y: 264,
                color: 0xffA3A4A5,
                text: {text: 'Username', fontSize: 22, wordWrapWidth: 360, maxLines: 2, fontFace: "RobotoLight"}
            }
        };

    }

    set item(v) {
        this._item = v;

        this.patch({
            // ID: {text: {text: "#" + v.id}},
            Image: {
                w: 300,
                h: 210,
                src: ux.Ui.getImageUrl(v.icon),
                clipping: true
            },
            Live: {visible: v.live},
            UHD: {color: v.uhd ? 0xffFFF26C : 0xffCCCCCC, alpha:  v.uhd? 1 : 0.2},
            Playready: { color: v.playready? 0xffFFF26C : 0xffCCCCCC, alpha:  v.playready? 1 : 0.2 },
            Widevine: {color: v.widevine ? 0xffFFF26C : 0xffCCCCCC, alpha:  v.widevine? 1 : 0.2 },
            Clearkey: {color: v.clearkey ? 0xffFFF26C : 0xffCCCCCC, alpha:  v.clearkey? 1 : 0.2 },

            WebM: {color: v.webm ? 0xffFFF26C : 0xffCCCCCC, alpha:  v.webm? 1 : 0.2 },
            MP4: {color: v.mp4 ? 0xffFFF26C : 0xffCCCCCC, alpha:  v.mp4? 1 : 0.2 },

            Border: {
                // Time: {
                //     Label: {text: {text: "" /*App.secondsToTime(v.duration)*/ }}
                // }
            },
            Title: {
                text: {text: "#" + v.id + ": " + v.title}
            },
            User: {
                text: {text: v.username}
            }
        });
    }

    get item() {
        return this._item;
    }

    _focus() {
        this.patch({
            smooth: {scale: 1.1, alpha: 1},
            Border: {
                smooth: {alpha: 1},
                Time: {smooth: {y: 174}}
            }
        });

        //do not update hash (prevent going into playback on reloads)
        //window.location.hash = this._item.id;
    }

    _unfocus() {
        this.patch({
            smooth: {scale: 1, alpha: 0.6},
            Border: {
                smooth: {alpha: 0},
                Time: {smooth: {y: 270}}
            }
        });

        window.location.hash = "";
    }
}
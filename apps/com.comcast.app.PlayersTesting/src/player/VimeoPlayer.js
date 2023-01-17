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

export default class VimeoPlayer extends ux.tools.player.Player {

    static _template() {
        const template = super._template();
        template.Progress.signals = {left: "_scrubBackward", enter: "pressPlay", right: "_scrubForward"};
        return template;
    }

    static get PlayerControls() {
        return VimeoPlayerControls;
    }

    static get PlayerProgress() {
        return VimeoPlayerProgress;
    }

    _scrubBackward() {
        this.application.mediaplayer.seek(-15);
    }

    _scrubForward() {
        this.application.mediaplayer.seek(15);
    }

    static _states() {
        const states = super._states();

        let i;

        i = states.findIndex(state => state.name === "Controls");
        states[i] = class Controls extends states[i] {
            _handleDown() {
                this._setState("Progress");
            }
        };

        states.push(class Progress extends this {
            _handleUp() {
                this._setState("Controls");
            }
            _getFocused() {
                return this.tag("Progress");
            }
        });

        return states;
    }

}

class VimeoPlayerProgress extends ux.tools.player.PlayerProgress {

    _focus() {
        this.tag("Main").color = 0xffFADA24;
        this.tag("Active").color = 0xffFADA24;
    }

    _unfocus() {
        this.tag("Main").color = 0xfff1f1f1;
        this.tag("Active").color = 0xfff1f1f1;
    }

    _handleLeft() {
        this.signal("left");
    }

    _handleEnter() {
        this.signal("enter");
    }

    _handleRight() {
        this.signal("right");
    }

}

class VimeoPlayerControls extends ux.tools.player.PlayerControls {

    static get PlayerButton() {
        return VimeoPlayerButton;
    }

}

class VimeoPlayerButton extends ux.tools.player.PlayerButton {

    static _buildOptions() {
        return lng.tools.ObjMerger.merge(super._buildOptions(), {
            colors: {
                selected: 0xffFADA24,
                deselected: lng.StageUtils.mergeColors(0xffFADA24, 0xff000000, 0.25)
            }
        });
    }
}

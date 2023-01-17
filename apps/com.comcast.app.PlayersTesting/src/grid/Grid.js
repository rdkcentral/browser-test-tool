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

import GridItem from "./GridItem.js";

export default class Grid extends lng.Component {
    static _template() {
        return {
            Title: {
                y: 30, x: 50, text: {text: '', fontSize: 45}, alpha: 0.3
            },
            List: {
                type: lng.components.ListComponent,
                w: 1920,
                h: 390,
                y: 120,
                itemSize: 440,
                scrollTransition: {duration: 0.2},
                invertDirection: false,
                roll: true,
                viewportScrollOffset: 0.5,
                itemScrollOffset: 0.5,
                rollMin: 90,
                rollMax: 90
            }
        };
    }

    set title(v) {
        this.tag('Title').text.text = v;
    }

    hasResults() {
        return this.tag('List').items.length;
    }

    get items() {
        return this._items;
    }

    get active() {
        return this.tag('List').getElement(this.index);
    }

    get index() {
        return this.tag('List').realIndex;
    }

    set items(v) {
        this._items = v.map((el) => {
            return {type: GridItem, item: el};
        });

        this.tag('List').items = this._items;
        this.signal('loaded');
    }

    set storeFocus(v) {
        this._storeFocus = v;
    }

    _handleLeft() {
        // if (this.index === 0) {
        //     this.fireAncestors('$leftExit');
        //     return;
        // }

        this.tag('List').setPrevious();
    }

    _focus() {
        this.patch({
            Title: {smooth: {alpha: 1}}
        });
        this.tag('List').setIndex(0);
    }

    _unfocus() {
        if (!this._storeFocus) {
            this.tag('List').setIndex(0);
        }
        this.patch({
            Title: {smooth: {alpha: 0.3}}
        });
    }

    _handleRight() {
        this.tag('List').setNext();
    }

    _handleEnter() {
        if (this.active) {
            this.fireAncestors('$play', {
                items: this.tag('List').items.map(item => item.item),
                item: this.active.item
            }, true);
        }
    }

    _getFocused() {
        return this.active;
    }
}
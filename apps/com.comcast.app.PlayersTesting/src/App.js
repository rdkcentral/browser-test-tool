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

import Explore from "./Explore.js";
import VimeoPlayer from "./player/VimeoPlayer.js";

export default class App extends ux.App {
    static _template() {
        return {
            Content: { type: Explore },
            Player: { type: VimeoPlayer, alpha: 0, signals: {playerStop: true}},

            KeyboardShortcuts: {
                x: 800, y: 1030,
                w: 380, h: 30,
                rect: true,
                color: 0xFF000000,
                Data: {text: {text: "Press: 1.Shaka 2.AAMP 3.DASH.js 4.HLS.js", fontSize: 20, textColor: 0xffFFFFFF, fontFace: "RobotoLight"}},
            },
        }
    };

    _reloadWithPlayer(player) {
        console.log("reloading with " + player);
        let searchParams = new URL(window.location.href).searchParams;
        searchParams.set("player", player);
        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString() +
            window.location.hash;
        console.log("redirecting to: " + newUrl);
        window.location.replace(newUrl);
    };

    _captureKey(event) {
        //reloading with a specific player
        console.log("Key pressed: key = " + event.key);

        switch (event.key) {
            case "1": //SHAKA
                this._reloadWithPlayer("SHAKA");
                return true;
            case "2": //AAMP
                this._reloadWithPlayer("AAMP");
                return true;
            case "3": //DASHJS
                this._reloadWithPlayer("DASHJS");
                return true;
            case "4": //HLSJS
                this._reloadWithPlayer("HLSJS");
                return true;
            default:
                break;
        }

        return false;
    }

    _init() {
        this._setState("Content");

        this.loadData();

        console.log("window.location.hash: " + window.location.hash);

        if (window.location.hash) {
            let hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

            let asset = Assets.testAssets[hash];
            if (asset) {
                let category= {items: []};
                this._addAsset(category, asset);

                this.play({item: category.items[0], items: category.items})
            }
            return;
        }

        let assets = ux.Ui.getOption("assets");
        console.log("assets: " + assets);

        if (!assets) return;

        let category = {items: []};

        let assetsArr = assets.split(',');
        if (!assetsArr.length) return;

        assetsArr.forEach((val, idx) => {
            this._addAsset(category, Assets.testAssets[val]);
        });

        console.log("assets array: " + JSON.stringify(assetsArr));

        this.play({item: category.items[0], items: category.items});

    }

    $play(args) {
        this.play(args);
    }

    play(args) {
        const player = this.tag('Player');
        const playlist = {item: args.item, items: args.items };
        if (player.play(playlist)) {
            this._setState("Playing");
        } else {
            //TODO show error
        }
    }

    _addAsset(category, asset) {
        category.items.push({
            id: asset.id,

            title: asset.shortName,
            username: asset.name,
            icon: asset.iconUri,
            manifest: asset.manifestUri,

            mp4: asset.features.includes(Assets.Feature.MP4),
            webm: asset.features.includes(Assets.Feature.WEBM),

            live: asset.features.includes(Assets.Feature.LIVE),
            uhd: asset.features.includes(Assets.Feature.ULTRA_HIGH_DEFINITION),
            playready: asset.drm.includes(Assets.KeySystem.PLAYREADY),
            widevine: asset.drm.includes(Assets.KeySystem.WIDEVINE),
            clearkey: asset.drm.includes(Assets.KeySystem.CLEAR_KEY),
            asset: asset
        });
    }

    _addCategoryByEncoder(channels, encoder) {
        let newCategory = {category: "Encoder: " + encoder, items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                (value.encoder === encoder) &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryClear(channels) {
        let newCategory = {category: "Clear Content", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.length &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }


    _addCategoryMultiDRM(channels) {
        let newCategory = {category: "Encrypted: Multi-DRM", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                value.drm.includes(Assets.KeySystem.PLAYREADY) &&
                value.drm.includes(Assets.KeySystem.WIDEVINE) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryByKeySystem(categoryName, channels, keySystem) {
        let newCategory = {category: categoryName, items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                value.drm.length === 1 &&
                value.drm[0] === keySystem &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryAdInsertion(channels) {
        let newCategory = {category: "Ad Insertion", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(Assets.Feature.XLINK) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategory4k(channels) {
        let newCategory = {category: "4k / UHD", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(Assets.Feature.ULTRA_HIGH_DEFINITION) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryLive(channels) {
        let newCategory = {category: "Live Content", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(Assets.Feature.LIVE) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryMultiPeriod(channels) {
        let newCategory = {category: "Multi Period", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(Assets.Feature.MULTIPERIOD) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    _addCategoryMultiKey(channels) {
        let newCategory = {category: "Multi Key", items: []};

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(Assets.Feature.MULTIKEY) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        }).forEach((value, index, array) => {
            this._addAsset(newCategory, value);
        });

        if (newCategory.items.length) channels.push(newCategory);
    }

    loadData() {
        var channels = [];

        let newcat = { category: "Featured", items: []};
        channels.push(newcat);

        let useHLS = ux.Ui.useHLS();

        Assets.testAssets.filter((value, index, array) => {
            return value.isFeatured &&
                !value.disabled &&
                !value.drm.includes(Assets.KeySystem.CLEAR_KEY) &&
                value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH) ;
        }).map((value, index, array) => {
            this._addAsset(newcat, value);
        });


        this._addCategoryClear(channels);

        this._addCategoryByKeySystem("Encrypted: Widevine ONLY", channels, Assets.KeySystem.WIDEVINE);

        this._addCategoryByKeySystem("Encrypted: Playready ONLY", channels, Assets.KeySystem.PLAYREADY);

        this._addCategoryMultiDRM(channels);

        this._addCategory4k(channels);

        this._addCategoryLive(channels);

        this._addCategoryMultiPeriod(channels);

        this._addCategoryMultiKey(channels);

        this._addCategoryAdInsertion(channels);

        //TODO add technically broken content

        //By Encoder (not as important)
        for (const [key, value] of Object.entries(Assets.Encoder)) {
            this._addCategoryByEncoder(channels, value);
        }


        //FIXME disabled not needed ?
        // let disabledContent = { category: "Disabled", items: []};
        // channels.push(disabledContent);
        // Assets.testAssets.filter((value, index, array) => {
        //     return value.disabled && value.features.includes(useHLS ? Assets.Feature.HLS : Assets.Feature.DASH);
        // }).map((value, index, array) => {
        //     this._addAsset(disabledContent, value);
        // });

        this.tag("Content").items = channels;
    }

    static _states() {
        return [
            class Content extends this {
                $enter() {
                    this.tag("Content").alpha = 1;
                }

                $exit() {
                    this.tag("Content").setSmooth('alpha', 0);
                }

                _getFocused() {
                    return this.tag("Content");
                }
            },

            class Playing extends this {
                $enter() {
                    this.tag("Player").setSmooth('alpha', 1);
                }

                $exit() {
                    this.tag("Player").setSmooth('alpha', 0);
                }

                _handleBack() {
                    this.fire('playerStop');
                }

                playerStop() {
                    this._setState("Content");
                }

                _getFocused() {
                    return this.tag("Player");
                }

                _setFocusSettings(settings) {
                    settings.mediaplayer.consumer = this.tag("Player");
                }
            }
        ]
    }



}
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

/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export default class ShakaDemoUtils {

    static configureShaka(asset, player) {

        let commonDrmSystems = [
            'com.widevine.alpha',
            'com.microsoft.playready',
            'com.adobe.primetime',
            'org.w3.clearkey',
        ];

        let config = {abr: {}, streaming: {}, manifest: {dash: {}} };

        config.drm = {advanced: {}};

        commonDrmSystems.forEach(function(system) {
            config.drm.advanced[system] = {};
        });

        player.resetConfiguration();

        ShakaDemoUtils.setupAssetMetadata(asset, player);

        player.configure(config);
    }

    static setupAssetMetadata(asset, player) {
        let config = {drm: {}, manifest: {dash: {}}};

        // Add config from this asset.
        if (asset.licenseServers) {
            config.drm.servers = asset.licenseServers;
        }

        if (ux.Ui.hasOption("forcePlayReady")) {
            delete config.drm.servers[Assets.KeySystem.WIDEVINE];
            console.log("Shaka: removing Widevine license server if present: forcing PlayReady");
        }

        if (ux.Ui.hasOption("forceWidevine")) {
            delete config.drm.servers[Assets.KeySystem.PLAYREADY];
            console.log("Shaka: removed PlayReady license server if present: forcing Widevine");
        }


        if (asset.drmCallback) {
            config.manifest.dash.customScheme = asset.drmCallback;
        }
        if (asset.clearKeys) {
            config.drm.clearKeys = asset.clearKeys;
        }
        player.configure(config);

        // Configure network filters.
        let networkingEngine = player.getNetworkingEngine();
        networkingEngine.clearAllRequestFilters();
        networkingEngine.clearAllResponseFilters();

        if (asset.licenseRequestHeaders) {
            let filter = ShakaDemoUtils.addLicenseRequestHeaders_.bind(
                null, asset.licenseRequestHeaders);
            networkingEngine.registerRequestFilter(filter);
        }

        if (asset.requestFilter) {
            networkingEngine.registerRequestFilter(asset.requestFilter);
        }
        if (asset.responseFilter) {
            networkingEngine.registerResponseFilter(asset.responseFilter);
        }
        if (asset.extraConfig) {
            player.configure(asset.extraConfig);
        }
    }

    static addLicenseRequestHeaders_(headers, requestType, request) {
        if (requestType != shaka.net.NetworkingEngine.RequestType.LICENSE) return;

        // Add these to the existing headers.  Do not clobber them!
        // For PlayReady, there will already be headers in the request.
        for (let k in headers) {
            request.headers[k] = headers[k];
        }
    }

}
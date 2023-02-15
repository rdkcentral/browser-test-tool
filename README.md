# Browser Test Tool(B2T)

The App shares the list of adaptive media formats(HLS, DASH) and DRM-protected contents(Widevine, PlayReady, Multi-DRM, Clear Key) that can be played in the browser and all supported Devices using the provided list of Java Script players. App is created using the Lightning and the assets are displayed in Simple Swimlane structure. The app supports only Keyboard navigation and Mouse supported is not available for now(Planned Later).

### Media-Players Supported
- Shaka Player
- AAMP UVE
- Dash.js
- HLS.js

### Video Contents Available
- Live
- 4K
- HD
- MP4
- WebM
- HD
- SD
- DASH
- HLS

## Prerequisites

You need NodeJS + NPM ([https://nodejs.org](https://nodejs.org)) installed.

## Development setup

Follow below instruction to get started

git clone https://github.com/rdkcentral/browser-test-tool.git
cd browser-test-tool
npm install
npm install -g instant-server
instant -p 8080

Now the app will be compiled and started. Open any WebBrowser and launch http://<machine-ip>:8080

## Switching the Players
Once the App is launched please press below keyboard/Remote Keys for using different media players
1 - SHAKA
2 - AAMP 
3 - DASH.JS
4 - HLS.JS 

## Media Player Versions
* Shaka - 3.0.2
* AAMP - Depends on the Firmware
* DashJS - 2.9.3
* HlsJS - 0.13.2

If you need to update any media players please do changes in package.json and index.html files respectively.

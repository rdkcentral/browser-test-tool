# Players

The project shares the list of adaptive media formats(HLS, DASH) and DRM protected contents(Widevine, PlayReady, Multi-DRM, Clear Key) that can be played in browser using the provided list of Java Script players. The list of supported Java Script players are,
- Shaka Player
- AAMP UVE
- Dash.js
- HLS.js

Available video contents are of,
- Live
- 4K
- HD
- MP4
- WebM
- HD
- SD
- DASH
- HLS

# Development setup

Follow below instruction to setup the server locally.
```
git clone git@github.comcast.com:WPE-Test-Harness/players.git
cd players
npm install
npm install -g instant-server
instant -p 8080
```
##

# Production environment

## Apache Deployment Location
```language
/mnt/webtests-www/players/
```
## Deployment steps
```language
sudo cd /mnt/webtests-www/players/
sudo git clone git@github.comcast.com:WPE-Test-Harness/players.git
sudo mv players version10
cd version10
sudo npm install
sudo apachectl restart
```


# Release History

## Version 10

- Shaka player upgraded to 3.0.2 version
- Shaka player is added to project as a npm package
- Further update of Shaka player is possible using command
`npm update shaka-player`

## Version 9

- run-time switching between players using keys: 1,2,3,4
- Shaka: added installing poyfills
- Shaka: decreased buffer sized to support 4K within WPE mem settings
- Shaka: added on-screen stats
- Dash.js: added on-screen stats
- AAMP: seeking support added

Shaka version: custom based on
DASH.js version: 2.9.3

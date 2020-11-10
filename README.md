index.js is runnable outside of electron context and should retain all functionality not explicit to electron

NOTES:
must define "scripts.start" in package.json to be "electron ." so that "npm start" runs "electron ."
once elecron-forge is installed (npx @electron-forge/cli import) which requires git, running also requires git (must be run from a console that has a git command aka bash not cmd)
then it'll run with electron-forge start

electron package (require'(electron')) has control over the node instance (app) and a chromium instance (BrowserWindow)

browserwindow must be given nodeIntegration: true to use node api (and ipc?)

the browser aka. renderer process and node aka main process communicate with ipc (renderer has limited priviledge so must invoke main for important things)
// In main
const { ipcMain } = require('electron')
ipcMain.handle('perform-action', (event, ...args) => {
    // do desired actions
})
// In renderer
const { ipcRenderer } = require('electron')
ipcRenderer.invoke('perform-action', ...args) // I assume perform-action is a variable name?

renderer invokes are as insecure as web input, sanitize and validate accordingly

like flask we can use env variables to set development/production
but node can do it automatically (just remember where it is to un automate it later)
"start": "set NODE_ENV=development&& electron ."
perhaps investigate hot reloading?
for just js the page can be reloaded, for node functions may have to have electron-reload (to avoid the long startup on the server)
https://www.geeksforgeeks.org/hot-reload-in-electronjs/

BOIDS:
Limited vision: boids can only see what is infront of them to a max distance (120deg cone behind is blind). This causes the front to be able to react independant of the flock behind it and they will follow. (If boids can see 360deg they will form perfect uniform formations).

Steering: When a boud has a desired direction it accelerates in the direction: (Desired - current)

Cohesion: Steer towards the average position of all nearby boids (including self)
Alignment: Steer towards the average heading of nearby boids
Separation: Steer the direction away from nearby boids (scaled by 1/distance^2)

TODO:
*drag options menu away to create seperate "toolbar" menu, spawn another browser?

electron functions for another project
drag-and-drop: https://www.electronjs.org/docs/tutorial/native-file-drag-drop
and https://ourcodeworld.com/articles/read/288/how-to-handle-drag-and-drop-file-feature-in-electron-framework
(combined ipcRenderer with node fs)
how-to-handle-drag-and-drop-file-feature-in-electron-framework
progress bar: https://www.electronjs.org/docs/tutorial/progress-bar
notifications: https://www.electronjs.org/docs/tutorial/notifications
windows taskbar: https://www.electronjs.org/docs/tutorial/windows-taskbar

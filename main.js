
// what is the structure/inheritance of these?
// app is node instance? Browser is chromium? what does chromium do
// app has lifecycle events, browser is the window operations
const { app, BrowserWindow } = require('electron');

const { Menu, shell, ipcMain } = require('electron');

var FPSEvent = null;
ipcMain.on('set-callback-toggleFPS', (event) => {
    FPSEvent = event;
});
var infoEvent = null;
ipcMain.on('set-callback-toggleInfo', (event) => {
    infoEvent = event;
});
var optionsEvent = null;
ipcMain.on('set-callback-openOptions', (event) => {
    optionsEvent = event;
});

// app knows about windows innately?
function createWindow() {
    const win = new BrowserWindow({
        title: "Boids",
        width: 1200,
        height: 750,
        minWidth:500,
        minHeight:400,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'boid.ico'
    })

    win.loadFile('index.html');
    //win.webContents.openDevTools();

    // link to github, reload, zoom in/out, actual size, toggle fullscreen, minimize, close
    // simulation variables?
    var fileMenu = Menu.buildFromTemplate([
        {
            label: 'View',
            submenu: [
                {role:'reload'},
                {type:'separator'},
                {label:'Toggle FPS',
                accelerator:'CmdOrCtrl+`',
                click: () => { if (FPSEvent) FPSEvent.reply('toggleFPS') }},
                {type:'separator'},
                {label:'Zoom In',
                accelerator: 'CmdOrCtrl+=',
                role: 'zoomIn'},
                {label:'Zoom Out',
                accelerator: 'CmdOrCtrl+-',
                role:'zoomOut'},
                {role:'resetzoom'},
                {type:'separator'},
                {role:'togglefullscreen'}
            ]
        },
        {
            label: 'Window',
            submenu: [
                {role:'toggleDevTools'},
                {type:'separator'},
                {role:'minimize'},
                {role:'close'}
            ]
        },
        {
            label: 'About',
            submenu: [
                {label:'Info',
                click: () => { if (infoEvent) infoEvent.reply('toggleInfo') }},
                {label:'Instructions',
                click: () => { if (optionsEvent) optionsEvent.reply('openOptions') }},
                {label:'Author',
                click: () => {shell.openExternal('https://github.com/meta-engineer')} },
                {label:'Source'}
            ]
        }
    ]);
    Menu.setApplicationMenu(fileMenu);
}

app.whenReady().then(createWindow);

// when all browsers are gone, app closes automatically
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
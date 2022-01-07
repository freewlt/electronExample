"use strict";

import { app, protocol, BrowserWindow, Menu, Tray, dialog, screen } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } }
]);

let mainWindow; 

async function createWindow() {
    // Create the browser window.
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: width/2,
        height: height/2,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            // 取消跨域限制
            webSecurity: false,
        },
        // icon设置
        icon: `${__static}/favicon.ico`,
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) {mainWindow.webContents.openDevTools();}
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        mainWindow.loadURL("app://./index.html");
    }

    createMenu();
}


// 设置菜单栏
function createMenu() {
    // darwin表示macOS，针对macOS的设置
    if (process.platform === "darwin") {
        const template = [
            {
                label: "APP Demo",
                submenu: [
                    {
                        role: "about"
                    },
                    {
                        role: "quit"
                    }
                ]
            }
        ];
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
    // windows 及 liunx系统取消菜单栏
        Menu.setApplicationMenu(null);
    }
}

// 系统托盘
function tray() {
    tray = new Tray('./public/favicon.ico');
    const contextMenu = Menu.buildFromTemplate([
        {
            role: "minimize",
            label: "最小化",
            click: () => {
                mainWindow.minimize();
            }
        },
        {
            role: "togglefullscreen",
            label: "全屏",
            click: () => {
                mainWindow.setFullScreen( mainWindow.isFullScreen() !== true );
            }
        },
        {
            role: "quit",
            label: "退出",
            click: () => {
                // app.quit();
                dialogs();
            }
        }
    ]);
    tray.setToolTip("易生活平台")
    tray.on('right-click', () => {
        tray.popUpContextMenu(contextMenu)  
    })
    tray.on('click', () => {
        mainWindow.show()
    })
}

// 对话框
function dialogs() {
    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "退出" + app.name,
      defaultId: 0,
      cancelId: 1,
      icon: './public/favicon.ico',
      message: "确认退出吗?",
      buttons: ['退出', "取消"]
    }).then( r => {
      if (r.response === 0) {
        app.exit();
      } else {
        console.log(r.response)
      }
    })
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {createWindow();}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    // globalShortcut.register('CommandOrControl+Shift+i', function () {
    //   win.webContents.openDevTools()
    // })
    }
    createWindow();
    tray();
    // dialogs();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

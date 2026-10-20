const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

function getModsDirSmart() {
  try {
    const execDir = path.dirname(process.execPath);
    const cwd = process.cwd();
    if (execDir.includes('node_modules')) {
      const modsDir = path.join(cwd, 'mods');
      if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true });
      return modsDir;
    }
    const modsDir = path.join(execDir, 'mods');
    if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true });
    return modsDir;
  } catch (e) {
    const modsDir = path.join(process.cwd(), 'mods');
    try { if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true }); } catch (e2) {}
    return modsDir;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  });
  win.loadFile('index.html');
}

ipcMain.handle('get-autostart', () => {
  try { return app.getLoginItemSettings().openAtLogin === true; } catch (e) { return false; }
});
ipcMain.handle('set-autostart', (event, enabled) => {
  try {
    app.setLoginItemSettings({ openAtLogin: !!enabled, path: process.execPath, args: [] });
    return app.getLoginItemSettings().openAtLogin === true;
  } catch (e) { return false; }
});

ipcMain.handle('pick-exe', async () => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'Выберите приложение',
      properties: ['openFile'],
      filters: [{ name: 'Программы', extensions: ['exe', 'bat', 'cmd', 'lnk'] }, { name: 'Все файлы', extensions: ['*'] }]
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  } catch (e) { return null; }
});

ipcMain.handle('get-mods-dir', () => getModsDirSmart());

ipcMain.handle('open-mods-dir', async () => {
  try {
    const dir = getModsDirSmart();
    await shell.openPath(dir);
    return { ok: true, dir };
  } catch (e) { return { ok: false, error: e.message }; }
});

ipcMain.handle('load-custom-commands', () => {
  try {
    const modsDir = getModsDirSmart();
    const allCommands = [];
    const loadedFiles = [];
    const files = fs.readdirSync(modsDir).filter(f => f.toLowerCase().endsWith('.jarv'));
    for (const file of files) {
      try {
        const fullPath = path.join(modsDir, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.commands)) {
          parsed.commands.forEach(cmd => { if (cmd && cmd.phrase) allCommands.push(cmd); });
          loadedFiles.push({ file, count: parsed.commands.length });
        }
      } catch (e) {}
    }
    return { commands: allCommands, files: loadedFiles, modsDir: modsDir };
  } catch (e) {
    return { commands: [], files: [], modsDir: getModsDirSmart(), error: e.message };
  }
});

ipcMain.handle('save-custom-commands', (event, data) => {
  try {
    const modsDir = getModsDirSmart();
    const filePath = path.join(modsDir, 'my-commands.jarv');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { ok: true, path: filePath };
  } catch (e) { return { ok: false, error: e.message }; }
});

ipcMain.handle('import-jarv', async () => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'Импорт команд',
      properties: ['openFile'],
      filters: [{ name: 'Jarvis команды', extensions: ['jarv', 'json'] }, { name: 'Все файлы', extensions: ['*'] }]
    });
    if (result.canceled || result.filePaths.length === 0) return { ok: false };
    const srcPath = result.filePaths[0];
    const modsDir = getModsDirSmart();
    const raw = fs.readFileSync(srcPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.commands)) return { ok: false, error: 'Неверный формат файла' };

    const myFilePath = path.join(modsDir, 'my-commands.jarv');
    let currentCommands = [];
    try {
      if (fs.existsSync(myFilePath)) {
        const currentParsed = JSON.parse(fs.readFileSync(myFilePath, 'utf-8'));
        if (currentParsed && Array.isArray(currentParsed.commands)) currentCommands = currentParsed.commands;
      }
    } catch (e) {}

    const existingPhrases = new Set(currentCommands.map(c => c.phrase.toLowerCase()));
    const newCommands = parsed.commands.filter(c => c && c.phrase && !existingPhrases.has(c.phrase.toLowerCase()));
    const merged = currentCommands.concat(newCommands);

    fs.writeFileSync(myFilePath, JSON.stringify({ commands: merged }, null, 2), 'utf-8');
    return { ok: true, fileName: path.basename(srcPath), count: newCommands.length, skipped: parsed.commands.length - newCommands.length, total: merged.length };
  } catch (e) { return { ok: false, error: e.message }; }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
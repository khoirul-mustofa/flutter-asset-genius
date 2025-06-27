const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Converts a filename into a camelCase variable name.
 * example-file-name.png -> exampleFileName
 * @param {string} filename The original filename.
 * @returns {string} The camelCase variable name.
 */
function toCamelCase(filename) {
    // Remove file extension
    let name = filename.split('.').slice(0, -1).join('.');
    // Replace invalid characters with spaces and then capitalize words
    return name.replace(/[^a-zA-Z0-9]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('flutter-asset-genius.generateAssets', async (uri) => {
        if (!uri) {
            vscode.window.showErrorMessage("Silakan klik kanan pada file pubspec.yaml untuk menjalankan perintah ini.");
            return;
        }

        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Tidak ditemukan workspace. Silakan buka sebuah proyek Flutter.");
            return;
        }

        const rootPath = workspaceFolder.uri.fsPath;
        const pubspecPath = path.join(rootPath, 'pubspec.yaml');

        try {
            // 1. Read and parse pubspec.yaml
            const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');

            /** * @type {any} 
             * We use a JSDoc type cast here. The yaml.load function returns 'unknown'
             * for safety. By casting it to 'any', we tell the type checker that we
             * are confident about accessing properties on this object.
             */
            const pubspecData = yaml.load(pubspecContent);

            // Now we can safely access the nested properties
            const assetPaths = pubspecData?.flutter?.assets;

            if (!assetPaths || assetPaths.length === 0) {
                vscode.window.showInformationMessage("Tidak ada folder aset yang didefinisikan di pubspec.yaml.");
                return;
            }

            // 2. Scan all asset files
            let allAssets = [];
            for (const assetDir of assetPaths) {
                const fullPath = path.join(rootPath, assetDir);
                if (fs.existsSync(fullPath)) {
                    // Check if it's a directory or a file
                    if (fs.lstatSync(fullPath).isDirectory()) {
                        const files = fs.readdirSync(fullPath);
                        for (const file of files) {
                            // Ensure we only add files, not sub-directories
                            const filePath = path.join(fullPath, file);
                            if (fs.lstatSync(filePath).isFile()) {
                                allAssets.push(path.join(assetDir, file).replace(/\\/g, '/'));
                            }
                        }
                    } else {
                        // It's a single file entry
                        allAssets.push(assetDir.replace(/\\/g, '/'));
                    }
                }
            }
            
            // 3. Generate the Dart class content
            let classContent = "class AppAssets {\n";
            classContent += "  AppAssets._();\n\n";
            
            const uniqueAssets = [...new Set(allAssets)]; // Remove duplicates
            
            if (uniqueAssets.length === 0) {
                vscode.window.showInformationMessage("Tidak ditemukan file aset di dalam folder yang terdaftar.");
                return;
            }

            for (const asset of uniqueAssets) {
                const varName = toCamelCase(path.basename(asset));
                classContent += `  static const String ${varName} = '${asset}';\n`;
            }
            classContent += "}\n";

            // 4. Write to file
            const generatedDirPath = path.join(rootPath, 'lib', 'generated');
            if (!fs.existsSync(generatedDirPath)) {
                fs.mkdirSync(generatedDirPath, { recursive: true });
            }
            fs.writeFileSync(path.join(generatedDirPath, 'app_assets.dart'), classContent);

            vscode.window.showInformationMessage('File "app_assets.dart" berhasil dibuat/diperbarui!');

        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage(`Gagal membuat kelas aset: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

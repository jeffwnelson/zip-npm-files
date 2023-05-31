"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const zip = require("bestzip");
async function zipFiles() {
    try {
        // Get inputs
        const filesToZip = core.getInput("files");
        const cwd = core.getInput("cwd");
        // Parse local package.json file
        const file = JSON.parse(fs.readFileSync("package.json").toString());
        // Compose name of zip archive
        const zipName = file.name + file.version + ".zip";
        // Prepare array of files to zip
        const source = filesToZip.split(",").map((f) => f.trim());
        // Zip files
        await zip({
            source: source,
            destination: zipName,
            cwd: cwd,
        });
        // Compose relative path to zip archive
        const archivePath = path.join(cwd, zipName);
        // Log result
        console.log(`Successfully zipped files ${filesToZip} into ${archivePath}`);
        // Set outputs
        core.setOutput("archive", archivePath);
        core.setOutput("name", file.name);
        core.setOutput("version", file.version);
    }
    catch (error) {
        // Process error
        console.error(error.stack);
        core.setFailed(error.message);
    }
}
zipFiles();
//# sourceMappingURL=index.js.map
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function getSourceCode(directory) {
  const SourceCodeDirectories = [
    "html",
    "js",
    "css"
  ]
  const pages = {};

  SourceCodeDirectories.forEach(function(SourceDir) {
    const files = fs.readdirSync(path.resolve(directory, SourceDir));

    files.forEach(file => {
      const filePath = path.join(SourceDir, file);
      const fileName = path.parse(file).name;

      // Check if the file is an HTML file
      if (fs.statSync(filePath).isFile() && SourceCodeDirectories.includes(path.extname(file).substring(1))) {
        pages[fileName + "-" + path.extname(file).substring(1)] = filePath;
      }
    })
  })
  
  return pages;
}

export default defineConfig(function({ command }) {
  // Specify the root directory where Vite should serve files from
  if(command != "build") {
    console.log("preview")
    return {
      build: {
        rollupOptions: {
            input: getSourceCode(__dirname),
        }
      },
      server: {
        open: "html/index.html"
      }
    }
  } else {
    console.log("this was run")
    return {
      root: "html",
      publicDir: "../public",
      build: {
        outDir: "../dist",
        rollupOptions: {
            input: getSourceCode(__dirname),
        }
      },
    }
  }
})

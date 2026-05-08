const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules') continue;
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace exact colors in jsx style attributes and general strings
            content = content.replace(/color:\s*(['"])white\1/g, "color: $1#000000$1");
            content = content.replace(/color:\s*(['"])#fff\1/g, "color: $1#000000$1");
            content = content.replace(/color:\s*(['"])#ffffff\1/g, "color: $1#000000$1");
            content = content.replace(/color:\s*(['"])rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)\1/g, "color: $1rgba(0,0,0,$2)$1");

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));

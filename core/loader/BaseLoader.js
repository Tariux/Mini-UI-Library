
class BaseLoader {
    constructor() {
        this.modules = [];
    }

    async loadModules(directory) {
        const response = await fetch(directory);
        const files = await response.json(); // Assuming the directory returns a JSON list of files

        for (const file of files) {
            const filePath = `${directory}/${file}`;
            const packageJsonResponse = await fetch(`${filePath}/package.json`);
            const packageJson = await packageJsonResponse.json();

            const mainFile = packageJson.main || 'main.js';
            const mainFilePath = `${filePath}/${mainFile}`;

            try {
                const module = await import(mainFilePath);
                this.modules.push({
                    name: packageJson.name || filePath,
                    path: mainFilePath,
                    module
                });
            } catch (error) {
                console.warn(`Main file not found at ${mainFilePath}`);
            }
        }

        return this.modules;
    }

    get() {
        return this.modules;
    }
}

// Export the loader instance using ES6 syntax
export const loader = new BaseLoader();
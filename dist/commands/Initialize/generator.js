"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppFolder = void 0;
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const webpackTemplate_1 = require("./webpackTemplate");
const spawn = require("cross-spawn");
const eslintRcTemplate_1 = require("./eslintRcTemplate");
const sampleCode_1 = require("./sampleCode");
const imageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVtJREFUeNrcm0tsG1UUhs+MZ/x2HLutKZQ+ojSpiqKItEWIR6SAhJC6aSPURaUuaiSgGyIQEosuYEUEC0RUWHTVdAcFiRIJUbFoE1F1UYgUhBKgSkrSFrWxUWM7tvFr7HDP9YwZz4wd2/E83F+6sWd8PTNfzrnn3Dl3zEAdHTm/eJy8HCNthLR9YC2tkDZD2tTsmb7vanViaoAh0KQFoerBhgnojPIDVgPuM/Iy3UFwIF7rtHjttS1IOqDVTkNn6yKxZFhlQZG+0+FQp+WWZGRjbhoeLb2EY1Ky4KRVrmow5IDeAN+OQ1EmRkwFl80GQ6gPXgzCYx4bXJm/D5/ejAPn6d7qYUc5Mc+Zqld63PDes2WYVE6ACzduQy6RodtbhDzGiUncNJ055Ifj/Z7K9jezd2BVhMs9/HurkCOsmflu9ICnCg7B0HpyIaSQjoPXzsKHw8Fmx+c+1sxg8taQv2rf+JUFzb4IebKfg+d2OeHdwx4o5bMNn4c1b9y5VPseiK6p1E6/C14b2E7f79/uhmx0uWFI0wCff9Kp2nd04AnNvmePDlTeL0aTsFEqNgxpGqCHV5/6xJG90BfyVe0b7gvB0O5AZXuJAKIaheTMAoykizTnyeV1cHDu5DMwd3eNgjy9J1gFh8LPJEmQzlAPsHantQD/ihdUgBIkWg2bUpgjcRIg12aQprno5Vvppr+DOVJL9dzVNMDfojlIZPIN90frfV0DsB6kaYBvPsVCgSRwQRAa6j/+wzyFrCctSFMAhx9naFtPpiASeQDJ5DoUi0XNvji7GftqFq4vRhs6thLS8CCz18dQ6/2byUAylQIM+gKBy2YzkCsx8O1CDHwk0GDSx0i6KKaFZiRBOnbsMRbQTc529hBxTeKW60n1hX/04xLMr6baci4KGVk21kURzmnbgLVYHEqljTK0y0XbhZv32wZnSpA51c9S94wROGm88TwH3f4umF5ag+9//0eX87JGBZVXdzNkzKUhly+nBpZlYFswCMtrGWo9vcQaEVTQetlcjgYVSQiXKZTgk6srkM4XOxMQg8o7gyzwIEA8kajs93f5gOc4ChdN5XX9B+sKiHBBxwaFkwcVj9sNl36N6BJUDANEtzwYYChcoSBUgkoXsd7PdxNwaW7VkOCmC+DhHf8HlWw2Vwkqwe5uuBPLwufX7xmWmlg9ggrOVJRBBeGyJJZ8QeD0DCq6AmJQeeMgAw6mqAoqdrudWg7TgpFqKyBaDi1os9nA5/XSfU6noxJUcOwZrZbnoliNxsIR1lZ6A2RynBRgl0uAHHHNQiFPoTAVcDwPCyRaGhVU2gKIBVisUcq1P2gnf+3gcrkpYCpVnkxjnvuY5Duz1LSLnhrwqeCU4nk7BALboMjadZ+ptBUQy+dYbm+4v9cHGfPYmgdEy2nVM2sCkhvX11/o7RxADCxN30lolP8sG2QGQ/aq7ckbt2HuXqwcZEI+GHv5gKYVOwIQV4PkwiKQfKlLqjhrQXaMi0rC8t25a7dU+7EwqyztbVbqsySgfBVWKWUVrNFyn+kuimsJ2NyMoFqFlTSkWCyhlr76Z2cApvIleP/aQ7DFa9/qvC0bfwg39uUvlnDRlWYg486dmqs48rU9Ca6Vom2btYKAM818g2FtqqUqeULHtHHi/E9WgEPNoItOQZPPqEmQ0hqA18nTwIPlduX6ncmakp5VW4YWHidpZq3cDPf8Y3y0R0oT4VaOoOWuFlK4kgfFJ2UnHiHICWI9Glva9kCshdz1IoELa85kxCdlO9mSE3I4lQVllhyBFh9KN8mSmMvDkltuCigDbelnBQZBrog5fIqA1fxZwX8CDABQJHv904sMOAAAAABJRU5ErkJggg==";
const spawnSync = spawn.sync;
const generateAppFolder = (option) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33;
    if (!fs_1.existsSync("package.json")) {
        return "package.json not found";
    }
    let packageJSON = jsonfile_1.readFileSync("package.json");
    let manifestJSON = {};
    if (option["appID"]) {
        manifestJSON["appID"] = option["appID"];
    }
    manifestJSON["appName"] = {
        ja: option["appName"],
        en: option["appName"],
    };
    manifestJSON["description"] = {
        ja: "kintone plugin.",
        en: "kintone plugin.",
    };
    manifestJSON["buildDir"] = `${option["appName"]}/dist`;
    manifestJSON["type"] = option["type"];
    manifestJSON["scope"] = option["scope"];
    if (fs_1.existsSync(option["appName"])) {
        return "App folder existed";
    }
    fs_1.mkdirSync(option["appName"]);
    fs_1.mkdirSync(`${option["appName"]}/source`);
    fs_1.mkdirSync(`${option["appName"]}/source/js`);
    fs_1.mkdirSync(`${option["appName"]}/source/css`);
    if (option["setAuth"]) {
        let authJSON = {
            username: option["username"],
            password: option["password"],
            domain: option["domain"],
        };
        if (option["proxy"]) {
            authJSON["proxy"] = option["proxy"];
        }
        jsonfile_1.writeFileSync(`${option["appName"]}/auth.json`, authJSON, {
            spaces: 4,
            EOL: "\r\n",
        });
    }
    if (option["useWebpack"] || option["type"] === "Plugin") {
        fs_1.mkdirSync(`${option["appName"]}/dist`);
    }
    if (option["useWebpack"]) {
        let babelJSON = {
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "usage",
                        corejs: {
                            version: 3,
                            proposals: true,
                        },
                    },
                ],
            ],
        };
        jsonfile_1.writeFileSync(`${option["appName"]}/.babelrc`, babelJSON, {
            spaces: 4,
            EOL: "\r\n",
        });
        (_a = packageJSON.dependencies) !== null && _a !== void 0 ? _a : (packageJSON.dependencies = {});
        (_b = packageJSON.devDependencies) !== null && _b !== void 0 ? _b : (packageJSON.devDependencies = {});
        if (option["useWebpack"]) {
            (_c = (_8 = packageJSON.devDependencies).webpack) !== null && _c !== void 0 ? _c : (_8.webpack = "^4.30.0");
            (_d = (_9 = packageJSON.devDependencies)["webpack-cli"]) !== null && _d !== void 0 ? _d : (_9["webpack-cli"] = "^3.2.3");
            (_e = (_10 = packageJSON.devDependencies)["babel-loader"]) !== null && _e !== void 0 ? _e : (_10["babel-loader"] = "^8.0.5");
            (_f = (_11 = packageJSON.devDependencies)["style-loader"]) !== null && _f !== void 0 ? _f : (_11["style-loader"] = "^0.23.1");
            (_g = (_12 = packageJSON.devDependencies)["css-loader"]) !== null && _g !== void 0 ? _g : (_12["css-loader"] = "^2.1.0");
            (_h = (_13 = packageJSON.devDependencies)["core-js"]) !== null && _h !== void 0 ? _h : (_13["core-js"] = "^3.2.1");
            (_j = (_14 = packageJSON.devDependencies)["regenerator-runtime"]) !== null && _j !== void 0 ? _j : (_14["regenerator-runtime"] = "^0.13.3");
            (_k = (_15 = packageJSON.devDependencies)["@babel/core"]) !== null && _k !== void 0 ? _k : (_15["@babel/core"] = "^7.3.3");
            (_l = (_16 = packageJSON.devDependencies)["@babel/preset-env"]) !== null && _l !== void 0 ? _l : (_16["@babel/preset-env"] = "^7.3.1");
            (_m = (_17 = packageJSON.devDependencies)["@babel/plugin-proposal-class-properties"]) !== null && _m !== void 0 ? _m : (_17["@babel/plugin-proposal-class-properties"] = "^7.3.3");
            (_o = (_18 = packageJSON.devDependencies)["@babel/plugin-syntax-dynamic-import"]) !== null && _o !== void 0 ? _o : (_18["@babel/plugin-syntax-dynamic-import"] = "^7.2.0");
        }
        if (option["useTypescript"]) {
            (_p = (_19 = packageJSON.devDependencies)["@babel/preset-typescript"]) !== null && _p !== void 0 ? _p : (_19["@babel/preset-typescript"] = "^7.3.3");
        }
        if (option["useReact"]) {
            (_q = (_20 = packageJSON.devDependencies)["@babel/preset-react"]) !== null && _q !== void 0 ? _q : (_20["@babel/preset-react"] = "^7.0.0");
        }
        if (!packageJSON.scripts) {
            packageJSON.scripts = {};
        }
        packageJSON.scripts[`build-${option["appName"]}`] = `webpack --config ${option["appName"]}/webpack.config.js`;
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 4, EOL: "\r\n" });
        let webpackTemplate = webpackTemplate_1.buildWebpackReactTemplate(option);
        fs_1.writeFileSync(`${option["appName"]}/webpack.config.js`, webpackTemplate);
        spawnSync("npx", [
            "prettier",
            "--write",
            `${option["appName"]}/webpack.config.js`,
            "--single-quote",
        ], { stdio: "inherit", windowsHide: true });
        manifestJSON["uploadConfig"] = {
            desktop: {
                js: [`${option["appName"]}/dist/${option["appName"]}.min.js`],
                css: [],
            },
            mobile: {
                js: [`${option["appName"]}/dist/${option["appName"]}.min.js`],
            },
        };
    }
    else {
        let extension = "js";
        if (option.useTypescript) {
            extension = "ts";
        }
        fs_1.writeFileSync(`${option["appName"]}/source/js/script.${extension}`, sampleCode_1.generateSample(option));
        spawnSync("npx", [
            "prettier",
            "--write",
            `${option["appName"]}/source/js/script.${extension}`,
            "--single-quote",
        ], { stdio: "inherit", windowsHide: true });
        fs_1.writeFileSync(`${option["appName"]}/source/css/style.css`, "");
        manifestJSON["uploadConfig"] = {
            desktop: {
                js: [`${option["appName"]}/source/js/script.js`],
                css: [`${option["appName"]}/source/css/style.css`],
            },
            mobile: {
                js: [],
            },
        };
    }
    (_r = packageJSON.devDependencies) !== null && _r !== void 0 ? _r : (packageJSON.devDependencies = {});
    if (option["useTypescript"]) {
        (_s = (_21 = packageJSON.devDependencies).typescript) !== null && _s !== void 0 ? _s : (_21.typescript = "^3.6.3");
        (_t = (_22 = packageJSON.devDependencies)["@kintone/dts-gen"]) !== null && _t !== void 0 ? _t : (_22["@kintone/dts-gen"] = "^3.1.0");
        if (option["useReact"]) {
            (_u = (_23 = packageJSON.devDependencies)["@types/react"]) !== null && _u !== void 0 ? _u : (_23["@types/react"] = "^16.8.16");
            (_v = (_24 = packageJSON.devDependencies)["@types/react-dom"]) !== null && _v !== void 0 ? _v : (_24["@types/react-dom"] = "^16.8.4");
        }
        const tsConfigJSON = {
            compilerOptions: {
                typeRoots: ["../node_modules/@types"],
                noImplicitAny: false,
            },
            files: ["../node_modules/@kintone/dts-gen/kintone.d.ts"],
            include: ["source/**/*.ts", "source/**/*.tsx"],
        };
        if (option["useReact"]) {
            tsConfigJSON["compilerOptions"]["jsx"] = "react";
        }
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 4, EOL: "\r\n" });
        jsonfile_1.writeFileSync(`${option["appName"]}/tsconfig.json`, tsConfigJSON, {
            spaces: 4,
            EOL: "\r\n",
        });
        if (!option["useWebpack"])
            packageJSON.scripts[`build-${option["appName"]}`] = `./node_modules/.bin/tsc --build ./${option["appName"]}/tsconfig.json`;
    }
    if (option["type"] === "Plugin") {
        (_w = packageJSON.devDependencies) !== null && _w !== void 0 ? _w : (packageJSON.devDependencies = {});
        (_x = (_25 = packageJSON.devDependencies)["@kintone/plugin-packer"]) !== null && _x !== void 0 ? _x : (_25["@kintone/plugin-packer"] = "^2.0.7");
        (_y = (_26 = packageJSON.devDependencies)["@kintone/plugin-uploader"]) !== null && _y !== void 0 ? _y : (_26["@kintone/plugin-uploader"] = "3.0.5");
        manifestJSON["uploadConfig"]["icon"] = `${option["appName"]}/icon.png`;
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 4, EOL: "\r\n" });
        fs_1.writeFileSync(`${option["appName"]}/pluginConfig.html`, "");
        fs_1.writeFileSync(`${option["appName"]}/icon.png`, Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64"));
        let extension = "js";
        if (option.useTypescript) {
            extension = "ts";
        }
        if (option.useReact)
            extension += "x";
        fs_1.writeFileSync(`${option["appName"]}/source/js/config.${extension}`, "");
        fs_1.writeFileSync(`${option["appName"]}/source/css/config.css`, "");
        manifestJSON["uploadConfig"]["config"] = {
            html: `${option["appName"]}/pluginConfig.html`,
            js: [`${option["appName"]}/source/js/config.js`],
            css: [`${option["appName"]}/source/css/config.css`],
            required_params: [],
        };
        const pluginConfigHtmlTemplate = `<span>Hello from kintone CLI</span>`;
        fs_1.writeFileSync(`${option["appName"]}/pluginConfig.html`, pluginConfigHtmlTemplate);
        if (option.useReact)
            manifestJSON["uploadConfig"]["config"]["js"] = [
                `${option["appName"]}/dist/config.min.js`,
            ];
    }
    else {
        (_z = (_27 = packageJSON.devDependencies)["@kintone/customize-uploader"]) !== null && _z !== void 0 ? _z : (_27["@kintone/customize-uploader"] = "^2.0.5");
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 4, EOL: "\r\n" });
    }
    if (option["useReact"]) {
        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {};
        }
        (_0 = (_28 = packageJSON.dependencies).react) !== null && _0 !== void 0 ? _0 : (_28.react = "^16.8.6");
        (_1 = (_29 = packageJSON.dependencies)["react-dom"]) !== null && _1 !== void 0 ? _1 : (_29["react-dom"] = "^16.7.0");
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 4, EOL: "\r\n" });
    }
    if (option["useCybozuLint"]) {
        let lintedExtension = "";
        if (option["useReact"] && option["useTypescript"]) {
            lintedExtension = ".tsx";
        }
        else if (option["useReact"]) {
            lintedExtension = ".jsx";
        }
        else if (option["useTypescript"]) {
            lintedExtension = ".ts";
        }
        else {
            lintedExtension = ".js";
        }
        // add scripts to packageJSON for linting
        (_2 = packageJSON.scripts) !== null && _2 !== void 0 ? _2 : (packageJSON.scripts = {});
        (_3 = (_30 = packageJSON.scripts)["lint-all"]) !== null && _3 !== void 0 ? _3 : (_30["lint-all"] = "eslint . --ext .js,.jsx,.ts,.tsx");
        (_4 = (_31 = packageJSON.scripts)["lint-all-fix"]) !== null && _4 !== void 0 ? _4 : (_31["lint-all-fix"] = "eslint . --ext .js,.jsx,.ts,.tsx --fix");
        packageJSON.scripts[`lint-${option["appName"]}`] = `eslint ${option["appName"]}/ --ext ${lintedExtension}`;
        packageJSON.scripts[`lint-${option["appName"]}-fix`] = `eslint ${option["appName"]}/ --ext ${lintedExtension} --fix`;
        // add eslint and @cybozu/eslint-config to devDependencies
        (_5 = packageJSON.devDependencies) !== null && _5 !== void 0 ? _5 : (packageJSON.devDependencies = {});
        (_6 = (_32 = packageJSON.devDependencies)["eslint"]) !== null && _6 !== void 0 ? _6 : (_32["eslint"] = "^6.5.1");
        (_7 = (_33 = packageJSON.devDependencies)["@cybozu/eslint-config"]) !== null && _7 !== void 0 ? _7 : (_33["@cybozu/eslint-config"] = ">=7.1.0");
        jsonfile_1.writeFileSync(`package.json`, packageJSON, { spaces: 2, EOL: "\r\n" });
        // create .eslintrc.js file according to customization structure
        let eslintRcTemplete = eslintRcTemplate_1.buildEslintRcTemplate(option);
        fs_1.writeFileSync(`${option["appName"]}/.eslintrc.js`, eslintRcTemplete);
        spawnSync("npx", ["prettier", "--write", `${option["appName"]}/.eslintrc.js`], { stdio: "inherit" });
    }
    jsonfile_1.writeFileSync(`${option["appName"]}/config.json`, manifestJSON, {
        spaces: 4,
        EOL: "\r\n",
    });
    if (option["entry"]) {
        fs_1.writeFileSync(`${option["appName"]}/source/${option["entry"]}`, sampleCode_1.generateSample(option));
        spawnSync("npx", [
            "prettier",
            "--write",
            `${option["appName"]}/source/${option["entry"]}`,
            "--single-quote",
        ], { stdio: "inherit", windowsHide: true });
    }
    if (fs_1.existsSync(".gitignore")) {
        let gitIgnoreContent = fs_1.readFileSync(".gitignore").toString();
        gitIgnoreContent += `\n${option["appName"]}/auth.json`;
        fs_1.writeFileSync(".gitignore", gitIgnoreContent);
    }
    return false;
};
exports.generateAppFolder = generateAppFolder;
exports.default = {
    generateAppFolder,
};
//# sourceMappingURL=generator.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const validator_1 = require("./validator");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const builder_1 = require("./builder");
const buildCommand = (program) => {
    program
        .command("build")
        .option("--app-name <appName>", "App name")
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        let error = validator_1.default.buildValidator(cmd);
        if (error && typeof error === "string") {
            console.log(chalk.red(error));
            return;
        }
        try {
            let config = jsonfile_1.readFileSync(`${cmd["appName"]}/config.json`);
            if (fs_1.existsSync(`${config["appName"]}/webpack.config.js`)) {
                builder_1.buildUsingWebpack(config);
            }
            else {
                if (config["type"] === "Customization") {
                    console.log(chalk.red("No webpack.config.js"));
                    return;
                }
                builder_1.buildVanillaJS(config);
            }
            if (config["type"] === "Plugin") {
                builder_1.buildPlugin(config);
            }
            console.log("");
            console.log(chalk.yellow("Build app complete."));
            if (!fs_1.existsSync(`${config["appName"]}/auth.json`)) {
                console.log(chalk.yellow("To set auth info, use:"));
                console.log("");
                console.log(chalk.greenBright(`     kintone-cli auth --app-name ${config["appName"]}`));
                console.log("");
            }
            else {
                console.log(chalk.yellow("To deploy app, use:"));
                console.log("");
                console.log(chalk.greenBright(`     kintone-cli deploy --app-name ${config["appName"]}`));
                console.log("");
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
};
exports.default = buildCommand;
//# sourceMappingURL=buildCommand.js.map
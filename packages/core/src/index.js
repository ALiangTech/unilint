#!/usr/bin/env node

import { Command  } from "commander";
import inquirer from 'inquirer';
import createEslint from './createEslint.js';
export const init = ({ config }) => {
    const createPrompt = () => {
        const keys = Object.keys(config);
        const questions = [
            {
                name: "tool",
                message: "当前项目使用的包工具: ",
                type: 'list',
                choices: ['npm', 'yarn', 'pnpm'],
                default: 'npm',
            },
            {
                name: "eslint",
                message: "选择需要生成的eslint类型: ",
                type: 'list',
                choices: keys
            },
            {
                name: "style",
                message: "是否需要stylelint: ",
                type: 'confirm',
            },
        ];
        return inquirer.prompt(questions)
    }
    const program = new Command();
    program.name("unf").description("快速创建格式化").version("1.0.0");
    program.command("create")
    .description("创建配置文件")
    .action(async () => {
        try {
           const answer = await createPrompt();
           const eslintType = answer['eslint'];
           const tool = answer['tool'];
           if(eslintType) {
              const configData = config[eslintType];
             createEslint({ type:eslintType, configData, tool });
           }
        } catch (error) {
            console.error(error)
        }
    })
    program.parse();
}



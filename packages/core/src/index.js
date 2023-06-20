#!/usr/bin/env node

import { Command  } from "commander";
import inquirer from 'inquirer';
import createConfig from './createEslint.js';
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
                choices: keys.filter(key => key.includes('eslint'))
            },
            {
                name: "stylelint",
                message: "选择需要生成的stylelint类型: ",
                type: 'list',
                choices: keys.filter(key => key.includes('stylelint'))
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
           const stylelintType = answer['stylelint'];
           const tool = answer['tool'];
           if(eslintType) {
              const configData = config[eslintType];
             await createConfig({configData, tool, packageName: 'eslint' });
           }
           if(stylelintType) {
            const configData = config[stylelintType];
            await createConfig({ configData, tool ,configField:'stylelint', packageName: 'stylelint'});
         }
        } catch (error) {
            console.error(error)
        }
    })
    program.parse();
}



import { exec } from "child_process";
import { createProgressBar } from './create-progress';
import existPackage from "./read-package";
// 执行npm安装命令
const installPackages = (packages = [], tool = 'npm') => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(packages) && packages.length) {
      const packageString = packages.join(" ");
      const diffCommand = {
        "pnpm": "pnpm add",
        "npm": "npm install",
        "yarn": "yarn add"
      }
      const command = `${diffCommand[tool] } --save-dev ${packageString}`;
      const bar = createProgressBar();
      let i = 1;
      const timer = setInterval(() => {
        if(i < 100) {
          bar.tick(i);
          i++
        }
      }, 1000)
      exec(command, (error) => {
        if (error) {
          reject(new Error(`安装npm包时出现错误: ${error}`))
        } else {
          bar.tick(100);
          setTimeout(() => {
            resolve('npm包安装成功')
          }, 1500);
        }
        clearInterval(timer)
      });
    } else {
      reject(new Error(`没有包需要安装`))
    }
  })
};

export default installPackages;

import { exec } from "child_process";
import { createProgressBar } from './create-progress';
// 执行npm安装命令
const installPackages = (packages = [], tool = 'npm') => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(packages) && packages.length) {
      const packageString = packages.join(" ");
      const command = `${tool} install --save-dev ${packageString}`;
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
          reject(new Error(`安装npm包时出现错误：${error}`))
        } else {
          bar.tick(100);
          resolve('npm包安装成功')
        }
        clearInterval(timer)
      });
    } else {
      reject(new Error(`没有包需要安装`))
    }
  })
};

export default installPackages;

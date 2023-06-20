
import path from 'node:path';
import fs from 'fs/promises'

// 判断包是否存在package.json
function existPackage(packageName = 'eslint') {
    // 在这里实现向 package.json 写入配置文件的逻辑
    const cwd = process.cwd();
    if(cwd) {
        const packageJsonPath = path.join(cwd, '/package.json');
        return new Promise((resolve) => {
            const timer = setInterval(async () => {
                const res = await fs.readFile(packageJsonPath, { encoding: 'utf8'})
                const data = res && JSON.parse(res)
                // const data = require(packageJsonPath)
                if(data && data.devDependencies[packageName]) {
                    console.log("%s 包存在", packageName)
                    clearInterval(timer)
                    resolve()
                }
            }, 1000)
        })
    }
}
export default existPackage

import path from 'node:path';
import fs from 'node:fs/promises'

async function writeConfigToPackageJson(config = {}) {
    // 在这里实现向 package.json 写入配置文件的逻辑
    const cwd = process.cwd();
    if(cwd) {
        const packageJsonPath = path.join(cwd, '/package.json');
        const res = await fs.readFile(packageJsonPath, { encoding: 'utf8'})
        const data = res && JSON.parse(res)
        if(data) {
            await fs.writeFile(packageJsonPath, JSON.stringify(Object.assign(data, config),null, 4) )
            console.log("配置文件写入成功")
        }
    }
}
export default writeConfigToPackageJson
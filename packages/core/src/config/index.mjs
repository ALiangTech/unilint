import { glob } from 'glob';
import fs from 'fs';
import path from 'node:path';



// 构建配置文件映射对象 name => config
const getConfigsMap = async () => {
    const configsMap = Object.create(null);
    const configs = await glob("**/config/*.json")
    configs.forEach((file) => {
        const jsonContent = fs.readFileSync(file, 'utf8');
        const jsonData = JSON.parse(jsonContent);
        const { name } = jsonData;
        configsMap[name] = jsonData
    });
    return configsMap
}

// 本地配置json文件生成
const createLocalConfigJSON = async () => {
  const data = await getConfigsMap()
  const cwd = process.cwd();
  console.log(cwd);
  const configPath = path.join(cwd, '/bin/json/config.json');
  fs.writeFile(configPath, JSON.stringify(data,null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('配置写入成功');
    }
  })
}
createLocalConfigJSON();


// "stylelint-config-standard",
// "stylelint-config-prettier",
// "stylelint-config-recommended-vue"
import { installPackages, writeConfigToPackageJson } from './utils'

async function createConfig({ configData, tool }) {
  try {
    // 安装依赖包
    await installPackages(configData.packages, tool)
    const data = { eslintConfig: configData.config }
    // 向package.json写入配置文件
    writeConfigToPackageJson(data)
  } catch (error) {
    console.error('>>>createConfig<<<',error)
  }
}
export default createConfig
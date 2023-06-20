import { installPackages, writeConfigToPackageJson } from './utils'
import existPackage from './utils/read-package'

async function createConfig({ configData, tool ,packageName,configField = 'eslintConfig'}) {
  try {
    // 安装依赖包
    await installPackages(configData.packages, tool, packageName)
    const data = { [configField]: configData.config }
    // 检测包是否安装完成
    await existPackage(packageName)
    // 向package.json写入配置文件
    await writeConfigToPackageJson(data)
  } catch (error) {
    console.error('>>>createConfig<<<',error)
  }
}
export default createConfig
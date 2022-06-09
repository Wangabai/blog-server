/*
 * @Author: 王鑫
 * @Description: oss配置
 * @Date: 2022-05-17 15:48:43
 */
const productConfig = {
  accessKeyId: 'LTAI5tSZEHi5XzR5bCYpEc9m',
  accessKeySecret: '7NWHohVMUAaUk1cq5Z2NXRY6WLvElp',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'wab-blog',
  region: 'oss-cn-hangzhou',
};

const localConfig = {
  accessKeyId: 'LTAI5tSZEHi5XzR5bCYpEc9m',
  accessKeySecret: '7NWHohVMUAaUk1cq5Z2NXRY6WLvElp',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'wab-blog',
  region: 'oss-cn-hangzhou',
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const ossConfig = process.env.NODE_ENV ? productConfig : localConfig;

export default ossConfig;

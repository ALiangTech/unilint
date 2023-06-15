import ProgressBar from 'progress';



export const createProgressBar = () => {
     const bar = new ProgressBar('正在安装依赖包 [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: 100
      });
   return bar
}
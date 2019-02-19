const request = require('request');
const chalk = require('chalk');
const ora = require('ora');
const packageConfig = require('../../package.json');

module.exports = function(done){
  const spinner = ora(chalk.gray('正在检查版本...')).start();
  request({
    url:"http://registry.npm.alibaba-inc.com/@ali/recd-cli",
    time:1000
  }, function(err, res, body){
    if(!err && res.statusCode === 200){
      spinner.stop();
      console.log()
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (localVersion !== latestVersion) {
      	console.log()
        console.log(chalk.gray('@ali/recd-cli有新版本可用.'))
        console.log()
        console.log(chalk.gray('  最新版本: ' + latestVersion))
        console.log(chalk.gray('  本地版本: ' + localVersion))
        console.log()
        console.log('  重新安装获得新特性: ' + chalk.green('tnpm install -g @ali/recd-cli'))
        console.log()
      } else {
        ora(chalk.green('当前为最新版本: '+ latestVersion)).succeed();
      }
    }else{
      spinner.stop();
    }
    done();
  })
}


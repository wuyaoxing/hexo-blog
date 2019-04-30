const path = require('path')
const shell = require('shelljs')

const resolve = pathname => path.resolve(__dirname, pathname)

const branch = 'master'
const src = resolve('./public')
const dest = resolve('../wuyaoxing.github.io')

shell.cd(dest)
shell.exec(`git pull origin ${branch}`)
shell.rm('-rf', `${dest}/!(.git)`)
shell.cp('-rf', `${src}/*`, dest)

shell.exec('git add -A')
shell.exec(`git commit -m "[Site] update ${new Date().toLocaleString('zh-cn', { hour12: false })}"`)
shell.exec(`git push origin ${branch}`)

console.info('\nDeploy completed.\n')

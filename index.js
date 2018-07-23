const weiboer = require('./weiboer')
const path = require('path')
const fs = require('fs')
const { handleImg } = require('./utils/')

const content = fs.readFileSync('./tweets/new.txt', 'utf8')
let lines = content.split(/\n/).filter(i => !!i)
let tweets = [] // tweet { text, imgs }
for (let [index, tweet] of lines.entries()) {
  let tweetObj = handleImg(tweet)
  tweets.push(tweetObj)
}
console.log({tweets, ...tweets.imgs})
// return // 测试读取，但不发送

const weiboHelper = weiboer.init(path.resolve(__dirname, './config.json'))
weiboHelper.publish(tweets).then(() => {
  console.log('clean')
  // clean append
})
// weiboHelper.publish('微博内容', ['./images/01.jps', './images/02.jps'])
// weiboHelper.publish('微博内容' + new Date())
// weiboHelper.publish()

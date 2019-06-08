const weiboer = require('./weiboer')
const path = require('path')
const fs = require('fs')
const { handleImg } = require('./utils/')

let content
const newContent = fs.readFileSync('./tweets/new.txt', 'utf8')
const archiveContent = fs.readFileSync('./tweets/archive.txt', 'utf8')
let type
if (newContent) {
  type = 'new'
  content = newContent
} else if (archiveContent) {
  type = 'archive'
  content = archiveContent
}
if (!content) {
  console.log('文件为空')
  return
}
// console.log(content)
let lines = content.split(/\n/).filter(i => !!i)
let tweets = [] // tweet { text, imgs }
for (let [index, tweet] of lines.entries()) {
  let tweetObj = handleImg(tweet)
  tweets.push(tweetObj)
}
if (type === 'archive') {
  // 随机选一条
  let index = selectFrom(0, tweets.length);
  let cache = tweets[index]
  tweets.length = 0
  tweets[0] = cache
}
console.log(type, {tweets, ...tweets.imgs})
// return // 测试读取，但不发送

const weiboHelper = weiboer.init(path.resolve(__dirname, './config.json'))
weiboHelper.publish(tweets).then(() => {
  console.log('clean')
  fs.writeFileSync('./tweets/new.txt', '')
})

function selectFrom (lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue)
}

// weiboHelper.publish('微博内容', ['./images/01.jps', './images/02.jps'])
// weiboHelper.publish('微博内容' + new Date())
// weiboHelper.publish()

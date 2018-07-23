const path = require('path');
const request = require('request'); 
const fs = require('fs');

function handleImg(tweet, imgArr = []) {
  if (!tweet) return
  let imgRegex = /http\S*(gif|png|jpe?g|webp)$/
  tweet = tweet.trim()
  if (imgRegex.test(tweet)) {
    tweet = tweet.replace(imgRegex, (matchStr) => {
      imgArr.push(downloadImg(matchStr))
      return ''
    }).trim()
    return handleImg(tweet, imgArr)
  } else {
    return {
      text: tweet,
      imgs: imgArr
    }
  }
}

function downloadImg(url) {
  const imgName = url.match(/[a-z0-9]+.(jpe?g|png|webp|gif)/)
  const imgPath = path.relative(process.cwd(), `./tmp/${imgName[0]}`)
  console.log('img path ', imgPath)
  request(url).pipe(fs.createWriteStream(imgPath));
  return imgPath
}

module.exports = {
  handleImg,
}

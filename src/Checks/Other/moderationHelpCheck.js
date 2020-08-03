/*Checks for discord links, nsfw links, etc*/

const urlExist = require('url-exist');

//nsfw link check
const containsForbiddenLinkCheck = (temp) => {
  if (temp.includes('pornhub.com/') || temp.includes('nhentai.net/')) {
    return 1;
  } else return 0;
};

//discord link check
const containsDiscordLinkCheck = (temp) => {
  if (temp.includes('discord.gg/') || temp.includes('discordapp.com/invite/')) {
    return 1;
  } else return 0;
};

//art link check
const containsInvalidArtLinkCheck = async (link) => {
  if (
    link.includes('twitter.com/') ||
    link.includes('pixiv.net/') ||
    link.includes('instagram.com/') ||
    link.includes('tumblr.com/') ||
    (await urlExist(link))
  )
    return 0;
  else return 1;
};

// const nsfwCheck = async (link) => {
//   const pic = await axios.get(link, {
//     responseType: 'arraybuffer',
//   });
//   const model = await nsfw.load(); // To load a local model, nsfw.load('file://./path/to/model/')
//   // Image must be in tf.tensor3d format
//   // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
//   const image = await tf.node.decodeImage(pic.data, 3);
//   const predictions = await model.classify(image);
//   image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
//   //   console.log(predictions);
//   let hentaiDetection = predictions.find(
//     (detects) => detects.className === 'Hentai'
//   );
//   let pornDetection = predictions.find(
//     (detects) => detects.className === 'Porn'
//   );
//   console.log(hentaiDetection, pornDetection);
//   if (pornDetection.probability > 0.85 || hentaiDetection.probability > 0.85) {
//     return 1;
//   }
//   return 0;
// };

module.exports = {
  containsForbiddenLinkCheck: containsForbiddenLinkCheck,
  containsDiscordLinkCheck: containsDiscordLinkCheck,
  containsInvalidArtLinkCheck: containsInvalidArtLinkCheck,
  //nsfwCheck:nsfwCheck,
};

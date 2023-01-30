const STORAGEKEY = 'videoplayer-current-time';
import { saveToStorage, loadFromStorage } from './storage.js';
import throttle from 'lodash.throttle';
import VideoLib from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new VideoLib(iframe);
const onPlay = function (data) {
  const savePlayTime = saveToStorage(STORAGEKEY, data.seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));
let readPlayTime = loadFromStorage(STORAGEKEY);
if (readPlayTime === undefined) {
  const savedInput = saveToStorage(STORAGEKEY, 0);
  readPlayTime = 0;
}
player.setCurrentTime(readPlayTime).catch(function (error) {
  console.log(`videoplayer cath error: ${error.name}`);
});

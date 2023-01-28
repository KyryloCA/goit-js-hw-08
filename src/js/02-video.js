//Imort storage operation functions
import { saveToStorage, loadFromStorage } from './storage.js';

//Imort throttle function
import throttle from 'lodash.throttle';

//import controls of the player
import VideoLib from '@vimeo/player';

//looking for existing player position on page
const iframe = document.querySelector('iframe');

//connect to existing player
const player = new VideoLib(iframe);

//task for player start action
const onPlay = function (data) {
  const savePlayTime = saveToStorage('videoplayer-current-time', data.seconds);
};

//seting up listener on timeupdate
player.on('timeupdate', throttle(onPlay, 1000));

//reading playtime from localStorage every page reload
const readPlayTime = loadFromStorage('videoplayer-current-time');

//setting PlayTime to the player
player.setCurrentTime(readPlayTime).catch(function (error) {
  console.log(`videoplayer cath error: ${error.name}`);
});

// videoplayer parts
// console.log(VideoLib);
// console.log(iframe);
// console.log(player);

//storage saving sample
// const write = saveToStorage('somekey', 123321);
// const read = loadFromStorage('somekey');

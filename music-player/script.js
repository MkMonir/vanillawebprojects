'use strict';

const musicContainer = document.getElementById('music-container'),
  playBtn = document.getElementById('play'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next'),
  audio = document.getElementById('audio'),
  progress = document.getElementById('progress'),
  progressContainer = document.getElementById('progress-container'),
  title = document.getElementById('title'),
  cover = document.getElementById('cover'),
  currTime = document.querySelector('#currTime'),
  durTime = document.querySelector('#durTime');

const songs = ['hey', 'summer', 'ukulele'];

// keep track the song
let songIndex = 2;

// Update song details
const loadSong = function (song) {
  title.textContent = song;

  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
};

// Initially load song detail into DOM
loadSong(songs[songIndex]);

// Play song
const playSong = function () {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

// Previes song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Previes song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Pause song
const pauseSong = function () {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
};

// Update progress bar
const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
};

// Set the progress bar
const setprogress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

/// Event listner
playBtn.addEventListener('click', e => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setprogress);

// Ended song
audio.addEventListener('ended', nextSong);

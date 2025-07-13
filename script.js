const songs = [
  { name: "Song One - Sab Tera", file: "songs/song1.mp3" },
  { name: "Song Two - Tu Hi Mera", file: "songs/song2.mp3" },
  { name: "Song Three - Sairana", file: "songs/song3.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].file);

const songList = document.getElementById('songList');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const nowPlaying = document.getElementById('nowPlaying');

function loadSongs() {
  songs.forEach((song, index) => {
    const songDiv = document.createElement('div');
    songDiv.className = 'song';
    songDiv.innerHTML = `
      <span>${song.name}</span>
      <button onclick="playThis(${index})">▶️ Play</button>
    `;
    songList.appendChild(songDiv);
  });
}

function playThis(index) {
  currentSongIndex = index;
  audio.src = songs[index].file;
  audio.play();
  isPlaying = true;
  updateUI();
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updateUI();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex].file;
  audio.play();
  isPlaying = true;
  updateUI();
}

function prevSong() {
  currentSongIndex =
    (currentSongIndex - 1 + songs.length) % songs.length;
  audio.src = songs[currentSongIndex].file;
  audio.play();
  isPlaying = true;
  updateUI();
}

function updateUI() {
  playPauseBtn.innerText = isPlaying ? '⏸️' : '▶️';
  nowPlaying.innerText = isPlaying
    ? `Playing: ${songs[currentSongIndex].name}`
    : 'Paused';
}

audio.addEventListener('timeupdate', () => {
  const value = (audio.currentTime / audio.duration) * 100;
  progress.value = value || 0;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

loadSongs();
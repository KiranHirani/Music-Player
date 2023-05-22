const audioElement = document.querySelector("audio"),
  previousBtn = document.getElementById("previous"),
  playBtn = document.getElementById("play"),
  nextBtn = document.getElementById("next"),
  image = document.getElementById("image"),
  title = document.getElementById("title"),
  artist = document.getElementById("artist"),
  currentTimeElement = document.getElementById("current-time"),
  durationElement = document.getElementById("duration"),
  progressContainer = document.getElementById("progress-container"),
  progress = document.getElementById("progress");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Dean Rory",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Lorelai Gilmore",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Andreai Neagoi",
  },
  {
    name: "metric-1",
    displayName: "Twilight",
    artist: "Jacinto",
  },
];

// Check if playing
let isPlaying = false;

function pauseSong() {
  // Pause
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  audioElement.pause();
}

function playSong() {
  //  Play
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audioElement.play();
}

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function changeSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = `img/${song.name}.jpg`;
  audioElement.src = `music/${song.name}.mp3`;
}

// Current Song
let songIndex = 0;

function prevSong() {
  songIndex = songIndex == 0 ? songs.length - 1 : songIndex - 1;
  changeSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
  changeSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
changeSong(songs[songIndex]);

//Update Progress Bar and Time
function updateProgressBar(event) {
  if (isPlaying) {
    const { currentTime, duration } = event.srcElement;
    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display of duration
    const durationMins = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);
    if (durationSecs < 10) {
      durationSecs = `0${durationSecs}`;
    }
    // Delay switching duration to avoid NaN
    if (durationSecs)
      durationElement.textContent = `${durationMins}:${durationSecs}`;

    // Calculate display of current
    const currentMins = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs < 10) {
      currentSecs = `0${currentSecs}`;
    }
    // Delay switching current to avoid NaN
    if (currentSecs)
      currentTimeElement.textContent = `${currentMins}:${currentSecs}`;
  }
}

// Set Progress Bar
function setProgressBar(event) {
  // this is pointing to the element on which thsi event occurrred
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = audioElement;
  audioElement.currentTime = (clickX / width) * duration;
}

// Event Listeners
previousBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audioElement.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
audioElement.addEventListener("ended", nextSong);

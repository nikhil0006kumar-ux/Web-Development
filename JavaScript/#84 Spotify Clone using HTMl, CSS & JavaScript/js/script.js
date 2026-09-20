console.log("Lets write JavaScript");

let currentSong = new Audio();
let songs = [];
let currFolder;


// ===============================
// ALBUM FOLDERS
// ===============================
// Yahan songs/ ke andar jitne playlist folders hain,
// unke exact folder names add karo.

let albumFolders = [
    "Angry_(mood)",
    "Bright_(mood)",
    "Chill_(mood)",
    "cs",
    "Dark_(mood)",
    "Diljit",
    "Funky_(mood)",
    "karan aujla",
    "Love_(mood)",
    "ncs",
    "Uplifting_(mood)"
];


// ===============================
// TIME FORMAT
// ===============================

function secondsToMinutesSeconds(seconds) {

    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}


// ===============================
// GET SONGS FROM songs.json
// ===============================

async function getSongs(folder) {

    currFolder = folder;

    try {

        const response = await fetch(`/${folder}/songs.json`);

        if (!response.ok) {

            console.log("songs.json not found:", folder);

            songs = [];

            return songs;
        }

        const songFiles = await response.json();

        // songs.json mein sirf filenames hain.
        // Yahan unke saath folder path add kar rahe hain.

        songs = songFiles.map(song => `${folder}/${song}`);

        console.log("Songs loaded:", songs);

        return songs;

    } catch (error) {

        console.log("Error loading songs:", error);

        songs = [];

        return songs;
    }
}


// ===============================
// PLAY MUSIC
// ===============================

const playMusic = (track, pause = false) => {

    currentSong.src = `/${track}`;

    if (!pause) {

        currentSong.play();

        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML =
        decodeURIComponent(track);

    document.querySelector(".songtime").innerHTML =
        "00:00 / 00:00";
};


// ===============================
// LOAD PLAYLIST
// ===============================

function loadPlaylist() {

    const songUL = document
        .querySelector(".songList")
        .getElementsByTagName("ul")[0];

    songUL.innerHTML = "";

    for (const song of songs) {

        const songName =
            decodeURIComponent(song.split("/").pop());

        songUL.innerHTML += `
            <li data-song="${song}">

                <img
                    class="invert"
                    width="34"
                    src="img/music.svg"
                    alt=""
                >

                <div class="info">

                    <div>${songName}</div>

                    <div>Nikhil</div>

                </div>

                <div class="playnow">

                    <span>Play Now</span>

                    <img
                        class="invert"
                        src="img/play.svg"
                        alt=""
                    >

                </div>

            </li>
        `;
    }


    // ===============================
    // SONG CLICK
    // ===============================

    Array.from(
        document
            .querySelector(".songList")
            .getElementsByTagName("li")
    ).forEach(songElement => {

        songElement.addEventListener("click", () => {

            playMusic(songElement.dataset.song);

        });

    });

    return songs;
}


// ===============================
// DISPLAY ALBUMS / PLAYLISTS
// ===============================

async function displayAlbums() {

    const cardContainer =
        document.querySelector(".cardContainer");

    cardContainer.innerHTML = "";


    // Loop through all playlist folders

    for (const folder of albumFolders) {

        console.log("Loading album:", folder);

        try {

            const infoRequest =
                await fetch(`/songs/${folder}/info.json`);


            if (!infoRequest.ok) {

                console.log(
                    "info.json not found:",
                    folder
                );

                continue;
            }


            const info =
                await infoRequest.json();


            console.log(
                "Album info:",
                info
            );


            // Create playlist card

            cardContainer.innerHTML += `

                <div
                    class="card"
                    data-folder="${folder}"
                >

                    <div class="play">

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M5 20V4L19 12L5 20Z"
                                fill="#000"
                                stroke="#141B34"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                            />

                        </svg>

                    </div>


                    <img
                        src="/songs/${folder}/cover.jpg"
                        alt=""
                    >


                    <h2>${info.title}</h2>


                    <p>${info.description}</p>

                </div>

            `;

        } catch (error) {

            console.log(
                "Error loading album:",
                folder
            );

            console.log(error);
        }
    }


    console.log(
        "Cards created:",
        document.getElementsByClassName("card").length
    );


    // ===============================
    // ALBUM CLICK
    // ===============================

    Array.from(
        document.getElementsByClassName("card")
    ).forEach(card => {

        card.addEventListener(
            "click",
            async event => {

                const folder =
                    event.currentTarget.dataset.folder;


                console.log(
                    "Selected album:",
                    folder
                );


                // Load songs of selected playlist

                await getSongs(
                    `songs/${folder}`
                );


                // Show songs in sidebar

                loadPlaylist();


                // Play first song

                if (songs.length > 0) {

                    playMusic(songs[0]);

                }

            }
        );

    });
}


// ===============================
// MAIN
// ===============================

async function main() {


    // ===============================
    // DEFAULT PLAYLIST
    // ===============================

    await getSongs("songs/ncs");


    // Show default playlist

    loadPlaylist();


    // Load first song but don't play

    if (songs.length > 0) {

        playMusic(
            songs[0],
            true
        );

    }


    // ===============================
    // DISPLAY ALBUMS
    // ===============================

    await displayAlbums();


    // ===============================
    // PLAY / PAUSE
    // ===============================

    play.addEventListener("click", () => {

        if (currentSong.paused) {

            currentSong.play();

            play.src = "img/pause.svg";

        } else {

            currentSong.pause();

            play.src = "img/play.svg";
        }

    });


    // ===============================
    // TIME UPDATE
    // ===============================

    currentSong.addEventListener(
        "timeupdate",
        () => {

            document.querySelector(".songtime").innerHTML =
                `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;


            if (currentSong.duration) {

                document.querySelector(".circle").style.left =
                    (currentSong.currentTime /
                        currentSong.duration) *
                    100 +
                    "%";

            }

        }
    );


    // ===============================
    // SEEKBAR
    // ===============================

    document
        .querySelector(".seekbar")
        .addEventListener("click", e => {

            const percent =
                (e.offsetX /
                    e.target.getBoundingClientRect().width) *
                100;


            document.querySelector(".circle").style.left =
                percent + "%";


            if (currentSong.duration) {

                currentSong.currentTime =
                    (currentSong.duration *
                        percent) /
                    100;

            }

        });


    // ===============================
    // HAMBURGER
    // ===============================

    document
        .querySelector(".hamburger")
        .addEventListener("click", () => {

            document.querySelector(".left").style.left =
                "0";

        });


    // ===============================
    // CLOSE SIDEBAR
    // ===============================

    document
        .querySelector(".close")
        .addEventListener("click", () => {

            document.querySelector(".left").style.left =
                "-120%";

        });


    // ===============================
    // PREVIOUS SONG
    // ===============================

    previous.addEventListener("click", () => {

        console.log("Previous clicked");


        const currentTrack =
            decodeURIComponent(
                currentSong.src
                    .split("/")
                    .slice(-3)
                    .join("/")
            );


        const index =
            songs.indexOf(currentTrack);


        console.log(
            "Current song index:",
            index
        );


        if (index > 0) {

            playMusic(
                songs[index - 1]
            );

        }

    });


    // ===============================
    // NEXT SONG
    // ===============================

    next.addEventListener("click", () => {

        console.log("Next clicked");


        const currentTrack =
            decodeURIComponent(
                currentSong.src
                    .split("/")
                    .slice(-3)
                    .join("/")
            );


        const index =
            songs.indexOf(currentTrack);


        console.log(
            "Current song index:",
            index
        );


        if (
            index >= 0 &&
            index + 1 < songs.length
        ) {

            playMusic(
                songs[index + 1]
            );

        }

    });


    // ===============================
    // VOLUME
    // ===============================

    const volumeRange =
        document
            .querySelector(".range")
            .getElementsByTagName("input")[0];


    volumeRange.addEventListener(
        "change",
        e => {

            console.log(
                "Setting volume to",
                e.target.value,
                "/ 100"
            );


            currentSong.volume =
                parseInt(e.target.value) /
                100;


            // Change mute icon to volume icon

            if (currentSong.volume > 0) {

                document.querySelector(
                    ".volume>img"
                ).src =
                    document.querySelector(
                        ".volume>img"
                    ).src.replace(
                        "mute.svg",
                        "volume.svg"
                    );

            }

        }
    );


    // ===============================
    // MUTE / UNMUTE
    // ===============================

    document
        .querySelector(".volume>img")
        .addEventListener(
            "click",
            e => {


                // ===============================
                // MUTE
                // ===============================

                if (
                    e.target.src.includes(
                        "volume.svg"
                    )
                ) {

                    e.target.src =
                        e.target.src.replace(
                            "volume.svg",
                            "mute.svg"
                        );


                    currentSong.volume = 0;


                    volumeRange.value = 0;

                }


                // ===============================
                // UNMUTE
                // ===============================

                else {

                    e.target.src =
                        e.target.src.replace(
                            "mute.svg",
                            "volume.svg"
                        );


                    currentSong.volume =
                        0.10;


                    volumeRange.value = 10;

                }

            }
        );

}


// ===============================
// START APP
// ===============================

main();
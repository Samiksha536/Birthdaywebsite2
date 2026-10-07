/* =========================================
   BIRTHDAY WEBSITE JAVASCRIPT
   ========================================= */


/* =========================================
   GET ELEMENTS
   ========================================= */

const pages =
    document.querySelectorAll(".page");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const startButton =
    document.getElementById("startButton");

const giftBox =
    document.getElementById("giftBox");

const giftHint =
    document.getElementById("giftHint");

const celebrateButton =
    document.getElementById("celebrateButton");

const sparkleContainer =
    document.getElementById("sparkles");


/* =========================================
   CURRENT PAGE
   ========================================= */

let currentPage = 1;


/* =========================================
   MUSIC SETTINGS
   ========================================= */

music.volume = 0.7;


/* =========================================
   START MUSIC
   ========================================= */

async function startMusic() {

    try {

        music.volume = 0.7;

        await music.play();

        musicButton.textContent = "🎵";

        console.log("🎵 Background music is playing.");

    }

    catch (error) {

        console.log(
            "Music is waiting for user interaction."
        );

        console.error(error);
    }
}


/* =========================================
   MUSIC BUTTON
   ========================================= */

musicButton.addEventListener("click", async function () {

    if (music.paused) {

        try {
            await music.play();

            musicButton.textContent = "🔊";

            console.log("Music is playing!");

        } catch (error) {

            console.error("Music error:", error);

            alert("Music could not be played. Please check music.mp3.");
        }

    } else {

        music.pause();

        musicButton.textContent = "🎵";
    }

});


/* =========================================
   SHOW PAGE
   ========================================= */

function showPage(pageNumber) {

    if (
        pageNumber < 1 ||
        pageNumber > pages.length
    ) {
        return;
    }


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const nextPage =
        document.getElementById(
            "page" + pageNumber
        );


    if (!nextPage) {

        console.error(
            "Page not found:",
            pageNumber
        );

        return;
    }


    nextPage.classList.add("active");

    currentPage = pageNumber;


    createSparkles();

}


/* =========================================
   FIRST BUTTON
   ========================================= */

startButton.addEventListener(
    "click",
    async function () {

        await startMusic();

        createSparkles();

        setTimeout(
            function () {

                showPage(2);

            },
            350
        );

    }
);


/* =========================================
   NORMAL MAGIC BUTTONS
   ========================================= */

const nextButtons =
    document.querySelectorAll(
        "[data-next]"
    );


nextButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            async function () {

                await startMusic();

                const nextPage =
                    Number(
                        button.dataset.next
                    );

                createSparkles();

                setTimeout(
                    function () {

                        showPage(nextPage);

                    },
                    300
                );

            }
        );

    }
);


/* =========================================
   GIFT BOX
   ========================================= */

function openGift() {

    if (
        giftBox.classList.contains("open")
    ) {
        return;
    }


    giftBox.classList.add("open");

    giftHint.textContent =
        "✨ Your surprise is opening...";


    createSparkles();

    createConfetti();


    setTimeout(
        function () {

            showPage(7);

        },
        1200
    );

}


/* =========================================
   GIFT CLICK
   ========================================= */

giftBox.addEventListener(
    "click",
    openGift
);


/* =========================================
   GIFT KEYBOARD
   ========================================= */

giftBox.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openGift();

        }

    }
);


/* =========================================
   CELEBRATE BUTTON
   ========================================= */

celebrateButton.addEventListener(
    "click",
    function () {

        createConfetti();

        createSparkles();

    }
);


/* =========================================
   CREATE SPARKLES
   ========================================= */

function createSparkles() {

    const symbols = [
        "✨",
        "💗",
        "💕",
        "⭐"
    ];


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const sparkle =
            document.createElement("div");


        sparkle.className =
            "sparkle";


        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        sparkle.style.left =
            Math.random() * 100 + "%";


        sparkle.style.top =
            Math.random() * 100 + "%";


        sparkle.style.setProperty(
            "--move-x",
            (
                Math.random() * 160 - 80
            ) + "px"
        );


        sparkle.style.setProperty(
            "--move-y",
            (
                Math.random() * 160 - 80
            ) + "px"
        );


        sparkleContainer.appendChild(
            sparkle
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            1100
        );

    }

}


/* =========================================
   CREATE CONFETTI
   ========================================= */

function createConfetti() {

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💕",
        "⭐",
        "💗"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            (
                2 +
                Math.random() * 2
            ) + "s";


        piece.style.animationDelay =
            Math.random() * 0.7 + "s";


        document.body.appendChild(
            piece
        );


        setTimeout(
            function () {

                piece.remove();

            },
            4500
        );

    }

}


/* =========================================
   STARTUP
   ========================================= */

console.log(
    "💗 Birthday website loaded successfully."
);

console.log(
    "🎵 Music file:",
    "./assets/music.mp3"
);

console.log(
    "🖼 Photo 1:",
    "./assets/photo1.jpg"
);


/* =========================================
   PREVENT PAGE 1 FROM BEING SKIPPED
   ========================================= */

showPage(1);
music.addEventListener("loadeddata", function () {
    console.log("✅ music.mp3 loaded successfully");
});

music.addEventListener("error", function () {
    console.error("❌ music.mp3 could not be loaded");
});
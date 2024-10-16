export default function () {
    const playVideoBtns = document.querySelectorAll(".is-playback");
    const videoModal = document.querySelector(".modal_video");
    if (playVideoBtns.length && videoModal) {
        const closeVideoBtn = document.querySelector(".is-close-video");
        const videoEl = document.getElementById("modal-video-player");
        const videoSurce = videoEl.querySelector("source");

        playVideoBtns.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                event.preventDefault();

                videoModal.classList.add("open");

                const videoUrl = btn.getAttribute("href");

                videoSurce.setAttribute("src", videoUrl);
                videoEl.load();

                if (videoEl.requestFullscreen) {
                    videoEl.requestFullscreen();
                } else if (videoEl.webkitRequestFullscreen) {
                    videoEl.webkitRequestFullscreen();
                } else if (videoEl.msRequestFullScreen) {
                    videoEl.msRequestFullScreen();
                }

                videoEl.parentElement.appendChild(closeVideoBtn);
                closeVideoBtn.style.position = "absolute";
                closeVideoBtn.style.top = "10px";
                closeVideoBtn.style.right = "10px";
                closeVideoBtn.style.zIndex = "9999";
                closeVideoBtn.style.display = "block";

                setTimeout(() => {
                    videoEl.play();
                }, 250);
            });
        });

        closeVideoBtn.addEventListener("click", function () {
            videoModal.classList.remove("open");
            videoEl.pause();
            videoEl.currentTime = 0;
            if (videoEl.exitFullscreen) {
                videoEl.exitFullscreen();
            } else if (videoEl.msExitFullscreen) {
                videoEl.msExitFullscreen();
            } else if (videoEl.mozCancelFullScreen) {
                videoEl.mozCancelFullScreen();
            } else if (videoEl.webkitExitFullscreen) {
                videoEl.webkitExitFullscreen();
            }
        });

        // Listen for the fullscreenchange event
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        ); // For Safari
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        ); // For Firefox
        document.addEventListener("MSFullscreenChange", handleFullscreenChange); // For IE/Edge

        function handleFullscreenChange() {
            if (
                !document.fullscreenElement &&
                !document.webkitFullscreenElement &&
                !document.mozFullScreenElement &&
                !document.msFullscreenElement
            ) {
                // Fullscreen has been exited, trigger the close button click
                closeVideoBtn.click();
            }
        }
    }
}

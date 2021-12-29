const selectDom = {
  featuredMedia: () => document.querySelector('[data-js="featured-media"]'),
  featuredVideo: () => document.querySelector('[data-js="featured-video"]'),
};

const stickyVideo = () => {
  window.$featuredMedia = selectDom.featuredMedia();
  window.$featuredVideo = selectDom.featuredVideo();

  if (!$featuredMedia || !$featuredVideo) return;

  let videoPositionFromTop = $featuredMedia.offsetTop;

  let offset = Math.floor(videoPositionFromTop + ($featuredMedia.offsetHeight / 2));

  window.addEventListener("resize", function () {
    videoPositionFromTop = $featuredMedia.offsetTop;

    offset = Math.floor(videoPositionFromTop + ($featuredMedia.offsetHeight / 2));
  })

  window.addEventListener("scroll", function () {
    // $featuredVideo.classList.toggle("is-sticky");
    let pageScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    $featuredVideo.classList.toggle("is-sticky",
      pageScrollTop > offset && $featuredVideo.classList.contains("is-playing")
    );
  });

  window.onYouTubeIframeAPIReady = function () {
    // let player = new YT.Player("featured-video", {
    let player = new YT.Player($featuredVideo, {
      events: {
        "onStateChange": onPlayerStateChange
      }
    });
  };

  /**
 * Run when the Youtube video state (play, pause, etc.) is changed.
 */
  function onPlayerStateChange(event) {
    let isPlay = 1 === event.data;
    let isPause = 2 === event.data;
    let isEnd = 0 === event.data;

    if (isPlay) {
      $featuredVideo.classList.remove("is-paused");
      $featuredVideo.classList.add("is-playing");
    }

    if (isPause) {
      $featuredVideo.classList.remove("is-playing");
      $featuredVideo.classList.add("is-paused");
    }

    if (isEnd) {
      $featuredVideo.classList.remove("is-playing", "is-paused");
    }

  }
}

stickyVideo();
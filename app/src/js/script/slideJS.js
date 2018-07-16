// *****************
// *** 비주얼 영역 슬라이드
var visualSwiper = new Swiper(".visual-slide", {
  // Optional parameters
  loop: true,
  touchRatio: 0,

  // pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  // autoplay
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
});
// *****************

// *****************
// *** 서비스 영역 슬라이드
var serviceSwiperDuration = 8000;
var serviceSwiper = new Swiper(".service-slide", {
  // Optional parameters
  loop: true,
  touchRatio: 0,
  // navigation
  navigation: {
    nextEl: ".service-button-next",
    prevEl: ".service-button-prev"
  },

  // autoplay
  autoplay: {
    delay: serviceSwiperDuration,
    disableOnInteraction: false,
    autoplayDisableOnInteraction: false
  },
  autoplayDisableOnInteraction: false,

  // pagination: {
  //   el: ".service-slide-pagination",
  //   type: "progressbar"
  // },
  watchSlidesProgress: true
});
// *****************

// ------------------
//서비스 영역 슬라이드 이벤트는 모두 여기에 정의
var serviceSlideEvent = function() {
  //변수 선언
  var $pagination_current = $(".pagination-text.current");
  var $pagination_entire = $(".pagination-text.entire");
  var progressBar = new TimelineMax();
  var _tl_pagination = new TimelineMax();

  //프로그레스바 타임라인 정의
  progressBar
    .from(
      ".service-slide-progress .line", //대상
      8, //시간
      { width: 0, ease: Linear.easeNone }, //0프레임일 때 사항
      0
    )
    .timeScale(1);

  //페이지네이션 타임라인 정의

  var counter = $(".service-slide-counter");
  var currentCount = $('<span class="count">1<span/>');
  counter.append(currentCount);

  function paginationUpdate() {
    var index = serviceSwiper.realIndex + 1,
      $current = $(".service-slide").eq(index),
      dur = 0.8;

    var prevCount = $(".count");
    currentCount = $('<span class="count next">' + index + "<span/>");
    currentCount.appendTo(counter);
    TweenLite.to(prevCount, dur, {
      y: -12,
      opacity: 0,
      onCompleteParams: [prevCount],
      onComplete: function(prevCount) {
        prevCount.remove();
      },
      ease: Power2.easeOut
    });
    TweenLite.fromTo(
      currentCount,
      dur,
      {
        y: 12,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut
      }
    );
  }

  //전체 슬라이드 개수 표시
  $pagination_entire.text(serviceSwiper.slides.length - 2);

  //슬라이드 바뀔 때마다 페이지네이션 숫자 변경 및 프로그레스바 리셋
  serviceSwiper.on("slideChange", function() {
    var slideIndex = serviceSwiper.realIndex;
    // $pagination_current.text(slideIndex + 1);
    paginationUpdate();
    progressBar.restart();
  });
}; //end of serviceSlideEvent();
// ------------------

// *****************
// *** 어바웃 영역 슬라이드 이벤트
// last updated: 18-07-15 (리팩토링 필요함!!!)
var aboutSlideEvent = function() {
  //셀렉터 변수
  var $aboutSlideButton = $("button.about-story-button");
  var $aboutSlide = $(".about-slide");
  var aboutSlideIndex = 0;
  var aboutSlideLength = 2;

  var $list1 = $(".story-list-1");
  var $list2 = $(".story-list-2");
  var $list3 = $(".story-list-3");
  var $list4 = $(".story-list-4");
  var $logo = $(".about-slide .logo");
  var $logoLine = $(".about-slide-line");
  var $listAll = $(".story-text-list");

  //콘텐츠 내용 담을 변수
  var aboutSlideConents = {
    logo: ["damu", "dsc", "proz"],
    list_1: {
      title: [],
      text: []
    },
    list_2: {
      title: [],
      text: []
    },
    list_3: {
      title: [],
      text: []
    },
    list_4: {
      title: [],
      text: []
    }
  };

  //어바웃 영역 슬라이드의 내용을 배열로 만듦
  var getAboutSlideContents = function() {
    //[1] .story-list-1의 정보 가져오기
    $list1.each(function(i) {
      // 1) strong 가져오기
      aboutSlideConents.list_1.title[i] = $(this)
        .find("strong")
        .html();

      // 2) p 가져오기
      aboutSlideConents.list_1.text[i] = $(this)
        .find("p")
        .html();
    });

    //[2] .story-list-2의 정보 가져오기
    $list2.each(function(i) {
      // 1) strong 가져오기
      aboutSlideConents.list_2.title[i] = $(this)
        .find("strong")
        .html();

      // 2) p 가져오기
      aboutSlideConents.list_2.text[i] = $(this)
        .find("p")
        .html();
    });

    //[3] .story-list-3의 정보 가져오기
    $list3.each(function(i) {
      // 1) strong 가져오기
      aboutSlideConents.list_3.title[i] = $(this)
        .find("strong")
        .html();

      // 2) p 가져오기
      aboutSlideConents.list_3.text[i] = $(this)
        .find("p")
        .html();
    });

    //[4] .story-list-4의 정보 가져오기
    $list4.each(function(i) {
      // 1) strong 가져오기
      aboutSlideConents.list_4.title[i] = $(this)
        .find("strong")
        .html();

      // 2) p 가져오기
      aboutSlideConents.list_4.text[i] = $(this)
        .find("p")
        .html();
    });
  };

  //슬라이드 업데이트 함수
  var updateAboutSlide = function(index) {
    index == 2 ? $list4.addClass("list-hide") : $list4.removeClass("list-hide");

    $logo.removeClass("updated");
    $listAll.removeClass("updated");
    $logoLine.find("span").removeClass();

    $list1.find("strong").html(aboutSlideConents.list_1.title[index]);
    $list1.find("p").html(aboutSlideConents.list_1.text[index]);
    $list2.find("strong").html(aboutSlideConents.list_2.title[index]);
    $list2.find("p").html(aboutSlideConents.list_2.text[index]);
    $list3.find("strong").html(aboutSlideConents.list_3.title[index]);
    $list3.find("p").html(aboutSlideConents.list_3.text[index]);
    $list4.find("strong").html(aboutSlideConents.list_4.title[index]);
    $list4.find("p").html(aboutSlideConents.list_4.text[index]);

    setTimeout(function() {
      $logo
        .attr("data-logo", aboutSlideConents.logo[index])
        .addClass("updated");
    }, 120);

    setTimeout(function() {
      $logoLine.find("span").addClass(aboutSlideConents.logo[index]);
    }, 320);

    setTimeout(function() {
      $listAll.addClass("updated");
    }, 800);
  };

  //슬라이드 정보 동적 삽입
  getAboutSlideContents();
  //초기 슬라이드 정보 업데이트
  updateAboutSlide(aboutSlideIndex);

  $aboutSlideButton.on("click", function() {
    aboutSlideIndex < aboutSlideLength
      ? aboutSlideIndex++
      : (aboutSlideIndex = 0);
    updateAboutSlide(aboutSlideIndex);
  });
};
// *****************

// *****************
// *** 팝업 영역 슬라이드
var popupDamuSwiper = new Swiper(".popup-slide-damu-container", {
  // Optional parameters
  loop: true,
  touchRatio: 0,

  // navigation
  navigation: {
    nextEl: ".popup-damu-button-next",
    prevEl: ".popup-damu-button-prev"
  }
});
// *****************

var popupSlideEvent = function() {
  console.log("~");
  $(".popup-damu-button-next").on("click", function() {
    console.log("next!");
  });
};

// ------------------
// 윈도 로드 시 이벤트 정의
$(window).on("load", function() {
  aboutSlideEvent();
  serviceSlideEvent();
  popupSlideEvent();
});
// ------------------

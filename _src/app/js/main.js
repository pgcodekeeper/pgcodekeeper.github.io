;(function() {

  /* Event Handlers */
  $(document).ready(function() {
    var lang = document.documentElement.lang;
    initGoogleCustomSearch(lang);
    initPopover();
    copyLinkToClipboardByClick(lang);
    hideNavbarTopByClick();
    hideScrollArrow();
  });

  // Google Custom Search
  function initGoogleCustomSearch(lang) {
    var cxRu = '014950911206763670650:gwdcg5iudkg';
    var cxEn = '014950911206763670650:6q6syg-tntw';
    var placeholderRu = 'Поиск';
    var placeholderEn = 'Search';

    var cx = lang === 'en' ? cxEn : cxRu;
    var placeholder = lang === 'en' ? placeholderEn : placeholderRu;

    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);

    var changeGcsPlaceholder = function(value) {
      setTimeout(function() {
        $('.gsc-input').attr('placeholder', value);
      }, 1000);
    };

    changeGcsPlaceholder(placeholder);
  }

  // Popover
  function initPopover() {
    $('[data-toggle=popover]').popover({
      trigger: 'click',
      delay: {show: 500, hide: 100}
    });

    var hidePopoverByClick = function() {
      $('body').on('click', function(e) {
        if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) {
          $('[data-toggle="popover"]').popover('hide');
        }
      });
    };

    hidePopoverByClick();
  }

  // Copy To Clipboard
  function copyLinkToClipboardByClick(lang) {
    var copiedRu = 'Скопировано!';
    var copiedEn = 'Copied!';

    var copied = lang === 'en' ? copiedEn : copiedRu;

    $(document).on('click', '#popoverbutton', function() {
      var emailLink = document.querySelector('.js-emaillink');
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(emailLink);
      window.getSelection().addRange(range);
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg);
        $('#popoverbutton').attr('title', copied)
      } catch (err) {
        console.log('Oops, unable to copy');
        $('#popoverbutton').attr('title', 'Ctrl+C')
      }
      window.getSelection().removeAllRanges();
    });
  }

  // Navbar Top
  function hideNavbarTopByClick() {
    $(document).click(function(e) {
      if ((window.innerWidth <= 992) && jQuery('.navbar-collapse').hasClass('collapse in')) {
        if (!$(e.target).is('input')) {
          if (!$(e.target).hasClass('gsc-clear-button')) {
            $('.collapse').collapse('hide');
          }
        }
      }
    });
  }

  // Scroll Up + Scroll Down
  function hideScrollArrow() {
    var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (!mobile) {
      $(function() {
        if ($(window).scrollTop() >= "250") $("#ToTop").fadeIn("slow");
        $(window).scroll(function() {
          if ($(window).scrollTop() <= "250") $("#ToTop").fadeOut("slow");
          else $("#ToTop").fadeIn("slow");
        });
        if ($(window).scrollTop() <= $(document).height() - "999") $("#OnBottom").fadeIn("slow");
        $(window).scroll(function() {
          if ($(window).scrollTop() >= $(document).height() - "999") $("#OnBottom").fadeOut("slow");
          else $("#OnBottom").fadeIn("slow");
        });
        $("#ToTop").click(function() {$("html,body").animate({scrollTop: 0}, "slow")});
        $("#OnBottom").click(function() {$("html,body").animate({scrollTop: $(document).height()}, "slow")});
      });
    }
    else {
      $('#ToTop').css('display', 'none');
      $('#OnBottom').css('display', 'none');
    }
  }

})();

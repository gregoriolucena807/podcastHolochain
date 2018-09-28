
$(document).ready(function() {


/* Tooltip */

new jBox('Tooltip', {
  attach: '#Tooltip-1',
  content: 'This is a basic jBox tooltip'
});


new jBox('Tooltip', {
  attach: '#Tooltip-2',
  theme: 'TooltipBorderThick',
  width: 200,
  position: {
    x: 'left',
    y: 'center'
  },
  outside: 'x',
  pointer: 'top:15',
  content: 'You have many options to position and animate your jBoxes',
  animation: 'move'
});


new jBox('Tooltip', {
  attach: '#Tooltip-3',
  theme: 'TooltipDark',
  animation: 'zoomOut',
  content: 'Use themes to change appearance',
});


new jBox('Tooltip', {
  attach: '#Tooltip-4',
  width: 300,
  pointer: 'right:80',
  animation: 'move',
  delayOpen: 1000,
  delayClose: 2000,
  content: 'This tooltip waits 1 second to open and closes after 2 seconds',
  onOpen: function() {
    this.source.removeClass('active').html('Hover me');
  },
  onClose: function() {
    this.source.removeClass('active').html('Hover me');
  }
});


new jBox('Mouse', {
  attach: '#Tooltip-5',
  position: {x: 'right', y: 'bottom'},
  content: 'I will follow you!'
});


new jBox('Tooltip', {
  attach: '#Tooltip-6',
  width: 280,
  closeOnMouseleave: true,
  animation: 'zoomIn',
  content: 'I won\'t close when you move your mouse over me'
});


new jBox('Tooltip', {
  attach: '#Tooltip-7',
  target: '#Tooltip-1',
  theme: 'TooltipBorder',
  trigger: 'click',
  adjustTracker: true,
  closeOnClick: 'body',
  closeButton: 'box',
  animation: 'move',
  position: {
    x: 'left',
    y: 'top'
  },
  outside: 'y',
  pointer: 'left:20',
  offset: {
    x: 25
  },
  content: 'You can position your tooltips at any element.<br>Scroll up and down to see this tooltip flip position!',
  onOpen: function() {
    this.source.addClass('active').html('Now scroll');
  },
  onClose: function() {
    this.source.removeClass('active').html('Click me');
  }
});


new jBox('Tooltip', {
  attach: '#Tooltip-8',
  theme: 'TooltipBorder',
  trigger: 'click',
  width: 200,
  height: ($(window).height() - 160),
  adjustTracker: true,
  closeOnClick: 'body',
  closeOnEsc: true,
  animation: 'move',
  position: {
    x: 'right',
    y: 'center'
  },
  outside: 'x',
  content: 'Scroll up and down or resize your browser, I will adjust my position!<br><br>Press [ESC] or click anywhere to close.',
  onOpen: function() {
    this.source.addClass('active').html('Now scroll');
  },
  onClose: function() {
    this.source.removeClass('active').html('Click me');
  }
});


/* Modal */


new jBox('Modal', {
  attach: '#Modal-1',
  height: 200,
  title: 'I\'m a basic jBox modal window',
  content: '<div style="line-height: 30px;">Try to scroll ...it\'s blocked.<br>Press [ESC] or click anywhere to close.</div>'
});


new jBox('Modal', {
  attach: '#Modal-2',
  width: 350,
  height: 200,
  blockScroll: false,
  animation: 'zoomIn',
  draggable: 'title',
  closeButton: true,
  content: 'You can move this modal window',
  title: 'Click here to drag me around',
  overlay: false,
  reposition: false,
  repositionOnOpen: false
});


new jBox('Modal', {
  attach: '#Modal-3',
  width: 450,
  height: 250,
  closeButton: 'title',
  animation: false,
  title: 'AJAX request',
  ajax: {
    url: 'https://ajaxresponse.com/2',
    data: {
      id: '1982',
      name: 'Stephan Wagner'
    },
    reload: 'strict',
    setContent: false,
    beforeSend: function() {
      this.setContent('');
      this.setTitle('<div class="ajax-sending">Sending AJAX request...</div>');
    },
    complete: function(response) {
      this.setTitle('<div class="ajax-complete">AJAX request complete</div>');
    },
    success: function(response) {
      this.setContent('<div class="ajax-success">Response:<tt>' + response + '</tt></div>');
    },
    error: function() {
      this.setContent('<div class="ajax-error">Oops, something went wrong</div>');
    }
  }
});


/* Confirm */


new jBox('Confirm', {
	content: 'Do you really want to do this?',
	cancelButton: 'Nope',
	confirmButton: 'Sure do!'
});


/* Notice */


$('#Notice-1').click(function() {
  
  new jBox('Notice', {
    content: 'Hello, I\'m a notice',
    color: 'black'
  });
  
});


$('#Notice-2').click(function() {
  
  new jBox('Notice', {
    animation: 'flip',
    color: getColor(),
    content: 'Oooh! They also come in colors'
  });
  
});


$('#Notice-3').click(function() {

  new jBox('Notice', {
    theme: 'NoticeFancy',
    attributes: {
      x: 'left',
      y: 'bottom'
    },
    color: getColor(),
    content: 'Hello, I\'m down here',
    audio: '../Source/audio/bling2',
    volume: 80,
    animation: {open: 'slide:bottom', close: 'slide:left'}
  });
  
});


$('#Notice-4').click(function() {
  
  new jBox('Notice', {
    attributes: {
      x: 'right',
      y: 'bottom'
    },
    stack: false,
    animation: {
      open: 'tada',
      close: 'zoomIn'
    },
    color: getColor(),
    title: 'Tadaaa! I\'m single',
    content: 'Open another notice, I won\'t stack'
  });
  
});

$('#Notice-5').click(function() {
  
  new jBox('Notice', {
    content: 'Hover me, I\'ll stick around',
    color: 'black',
    autoClose: Math.random() * 8000 + 2000,
    delayOnHover: true
  });
  
});


$('#Notice-6').click(function() {
  
  new jBox('Notice', {
    animation: 'flip',
    color: getColor(),
    autoClose: Math.random() * 8000 + 2000,
    content: 'Oooh! They also come in colors',
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


$('#Notice-7').click(function() {

  new jBox('Notice', {
    theme: 'NoticeFancy',
    attributes: {
      x: 'left',
      y: 'bottom'
    },
    color: getColor(),
    content: getString(),
    title: getTitle(),
    maxWidth: 600,
    audio: '../Source/audio/bling2',
    volume: 80,
    autoClose: Math.random() * 8000 + 2000,
    animation: {open: 'slide:bottom', close: 'slide:left'},
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


$('#Notice-8').click(function() {
  
  new jBox('Notice', {
    attributes: {
      x: 'right',
      y: 'bottom'
    },
    stack: false,
    animation: {
      open: 'tada',
      close: 'zoomIn'
    },
    autoClose: Math.random() * 8000 + 2000,
    color: getColor(),
    title: 'Tadaaa! I\'m single',
    content: 'Open another notice, I won\'t stack',
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


/* Image */


new jBox('Image', {
 /* imageCounter: true,
  imageCounterSeparator: ' de '*/
});


/* Additional JS for demo purposes  */


$('#Tooltip-4').mouseenter(function() {
  $('#Tooltip-4').addClass('active').html('Wait...');
}).mouseleave(function() {
  $('#Tooltip-4').addClass('active').html('Wait...');
});

$('.target-notice').click(function() {
  $(this).addClass('active').html('Click me again');
}).mouseleave(function() {
  $(this).removeClass('active').html('Click me');
});

var colors = ['red', 'green', 'blue', 'yellow'], index = 0;
var getColor = function () {
  (index >= colors.length) && (index = 0);
  return colors[index++];
};

var strings = ['Short', 'You just switched the internet off', 'Please do not click too hard - next time we\'ll notify google.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'];
var getString = function () {
  return strings[Math.floor(Math.random()*strings.length)];
};

var titles = ['Congrats', 'Success', 'Thank you', false, false, false];
var getTitle = function () {
  return titles[Math.floor(Math.random()*strings.length)];
};


});


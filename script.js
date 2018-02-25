// flip emoji after '@'

var flipFlag = /\@$/;
var flipStyle = 'scaleX(-1)';

var filpEmoji = function(element) {
  if(element != undefined) {
    var emojis = element.getElementsByClassName('emoji-sizer');
    for(var emoji of emojis) {
      if(emoji.previousSibling !== null) {
        if(emoji.previousSibling.nodeType == Node.ELEMENT_NODE) {
          if(flipFlag.test(emoji.previousSibling.getAttribute('aria-label'))) {
            emoji.previousSibling.setAttribute('aria-label', emoji.previousSibling.getAttribute('aria-label').replace(flipFlag, ''));
            emoji.style.transform = flipStyle;
          }
        } else {
          if(flipFlag.test(emoji.previousSibling.textContent)) {
            emoji.previousSibling.textContent = emoji.previousSibling.textContent.replace(flipFlag, '')
            emoji.style.transform = flipStyle;
          }
        }
      }
    }
  }
}

var transformMessage = function(records) {
  for(var record of records) {
    if(record.addedNodes) {
      for(var node of record.addedNodes) {
        if(node.nodeType == Node.ELEMENT_NODE) {
          var messages = node.getElementsByClassName('c-message__body');
          for(var message of messages) {
            filpEmoji(message);
          }
        }
      }
    }
  }
}

var transformHeaderStatus = function(records) {
  for(var record of records) {
    if(record.addedNodes) {
      for(var node of record.addedNodes) {
        if(node.nodeType == Node.ELEMENT_NODE) {
          var messages = node.getElementsByClassName('c-channel_header_member_current_status');
          for(var message of messages) {
            filpEmoji(message);
          }
        }
      }
    }
  }
}

var transformModalStatus = function(records) {
  for(var record of records) {
    if(record.addedNodes) {
      for(var node of record.addedNodes) {
        if(node != undefined && node.nodeType != Node.TEXT_NODE) {
          var modalElement = node.getElementsByClassName('ReactModal__Overlay')[0];
          filpEmoji(modalElement);
          var tipElement = node.getElementsByClassName('ts_tip_inner_current_status')[0]
          filpEmoji(tipElement);
        }
      }
    }
  }
}

window.onload = function() {
  var messageObserver = new MutationObserver(transformMessage);
  messageObserver.observe(document.getElementById('messages_container'), {childList: true, subtree: true});
  var headerStatusObserver = new MutationObserver(transformHeaderStatus);
  headerStatusObserver.observe(document.getElementById('client_header'), {childList: true, subtree: true});
  var modalStatusObserver = new MutationObserver(transformModalStatus);
  modalStatusObserver.observe(document.body, {childList: true, subtree: true});
}

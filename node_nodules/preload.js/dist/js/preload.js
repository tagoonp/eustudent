var preload = {
  init:function(){
    var load_element = '<div class="loadelement">' +
                          '<div class="loadelement_1">' +
                            '&nbsp;' +
                          '</div>' +
                          '<div class="loadelement_2">' +
                            '<img src="' + root_domain + '/bower_components/SVG-Loaders/svg-loaders/oval.svg" width="100%" />' +
                          '</div>' +
                        '</div>'
    document.write(load_element)
    preload.hide()
  },
  show: function(){
    $('.loadelement').fadeIn()
  },
  hide: function(){
    $('.loadelement').fadeOut()
  }
}

preload.init()

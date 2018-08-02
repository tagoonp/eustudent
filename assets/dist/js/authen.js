var authen = {
  check_user_info: function(){
    var param = {
      id: current_user,
      role: current_role
    }
    console.log(param);
    return ;
  },
  check_user: function(current_role){
    var param = {
        uid: current_user,
        role: current_role
    }

    var jxr = $.post(ws_url + 'checkuser.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){
                     $('.userName').text(i.fname + ' ' + i.lname)
                     $('.userEmail').text(i.email)
                   })
                 }
               })
    return true;
  },
  signout: function(){
    window.location = '../../index.html'
  },
  create_account: function(){

    if(authen.validate_account()){
      authen.register()
    }
  },
  register: function(){

    preload.show()

    var uid_gen = fnc.randomString(10) + $('#txtEmail').val()

    var param = {
      fname: $('#txtFname').val(),
      lname: $('#txtLname').val(),
      email: $('#txtEmail').val(),
      password: $('#txtPassword').val(),
      uid: uid_gen
    }

    var jxr = $.post(ws_url + 'register.php', param, function(){})
               .always(function(response){
                 console.log(response);
                 if(response == 'D'){
                   preload.hide()
                 }else if(response == 'Y'){
                   window.localStorage.setItem(local_prefix + 'uid', uid_gen)
                   window.location = './role/common/'
                 }else{
                   preload.hide()
                 }
               })
               .fail(function(){
                 preload.hide()
               })
  },
  signin: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtUsername').val() == ''){
      check++
      $('#txtUsername').addClass('is-invalid')
      $('#txtUsername').parent().append('<div class="invalid-feedback text-right">Please enter your username or e-mail address</div>')
    }

    if($('#txtPassword').val() == ''){
      check++
      $('#txtPassword').addClass('is-invalid')
      $('#txtPassword').parent().append('<div class="invalid-feedback text-right">Please create your password</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      email: $('#txtUsername').val(),
      password: $('#txtPassword').val()
    }

    var jxr = $.post(ws_url + 'checklogin.php', param, function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){
                     window.localStorage.setItem(local_prefix + 'uid', i.uid)
                     window.localStorage.setItem(local_prefix + 'role', i.role)
                     window.location = './role/' + i.role + '/'
                   })
                 }else{
                   alert('Invalid user account')
                   preload.hide()
                 }
               })
               // .fail(function(){
               //   alert('Can not connect database')
               //   preload.hide()
               // })


  },
  validate_account: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtFname').val() == ''){
      check++
      $('#txtFname').addClass('is-invalid')
      $('#txtFname').parent().append('<div class="invalid-feedback">Please enter your first name</div>')
    }

    if($('#txtLname').val() == ''){
      check++
      $('#txtLname').addClass('is-invalid')
      $('#txtLname').parent().append('<div class="invalid-feedback">Please enter your last name</div>')
    }

    if($('#txtEmail').val() == ''){
      check++
      $('#txtEmail').addClass('is-invalid')
      $('#txtEmail').parent().append('<div class="invalid-feedback">Please enter your e-mail address</div>')
    }

    if($('#txtPassword').val() == ''){
      check++
      $('#txtPassword').addClass('is-invalid')
      $('#txtPassword').parent().append('<div class="invalid-feedback">Please create your password</div>')
    }

    if(!isEmail($('#txtEmail').val())){
      check++
    }

    if(check != 0){
      return false;
    }else{
      return true;
    }
  }
}

$(function(){
  $('#registerForm').submit(function(){
    authen.create_account()
  })

  $('#loginForm').submit(function(){
    authen.signin()
  })
})

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

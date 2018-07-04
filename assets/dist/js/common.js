var current_role = 'register_user'
var current_user = window.localStorage.getItem(local_prefix + 'uid')

var common = {
  init: function(){
    current_user !== null ? common.user_priviledge_check() : authen.signout();
  },
  user_priviledge_check: function(){
    if(authen.check_user(current_role)){
      console.log(current_user)
    }else{
      authen.signout()
    }
  }
}

common.init()

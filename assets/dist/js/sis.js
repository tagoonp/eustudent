var current_user = window.localStorage.getItem(local_prefix + 'uid')
var current_role = window.localStorage.getItem(local_prefix + 'role')

var sis = {
  manage_page_student: function(id, next_url){
    window.localStorage.setItem(local_prefix + 'selected_student', id)
    window.location = next_url
  },
  confirm_delete_student: function(){
    $('.btnCloseModal').trigger('click')
    var pj_id = $('#studentUID').text()
    if(pj_id == ''){
      return ;
    }
    var param = {
      uid: current_user,
      student_uid: pj_id
    }

    preload.show()

    var jxr = $.post(ws_url + 'delete_account.php', param, function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   window.location.reload()
                 }
               })
               .fail(function(){

               })
  },
  delete_student: function(id, std_id){
    $('#btnDeleteProject').trigger('click')
    $('#projectID').text(std_id)
    $('#studentUID').text(id)
  },
  create_student: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtStudentID').val() == ''){
      check++
      $('#txtStudentID').addClass('is-invalid')
      $('#txtStudentID').parent().append('<div class="invalid-feedback text-right">Please enter student ID</div>')
    }

    if($('#txtPrefix').val() == ''){
      check++
      $('#txtPrefix').addClass('is-invalid')
      $('#txtPrefix').parent().append('<div class="invalid-feedback text-right">Please choose preifx</div>')
    }

    if($('#txtFname').val() == ''){
      check++
      $('#txtFname').addClass('is-invalid')
      $('#txtFname').parent().append('<div class="invalid-feedback text-right">Please enter firstname</div>')
    }

    if($('#txtLname').val() == ''){
      check++
      $('#txtLname').addClass('is-invalid')
      $('#txtLname').parent().append('<div class="invalid-feedback text-right">Please enter surname</div>')
    }

    if($('#txtDegree').val() == ''){
      check++
      $('#txtDegree').addClass('is-invalid')
      $('#txtDegree').parent().append('<div class="invalid-feedback text-right">Please choose degree</div>')
    }

    if($('#txtEmail').val() == ''){
      check++
      $('#txtEmail').addClass('is-invalid')
      $('#txtEmail').parent().append('<div class="invalid-feedback text-right">Please enter e-mail address</div>')
    }

    if($('#txtStartyear').val() == ''){
      check++
      $('#txtStartyear').addClass('is-invalid')
      $('#txtStartyear').parent().append('<div class="invalid-feedback text-right">Please enter start year</div>')
    }



    if(!isEmail($('#txtEmail').val())){
      check++
      $('#txtEmail').addClass('is-invalid')
      $('#txtEmail').parent().append('<div class="invalid-feedback text-right">Invalid e-mail pattern</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      studentid: $('#txtStudentID').val(),
      prefix: $('#txtPrefix').val(),
      fname: $('#txtFname').val(),
      lname: $('#txtLname').val(),
      email: $('#txtEmail').val(),
      phone: $('#txtPhone').val(),
      degree: $('#txtDegree').val(),
      startyear: $('#txtStartyear').val(),
      uid: current_user
    }

    var jxr = $.post(ws_url + 'register_student.php', param, function(){})
               .always(function(snap){
                 console.log(snap);
                 if(snap == 'Y'){
                   // Send email to registra
                   setTimeout(function(){
                     window.location.reload()
                   }, 1000)
                 }else if(snap == 'D'){
                   alert('Duplicate')
                   preload.hide()
                 }else{
                   alert('Error')
                   preload.hide()
                 }
               })
               .fail(function(){
                 alert('Fail')
                 preload.hide()
               })
  },
  update_student_1: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtStudentID').val() == ''){
      check++
      $('#txtStudentID').addClass('is-invalid')
      $('#txtStudentID').parent().append('<div class="invalid-feedback text-right">Please enter student ID</div>')
    }

    if($('#txtPrefix').val() == ''){
      check++
      $('#txtPrefix').addClass('is-invalid')
      $('#txtPrefix').parent().append('<div class="invalid-feedback text-right">Please choose preifx</div>')
    }

    if($('#txtFname').val() == ''){
      check++
      $('#txtFname').addClass('is-invalid')
      $('#txtFname').parent().append('<div class="invalid-feedback text-right">Please enter firstname</div>')
    }

    if($('#txtLname').val() == ''){
      check++
      $('#txtLname').addClass('is-invalid')
      $('#txtLname').parent().append('<div class="invalid-feedback text-right">Please enter surname</div>')
    }

    if($('#txtDegree').val() == ''){
      check++
      $('#txtDegree').addClass('is-invalid')
      $('#txtDegree').parent().append('<div class="invalid-feedback text-right">Please choose degree</div>')
    }

    if($('#txtStartyear').val() == ''){
      check++
      $('#txtStartyear').addClass('is-invalid')
      $('#txtStartyear').parent().append('<div class="invalid-feedback text-right">Please enter start year</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      student_uid: current_student,
      studentid: $('#txtStudentID').val(),
      prefix: $('#txtPrefix').val(),
      fname: $('#txtFname').val(),
      lname: $('#txtLname').val(),
      phone: $('#txtPhone').val(),
      degree: $('#txtDegree').val(),
      startyear: $('#txtStartyear').val(),
      uid: current_user
    }

    var jxr = $.post(ws_url + 'update-student-info-1.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   alert('Update success')
                   sis.load_student_info()
                 }else{
                   preload.hide()
                   alert('Update fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Can not connect database')
               })

  },
  load_student_info: function(){
    var param = {
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'get-student-info.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){

                   snap.forEach(function(i){
                     $('.txt_student_id').text(i.s_student_id)
                     $('.txt_student_fullname').text(i.prefix_name + ' ' + i.fname + ' ' + i.lname)
                     $('.txt_student_degree').text(i.degree_name)
                     $('.txt_student_start_year').text(i.s_start_year)
                     $('.txt_student_status').text(i.s_status)
                     $('.txt_student_email').text(i.email)

                     $('#txtStudentID').val(i.s_student_id)
                     $('#txtStartyear').val(i.s_start_year)
                     $('#txtPrefix').val(i.prefix_id)
                     $('#txtDegree').val(i.degree_id)
                     $('#txtFname').val(i.fname)
                     $('#txtLname').val(i.lname)

                   })
                 }
               })
  },
  load_all_student: function(){
    var param = {
      dg: $('#txtDegreeFillter').val(),
      id: $('#txtStudentIDFillter').val(),
      st: $('#txtStatusFillter').val(),
      key: $('#txtNameFillter').val()
    }

    var jxr = $.post(ws_url + 'get-count-student.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $msc = 0
                   $phd = 0
                   $sc = 0

                   snap.forEach(function(i){
                     if(i.s_degree == 'msc'){
                       $msc++;
                     }else if(i.s_degree == 'phd'){
                       $phd++;
                     }else if(i.s_degree == 'sc'){
                       $sc++;
                     }
                   })

                   $('.numMSC').text($msc)
                   $('.numPHD').text($phd)
                   $('.numSC').text($sc)
                 }
               })
  },
  load_student: function(){
    if(start_row == 0){
      $('.ppage').attr('disabled', 'disabled')
    }else{
      $('.ppage').attr('disabled', false)
    }
    var param = {
      start: start_row,
      lpp: limit_per_page,
      dg: $('#txtDegreeFillter').val(),
      id: $('#txtStudentIDFillter').val(),
      st: $('#txtStatusFillter').val(),
      key: $('#txtNameFillter').val()
    }
    var jxr = $.post(ws_url + 'get-student.php', param, function(){}, 'json')
               .always(function(snap){

                 $('.table_response').empty()

                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){

                     $status_a = '<span class="text-success">Active</span>'
                     $status_b = '<span class="text-success">Allow</span>'

                     $data = '<tr>' +
                                '<td>' + i.s_student_id + '</td>' +
                                '<td>' + i.prefix_name + i.fname + ' ' + i.lname +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="View info" onclick="sis.manage_page_student(\'' + i.uid + '\',\'student-information.html\')"><i class="fas fa-search"></i></button>' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Edit info"><i class="fas fa-pencil-alt"></i></button>' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Manage"><i class="fas fa-cogs"></i></button>' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Send message" disabled><i class="far fa-comment"></i></button>' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Send e-mail" disabled><i class="fas fa-envelope"></i></button>' +
                                    '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Delete" onclick="sis.delete_student(\'' + i.uid + '\',\'' + i.s_student_id + '\')"><i class="fas fa-trash"></i></button>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + i.degree_name + '</td>' +
                                '<td>' + i.s_status + '</td>' +
                                '<td>' + $status_a + '</td>' +
                                '<td>' + $status_b + '</td>' +
                             '</tr>'
                     $('.table_response').append($data)
                   })

                   $('[data-toggle="tooltip"]').tooltip()
                 }else{
                   $data = '<tr><td colspan="5">No student found</td></tr>'
                   $('.table_response').append($data)
                 }
               })
  },
  load_staff: function(){
    var jxr = $.post(ws_url + 'get-staff.php', function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){

                   $adm = 0
                   $ts = 0
                   $stf = 0

                   $('.table_response').empty()
                   snap.forEach(function(i){

                     $status_a = '<span class="text-success">Active</span>'
                     $status_b = '<span class="text-success">Allow</span>'

                     if(i.role == 'administrator'){
                       $adm++;
                     }else if(i.role == 'teaching staff'){
                       $ts++;
                     }else if(i.role == 'staff'){
                       $stf++;
                     }

                     $data = '<tr>' +
                                '<td>' + i.prefix_name + i.fname + ' ' + i.lname +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Edit" onclick="updateStaff(\'' + i.uid + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Manage"><i class="fas fa-cogs"></i></button>' +
                                    '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Delete" onclick="project.delete_project(\'' + i.uid + '\')"><i class="fas fa-trash"></i></button>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + i.role + '</td>' +
                                '<td>' + $status_a + '</td>' +
                                '<td>' + $status_b + '</td>' +
                             '</tr>'
                     $('.table_response').append($data)
                   })
                   $('[data-toggle="tooltip"]').tooltip()

                   $('.numAdmin').text($adm)
                   $('.numTS').text($ts)
                   $('.numStaff').text($stf)
                 }
               })
  },
  load_prefix: function(){
    var jxr = $.post(ws_url + 'get-prefix.php', function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $('.prefix').empty()
                   $('.prefix').append('<option value="">-- Choose name prefix --</option>')
                   snap.forEach(function(i){
                     $data = '<option value="' + i.prefix_id + '">' + i.prefix_name + '</option>'
                     $('.prefix').append($data)
                   })
                 }
               })
  },
  create_staff: function(stage){


    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if(stage == null){
      if($('#txtPrefix').val() == ''){
        check++
        $('#txtPrefix').addClass('is-invalid')
        $('#txtPrefix').parent().append('<div class="invalid-feedback text-right">Please choose preifx</div>')
      }

      if($('#txtFname').val() == ''){
        check++
        $('#txtFname').addClass('is-invalid')
        $('#txtFname').parent().append('<div class="invalid-feedback text-right">Please enter firstname</div>')
      }

      if($('#txtLname').val() == ''){
        check++
        $('#txtLname').addClass('is-invalid')
        $('#txtLname').parent().append('<div class="invalid-feedback text-right">Please enter surname</div>')
      }

      if($('#txtRole').val() == ''){
        check++
        $('#txtRole').addClass('is-invalid')
        $('#txtRole').parent().append('<div class="invalid-feedback text-right">Please choose role</div>')
      }

      if($('#txtEmail').val() == ''){
        check++
        $('#txtEmail').addClass('is-invalid')
        $('#txtEmail').parent().append('<div class="invalid-feedback text-right">Please enter e-mail address</div>')
      }

      if($('#txtPhone').val() == ''){
        check++
        $('#txtPhone').addClass('is-invalid')
        $('#txtPhone').parent().append('<div class="invalid-feedback text-right">Please enter phone number</div>')
      }

      if(!isEmail($('#txtEmail').val())){
        check++
        $('#txtEmail').addClass('is-invalid')
        $('#txtEmail').parent().append('<div class="invalid-feedback text-right">Invalid e-mail pattern</div>')
      }
    }else{
      if($('#txtPrefix2').val() == ''){
        check++
        $('#txtPrefix2').addClass('is-invalid')
        $('#txtPrefix2').parent().append('<div class="invalid-feedback text-right">Please choose preifx</div>')
      }

      if($('#txtFname2').val() == ''){
        check++
        $('#txtFname2').addClass('is-invalid')
        $('#txtFname2').parent().append('<div class="invalid-feedback text-right">Please enter firstname</div>')
      }

      if($('#txtLname2').val() == ''){
        check++
        $('#txtLname2').addClass('is-invalid')
        $('#txtLname2').parent().append('<div class="invalid-feedback text-right">Please enter surname</div>')
      }

      if($('#txtRole2').val() == ''){
        check++
        $('#txtRole2').addClass('is-invalid')
        $('#txtRole2').parent().append('<div class="invalid-feedback text-right">Please choose role</div>')
      }

      if($('#txtEmail2').val() == ''){
        check++
        $('#txtEmail2').addClass('is-invalid')
        $('#txtEmail2').parent().append('<div class="invalid-feedback text-right">Please enter e-mail address</div>')
      }

      if($('#txtPhone2').val() == ''){
        check++
        $('#txtPhone2').addClass('is-invalid')
        $('#txtPhone2').parent().append('<div class="invalid-feedback text-right">Please enter phone number</div>')
      }

      if(!isEmail($('#txtEmail2').val())){
        check++
        $('#txtEmail2').addClass('is-invalid')
        $('#txtEmail2').parent().append('<div class="invalid-feedback text-right">Invalid e-mail pattern</div>')
      }
    }



    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      prefix: $('#txtPrefix').val(),
      fname: $('#txtFname').val(),
      lname: $('#txtLname').val(),
      email: $('#txtEmail').val(),
      phone: $('#txtPhone').val(),
      role: $('#txtRole').val(),
      exp: $('#txtExp').val(),
      interest: $('#txtInterest').val(),
      uid: current_user
    }

    if(stage == '1'){
      param = {
        cuid: $('#txtUID').val(),
        prefix: $('#txtPrefix2').val(),
        fname: $('#txtFname2').val(),
        lname: $('#txtLname2').val(),
        email: $('#txtEmail2').val(),
        phone: $('#txtPhone2').val(),
        role: $('#txtRole2').val(),
        exp: $('#txtExp2').val(),
        interest: $('#txtInterest2').val(),
        uid: current_user
      }
    }

    console.log(param);
    var jxr = $.post(ws_url + 'register_staff.php', param, function(){})
               .always(function(snap){
                 console.log(snap);
                 if(snap == 'Y'){
                   // Send email to registra
                   setTimeout(function(){
                     window.location.reload()
                   }, 1000)
                 }else if(snap == 'D'){
                   alert('Duplicate')
                   preload.hide()
                 }else{
                   alert('Error')
                   preload.hide()
                 }
               })
               .fail(function(){
                 alert('Fail')
                 preload.hide()
               })
  }
}


function updateStaff(id){

  preload.show()

  $('#txtUID').val(id)
  $('#updatestaffbtn').trigger('click')

  var param = {
    uid: id
  }

  var jxr = $.post(ws_url + 'get-staff-info.php', param, function(){}, 'json')
             .always(function(snap){
               if(fnc.checksnap(snap)){
                 console.log(snap);
                 snap.forEach(function(i){
                  $('#txtPrefix2').val(i.prefix)
                  $('#txtFname2').val(i.fname)
                  $('#txtLname2').val(i.lname)
                  $('#txtEmail2').val(i.email)
                  $('#txtPhone2').val(i.phone)
                  $('#txtRole2').val(i.role)
                  $('#txtExp2').val(i.expertise)
                  $('#txtInterest2').val(i.interest)
                 })
                 preload.hide()
               }else{
                 alert('Fail')
                 preload.hide()
               }
             })
}

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
                   })
                 }
               })
  },
  load_student: function(){
    var jxr = $.post(ws_url + 'get-student.php', function(){}, 'json')
               .always(function(snap){

                 if(fnc.checksnap(snap)){
                   $msc = 0
                   $phd = 0
                   $sc = 0

                   $('.table_response').empty()
                   snap.forEach(function(i){

                     $status_a = '<span class="text-success">Active</span>'
                     $status_b = '<span class="text-success">Allow</span>'

                     if(i.s_degree == 'msc'){
                       $msc++;
                     }else if(i.s_degree == 'phd'){
                       $phd++;
                     }else if(i.s_degree == 'sc'){
                       $sc++;
                     }

                     $data = '<tr>' +
                                '<td>' + i.s_student_id + '</td>' +
                                '<td>' + i.prefix_name + i.fname + ' ' + i.lname +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="View info" onclick="sis.manage_page_student(\'' + i.uid + '\',\'student-information.html\')"><i class="fas fa-search"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Edit info"><i class="fas fa-pencil-alt"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Manage"><i class="fas fa-cogs"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Send e-mail"><i class="far fa-comment"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Send message"><i class="fas fa-envelope"></i></button>' +
                                    '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Delete" onclick="sis.delete_student(\'' + i.uid + '\',\'' + i.s_student_id + '\')"><i class="fas fa-trash"></i></button>' +
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

                   $('.numMSC').text($msc)
                   $('.numPHD').text($phd)
                   $('.numSC').text($sc)
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
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fas fa-pencil-alt"></i></button>' +
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
                   $('#txtPrefix').empty()
                   $('#txtPrefix').append('<option value="">-- Choose name prefix --</option>')
                   snap.forEach(function(i){
                     $data = '<option value="' + i.prefix_id + '">' + i.prefix_name + '</option>'
                     $('#txtPrefix').append($data)
                   })
                 }
               })
  },
  create_staff: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

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

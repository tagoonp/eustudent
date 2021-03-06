var current_user = window.localStorage.getItem(local_prefix + 'uid')
var current_role = window.localStorage.getItem(local_prefix + 'role')

var sis = {
  load_advise_student: function(){

    preload.show()

    var param = {
      uid: current_user
    }

    console.log(param);

    var jxr = $.post(ws_url + 'teacher/get-advised-student.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $('#table_1').empty()
                   snap.forEach(function(i){

                     $pg1 = '<button class="btn btn-light mr-5">P/E</button>'
                     $pg2 = '<button class="btn btn-light mr-5">E.C.</button>'
                     $pg3 = '<button class="btn btn-light mr-5">Q/E</button>'
                     $pg4 = '<button class="btn btn-light mr-5">T/E</button>'
                     $pg5 = '<button class="btn btn-light mr-5">Com</button>'
                     $pg6 = '<button class="btn btn-light mr-5">Pub</button>'
                     $pg7 = '<button class="btn btn-light mr-5">Eng</button>'

                     if(i.epa_p2_ec == 'un-monitor'){
                       $pg2 = '<button class="btn btn-secondary mr-5" disabled>E.C.</button>'
                     }

                     if(i.epa_p3_qe == 'un-monitor'){
                       $pg3 = '<button class="btn btn-secondary mr-5" disabled>Q/E</button>'
                     }

                     if(i.epa_p5_com == 'un-monitor'){
                       $pg5 = '<button class="btn btn-secondary mr-5" disabled>Com</button>'
                     }

                     $data = '<tr>' +
                                '<td>' + i.fname + ' ' + i.lname + '<div class="" style="font-size: 0.8em;">Student ID : ' + i.s_student_id + '</div>' +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-square btn-primary btn-sm mr-5" onclick="sis.manage_page_student(\'' + i.uid + '\',\'student-information.html\')"><i class="fas fa-search"></i></button>' +
                                    // '<button class="btn btn-square btn-primary btn-sm mr-5"><i class="fas fa-chart-line"></i></button>' +
                                    '<button class="btn btn-square btn-primary btn-sm mr-5"><i class="fas fa-envelope"></i></button>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + $pg1 + $pg2 + $pg3 + $pg4 + $pg5 + $pg6 + $pg7 + '</td>' +
                             '</tr>'
                     $('#table_1').append($data)
                   })
                   preload.hide()
                 }else {
                   console.log(snap);
                 }
               })
  },
  save_progress_1: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP1TitleEn').val() == ''){
      check++
      $('#txtP1TitleEn').addClass('is-invalid')
    }

    if($('#txtP1Date').val() == ''){
      check++
      $('#txtP1Date').addClass('is-invalid')
    }

    if(check != 0){
      return ;
    }

    preload.show()

    var param = {
      e1_id: $('#txtE1id').val(),
      student_uid: current_student,
      title_en: $('#txtP1TitleEn').val(),
      title_th: $('#txtP1TitleTh').val(),
      exam_date: $('#txtP1Date').val(),
      desc: $('#txtP1Desc').val(),
      uid: current_user,
      progress_id: 1
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_2: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP2REC').val() == ''){
      check++
      $('#txtP2REC').addClass('is-invalid')
    }

    if($('#txtP2Type').val() == ''){
      check++
      $('#txtP2Type').addClass('is-invalid')
    }

    if($('#txtP2TitleEn').val() == ''){
      check++
      $('#txtP2TitleEn').addClass('is-invalid')
    }

    if($('#txtP2Date').val() == ''){
      check++
      $('#txtP2Date').addClass('is-invalid')
    }

    if(check != 0){
      return ;
    }

    preload.show()

    $c1 = 0
    $c2 = 0

    if ($('#ec_notify_1').is(':checked')){
      $c1 = 1
    }

    if ($('#ec_notify_2').is(':checked')){
      $c2 = 1
    }

    var param = {
      eid: $('#txtE2id').val(),
      student_uid: current_student,
      rec: $('#txtP2REC').val(),
      type: $('#txtP2Type').val(),
      title: $('#txtP2TitleEn').val(),
      exam_date: $('#txtP2Date').val(),
      desc: $('#txtP2Desc').val(),
      // notify_1: ,
      // notify_2: ,
      uid: current_user,
      progress_id: 2
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_3: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP3TitleEn').val() == ''){
      check++
      $('#txtP3TitleEn').addClass('is-invalid')
    }

    if($('#txtP3Date').val() == ''){
      check++
      $('#txtP3Date').addClass('is-invalid')
    }

    if(check != 0){
      return ;
    }

    preload.show()

    var param = {
      e1_id: $('#txtE3id').val(),
      student_uid: current_student,
      title: $('#txtP3TitleEn').val(),
      exam_date: $('#txtP3Date').val(),
      desc: $('#txtP3Desc').val(),
      uid: current_user,
      progress_id: 3
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_4: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP4TitleEn').val() == ''){
      check++
      $('#txtP4TitleEn').addClass('is-invalid')
    }

    if($('#txtP4Date').val() == ''){
      check++
      $('#txtP4Date').addClass('is-invalid')
    }

    if(check != 0){
      return ;
    }

    preload.show()

    var param = {
      e1_id: $('#txtE4id').val(),
      student_uid: current_student,
      title_en: $('#txtP4TitleEn').val(),
      title_th: $('#txtP4TitleTh').val(),
      exam_date: $('#txtP4Date').val(),
      desc: $('#txtP4Desc').val(),
      uid: current_user,
      progress_id: 4
    }


    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_5: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP5Date').val() == ''){
      check++
      $('#txtP5Date').addClass('is-invalid')
    }

    if($('#txtP5Desc').val() == ''){
      check++
      $('#txtP5Desc').addClass('is-invalid')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      eid: $('#txtE5id').val(),
      exam_date: $('#txtP5Date').val(),
      desc: $('#txtP5Desc').val(),
      uid: current_user,
      student_uid: current_student,
      progress_id: 5
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_6: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP6Title').val() == ''){
      check++
      $('#txtP6Title').addClass('is-invalid')
    }

    if($('#txtP6Publisher').val() == ''){
      check++
      $('#txtP6Publisher').addClass('is-invalid')
    }

    if($('#txtP6Date').val() == ''){
      check++
      $('#txtP6Date').addClass('is-invalid')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      eid: $('#txtE6id').val(),
      title: $('#txtP6Title').val(),
      publishername: $('#txtP6Publisher').val(),
      exam_date: $('#txtP6Date').val(),
      desc: $('#txtP6Desc').val(),
      uid: current_user,
      student_uid: current_student,
      progress_id: 6
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  save_progress_7: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtP7Score').val() == ''){
      check++
      $('#txtP7Score').addClass('is-invalid')
      $('#txtP7Score').parent().append('<div class="invalid-feedback text-right">Please enter score</div>')
    }

    if($('#txtP7Name').val() == ''){
      check++
      $('#txtP7Name').addClass('is-invalid')
      $('#txtP7Name').parent().append('<div class="invalid-feedback text-right">Please enter test name</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      e7_id: $('#txtE7id').val(),
      score: $('#txtP7Score').val(),
      testname: $('#txtP7Name').val(),
      desc: $('#txtP7Desc').val(),
      uid: current_user,
      student_uid: current_student,
      progress_id: 7
    }

    var jxr = $.post(ws_url + 'register_student_progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   // preload.hide()
                   // sis.load_progress(7)
                   window.location.reload()
                 }else{
                   preload.hide()
                   alert('Fail')
                 }
               })
               .fail(function(){
                 preload.hide()
                 alert('Fail')
               })
  },
  setProgressUncjeck: function(id){
    var r = confirm("Confirm to un-monitor this progress!");
    if (r == true) {

      var param = {
        progress_id: id,
        student_uid: current_student,
        uid: current_user
      }

      preload.show()

      var jxr = $.post(ws_url + 'update-progress-un-monitor.php', param, function(){})
                 .always(function(resp){
                   console.log(resp);
                   if(resp == 'Y'){
                     alert('Update success')
                     window.location.reload()
                   }else{
                     alert('Fail')
                     preload.hide()
                   }
                 })
                 .fail(function(){
                   preload.hide()
                 })
    }
  },
  setProgressPass: function(id){

    var r = confirm("Confirm to change this progress status pass!");

    if (r == true) {

      var param = {
        progress_id: id,
        student_uid: current_student,
        uid: current_user
      }

      preload.show()

      var jxr = $.post(ws_url + 'update-progress-pass.php', param, function(){})
                 .always(function(resp){
                   if(resp == 'Y'){
                     alert('Update success')
                     window.location.reload()
                   }else{
                     alert('Fail')
                     preload.hide()
                   }
                 })
                 .fail(function(){
                   alert('Fail')
                   preload.hide()
                 })
    }
  },
  check_progress_all: function(){
    var param = {
      student_uid: current_student
    }
    var jxr = $.post(ws_url + 'get-student-progress-all.php', param, function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){

                     if(i.epa_p2_ec == 'un-monitor'){
                       $('#progress_2').html('Not monitor this progress')
                       $('#progress_2_btn').addClass('dn')
                     }

                     if(i.epa_p3_qe == 'un-monitor'){
                       $('#progress_3').html('Not monitor this progress')
                       $('#progress_3_btn').addClass('dn')
                     }

                     if(i.epa_p5_com == 'un-monitor'){
                       $('#progress_5').html('Not monitor this progress')
                       $('#progress_5_btn').addClass('dn')
                     }
                   })
                 }
               })
  },
  load_progress: function(id){
    var param = {
      student_uid: current_student,
      progress_id: id
    }
    var jxr = $.post(ws_url + 'get-student-progress.php', param, function(){}, 'json')
               .always(function(snap){

                 $extra_class = ''
                 if(current_role == 'student'){
                   $extra_class = ' dn '
                 }
                 if(fnc.checksnap(snap)){
                   if(id == '1'){
                     $('#progress_1').empty()
                     $c = 1
                     snap.forEach(function(i){
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data = '<div class="row">' +
                                  '<div class="col-sm-3 font-bold">Title (English) :</div>' +
                                  '<div class="col-sm-9">' + i.pg1_title_en + '</div>' +
                               '</div>' +
                               '<div class="row">' +
                                          '<div class="col-sm-3 font-bold">Title (Thai) :</div>' +
                                          '<div class="col-sm-9">' + blank_value(i.pg1_title_th) + '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Examination date :</div>' +
                                           '<div class="col-sm-3">' + i.pg1_examdate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg1_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg1_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-1" onclick="editProgress_1(\'' + i.pg1_id + '\', \'' + i.pg1_title_en + '\', \'' + i.pg1_title_th + '\', \'' + i.pg1_remark + '\', \'' + i.pg1_examdate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg1_id + '\', 1)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_1').append($data)
                       $c++;
                     })
                   }

                   if(id == '2'){
                     $('#progress_2').empty()
                     $c = 1
                     snap.forEach(function(i){
                       console.log(i);
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data = '<div class="row">' +
                                  '<div class="col-sm-3 font-bold">REC. :</div>' +
                                  '<div class="col-sm-3">' + i.pg2_rec + '</div>' +
                                  '<div class="col-sm-3 font-bold">Type :</div>' +
                                  '<div class="col-sm-3">' + i.pg2_type + '</div>' +
                               '</div>' +
                               '<div class="row">' +
                                          '<div class="col-sm-3 font-bold">Title:</div>' +
                                          '<div class="col-sm-9">' + blank_value(i.pg2_title) + '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Approval date :</div>' +
                                           '<div class="col-sm-3">' + i.pg2_approvaldate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg2_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg2_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-2" onclick="editProgress_2(\'' + i.pg2_id + '\', \'' + i.pg2_rec + '\', \'' + i.pg2_type + '\', \'' + i.pg2_title + '\', \'' + i.pg2_remark + '\', \'' + i.pg2_approvaldate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg2_id + '\', 2)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_2').append($data)
                       $c++;
                     })
                   }

                   if(id == '3'){
                     $('#progress_3').empty()
                     $c = 1
                     snap.forEach(function(i){
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data = '<div class="row">' +
                                  '<div class="col-sm-3 font-bold">Title :</div>' +
                                  '<div class="col-sm-9">' + i.pg3_title + '</div>' +
                               '</div>' +
                                '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Examination date :</div>' +
                                           '<div class="col-sm-3">' + i.pg3_examdate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg3_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg3_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-3" onclick="editProgress_3(\'' + i.pg3_id + '\', \'' + i.pg3_title + '\', \'' + i.pg3_remark + '\', \'' + i.pg3_examdate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg3_id + '\', 3)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_3').append($data)
                       $c++;
                     })
                   }

                   if(id == '4'){
                     $('#progress_4').empty()
                     $c = 1
                     snap.forEach(function(i){
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data = '<div class="row">' +
                                  '<div class="col-sm-3 font-bold">Title (English) :</div>' +
                                  '<div class="col-sm-9">' + i.pg4_title_en + '</div>' +
                               '</div>' +
                               '<div class="row">' +
                                          '<div class="col-sm-3 font-bold">Title (Thai) :</div>' +
                                          '<div class="col-sm-9">' + blank_value(i.pg4_title_th) + '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Examination date :</div>' +
                                           '<div class="col-sm-3">' + i.pg4_examdate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg4_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg4_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-4" onclick="editProgress_4(\'' + i.pg4_id + '\', \'' + i.pg4_title_en + '\', \'' + i.pg4_title_th + '\', \'' + i.pg4_remark + '\', \'' + i.pg4_examdate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg4_id + '\', 4)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_4').append($data)
                       $c++;
                     })
                   }

                   if(id == '5'){
                     $('#progress_5').empty()
                     $c = 1
                     snap.forEach(function(i){
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data =  '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Acception date :</div>' +
                                           '<div class="col-sm-3">' + i.pg5_examdate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg5_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg5_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-5" onclick="editProgress_5(\'' + i.pg5_id + '\', \'' + i.pg5_remark + '\', \'' + i.pg5_examdate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg5_id + '\', 5)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_5').append($data)
                       $c++;
                     })
                   }

                   if(id == '6'){
                     $('#progress_6').empty()
                     $c = 1
                     snap.forEach(function(i){
                       $hr = '<div class="row">' +
                                  '<div class="col-sm-12"><hr></div>' +
                        '</div>'
                       if($c == snap.length){
                         $hr = ''
                       }
                       $data = '<div class="row">' +
                                  '<div class="col-sm-3 font-bold">Title :</div>' +
                                  '<div class="col-sm-9">' + i.pg6_title + '</div>' +
                               '</div>' +
                               '<div class="row">' +
                                          '<div class="col-sm-3 font-bold">Publisher :</div>' +
                                          '<div class="col-sm-9">' + blank_value(i.pg6_publisher) + '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                           '<div class="col-sm-3 font-bold">Acception date :</div>' +
                                           '<div class="col-sm-3">' + i.pg6_acceptdate + '</div>' +
                                           '<div class="col-sm-3 font-bold">Update date :</div>' +
                                           '<div class="col-sm-3">' + i.pg6_udate + '</div>' +
                                 '</div>' +
                                 '<div class="row">' +
                                            '<div class="col-sm-3 font-bold">Description / Remark :</div>' +
                                            '<div class="col-sm-9">' + blank_value(i.pg6_remark) + '</div>' +
                                  '</div>' +
                                  '<div class="row ' + $extra_class + '">' +
                                      '<div class="col-sm-12 pt-10">' +
                                        '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-6" onclick="editProgress_6(\'' + i.pg6_id + '\', \'' + i.pg6_title + '\', \'' + i.pg6_publisher + '\', \'' + i.pg6_remark + '\', \'' + i.pg6_acceptdate + '\')"><i class="fas fa-pencil-alt"></i></button>' +
                                        '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5"  onclick="deleteProgress(\'' + i.pg6_id + '\', 6)"><i class="fas fa-trash"></i></button>' +
                                      '</div>' +
                                   '</div>' +
                                  $hr
                       $('#progress_6').append($data)
                       $c++;
                     })
                   }

                   if(id == '7'){
                     $('#progress_7').empty()
                     snap.forEach(function(i){
                       $data = '<tr style="background: #fff;">' +
                                  '<td>' + i.ep7_test_name + ' : Score ' + i.ep7_score + '<div style="font-size: 0.8em;">Description: ' + blank_value(i.ep7_info) + '</div><div style="font-size: 0.8em;">Update date: ' + i.ep7_udate + '</div></td>' +
                                  '<td class="text-right  ' + $extra_class + '" style="width: 200px;">' +
                                    '<a class="btn btn-secondary btn-square btn-sm text-light ml-5"  data-toggle="modal" data-target=".bs-example-modal-lg-info-progress-english" onclick="editProgress(\'' + i.ep7_id + '\', 7, \'' + i.ep7_test_name + '\', \'' + i.ep7_score + '\', \'' + i.ep7_info + '\')"><i class="fas fa-pencil-alt"></i></a>' +
                                    '<a class="btn btn-danger btn-square btn-sm text-light ml-5"  onclick="deleteProgress(\'' + i.ep7_id + '\', 7)"><i class="fas fa-trash"></i></a>' +
                                  '</td>' +
                               '</tr>'
                       $('#progress_7').append($data)
                     })
                   }
                 }else{
                   if(id == '1'){
                     $('#progress_1').empty()
                     $('#progress_1').append('No proposal information.')
                   }
                   if(id == '4'){
                     $('#progress_4').empty()
                     $('#progress_4').append('No proposal information.')
                   }
                   if(id == '7'){
                     $('#progress_7').empty()
                     $('#progress_7').append('<tr style="background: #fff;"><td colspan="2">No record found</td></tr>')
                   }
                 }
               })
  },
  save_scho: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtScholarship').val() == ''){
      check++
      $('#txtScholarship').addClass('is-invalid')
      $('#txtScholarship').parent().append('<div class="invalid-feedback text-right">Please enter scholarship name here</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      scholarship: $('#txtScholarship').val(),
      uid: current_user,
      student_uid: current_student,
      ess_id: $('#txtEssid').val()
    }

    var jxr = $.post(ws_url + 'register_student_scho.php', param, function(){})
               .always(function(snap){
                 console.log(snap);
                 if(snap == 'Y'){
                   // Send email to registra

                   $('.btnCloseModal').trigger('click')
                   setTimeout(function(){
                     preload.hide()
                     sis.load_student_sholar_list()
                     // alert('Add scholarship success!')
                     // window.location.reload()
                   }, 1000)
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
  save_advisor: function(){
    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtAdvisor').val() == ''){
      check++
      $('#txtAdvisor').addClass('is-invalid')
      $('#txtAdvisor').parent().append('<div class="invalid-feedback text-right">Please choose advisor name</div>')
    }

    if($('#txtAdvisorStatus').val() == ''){
      check++
      $('#txtAdvisorStatus').addClass('is-invalid')
      $('#txtAdvisorStatus').parent().append('<div class="invalid-feedback text-right">Please choose advisor status</div>')
    }



    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      advisor_uid: $('#txtAdvisor').val(),
      advisor_status: $('#txtAdvisorStatus').val(),
      uid: current_user,
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'register_student_advisor.php', param, function(){})
               .always(function(snap){
                 if(snap == 'Y'){
                   // Send email to registra
                   setTimeout(function(){
                     alert('Add advisor success!')
                     window.location.reload()
                   }, 1000)
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
  load_student_sholar_list: function(){
    var param = {
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'get-student-scholar-list.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $('.table_response_scholarship').empty()
                   snap.forEach(function(i){


                     if(current_role == 'student'){
                       $data = '<tr>' +
                                  '<td><span class="font-bold txt-dark">' + i.ess_scholarship_name + '</span></td>' +
                               '</tr>'
                     }else{
                       $data = '<tr>' +
                                  '<td><span class="font-bold txt-dark">' + i.ess_scholarship_name + '</span></td>' +
                                  '<td class="text-right">' +
                                    '<a class="btn btn-secondary btn-square btn-sm text-light ml-5"  data-toggle="modal" data-target=".bs-example-modal-lg-info-1" onclick="setFundId(\'' + i.ess_id + '\', \'' + i.ess_scholarship_name + '\')"><i class="far fa-edit"></i></a>' +
                                    '<a class="btn btn-danger btn-square btn-sm text-light ml-5" onclick="deleteFundId(\'' + i.ess_id + '\')"><i class="far fa-times-circle"></i></a>' +
                                  '</td>' +
                               '</tr>'
                     }

                     $('.table_response_scholarship').append($data)
                   })
                 }else{
                   $('.table_response_scholarship').empty()
                    $('.table_response_scholarship').append('<tr><td>No Scholarships</td></tr>')
                 }
               })
  },
  load_student_advisor_list: function(){

    var param = {
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'get-student-advisor-list.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $('.table_response_adv').empty()
                   snap.forEach(function(i){
                     if(current_role == 'student'){
                       $data = '<tr>' +
                                  '<td><span class="font-bold txt-dark">' + i.prefix_name + i.fname + ' ' + i.lname + '</span><br>' + i.adv_status + '</td>' +
                               '</tr>'
                     }else{
                       $data = '<tr>' +
                                  '<td><span class="font-bold txt-dark">' + i.prefix_name + i.fname + ' ' + i.lname + '</span><br>' + i.adv_status + '</td>' +
                                  '<td class="text-right"><a class="btn btn-danger btn-square btn-sm text-light"><i class="far fa-times-circle"></i></a></td>' +
                               '</tr>'
                     }

                     $('.table_response_adv').append($data)
                   })
                 }
               })
  },
  load_advisor_list: function(){
    var jxr = $.post(ws_url + 'get-advisor-list.php', function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   $('#txtAdvisor').empty()
                   $('#txtAdvisor').append('<option value="">-- Choose name prefix --</option>')
                   snap.forEach(function(i){
                     $data = '<option value="' + i.uid + '">' + i.prefix_name +  i.fname + ' ' + i.lname + '</option>'
                     $('#txtAdvisor').append($data)
                   })
                 }
               })
  },
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
  update_student_2: function(){
    preload.show()

    var param = {
      student_uid: current_student,
      pid: $('#pid').val(),
      pid_issue: $('#pid_issue').val(),
      pid_exp: $('#pid_exp').val(),
      passport: $('#passport').val(),
      passport_issue: $('#passport_issue').val(),
      passport_exp: $('#passport_exp').val(),
      visa: $('#visa').val(),
      visa_issue: $('#visa_issue').val(),
      visa_exp: $('#visa_exp').val(),
      uid: current_user
    }

    var jxr = $.post(ws_url + 'update-student-info-2.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   alert('Update success')
                   window.location.reload()
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
  update_student_3: function(){

    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtEmailaddress').val() == ''){
      check++
      $('#txtEmailaddress').addClass('is-invalid')
    }

    if($('#txtCountry').val() == ''){
      check++
      $('#txtCountry').addClass('is-invalid')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      student_uid: current_student,
      email: $('#txtEmailaddress').val(),
      phone: $('#txtPhone1').val(),
      home_addr: $('#txtHomeaddr').val(),
      home_country: $('#txtCountry').val(),
      home_phone: $('#txtPhone2').val(),
      wp_name: $('#txtWPname').val(),
      wp_addr: $('#txtWpaddr').val(),
      wp_phone: $('#txtPhone3').val(),
      uid: current_user
    }

    var jxr = $.post(ws_url + 'update-student-info-3.php', param, function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   $('.btnCloseModal').trigger('click')
                   preload.hide()
                   alert('Update success')
                   window.location.reload()
                 }else if(resp == 'D'){
                   preload.hide()
                   alert('Dupicate email address, please use another e-mail address')
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
  load_student_info_2: function(){
    var param = {
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'get-student-info-chart.php', param, function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.checksnap(snap)){
                   $('#table1_chart').empty()
                   snap.forEach(function(i){
                     // $('.txt_student_id').text(i.s_student_id)
                     // $('.txt_student_fullname').text(i.prefix_name + ' ' + i.fname + ' ' + i.lname)
                     // $('.txt_student_degree').text(i.degree_name)
                     // $('.txt_student_start_year').text(i.s_start_year)
                     // $('.txt_student_status').text(i.s_status)
                     // $('.txt_student_email').text(i.email)
                     //
                     // $('#txtStudentID').val(i.s_student_id)
                     // $('#txtStartyear').val(i.s_start_year)
                     // $('#txtPrefix').val(i.prefix_id)
                     // $('#txtDegree').val(i.degree_id)
                     // $('#txtFname').val(i.fname)
                     // $('#txtLname').val(i.lname)

                     // $('#start_date').text(i.eye_start_date)
                     $data = '<tr>' +
                                '<td>' + i.eye_start_date + '</td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '<td>' + blank_value(i.s_grad_date) + '</td>' +
                              '</tr>'
                     $('#table1_chart').append($data)
                   })
                 }
               })
  },
  load_student_info: function(){
    var param = {
      student_uid: current_student
    }

    console.log(param);

    var jxr = $.post(ws_url + 'get-student-info.php', param, function(){}, 'json')
               .always(function(snap){

                 console.log(snap);

                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){
                     $('.txt_student_id').text(i.s_student_id)
                     $('.txt_student_fullname').text(i.prefix_name + ' ' + i.fname + ' ' + i.lname)
                     $('.txt_student_degree').text(i.degree_name)
                     $('.txt_student_start_year').text(i.s_start_year)
                     $('.txt_student_status').text(i.s_status)
                     $('.txt_student_email').text(i.email)
                     // $('.userEmail').text(i.email)
                     $('.txt_student_phone').text(blank_value(i.phone))

                     $('#txtStudentID').val(i.s_student_id)
                     $('#txtStartyear').val(i.s_start_year)
                     $('#txtPrefix').val(i.prefix_id)
                     $('#txtDegree').val(i.degree_id)
                     $('#txtFname').val(i.fname)
                     $('#txtLname').val(i.lname)

                     $('#txtEmailaddress').val(i.email)
                     $('#txtPhone1').val(i.phone)

                   })
                 }
               })
  },
  load_student_contact_info: function(){
    var param = { student_uid: current_student }
    var jxr = $.post(ws_url + 'get-student-contact-info.php', param, function(){}, 'json')
               .always(function(snap){

                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){
                     $('.txt_student_w_name').text(blank_value(i.eci_wp_name))
                     $('.txt_student_w_name').val(i.eci_wp_name)

                     $('.txt_student_w_address').text(blank_value(i.eci_wp_addr))
                     $('.txt_student_w_address').val(i.eci_wp_addr)

                     $('.txt_student_w_phone').text(blank_value(i.eci_wp_phone))
                     $('.txt_student_w_phone').val(i.eci_wp_phone)

                     $('.txt_student_h_address').text(blank_value(i.eci_home_addr))
                     $('.txt_student_h_address').val(i.eci_home_addr)

                     $('.txt_student_h_country').text(blank_value(i.eci_home_country))
                     $('#txtCountry').val(i.eci_home_country)

                     $('.txt_student_h_phone').text(blank_value(i.eci_home_phone))
                     $('.txt_student_h_phone').val(i.eci_home_phone)

                   })
                 }
               })
  },
  load_student_immigration_info: function(){
    var param = {
      student_uid: current_student
    }

    var jxr = $.post(ws_url + 'get-student-immigration-info.php', param, function(){}, 'json')
               .always(function(snap){

                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){
                     $('.txt_student_pid_id').text(blank_value(i.em_pid))
                     $('.txt_student_pid_id').val(i.em_pid)

                     $('.txt_student_pid_iss').text(blank_date(i.em_pid_issue, '-'))
                     $('.txt_student_pid_iss').val(blank_date(i.em_pid_issue, ''))

                     $('.txt_student_pid_exp').text(blank_date(i.em_pid_expire, '-'))
                     $('.txt_student_pid_exp').val(blank_date(i.em_pid_expire, ''))

                     $('.txt_student_visa_id').text(blank_value(i.em_visa))
                     $('.txt_student_visa_id').val(blank_date(i.em_visa, ''))

                     $('.txt_student_visa_iss').text(blank_date(i.em_visa_issue, '-'))
                     $('.txt_student_visa_iss').val(blank_date(i.em_visa_issue, ''))

                     $('.txt_student_visa_exp').text(blank_date(i.em_visa_expire, '-'))
                     $('.txt_student_visa_exp').val(blank_date(i.em_visa_expire, ''))

                     $('.txt_student_passport_id').text(blank_value(i.em_passport))
                     $('.txt_student_passport_id').val(i.em_passport)

                     $('.txt_student_passport_iss').text(blank_date(i.em_passport_issue, '-'))
                     $('.txt_student_passport_iss').val(blank_date(i.em_passport_issue, ''))

                     $('.txt_student_passport_exp').text(blank_date(i.em_passport_expire, '-'))
                     $('.txt_student_passport_exp').val(blank_date(i.em_passport_expire, ''))

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
  set_complaint_info: function(cid, title, content){
    $('#comp_title').html(title)
    $('#comp_info').html(content)
    var param = {
      ecm_id: cid,
      uid: current_user
    }
    var jxr = $.post(ws_url + 'set_complaint_read.php', param, function(){})
               .always(function(resp){ console.log(resp); })
  },
  delete_complaint: function(cid){
    var r = confirm("Confirm to delete this complaint record!");
    if (r == true) {
      var param = {
        ess_id: cid
      }
      var jxr = $.post(ws_url + 'delete-complaint.php', param, function(){})
                 .always(function(resp){
                   if(resp == 'Y'){

                   }else{

                   }
                 })
    }
  },
  load_complaint: function(){

    preload.show()
    if(start_row == 0){
      $('.ppage').attr('disabled', 'disabled')
    }else{
      $('.ppage').attr('disabled', false)
    }
    var param = {
      start: start_row,
      lpp: limit_per_page,
      uid: current_user
    }
    var jxr = $.post(ws_url + 'get-complaint.php', param, function(){}, 'json')
               .always(function(snap){
                 $('.table_response').empty()

                 if(fnc.checksnap(snap)){
                   if(snap.length <= 10){
                     $('.npage').attr('disabled', 'disabled')
                   }
                   $c = 1;
                   snap.forEach(function(i){

                     $new_status = '<span style="background: red; padding: 5px; font-size: 0.8; margin-right: 10px;" class="txt-light">New</span>'

                     if(i.read_status == 'Y'){
                       $new_status = ''
                     }

                     $status_a = '<span class="text-success">Active</span>'
                     $status_b = '<span class="text-success">Allow</span>'

                     $data = '<tr>' +
                                '<td>' + $c + '</td>' +
                                '<td><span class="font-bold">' + i.ecm_title + '</span>' +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="modal" data-target=".bd-example-modal-lg-complaint-info" onclick="sis.set_complaint_info(\'' + i.ecm_id + '\',\'' + i.ecm_title + '\', \'' + i.ecm_content + '\')"><i class="fas fa-search"></i></button>' +
                                    // '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Delete" onclick="sis.delete_complaint(\'' + i.ecm_id + '\')"><i class="fas fa-trash"></i></button>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + i.ecm_udate + '</td>' +
                                '<td>' + $new_status + '</td>' +
                             '</tr>'
                     $('.table_response').append($data)
                     $c++;
                   })

                   $('[data-toggle="tooltip"]').tooltip()
                   preload.hide()
                 }else{
                   $data = '<tr><td colspan="5">No student found</td></tr>'
                   $('.table_response').append($data)
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

                 console.log(snap);

                 $('.table_response').empty()

                 if(fnc.checksnap(snap)){
                   snap.forEach(function(i){

                     $status_a = '<span class="text-success">Active</span>'
                     $status_b = '<span class="text-success">Allow</span>'

                     $data = '<tr>' +
                                '<td>' + i.s_student_id + '</td>' +
                                '<td>' + i.prefix_name + i.fname + ' ' + i.lname +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="View and update info" onclick="sis.manage_page_student(\'' + i.uid + '\',\'student-information.html\')"><i class="fas fa-search"></i></button>' +
                                    // '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Edit info"><i class="fas fa-pencil-alt"></i></button>' +
                                    '<button class="btn btn-secondary btn-icon-anim btn-square btn-sm mr-5 mb-5" data-toggle="tooltip" data-placement="top" title="Report"><i class="fas fa-chart-line"></i></button>' +
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


function setFundId(id, name){
  $('#txtEssid').val(id)
  $('#txtScholarship').val(name)
}

function deleteFundId(id){
  var r = confirm("Confirm to do this operation!");
  if (r == true) {
    var param = {
      ess_id: id,
      student_uid: current_student
    }

    preload.show()

    var jxr = $.post(ws_url + 'delete-scholar.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   // alert('Delete success')
                   preload.hide()
                   $('#txtEssid').val('')
                   $('#txtScholarship').val('')
                   sis.load_student_sholar_list()
                 }else{
                   alert('Fail')
                   preload.hide()
                 }
               })
               .fail(function(){
                 alert('Fail')
                 preload.hide()
               })
  }
}

function editProgress_1(id, en, th, remark, edate){
  $('#txtE1id').val(id)
  $('#txtP1TitleEn').val(en)
  $('#txtP1TitleTh').val(th)
  $('#txtP1Desc').val(remark)
  $('#txtP1Date').val(edate)
}

function editProgress_2(id, rec, type, title, remark, edate){
  $('#txtE2id').val(id)
  $('#txtP2Type').val(type)
  $('#txtP2REC').val(rec)
  $('#txtP2TitleEn').val(title)
  $('#txtP2Desc').val(remark)
  $('#txtP2Date').val(edate)
}

function editProgress_3(id, en, remark, edate){
  $('#txtE3id').val(id)
  $('#txtP3TitleEn').val(en)
  $('#txtP3Desc').val(remark)
  $('#txtP3Date').val(edate)
}

function editProgress_4(id, en, th, remark, edate){
  $('#txtE4id').val(id)
  $('#txtP4TitleEn').val(en)
  $('#txtP4TitleTh').val(th)
  $('#txtP4Desc').val(remark)
  $('#txtP4Date').val(edate)
}

function editProgress_5(id, remark, edate){
  console.log('asd');
  $('#txtE5id').val(id)
  $('#txtP5Date').val(edate)
  $('#txtP5Desc').val(remark)
}

function editProgress_6(id, en, th, remark, edate){
  $('#txtE6id').val(id)
  $('#txtP6Title').val(en)
  $('#txtP6Publisher').val(th)
  $('#txtP6Date').val(edate)
  $('#txtP6Desc').val(remark)
}

function editProgress(record_id, progress, info_1, info_2, info_3){
  $('#txtE' + progress + 'id').val(record_id)
  if(progress == 7){
    $('#txtP7Score').val(info_2)
    $('#txtP7Name').val(info_1)
    $('#txtP7Desc').val(info_3)
  }
}

function deleteProgress(record_id, progress){
  var r = confirm("Confirm to do this operation!");
  if (r == true) {
    var param = {
      record: record_id,
      progress_id: progress,
      student_uid: current_student,
      uid: current_user
    }

    preload.show()

    var jxr = $.post(ws_url + 'delete-progress.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   preload.hide()
                   sis.load_progress(progress)
                 }else{
                   alert('Fail')
                   preload.hide()
                 }
               })
               .fail(function(){
                 alert('Fail')
                 preload.hide()
               })
  }
}

function blank_value(input){
  if((input == '') || (input == null)){
    return "-"
  }else{
    return input
  }
}

function blank_date(input, return_value){
  if((input == '') || (input == null) || (input == '0000-00-00')){
    return return_value
  }else{
    return input
  }
}

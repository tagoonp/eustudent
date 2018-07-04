var project = {
  create_project: function(){

    var check = 0;
    $('.form-control').removeClass('is-invalid')
    $('.invalid-feedback').remove()

    if($('#txtProjecttitlte').val() == ''){
      check++
      $('#txtProjecttitlte').addClass('is-invalid')
      $('#txtProjecttitlte').parent().append('<div class="invalid-feedback">Please enter project title here</div>')
    }

    if($('#txtSourcetype').val() == ''){
      check++
      $('#txtSourcetype').addClass('is-invalid')
      $('#txtSourcetype').parent().append('<div class="invalid-feedback">Please choose data source</div>')
    }

    if(check != 0){
      return false;
    }

    preload.show()

    var param = {
      title: $('#txtProjecttitlte').val(),
      description: $('#txtDesc').val(),
      datasource: $('#txtSourcetype').val(),
      uid: current_user
    }

    $('.btnCloseModal').trigger('click')
    $('#projectFailMsg').text('Can not create project')

    var jxr = $.post(ws_url + 'project/create_project.php', param, function(){})
               .always(function(snap){
                 if(snap == 'Y'){
                   $('#txtSourcetype').val('')
                   $('#txtProjecttitlte').val('')
                   $('#txtDesc').val('')
                   project.list_project()
                   setTimeout(function(){ $('#btnSuccessProject').trigger('click') }, 1000)
                 }else if(snap == 'D'){
                   preload.hide()
                   setTimeout(function(){ $('#btnFailProject').trigger('click') }, 1000)
                   $('#projectFailMsg').text('Duplicate project name!');
                 }else{
                   preload.hide()
                   setTimeout(function(){ $('#btnFailProject').trigger('click') }, 1000)
                   $('#projectFailMsg').text('Duplicate project name!');
                 }
               })
               .fail(function(){
                 preload.hide()
               })

  },
  list_project: function(){

    var param = {
      uid: current_user
    }

    var jxr = $.post(ws_url + 'project/list_project.php', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.checksnap(snap)){
                   console.log(snap);
                   $('.table_response').empty()
                   snap.forEach(function(i){
                     $data = '<tr>' +
                                '<td><a href="#" onclick="project.manage(\'' + i.project_key + '\')" class="font-bold">' + i.project_title + '</a>' +
                                  '<div class="fz08">' +
                                    i.project_desc +
                                  '</div>' +
                                  '<div class="pt-5">' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fas fa-pencil-alt"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Manage"><i class="fas fa-cogs"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Tag"><i class="fas fa-tag"></i></button>' +
                                    '<button class="btn btn-light btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Share"><i class="fas fa-share-alt"></i></button>' +
                                    '<button class="btn btn-danger btn-icon-anim btn-square btn-sm mr-5" data-toggle="tooltip" data-placement="top" title="Delete" onclick="project.delete_project(\'' + i.project_id + '\')"><i class="fas fa-trash"></i></button>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + fnc.convertEngdatetime(i.project_create_datetime) + '</td>' +
                                '<td>' + fnc.convertEngdatetime(i.project_lastmodify_datetime) + '</td>' +
                                '<td>0</td>' +
                             '</tr>'
                     $('.table_response').append($data)
                   })

                   $('[data-toggle="tooltip"]').tooltip()

                   setTimeout(function(){
                     preload.hide()

                   }, 1000)

                 }else{
                   $('.table_response').empty()
                   $data = '<tr><td colspan="4">No project found</td></tr>'
                   $('.table_response').append($data)
                   preload.hide()
                 }
               })
               .fail(function(){
                 preload.hide()
               })
  },
  delete_project: function(id){
    $('#btnDeleteProject').trigger('click')
    $('#projectID').text(id)
  },
  confirm_delete_project: function(){
    $('.btnCloseModal').trigger('click')
    var pj_id = $('#projectID').text()
    if(pj_id == ''){
      return ;
    }
    var param = {
      uid: current_user,
      project_id: pj_id
    }

    preload.show()

    var jxr = $.post(ws_url + 'project/delete_project.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   project.list_project()
                 }else{

                 }
               })
               .fail(function(){

               })
  }
}

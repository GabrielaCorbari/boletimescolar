var ngcurd={

	post: function(url, data, settings){

		var def = {
			success: undefined,
            error: undefined,
            successMsg: 'Success',
            errorMsg: 'Server error'
		}
        settings = $.extend(def, settings)

		$.blockUI({
            message: 'submiting...'
        })
		
        $.ajax(url,
        {
            data: data,
            method: 'POST',
            dataType: 'json',
            success: function(data){
               $.unblockUI()

                if (data && data.success) {
                    toastr.success(settings.successMsg)
                    if(settings.success){
                        settings.success()
                    }
                    
                } else if (data && data.msg) {
                    toastr.error(data.msg)
                    if(settings.error){
                        settings.error()
                    }
                } else {
                    toastr.error(settings.errorMsg)
                    if(settings.error){
                        settings.error()
                    }
                } 
            },
            error: function(err){
                $.unblockUI();
                if(settings.errorMsg){
                    toastr.error(settings.errorMsg)
                } else {
                    toastr.error(err)
                }
            }
        })

        //  data, {
        //     responseType: 'json'
        // }).success(function(data, status, headers, config) {
            

        // }).error(function(data, status, headers, config) {
            
        // })
	},

    confirm: function(settings){
        var def = {
            ok: undefined,
            cancel: undefined,
            title: 'Confirm',
            message: ''
        }
        settings = $.extend(def, settings)

        bootbox.dialog({
            title: settings.title,
            message: settings.message,
            buttons: {
                success: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: settings.cancel
                },
                ok: {
                    label: "OK",
                    className: "btn-primary",
                    callback: settings.ok
                }
            }
        })
    }
}
function SendMail() {
    if (validateForm()) {

        //var dt = new Date();
        //var timeZone = dt.toTimeString().substring(dt.toTimeString().indexOf('(') + 1, dt.toTimeString().lastIndexOf(')'));

        var subjectemail = 'Contact from Jack Henry CPS';
        var emailMessage;

        /* Wrap to center */
        emailMessage = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding-bottom: 30px; padding-top: 30px;"><tr><td>';
         /* Contact Header */
        emailMessage += '<table align="center" width="600" cellpadding="10" cellspacing="0" border="0" style="background: #FCFCFC; font-family: Arial, Helvetica, sans-serif; color: #56565a; font-size: 18px;"><tr><th>CPS Start Planning Now Form Submission</th><th align="left"></th></tr></table>';
        emailMessage += '</td></tr><tr><td>';

        /* Contact Info */
        emailMessage += '<table align="center" width="600" cellpadding="10" cellspacing="0" border="0" style="background: #f9f9f9; font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 12px; padding: 20px;">';
        emailMessage += '<tr><td width="40%">Sender Name:</td><td width="60%">';
        emailMessage += $('#senderName').val();
        emailMessage += '</td></tr>';
        emailMessage += '<tr><td width="40%">Company Name:</td><td width="60%">';
        emailMessage += $('#cName').val();
        emailMessage += '</td></tr>';
        emailMessage += '<tr><td width="40%">City:</td><td width="60%">';
        emailMessage += $('#cityName').val();
        emailMessage += '</td></tr>';
        emailMessage += '<tr><td width="40%">State:</td><td width="60%">';
        emailMessage += $('#stateName').val();
        emailMessage += '</td></tr>';
        emailMessage += '<tr><td>Email Address:</td><td><a href="mailto:';
        emailMessage += $('#eAddress').val();
        emailMessage += '" style="color: #333333">';
        emailMessage += $('#eAddress').val();
        emailMessage += '</a></td></tr>';
        emailMessage += '<tr><td>End of Credit Contract:</td><td>';
        emailMessage += $('#creditDateMonth').val() + ', ' + $('#creditDateYear').val();
        emailMessage += '</td></tr>';
        emailMessage += '<tr><td>End of Debit Contract:</td><td>';
        emailMessage += $('#debitDateMonth').val() + ', ' + $('#debitDateYear').val();
        emailMessage += '</td></tr>';
        emailMessage += '</table>';

        emailMessage += '</td></tr></table>';
        sendTheMessage(subjectemail, emailMessage);
    }
}

function sendTheMessage(subject, message) {

    var sendmail = {
        emailInfo: {
            'EmailSubject': subject,
            'EmailBody': message,
            'EmailTo': '30ddd8d2e2244fc09205668917d0a726' // paymentsolutions@jackhenry.com
            //'EmailTo': 'ab3a9029249c4997b83d83706d50440g' // CR
        }
    };
    $.ajax({
        type: 'POST',
        url: '/_vti_bin/jhasendmailwcf/emailservice.svc/sendmail',
        data: JSON.stringify(sendmail),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: OnSuccess,
        error: OnError
    });

    function OnSuccess(data, status) {
        if (data.SendMailResult == 'True') {

            $('#formRequest :input').each(function() {
                $(this).val('');
            });
            // $('html, body').animate({
            //     scrollTop: 0
            // }, 500).promise().done(function() {
            $('#formRequest').fadeOut('slow', function() {
                $('#formSuccess').fadeIn('slow');
            });
            // });

        } else {
            alert('An error has occurred, please try submitting the form again');
        }
    }

    function OnError(request, status, error) {
        if (request.statusText == 0) {
            alert('An error has occurred, please try submitting the form again');
        }
    }
}

function validateForm() {

    if ($('#senderName').val() == null || $('#senderName').val() == '') {
        var elem = $('#senderName');
        elem.focus();
        return false;
    }

    if ($('#cName').val() == null || $('#cName').val() == '') {
        var elem = $('#cName');
        elem.focus();
        return false;
    }
    if ($('#eAddress').val() == null || $('#eAddress').val() == '') {
       var elem = $('#eAddress');
        elem.focus();
        return false;
    }

    return true;
}

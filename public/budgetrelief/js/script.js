function SendMail(event) {

    var dt = new Date();
    var timeZone = dt.toTimeString().substring(dt.toTimeString().indexOf('(') + 1, dt.toTimeString().lastIndexOf(')'));

    var subjectemail = 'Submission – ' + $('title').text();
    var emailMessage;

    /* Wrap to center */
    emailMessage = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding-bottom: 30px;"><tr><td>';

    /* Title and Date */
    emailMessage += '<table align="center" width="500" cellpadding="0" cellspacing="0" border="0" style="color: #a4a9ad; font-size: 9px; padding: 5px;"><tr><td>';
    emailMessage += $('title').text();
    emailMessage += '</td><td width="50%" align="right">';
    emailMessage += dt.toLocaleString() + ' ' + timeZone;
    emailMessage += '</td></tr></table>';

    /* Contact Info */
    emailMessage += '<table align="center" width="500" cellpadding="10" cellspacing="0" border="0" style="border-right: 1px solid #dddddd; border-left: 1px solid #dddddd; background: #f9f9f9; font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 12px; padding: 20px;">';
    emailMessage += '<tr><td width="30%">Name:</td><td width="70%">';
    emailMessage += $('#sName').val();
    emailMessage += '</td></tr><tr><td>Company Name:</td><td>';
    emailMessage += $('#cName').val();
    emailMessage += '</td></tr><tr><td>Title:</td><td>';
    emailMessage += $('#sTitle').val();
    emailMessage += '</td></tr><tr><td>City:</td><td>';
    emailMessage += $('#sCity').val();
    emailMessage += '</td></tr><tr><td>State:</td><td>';
    emailMessage += $('#sState').val();
    emailMessage += '</td></tr><tr><td>Asset Size:</td><td>';
    emailMessage += $('#sSize').val();
    emailMessage += '</td></tr><tr><td>Phone:</td><td>';
    emailMessage += $('#sPhone').val();
    emailMessage += '</td></tr><tr><td>Email Address:</td><td><a href="mailto:';
    emailMessage += $('#sEmail').val();
    emailMessage += '" style="color: #333333">';
    emailMessage += $('#sEmail').val();
    emailMessage += '</a></td></tr><tr><td>Additional Requests (optional):</td><td>';
    emailMessage += $('#sOptional').val();
    emailMessage += '</td></tr>';
    emailMessage += '</td></tr></table>';

    /* Requested Info */
    emailMessage += '<table align="center" width="500" cellpadding="10" cellspacing="0" border="0" style="border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-left: 1px solid #dddddd; background: #f9f9f9; font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 12px; padding: 20px;">';

    if ($('input[type=checkbox]:checked').length) {
        emailMessage += '<tr><td style="border-bottom: 1px solid #ebebeb; font-size: 14px; color: #333333; padding-top: 10px; padding-bottom: 10px;">PRIORITIES</td></tr>';
        /* Loop to grab selected checkboxes for this section */
        $('input[type=checkbox]:checked').each(function() {
            var that = $(this);
            emailMessage += '<tr><td style="background: #ffffff; color: #007dcc; border-bottom: 1px solid #ebebeb; border-right: 1px solid #ebebeb; border-left: 1px solid #ebebeb;">';
            emailMessage += $(that).attr('name');
            emailMessage += '</td></tr>';
        });
    }

    emailMessage += '</table>';
    /* /.Close wrap */
    emailMessage += '</td></tr></table>';

    sendTheMessage(subjectemail, emailMessage);
}

function sendTheMessage(subject, message, event) {


    var sendmail = {
      emailInfo: {
        'EmailSubject': subject,
        'EmailBody': message,
        'EmailTo': 'ab3a9029249c4997b83d83706d50440g'
      }
    };

    // console.log(sendmail);



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
        console.log(data + ' ' + status);
        if (data.SendMailResult == 'True') {
            console.log(status);
        }
        $('#formRequest :input').each(function(){$(this).val('');});
        $('#formSuccess').fadeIn('slow');
    }

    function OnError(request, status, error) {
        if (request.statusText == 0) {
            alert('An error has occurred, please try submitting the form again');
        }
    }
}

function youveComeALongWayBaby(from, to, body, subject) {

  var siteurl = _spPageContextInfo.webServerRelativeUrl;

  console.log(siteurl);

  var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
  $.ajax({
     contentType: 'application/json',
     url: urlTemplate,
     type: "POST",
     data: JSON.stringify({
         'properties': {
             '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
             'From': from,
             'To': 'crrollyson@gmail.com',
             'Body': body,
             'Subject': subject
         }
     }
   ),
     headers: {
         "Accept": "application/json;odata=verbose",
         "content-type": "application/json;odata=verbose",
         "X-RequestDigest": $("#__REQUESTDIGEST").val()
     },
     success: function (data) {
        alert("Eposten ble sendt");
     },
     error: function (err) {
         alert(err.responseText);
         debugger;
     }
  });
}

// FUNCTIONS IN JAVASCRIPT ARE OBJECTS


// FUNCTION STATEMENT: This is the one that gets pulled up into memory when the execution context is created === Creating an Object in Memory
// √ Has the name property » Name === functionStatement
                             // Name Property is: where the function lives in memory. The functions address in memory. Visually this could be a map
                             // Name Property is:
// √ Has code property that gets set » Code === Everything inside function

function functionStatement(){
    console.log('When evaluated a function statement is placed into memory. Does not result in a value - Just a statement. Does not return value until the function is executed. Gets hoisted and placed into memory. Available ahead of time. Can be called before being declared');
}


// when called it's connected to the spot in memory where the function object lives and invoke the code part of the function
// functionStatement();


// Equals operator is putting this object into memory and pointing that anonymousFunctionExpression variable at that address.
// Not looking at the name
// Just knows the address
var anonymousFunctionExpression = function () {
    console.log('Create object on the fly. Set equal to this variable – spot/address in memory – will contain a function object');
}

// functions are objects in javascript

// concept of first class functions

// Expression: UNIT OF CODE THAT RESULTS IN A VALUE
// ––– does not have to save inside a variable
// Statements: JUST DO WORK – RETURN VALUE

// An Expression is a unit of code that results in a value statements just do work

// any expression in javascript ends up creating a value and value does not have to save inside a variable

// inside of parans in if statement is an expression

// if is a statement == if statement
// inside of if statement == is an expression





//by value vs by reference
//primative val = num, bool, string
//reference is to location

//a = 3
//a = 'three'
//a = true
//b = a [±±±± creates a copy of the primative value in memory ±±±±]
//0x001 & 0x002 [±±±± different location ±±±±]

//var equal to object
//b=a points to same location in memory
//0x001 & 0x001
//goes by multiple names and lives in same location

// ± ByValue ≠≠ when a var is set equal to a primative value
//             primative value (number, boolean, string)
// ± ByReference ≠≠ when a var is set equal to an object or passed
//             to a function

// when set variable equal to object ±±± still get location/address
// in memory for reference
// when b = a (or pass to a function)
// when trying to get two to the same value
// points to the location in memory that a does
// two names point to the same address
// like an alias
// 0x001 & 0x001

// ALL OBJECTS INTERACT ByReference when setting equal to each other
// or pass to a function

// Example – ByValue (primatives)
var a = 3;
var b;

b = a;
a = 2;

console.log(a +' 0x001 ByValue');
console.log(b +' 0x002 ByValue');


// ByReference (all objects (including functions))
var c = { greeting: 'Hi' };
var d;

d = c;
c.greeting = 'Hello'; // mutate – can use dot since object is set up
// d.greeting = 'Hola'
console.log(c);
console.log(d);

//once you change one all change no matter which one is changed

// ByReference (even as parameters – objects are passed by reference)
function changeGreeting(obj){
    obj.greeting = 'Hola'; // mutate
    // obj » points to same memory location
}
changeGreeting(d); // obj » points to same memory location
console.log(c);
console.log(d);

// equals operator sets up new memory space (new address)
c = { greeting: 'howdy' }; // special case because equals operator
//                              sets up spot in memory to live
//                              because it doesn't yet exist in memory
console.log(c);
console.log(d);






















































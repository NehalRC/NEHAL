const baseURL = 'http://localhost:';

const port ="3000";

let returnCloudDonor = [];
let returnCloudRec = [];
get_donorclouddata();
get_recclouddata();
//Go to home page
$(document).on('click','#home_link',function(e){
    $('.user-option-menu').slideUp();
     $("body").pagecontainer("change", "#home", {
        transition: 'slide'
    });
});

//Go to donor's dashboard page
$(document).on('click','#mainpage',function(e){
    $('.user-option-menu').slideUp();
     $("body").pagecontainer("change", "#donorspage", {
        transition: 'slide'
    });
});

//Go to donor's dashboard page
$(document).on('click','#donor_page_link',function(e){
    $('.user-option-menu').slideUp();
    $("body").pagecontainer("change", "#donorspage", {
        transition: 'slide'
    });
});

//Go to donors recipient's page two
$(document).on('click','#recipient_page_link',function(e){
    $('.user-option-menu').slideUp();
    $("body").pagecontainer("change", "#recipientpage", {
        transition: 'slide'
    });
});

//Go to appointment page
$(document).on('click','#appointment_link',function(e){
     $("body").pagecontainer("change", "#appointment", {
        transition: 'slide'
    });
});

//Go to Requats Blood page
$(document).on('click','#requestblood_link',function(e){
     $("body").pagecontainer("change", "#requestblood", {
        transition: 'slide'
    });
});

//Go to Blood Donor local data display page
$(document).on('click','#donordata_link',function(e){
    store_data();
     $("body").pagecontainer("change", "#donordata", {
        transition: 'slide'
    });
});

//Go to Blood Donor cloud data display page
$(document).on('click','#donordata_cloud',function(e){
    get_donorclouddata();
     $("body").pagecontainer("change", "#donorclouddata", {
        transition: 'slide'
    });
});

//Go to Blood recipient local data display page
$(document).on('click','#recipientdata_link',function(e){
    store_datanew();
     $("body").pagecontainer("change", "#recipientdata", {
        transition: 'slide'
    });
});
//Go to Blood recipient cloud data display page
$(document).on('click','#recidata_cloud',function(e){
    get_recclouddata();
     $("body").pagecontainer("change", "#cloudrecipientdata", {
        transition: 'slide'
    });
});

//Go to Blood Donor Certificate page
$(document).on('click','#donorcertificate_link',function(e){
     $("body").pagecontainer("change", "#donorcertificate", {
        transition: 'slide'
    });
});

//Go to Compatibility Chart page
$(document).on('click','#compatibility_chart_link',function(e){
     $("body").pagecontainer("change", "#compatibilitychart", {
        transition: 'slide'
    });
});

//Toggle admin menu
$(document).on('click','#userlink',function(e){
    $('.user-option-menu').slideToggle();
});

//Delete local data
$(document).on('click','#deletelocaldata',function(e){
    $(this).parents('.user_menu').find('#admin').show();
    $(document).on('click','#adminconfirm',function(e){
        localStorage.removeItem('names');
        localStorage.removeItem('namesnew');
        dataArray = [];
        dataArraynew = [];
        $( "#table" ).empty();
        $( "#responsive-view" ).empty();
        $(".no-record").show();

        $( "#tablenew" ).empty();
        $( "#responsive-viewnew" ).empty();
        $(".no-recordnew").show();

        $(".overlay").hide();
    });
    $(document).on('click','#admindecline',function(e){
        $(".overlay").hide();
    });
});

// Close custom Popup
$(document).on('click','.popup_header a',function(e){
    $(".overlay").hide();
});



// /*Form Start*/
var dataArray = [];

function processValidForm(data) {
    
    let storeObj = new Object;
    console.log(storeObj);
    storeObj.fullname = data.fullname.value;
    storeObj.email = data.email.value;
    storeObj.mobile = data.mobile.value;

    storeObj.address = data.address.value;
    storeObj.bloodgroup = data.bloodgroup.value;

    storeObj.past = data.past.value;
    storeObj.diesease = data.diesease.value;

    storeObj.specify = data.specify.value;
    storeObj.bloodbank = data.bloodbank.value;

    storeObj.banklocation = data.banklocation.value;

    dataArray.push(storeObj);
    $(".overlay").show();

    $(document).on('click','#confirm',function(e){
        localStorage.names = JSON.stringify(dataArray);
        $('#myForm').trigger("reset");
        $(".overlay").hide();
    });

    $(document).on('click','#decline',function(e){
        $(".overlay").hide();
    });

    // Close custom Popup
    $(document).on('click','.popup_header a',function(e){
        $(".overlay").hide();
    });

    function createLi(datafullname, dataemail, dataLmobile, dataaddress, databloodgroup, past, diesease, dataspecify, databloodbank, banklocation) {
        return $('<tr/>', {
            "html": '<td class="fullname">' + datafullname + '</td><td class="email">' + dataemail + '</td><td class="mobile">' + dataLmobile + '</td><td class="address">' + dataaddress + '</td><td class="bloodgroup">' + databloodgroup + '</td><td class="past">' + past + '</td><td class="specify">' + diesease + '</td><td class="specify">' + dataspecify + '</td><td class="bloodbank">' + databloodbank + '</td><td class="banklocation">' + banklocation + '</td>',
            "id": datafullname
        });
    }
}
$(document).on("pagecreate", "#fetch2", function(event) {
    $("form[name='myForm']").validate({
        rules: {
            fullname: "required",
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                digits: true
            },
            address: "required",
            bloodgroup: "required",
            past: "required",
            diesease: "required",
            bloodbank: "required",
            banklocation: "required"
        },
        // Specify validation error messages
        messages: {
            fullname: "Please enter your first name",
            email: "Please enter valid email address",
            mobile: {
                required: "Must include mobile number",
                digits: "Must be a number"
            },
            address: "Please add valid Address",
            bloodgroup: "Please Choose an item!",
            past: "Please Choose valid Answer",
            diesease: "Please Choose valid Answer",
            bloodbank: "Please Choose an item!",
            banklocation: "Please Choose Blood Bank Location!",
        },
        submitHandler: function(form) {
            form.submit();

        }
    });
});

function store_data() // For DONOR
{
    if (localStorage.getItem("names") !== null) {
        $(".no-record").hide();
        $('tr').remove();
        var th = '<tr><th  class="fullname">Name</th><th class="email">Eamil Address</th><th class="mobile">Mobile Number</th><th class="address">Address</th><th class="bloodgroup">Blood Group</th><th class="past">Past Donation</th><th class="diesease">Current Diesease</th><th class="specify">Specify Diesease</th><th class="bloodbank">Blood Bank</th><th class="banklocation">Blood Bank Location</th></tr>';
        $('#table').append(th);
        let newObject = window.localStorage.getItem("names");
        arr = $.parseJSON(newObject);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullname);
                console.log(value);
                donor += '<tr class="data-row">';
                donor += '<td class="fullname">' + 
                    value.fullname + '</td>';

                donor += '<td class="email">' + 
                    value.email + '</td>';

                donor += '<td class="mobile">' + 
                    value.mobile + '</td>';

                donor += '<td class="address">' + 
                    value.address + '</td>';

                donor += '<td class="bloodgroup">' + 
                    value.bloodgroup + '</td>';

                donor += '<td class="past">' + 
                    value.past + '</td>';

                donor += '<td class="diesease">' + 
                    value.diesease + '</td>';

                donor += '<td class="specify">' + 
                    value.specify + '</td>';

                donor += '<td class="bloodbank">' + 
                    value.bloodbank + '</td>';

                donor += '<td class="banklocation">' + 
                    value.banklocation + '</td>';

                donor += '</tr>';                
                $('#table').append(donor);
            });
        });
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor_res = '';
            $.each(mn_this,function(key,value){
                donor_res += '<ul class="data-row">';
                donor_res += '<li class="fullname"><span class="responsive-label">Name:</span> <span class="album-data">' + value.fullname + '</span></li>';

                donor_res += '<li class="email"><span class="responsive-label">Email:</span> <span class="album-data">' + value.email + '</span></li>';

                donor_res += '<li class="mobile"><span class="responsive-label">Mobile:</span> <span class="album-data">' + value.mobile + '</span></li>';

                donor_res += '<li class="address"><span class="responsive-label">Address:</span> <span class="album-data">' + value.address + '</span></li>';

                donor_res += '<li class="bloodgroup"><span class="responsive-label">Blood Group:</span> <span class="album-data">' +value.bloodgroup + '</span></li>';

                donor_res += '<li class="past"><span class="responsive-label">Past Donation:</span> <span class="album-data">' + value.past + '</span></li>';

                donor_res += '<li class="diesease"><span class="responsive-label">Current Diesease:</span> <span class="album-data">' + value.diesease + '</span></li>';

                donor_res += '<li class="specify"><span class="responsive-label">Specify Diesease:</span> <span class="album-data">' + value.specify + '</span></li>';

                donor_res += '<li class="bloodbank"><span class="responsive-label">Blood Bank:</span> <span class="album-data">' + value.bloodbank + '</span></li>';

                donor_res += '<li class="banklocation"><span class="responsive-label">Blood Bank Location:</span> <span class="album-data">' + value.banklocation + '</span></li>';

                donor_res += '</ul>';                
                $('#responsive-view').append(donor_res);
            });
        });    
    }
}
store_data();


$('#diesease').on('change', function() {
    if ($(this).val() == 'Yes') {
        $(".hidden_class").show();
        $("#specify").show();
    }
    else
    { $(".hidden_class").hide(); 
      $("#specify").hide();
    }
});

$('#bloodbank').on('change', function() {
    if ($(this).val() == 'SYD') {
        $("#banklocation").parents(".ui-select").show();
        $(".syd").show();
        $(".mel").hide();
        $("#banklocation").show();
        $(".hidden_location").show();
    }
    else
    { $(".syd").hide();
      $(".mel").show();
      $("#location").show();
      $("#location").parents(".ui-select").show();
      $(".hidden_location").show();
    }
});

setTimeout(function(){
    $("#banklocation").parents(".ui-select").hide();
}, 500);
setTimeout(function(){
    $("#banklocation").parents(".ui-select").hide();
}, 1000);

/*Form Start*/
var dataArraynew = [];

function processValidFormnew(data) {
    let storeObjnew = new Object;
    console.log(storeObjnew);
    storeObjnew.fullnamenew = data.fullnamenew.value;
    storeObjnew.emailnew = data.emailnew.value;
    storeObjnew.mobilenew = data.mobilenew.value;

    storeObjnew.bloodgroupnew = data.bloodgroupnew.value;

    dataArraynew.push(storeObjnew);
    $(".overlay").show();

    $(document).on('click','#confirm',function(e){
        localStorage.namesnew = JSON.stringify(dataArraynew);
        $('#myFormnew').trigger("reset");
        $(".overlay").hide();
    });

    $(document).on('click','#decline',function(e){
        $(".overlay").hide();
    });

    // Close custom Popup
    $(document).on('click','.popup_header a',function(e){
        $(".overlay").hide();
    });

    function createLi(datafullnamenew, dataemailnew, dataLmobilenew, dataaddress, databloodgroupnew, past, diesease, dataspecify, databloodbank, banklocation) {
        return $('<tr/>', {
            "html": '<td class="fullnamenew">' + datafullnamenew + '</td><td class="emailnew">' + dataemailnew + '</td><td class="mobilenew">' + dataLmobilenew + '</td><td class="bloodgroupnew">' + databloodgroupnew + '</td>',
            "id": datafullnamenew
        });
    }
}
$(document).on("pagecreate", "#requestblood", function(event) {
    $("form[name='myFormnew']").validate({
        rules: {
            fullnamenew: "required",
            emailnew: {
                required: true,
                email: true
            },
            mobilenew: {
                required: true,
                digits: true
            },
            bloodgroupnew: "required"
        },
        // Specify validation error messages
        messages: {
            fullnamenew: "Please enter your first name",
            emailnew: "Please enter valid email address",
            mobilenew: {
                required: "Must include mobile number",
                digits: "Must be a number"
            },
            bloodgroupnew: "Please Choose an item!"
        },
        submitHandler: function(form) {
            form.submit();

        }
    });
});

function store_datanew()// For RECIPIENT
{
    if (localStorage.getItem("namesnew") !== null) {
        $(".no-recordnew").hide();
        $('tr').remove();
        var th = '<tr><th  class="fullnamenew">Name</th><th class="emailnew">Eamil Address</th><th class="mobilenew">Mobilenew Number</th><th class="bloodgroupnew">Blood Group</th></tr>';
        $('#tablenew').append(th);
        let newObjectnew = window.localStorage.getItem("namesnew");
        arr = $.parseJSON(newObjectnew);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var recipient = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullnamenew);
                console.log(value);
                recipient += '<tr class="data-row">';
                recipient += '<td class="fullnamenew">' + 
                    value.fullnamenew + '</td>';

                recipient += '<td class="emailnew">' + 
                    value.emailnew + '</td>';

                recipient += '<td class="mobilenew">' + 
                    value.mobilenew + '</td>';

                recipient += '<td class="bloodgroupnew">' + 
                    value.bloodgroupnew + '</td>';

                recipient += '</tr>';                
                $('#tablenew').append(recipient);
            });
        }); 

        $.each(arr,function(key,value){
            var mn_this = $(this);
            var recipientnew = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullnamenew);
                console.log(value);
                recipientnew += '<ul class="data-row">';
                recipientnew += '<li class="fullnamenew"><span class="responsive-label">Name:</span> <span class="album-data">' + value.fullnamenew + '</span></li>';

                recipientnew += '<li class="emailnew"><span class="responsive-label">Email:</span> <span class="album-data">' + value.emailnew + '</span></li>';

                recipientnew += '<li class="mobilenew"><span class="responsive-label">Mobile:</span> <span class="album-data">' + value.mobilenew + '</span></li>';

                recipientnew += '<li class="bloodgroupnew"><span class="responsive-label">Blood Group:</span> <span class="album-data">' + value.bloodgroupnew + '</span></li>';

                recipientnew += '</ul>';                
                $('#responsive-viewnew').append(recipientnew);
            });
        });    
    }
}
store_datanew();

// MONGO DB CLOUD DATA action perform PART STARTS FROM BELOW

// DONOR Upload to cloud
$("#duploadtoCloud").on("click", () => {  

        let newObject = window.localStorage.getItem("names");
        arr = $.parseJSON(newObject);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor = '';
            $.each(mn_this,function(key,value){
                
                
        let fullname =  value.fullname;
		let email =  value.email;
		let mobile =  value.mobile;
		let address =  value.address;
		let bloodgroup = value.bloodgroup;
		let past =  value.past;
		let diesease =  value.diesease;
		let specify =  value.specify;
		let bloodbank =  value.bloodbank;
		let banklocation =  value.banklocation;
		
		
        
         var doc = {fullname: fullname, email:email, mobile:mobile, address:address, bloodgroup:bloodgroup, past:past, diesease:diesease, specify:specify, bloodbank:bloodbank, banklocation:banklocation};
        // ajax call for post api
         $.ajax({
          method: "POST",
          contentType: "application/json; charset=utf-8", // important
          dataType : "json",
          url:  baseURL+ port +"/postDonor", 
          data: JSON.stringify(doc)
          }).done(function( data, statusText, xhrObj) {
			  alert("LocalStorage Data will be deleted!!");
			  localStorage.removeItem('names');
			  dataArray = [];
              $( "#table" ).empty();
              alert("Status is: " + statusText + "  with status code 200 \nData: " + JSON.stringify(data));
             $.mobile.pageContainer.pagecontainer("change", "#home", { "transition":"turn"  }); 
          }).error (function( xhr ) {
             alert( "Error: " + JSON.stringify(xhr) );
          }) // end ajax
            
     });
 }); });
 
 // RECIPIENT Upload to cloud
$("#ruploadtoCloud").on("click", () => {  

        let newObject_rec = window.localStorage.getItem("namesnew");
        arr = $.parseJSON(newObject_rec);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor = '';
            $.each(mn_this,function(key,value){
                
                
        let fullnamenew =  value.fullnamenew;
		let emailnew =  value.emailnew;
		let mobilenew =  value.mobilenew;
		let bloodgroupnew =  value.bloodgroupnew;
		
		
		
        
         var docr = {fullnamenew: fullnamenew, emailnew:emailnew, mobilenew:mobilenew, bloodgroupnew:bloodgroupnew};
        // ajax call for post api
         $.ajax({
          method: "POST",
          contentType: "application/json; charset=utf-8", // important
          dataType : "json",
          url:  baseURL+ port +"/postRecipient", 
          data: JSON.stringify(docr)
          }).done(function( data, statusText, xhrObj) {
			  alert("LocalStorage Data will be deleted!!");
			  localStorage.removeItem('namesnew');
			  dataArray = [];
              $( "#tablenew" ).empty();
              alert("Status is: " + statusText + "  with status code 200 \nData: " + JSON.stringify(data));
             $.mobile.pageContainer.pagecontainer("change", "#home", { "transition":"turn"  }); 
          }).error (function( xhr ) {
             alert( "Error: " + JSON.stringify(xhr) );
          }) // end ajax
            
     });
 }); });
 
 


	 

//Delete Donor Cloud Data
 $(".deleteclouddata").click( () => {
          // ajax call for delete api
         $.ajax({
        url: baseURL + port + "/deleteDonor", 
        method: 'DELETE',
        
        }).done(function(res, statusText, xhrObj) {
            if (res.success) {
          alert("Status is: " + statusText + " with status code 200 \nCloud Data will be Deleted!!: " );
          
        } else {
            console.log( "Error: Found error in deleting the cloud data");
            }
			document.location.reload();
			$(".no-data").show();
           $.mobile.pageContainer.pagecontainer("change", "#clouddata", { "transition":"turn"  }); 
     });
	 
	 });
	 
	 //Delete Recipient Cloud Data
 $(".deleteclouddataR").click( () => {
          // ajax call for delete api
         $.ajax({
        url: baseURL + port + "/deleteRecipient", 
        method: 'DELETE',
        
        }).done(function(res, statusText, xhrObj) {
            if (res.success) {
          alert("Status is: " + statusText + " with status code 200 \nCloud Data will be Deleted!!: " );
          
        } else {
            console.log( "Error: Found error in deleting the cloud data");
            }
			document.location.reload();
			$(".no-data").show();
           $.mobile.pageContainer.pagecontainer("change", "#clouddata", { "transition":"turn"  }); 
     });
	 
	 });
 
// DONOR get cloud data function
function get_donorclouddata(){
	 // ajax call for get api
	$.ajax({
          method: "GET",
          contentType: "application/json; charset=utf-8", // important
	    dataType : "json", 
          url:  baseURL + port + "/getDonor", 
          }).done(function( data, statusText, xhrObj) {
         
             
		if (JSON.stringify(data) !== null) {
        $(".no-record").hide();
        $('tr').remove();
        var th = '<tr><th  class="fullname">Name</th><th class="email">Eamil Address</th><th class="mobile">Mobile Number</th><th class="address">Address</th><th class="bloodgroup">Blood Group</th><th class="past">Past Donation</th><th class="diesease">Current Diesease</th><th class="specify">Specify Diesease</th><th class="bloodbank">Blood Bank</th><th class="banklocation">Blood Bank Location</th></tr>';
        $('#cloud-table').append(th);
		let newObjectdonor = JSON.stringify(data);
        arr = $.parseJSON(newObjectdonor);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullname);
                console.log(value);
                donor += '<tr class="data-row">';
                donor += '<td class="fullname">' + 
                    value.fullname + '</td>';

                donor += '<td class="email">' + 
                    value.email + '</td>';

                donor += '<td class="mobile">' + 
                    value.mobile + '</td>';

                donor += '<td class="address">' + 
                    value.address + '</td>';

                donor += '<td class="bloodgroup">' + 
                    value.bloodgroup + '</td>';

                donor += '<td class="past">' + 
                    value.past + '</td>';

                donor += '<td class="diesease">' + 
                    value.diesease + '</td>';

                donor += '<td class="specify">' + 
                    value.specify + '</td>';

                donor += '<td class="bloodbank">' + 
                    value.bloodbank + '</td>';

                donor += '<td class="banklocation">' + 
                    value.banklocation + '</td>';

                donor += '</tr>';                
                $('#cloud-table').append(donor);
            });
        });
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var donor_res = '';
            $.each(mn_this,function(key,value){
                donor_res += '<ul class="data-row">';
                donor_res += '<li class="fullname"><span class="responsive-label">Name:</span> <span class="album-data">' + value.fullname + '</span></li>';

                donor_res += '<li class="email"><span class="responsive-label">Email:</span> <span class="album-data">' + value.email + '</span></li>';

                donor_res += '<li class="mobile"><span class="responsive-label">Mobile:</span> <span class="album-data">' + value.mobile + '</span></li>';

                donor_res += '<li class="address"><span class="responsive-label">Address:</span> <span class="album-data">' + value.address + '</span></li>';

                donor_res += '<li class="bloodgroup"><span class="responsive-label">Blood Group:</span> <span class="album-data">' +value.bloodgroup + '</span></li>';

                donor_res += '<li class="past"><span class="responsive-label">Past Donation:</span> <span class="album-data">' + value.past + '</span></li>';

                donor_res += '<li class="diesease"><span class="responsive-label">Current Diesease:</span> <span class="album-data">' + value.diesease + '</span></li>';

                donor_res += '<li class="specify"><span class="responsive-label">Specify Diesease:</span> <span class="album-data">' + value.specify + '</span></li>';

                donor_res += '<li class="bloodbank"><span class="responsive-label">Blood Bank:</span> <span class="album-data">' + value.bloodbank + '</span></li>';

                donor_res += '<li class="banklocation"><span class="responsive-label">Blood Bank Location:</span> <span class="album-data">' + value.banklocation + '</span></li>';

                donor_res += '</ul>';                
                $('#cloud-responsive-view').append(donor_res);
            });
        });    
    }
              returnCloudDonor = data;//  globally declared
         
               
          })
}


// RECIPIENT get cloud data function
function get_recclouddata(){
	 // ajax call for get api
	$.ajax({
          method: "GET",
          contentType: "application/json; charset=utf-8", // important
	    dataType : "json", 
          url:  baseURL + port + "/getRecipient", 
          }).done(function( data, statusText, xhrObj) {
			  
	    if (JSON.stringify(data) !== null) {
        $(".no-recordnew").hide();
        $('tr').remove();
        var th = '<tr><th  class="fullnamenew">Name</th><th class="emailnew">Eamil Address</th><th class="mobilenew">Mobilenew Number</th><th class="bloodgroupnew">Blood Group</th></tr>';
        $('#cloud-rtable').append(th);
        let newObjectrec = JSON.stringify(data);
        arr = $.parseJSON(newObjectrec);
        $.each(arr,function(key,value){
            var mn_this = $(this);
            var recipient = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullnamenew);
                console.log(value);
                recipient += '<tr class="data-row">';
                recipient += '<td class="fullnamenew">' + 
                    value.fullnamenew + '</td>';

                recipient += '<td class="emailnew">' + 
                    value.emailnew + '</td>';

                recipient += '<td class="mobilenew">' + 
                    value.mobilenew + '</td>';

                recipient += '<td class="bloodgroupnew">' + 
                    value.bloodgroupnew + '</td>';

                recipient += '</tr>';                
                $('#cloud-rtable').append(recipient);
            });
        }); 

        $.each(arr,function(key,value){
            var mn_this = $(this);
            var recipientnew = '';
            $.each(mn_this,function(key,value){
                console.log(value.fullnamenew);
                console.log(value);
                recipientnew += '<ul class="data-row">';
                recipientnew += '<li class="fullnamenew"><span class="responsive-label">Name:</span> <span class="album-data">' + value.fullnamenew + '</span></li>';

                recipientnew += '<li class="emailnew"><span class="responsive-label">Email:</span> <span class="album-data">' + value.emailnew + '</span></li>';

                recipientnew += '<li class="mobilenew"><span class="responsive-label">Mobile:</span> <span class="album-data">' + value.mobilenew + '</span></li>';

                recipientnew += '<li class="bloodgroupnew"><span class="responsive-label">Blood Group:</span> <span class="album-data">' + value.bloodgroupnew + '</span></li>';

                recipientnew += '</ul>';                
                $('#cloud-responsive-viewr').append(recipientnew);
            });
        });    
    }
         
             
		
              returnCloudRec = data;//  globally declared
         
               
          })
}
function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}
  function onLinkedInAuth() {
     IN.API.Profile("me").fields("id","firstName", "lastName", "industry","pictureUrl").result(displayProfiles).error(displayProfilesErrors);;
     $('#in_logout').show();
}
function displayProfiles(profiles) {
	console.log(profiles);
     member = profiles.values[0];
     console.log(member);
     document.getElementById("profiles").innerHTML = 
          "<p id=\"" + member.id + "\">Hi " +  member.firstName + " " + member.lastName + "\n" + member.industry +"</p>";
}
function displayProfilesErrors(error) {
  profilesDiv = document.getElementById("profiles");
  profilesDiv.innerHTML = "<p>Oops!</p>";
  console.log(error);
}

function invitationBody (argument) {
  BODY={
  "recipients": {
    "values": [
    {
      "person": {
        "_path": "/people/~",
       }
    },
    {
      "person": {
        "_path": "/people/jZJkfhSrDc",
       }
    },
    {
      "person": {
        "_path": "/people/QrEcDN1kWs",
       }
    }
    ]
  },
  "subject": "Congratulations on your new position.",
  "body": "You are certainly the best person for the job!"
};

  // var BODY={
 // "recipients": {
   // "values": [{
     // "person": {
       // "_path": "/people/QrEcDN1kWs",
      // }
   // }]
 // },
 // "subject": "JSON POST test",
 // "body": "You rule",
 // // "item-content": {
        // // "invitation-request": {
                // // "connect-type":"friend",
                // // "authorization": {
                        // // "name":"OUT_OF_NETWORK",
                        // // "value":"aOfX"
             // // }
         // // }
   // // }
// };

IN.API.Raw('/people/~/mailbox')
           .method('POST')
           .body(JSON.stringify(BODY)) 
           .result(displayMessageSent)
           .error(displayError);
}

function onLinkedInMessiging() {
     // After they've signed-in, print a form to enable keyword searching
     var div = document.getElementById("sendMessageForm");

     div.innerHTML = '<h2>Send a Message To Yourself</h2>';
     div.innerHTML += '<form action="javascript:SendMessage();">' +
                  '<input id="message" size="30" value="You are awesome!" type="text">' +
                  '<input type="submit" value="Send Message!" /></form>';
 }
 
 function SendMessage(keywords) {
     // Call the Message sending API with the viewer's message
     // On success, call displayMessageSent(); On failure, do nothing.
 
     var message = document.getElementById('message').value; 
     var BODY = {
        "recipients": {
           "values": [{
             "person": {
                "_path": "/people/~",
             }
           }]
         },
       "subject": "JSON POST from JSAPI",
       "body": message
     };

     IN.API.Raw("/people/~/mailbox")
           .method("POST")
           .body(JSON.stringify(BODY)) 
           .result(displayMessageSent)
           .error(displayError);
 }

 function displayMessageSent(response) {
  console.log(response);
     var div = document.getElementById("sendMessageResult");
      div.innerHTML += "Yay!";
 }
function displayError (error) {
  console.log(error);
}
function linkedinLogout (e) {
  if(IN.User.isAuthorized()){
  	IN.User.logout(callbackFunction);
  }
}
function callbackFunction (back) {
  console.log(back);
}
function friendSelector (e) {
	$("#list").empty();
	selectedContacts = []; //create gloable object
	
    IN.API.Connections("me").result(displayConnections).error(displayError);
}
function displayConnections (connections) {
  $("#list_container").fadeIn(100);
  console.log(connections);
  var values=connections.values;
  for (var i=0;i<values.length;i++)
	{ 
		people = values[i];
		console.log(people);
		var item='<li id='+people.id+'>\
      	 <div>\
          <img  src='+people.pictureUrl+' alt='+people.firstName+' >\
          <span >'+people.firstName + " " + people.lastName+'</span>\
          <span class="select_friend" >Select</span>\
       	 </div> \
       </li>';
       var $item = $(item).click(itemSelected);
       $("#list").append($item);
	}
}
function itemSelected (item) {
  var v=$(this);
  var id=v[0].id;
  console.log(v[0]);
  if ($(this).hasClass("active"))
  {
  	$(this).removeClass("active");
  	var index = selectedContacts.indexOf(id);
  	if (index > -1) {
    	selectedContacts.splice(index, 1);
	}
  }
  else
  {
  	if (selectedContacts.length>=10) {
  		alert("Maximum selection number is 10");
  		//return;
  	}
  	else {
  		$(this).addClass("active");
  		selectedContacts.push(id);
  	}
  }
  //console.log(selectedContacts);
}
function SendMultipleMessage(keywords) {
  selectedContacts.forEach(function(contact) {
    console.log(contact);
    var BODY = {
        "recipients": {
           "values": [{
             "person": {
                "_path": "/people/"+contact,
             }
           }]
         },
       "subject": "xiffe",
       "body": "http://xiffe.com/"
     };
     IN.API.Raw("/people/~/mailbox")
           .method("POST")
           .body(JSON.stringify(BODY)) 
           .result(displayMessageSent)
           .error(displayError);
  });  
 }
 $(document).ready(function(){
  $("#close").click(function(e){
  	e.preventDefault();
    $("#list_container").fadeOut(100);
  });
 $("#ok").click(function(e){
 	e.preventDefault();
    $("#list_container").fadeOut(100);
    console.log(selectedContacts);
    
    //SendMultipleMessage();
  });
});
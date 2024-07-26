javascript:(function () {    function extractEmailFrmString(stringName) {
    var regex = /Email: (\S+)/;
    var match = stringName.match(regex);
    var email = match ? match[1] : null;
    email = email && email.endsWith(",") ? email.substring(0, email.length - 1) : email;
    return email;
}

function fetchEmailAddress(commentSectionInstance) {
    var clientEmail = null;
    var brokerEmail = null;
    
    for (var x = 0; x < commentSectionInstance.children.length; x++) {
        var eachLine = commentSectionInstance.children[x].innerText;
        if (eachLine && eachLine.startsWith("Call")) {
            clientEmail = extractEmailFrmString(eachLine);
        } else if (eachLine && (eachLine.startsWith("Broker") || eachLine.startsWith("SAG"))) {
            brokerEmail = extractEmailFrmString(eachLine);
        }
    }
    return [clientEmail, brokerEmail];
}

function fetchTicketDetails() {
    const summaryBtn = document.getElementsByClassName("css-t0icuu");
    const ticketName = summaryBtn[0].getAttribute('aria-label');
    const splitTicketName = ticketName.split("-");
    const commentSection = document.getElementsByClassName("ak-renderer-document");
    var emailArray = fetchEmailAddress(commentSection[0]);
    return [splitTicketName[0].trim(), splitTicketName[1].trim(), emailArray[0], emailArray[1]];
}

function draftEmail(address,emailSVG,emailForPayor) {
    var ticketDetails = fetchTicketDetails();
    var policyNum = ticketDetails[0];
    var polOwnerName = ticketDetails[1];
    var recipient = emailSVG === true ? ticketDetails[3]: ticketDetails[2];
    var ccRecipients = emailSVG === true ? 'N/A': ticketDetails[3];

    if (polOwnerName.endsWith(".pdf")) {
        polOwnerName = polOwnerName.substring(0, polOwnerName.length - 4);
    }
    var ifPayor = emailForPayor? " (PAYOR)" : "";
    var subject = `Address Update Request - ${polOwnerName}${ifPayor} - Policy # ${policyNum}`;
    var greetings = "Good Day,\n";
    if(emailSVG=== true){
        if(emailForPayor === true){
        var body = `${greetings}\nThe mail recently sent to ${polOwnerName}, who is the payor of above mentioned policy, has been returned to our office.\n\nWe had tried contacting the payor, but we were not successful. Our records indicate the following address:\n\n${address.toUpperCase()}\n\nWe are reaching out to you to obtain the payor’s current address so we can update our records.\n\nYour help is very much appreciated!.\n\nBest Wishes`;}
        else{
            var body = `${greetings}\nThe mail recently sent to our mutual member ${polOwnerName}, has been returned to our office.\n\nWe had tried contacting the member, but we were not successful. Our records indicate the following address:\n\n${address.toUpperCase()}\n\nWe are reaching out to you to obtain the member’s current address so we can update our records.\n\nYour help is very much appreciated!.\n\nBest Wishes`;
        }
    }
    
    else{
        var body = `${greetings}\nThe mail recently sent to you has been returned to our office and we are reaching out to obtain your current address.\n\nOur records indicate the following address:\n\n${address.toUpperCase()}\n\nPlease notify us of your current address as soon as possible.\n\nBest Wishes`;
    }

    console.log(ticketDetails, subject, body);

    var mailto_link = 'mailto:' + recipient +
        (ccRecipients && ccRecipients !== 'No' && ccRecipients !== 'N/A' ? '?cc=' + encodeURIComponent(ccRecipients) + '&subject=' + encodeURIComponent(subject) : '?subject=' + encodeURIComponent(subject)) +
        '&body=' + encodeURIComponent(body);

    console.log(mailto_link);
    window.location.href = mailto_link;
    
}

function showAddressInputScreen() {
    var style = document.createElement('style');
    style.innerHTML = `
    #modalBackground{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:flex;justify-content:center;align-items:center;}
    #modal{background:#ddd;padding:20px;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.1);width:500px;text-align:center;font-family:sans-serif;}
    #modal textarea{width:95%;height:150px;margin-bottom:10px;padding:10px;border:1px solid black;border-radius:5px;background-color:#ebecf0;color:black;font-size:larger;font-family:sans-serif;}
    #modal button{padding:10px 20px;margin:5px;border:none;border-radius:5px;cursor:pointer;background:#007bff;color:white;}
    #modal button:hover{background:#042f5e}
`;
    document.head.appendChild(style);
    var modalBackground = document.createElement('div');
    modalBackground.id = 'modalBackground';
    var modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
    <textarea id="addressTextarea" placeholder="Enter Previous Address here..."></textarea>
    <button id="btn1">Email Broker</button>
    <button id="btn2">Email Member</button>
    <button id="btn4">Email for Payor</button>
    <button id="btn3">Cancel</button>
`;
    modalBackground.appendChild(modal);
    document.body.appendChild(modalBackground);
    document.getElementById('btn1').onclick = function () {
        var address = document.getElementById('addressTextarea').value;
        document.body.removeChild(modalBackground);
        draftEmail(address,true,false);
    };
    document.getElementById('btn2').onclick = function () {
        var address = document.getElementById('addressTextarea').value;
        document.body.removeChild(modalBackground);
        draftEmail(address,false,false);
    };
    document.getElementById('btn3').onclick = function () {
        document.body.removeChild(modalBackground);
    };
    document.getElementById('btn4').onclick = function () {
        var address = document.getElementById('addressTextarea').value;
        document.body.removeChild(modalBackground);
        draftEmail(address,true,true);
    };
}
showAddressInputScreen();
})();

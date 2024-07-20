javascript: (function () {
    function extractEmailFrmString(stringName) {
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
        return [splitTicketName[0].trim(), splitTicketName[1].trim(), emailArray[1], emailArray[0]];
    }

    var ticketDetails = fetchTicketDetails();
    var policyNum = ticketDetails[0];
    var polOwnerName = ticketDetails[1];
    var recipient = ticketDetails[2];
    var ccRecipients = ticketDetails[3];

    if (polOwnerName.endsWith(".pdf")) {
        polOwnerName = polOwnerName.substring(0, polOwnerName.length - 4);
    }

    var subject = `Address Update Request - Policy # ${policyNum} - ${polOwnerName}`;
    var address = "77 university";
    var currentTime = (new Date()).toLocaleTimeString();
    var greetings = currentTime.endsWith("AM") ? "Good morning,\n" : "Good afternoon,\n";
    var body = `${greetings}\nThe mail recently sent to our mutual member ${polOwnerName}, has been returned to our office.\nWe had tried contacting the member, but we were not successful. Our records indicate the following address:\n\n${address}\n\nPlease notify us of the member’s current address as soon as possible.\n\nThank you,`;

    console.log(ticketDetails, subject, body);

    var mailto_link = 'mailto:' + recipient +
        (ccRecipients && ccRecipients !== 'No' && ccRecipients !== 'N/A' ? '?cc=' + encodeURIComponent(ccRecipients) + '&subject=' + encodeURIComponent(subject) : '?subject=' + encodeURIComponent(subject)) +
        '&body=' + encodeURIComponent(body);

    console.log(mailto_link);
    window.location.href = mailto_link;
})();

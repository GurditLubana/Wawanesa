javascript:(function() {
    function fetchTicketDetails() {
        const summaryBtn = document.getElementsByClassName("css-t0icuu");
        const ticketName = summaryBtn[0].getAttribute('aria-label');
        const splitTicketName = ticketName.split("-");
        const commentSection = document.getElementsByClassName("ak-renderer-document");
        const parentAddressLine = commentSection[0].children[8];
        return [splitTicketName[0].trim(), splitTicketName[1].trim()]
    }
    var ticketDetails = fetchTicketDetails();
    var policyNum = ticketDetails[0];
    var polOwnerName = ticketDetails[1];
    if (polOwnerName.endsWith(".pdf")) {
        polOwnerName = polOwnerName.substring(0, polOwnerName.length - 4);
    }
    console.log(polOwnerName.endsWith(".pdf"));
    var recipient = "gurditsingh2307@gmail.com";
    var subject = `Address Update Request - Policy # ${policyNum} - ${polOwnerName}`;
    var address = "77 university";
    var currentTime = (new Date()).toLocaleTimeString();
    var greetings = currentTime.endsWith("AM") ? "Good morning,\n": "Good afternoon,\n";
    var body = `${greetings}\nThe mail recently sent to our mutual member ${polOwnerName}, has been returned to our office.\nWe had tried contacting the member, but we were not successful. Our records indicate the following address:\n\n${address}\n\nPlease notify us of the member’s current address as soon as possible.\n\nThank you,`;
    var mailto_link = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto_link;
})();

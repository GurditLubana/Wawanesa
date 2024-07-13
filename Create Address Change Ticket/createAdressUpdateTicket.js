function fetchTicketDetails(){
    const summaryBtn = document.getElementsByClassName("css-t0icuu");
    const ticketName = summaryBtn[0].getAttribute('aria-label');
    const splitTicketName = ticketName.split("-");
    var policyNo = splitTicketName[0].trim();
    var ownerName = splitTicketName[1].trim();

    const commentSection = document.getElementsByClassName("ak-renderer-document");
    const addressLine = commentSection[0].children[8].innerHTML;
    
    var address = addressLine.split("-")[1].trim();
    

    return [policyNo, ownerName,address]
}

console.log(fetchTicketDetails());

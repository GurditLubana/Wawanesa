function fetchTicketDetails(){
    const summaryBtn = document.getElementsByClassName("css-t0icuu");
    const ticketName = summaryBtn[0].getAttribute('aria-label');
    const splitTicketName = ticketName.split("-");
    var policyNo = splitTicketName[0].trim();
    var ownerName = splitTicketName[1].trim();

    return [policyNo, ownerName]
}

console.log(fetchTicketDetails());

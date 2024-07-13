
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function fetchTicketDetails(){
    const summaryBtn = document.getElementsByClassName("css-t0icuu");
    const ticketName = summaryBtn[0].getAttribute('aria-label');
    const splitTicketName = ticketName.split("-");
    var policyNo = splitTicketName[0].trim();
    var ownerName = splitTicketName[1].trim();

    const commentSection = document.getElementsByClassName("ak-renderer-document");
    const addressLine = commentSection[0].children[8].innerHTML;
    
    var address = addressLine.split("-")[1].trim();
    

    return [policyNo, ownerName, address]
}

function setInput(inputElement, inputValue){
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(inputElement, inputValue);
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
}


function setChngTeam(){
    var chngLabel = document.getElementById("customfield_17511-field-label");
    var parentDiv = (chngLabel.closest('div')).lastChild.firstChild;
    var inputChangeTeam = parentDiv.children[2].children[0].lastChild.firstChild;
    setInput(inputChangeTeam, "Reception");
    document.getElementsByClassName("select-customfield_17511__menu-list")[0].firstChild.click();
}

function setCategory(){

    var categoryInput = document.getElementsByClassName("select-customfield_12810__input-container")[0];
    setInput(categoryInput.firstChild, "Address/Phone number");
    document.getElementsByClassName("select-customfield_12810__menu-list")[0].firstChild.click();
}

async function createAddressChangeTicket(){
    const summaryInfo = fetchTicketDetails();
    const policyNumber = summaryInfo[0];
    const policyOwnerName = summaryInfo[1];
    const summaryString = policyNumber + " - " + policyOwnerName;
    const createBtn = document.getElementById("createGlobalItem");
    createBtn.click();
    await delay(1500);
    const inputSummary = document.getElementById("summary-field");
    setInput(inputSummary, summaryString);
    inputSummary.click();
    await delay(500);
    setChngTeam();
}


createAddressChangeTicket();

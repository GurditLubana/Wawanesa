javascript: (async function () {
    async function simulateScroll(element) {
    const distance = 2;
    const boundingRect = element.getBoundingClientRect();
    const startX = boundingRect.left + (boundingRect.width / 2);
    const startY = boundingRect.top + (boundingRect.height / 2);
    element.dispatchEvent(new MouseEvent('mousedown', {
        clientX: startX,
        clientY: startY,
        bubbles: true
    }));
    for (let step = 0; step < distance; step += 1) {
        element.dispatchEvent(new MouseEvent('mousemove', {
            clientX: startX,
            clientY: startY + step,
            bubbles: true
        }));
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    element.dispatchEvent(new MouseEvent('mouseup', {
        clientX: startX,
        clientY: startY + distance,
        bubbles: true
    }));
    await new Promise(resolve => setTimeout(resolve, 1000));
}
var navbar = (document.getElementsByClassName("css-3b7q7p")[0]).children[1];
var navLength = navbar.children.length;
const adrsChngNav = navbar.children[navLength - 3];
const rtrnMailNav = navbar.children[navLength - 4];
const currentDate = new Date();
console.log("Please wait, while report is being generated...");
let monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let targetMonth = monthsArray[currentDate.getMonth() - 6];
console.log("Target month is", targetMonth);
let rtrnMailPolicyList = {};
let rcvdAdrsList = {};
for (let i = 0; i < 6; i++) {
    rtrnMailPolicyList[monthsArray[currentDate.getMonth() - i]] = new Set();
    rcvdAdrsList[monthsArray[currentDate.getMonth() - i]] = new Set();
}
function addPolicy(policyNumber, month,list) {
    let currMonthList = list[month];
    if (!currMonthList.has(policyNumber)) {
        currMonthList.add(policyNumber);
    }
}
function deletePolicy(policyNumber) {
    let result = false;
    for (let i = 0; i < 6; i++) {
        let currMonthList = rtrnMailPolicyList[monthsArray[currentDate.getMonth() - i]];
        if (currMonthList.has(policyNumber)) {
            (rtrnMailPolicyList[monthsArray[currentDate.getMonth() - i]]).delete(policyNumber);
            addPolicy(policyNumber, monthsArray[currentDate.getMonth() - i],rcvdAdrsList);
            result = true;
        }
    }
    return result;
}
function countTotalMails(rtrnMailPolicyList){
    let finalCount = 0;
    for(let x = 0; x < 6; x++){
        let currMonthList = rtrnMailPolicyList[monthsArray[currentDate.getMonth() - x]];
        finalCount += currMonthList.size;
    }
    return finalCount;
}
function extractPolicyNum(policyNumText, isRMreport) {
    if (isRMreport) {
        policyNumText = policyNumText.split(" ");
        if ((policyNumText[0]).toLowerCase() === "fw:" || (policyNumText[0]).toLowerCase() === "cics" || (policyNumText[0]).toLowerCase() === "pass") {
            if ((policyNumText[0]).toLowerCase() === "fw:" && (policyNumText[1]).toLowerCase() === "cics") {
                return policyNumText[2];
            }
            else {
                return policyNumText[1];
            }
        }
        else {
            return policyNumText[0];
        }
    }
    else {

        let regex = /#\s*:?\s*(\S+)/;
        let match = policyNumText.match(regex);
        let policyNumber = match ? match[1] : null;
        return policyNumber;
    }
}
async function generateReport(isRMreport) {
    const rtnMailsList = document.querySelectorAll("._ca0q1b66._n3tdhkvd")[0];
    const scrollElement = document.querySelector('.track-vertical').firstChild;
    var allTickets = rtnMailsList.children;
    var countAdrsChanges = 0;
    for (var i = 0; i < 35; i++) {
        var eachTicket = allTickets[i];
        try {
            if (eachTicket && eachTicket.classList.contains("_4t3i2nrh")) {
                await simulateScroll(scrollElement);
                i = 7;
            }
            else {
                var eachCol = eachTicket.querySelectorAll("._1e0c1txw._4cvr1h6o._1tke1ylp._vchhusvi._1bsb1osq");
                if (eachCol[8] && eachCol[8].firstChild && eachCol[8].firstChild.firstChild && eachCol[8].firstChild.firstChild.firstChild) {
                    var dateCreated = eachCol[4].firstChild.firstChild.innerText;
                    var policyNumText = (eachCol[1].firstChild.firstChild.firstChild.innerText);
                    var policyNum = extractPolicyNum(policyNumText, isRMreport);
                    let month = dateCreated.substring(3, 6);
                    if (month === targetMonth) {
                        break;
                    }
                    if (isRMreport) { addPolicy(policyNum, month,rtrnMailPolicyList); } else {
                        countAdrsChanges += deletePolicy(policyNum) ? 1 : 0;
                    }
                }
            }
        }
        catch (e) {
            console.error("here is the error", eachTicket, e);

        }
    }
    var listName = isRMreport ? "Return Mails" : "New Addresses";
    var count = isRMreport ? countTotalMails(rtrnMailPolicyList) : countAdrsChanges;
    console.log("There were total", count, listName, "received from the month of", monthsArray[currentDate.getMonth() - 5], "to", monthsArray[currentDate.getMonth()]);
}
rtrnMailNav.firstChild.click();
await new Promise(resolve => setTimeout(resolve, 200));
await generateReport(true);
adrsChngNav.firstChild.click();
await new Promise(resolve => setTimeout(resolve, 200));
await generateReport(false);
let finalTime = new Date();
let diff = finalTime - currentDate;
let minutes = Math.floor(diff / 60000);
let seconds = ((diff % 60000) / 1000).toFixed(0);
console.log("List of Policies whose address we never received: ",rtrnMailPolicyList);
console.log("List of Policies whose address we received: ",rcvdAdrsList);
let executionTime = "Program took " + minutes + " minutes and " + seconds + " seconds to execute.";
console.log("Total number of policies with DONOT mail: ", countTotalMails(rtrnMailPolicyList), "(Meaning we didn't receive new address for these policies)");
console.log(executionTime);
})();

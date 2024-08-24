javascript:(async function(){
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
console.log(adrsChngNav);
console.log(rtrnMailNav);
let rtrnMailPolicyList = new Set();
let currentDate = new Date();
console.log("Please wait, while report is being generated...");
let monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let targetMonth = monthsArray[currentDate.getMonth() - 6];
function addPolicy(policyNumber) {
    if (!rtrnMailPolicyList.has(policyNumber)) {
        rtrnMailPolicyList.add(policyNumber);
    }
}
function deletePolicy(policyNumber) {
    if (rtrnMailPolicyList.has(policyNumber)) {
        rtrnMailPolicyList.delete(policyNumber);
        return true;
    }
    return false;
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

        let regex = /Policy #\s*:?\s*(\S+)/;
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
                    var resolutionDate = eachCol[8].firstChild.firstChild.firstChild.innerText;
                    var policyNumText = (eachCol[1].firstChild.firstChild.firstChild.innerText);
                    var policyNum = extractPolicyNum(policyNumText, isRMreport);
                    if (isRMreport) { addPolicy(policyNum); } else {
                        countAdrsChanges += deletePolicy(policyNum) ? 1 : 0;
                    }
                    let month = resolutionDate.substring(0, 3);
                    if (month === targetMonth) {
                        break;
                    }
                }
            }
        }
        catch (e) {
            console.error("here is the error", eachTicket, i, e);
            break;
        }
    }
    var listName = isRMreport ? "Return Mails" : "Address Changes";
    var count = isRMreport ? rtrnMailPolicyList.size : countAdrsChanges;
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
let executionTime = "Program took " + minutes + " minutes and " + seconds + " seconds to execute.";
console.log("Total number of policies with DONOT mail: ", rtrnMailPolicyList.size, "(Meaning we didn't receive new address for these policies)");
console.log(executionTime);
console.log(rtrnMailPolicyList);})();

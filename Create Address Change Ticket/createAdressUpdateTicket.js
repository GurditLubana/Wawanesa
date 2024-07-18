javascript: (
    function () {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
         function fetchTicketDetails() {
            const summaryBtn = document.getElementsByClassName("css-t0icuu");
            const ticketName = summaryBtn[0].getAttribute('aria-label');
            const splitTicketName = ticketName.split("-");
            var policyNo = splitTicketName[0].trim();
            var ownerName = splitTicketName[1].trim();
            const commentSection = document.getElementsByClassName("ak-renderer-document");
            const parentAddressLine = commentSection[0].children[8];
            if(parentAddressLine.children.length === 0){
                var addressLine = parentAddressLine.innerHTML;
                var index = addressLine.indexOf('-');
                var address = addressLine.substring(index + 1).trim();
            }
            else{
                var addressLine = parentAddressLine.children[0];
                var address = addressLine.children.length === 0 ? addressLine.innerHTML.trim() : addressLine.children[0].innerHTML.trim();
            }
            
            return [policyNo, ownerName, address]
        }
        function setInput(inputElement, inputValue) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(inputElement, inputValue);
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
        function setSummary(summaryString) {
            const inputSummary = document.getElementById("summary-field");
            setInput(inputSummary, summaryString);
            inputSummary.click();
        }
        function setChngTeam() {
            var chngLabel = document.getElementById("customfield_17511-field-label");
            var parentDiv = (chngLabel.closest('div')).lastChild.firstChild;
            var inputChangeTeam = parentDiv.children[2].children[0].lastChild.firstChild;
            setInput(inputChangeTeam, "Reception");
            document.getElementsByClassName("select-customfield_17511__menu-list")[0].firstChild.click();
        }
        function setCategory() {
            var categoryInput = document.getElementsByClassName("select-customfield_12810__input-container")[0];
            setInput(categoryInput.firstChild, "Address/Phone number");
            document.getElementsByClassName("select-customfield_12810__menu-list")[0].firstChild.click();
        }
        function setSource() {
            var categoryInput = document.getElementsByClassName("select-customfield_11118__input-container")[0];
            setInput(categoryInput.firstChild, "Phone");
            document.getElementsByClassName("select-customfield_11118__menu-list")[0].firstChild.click();
        }
        function setPolicyNumber(policyNumber) {
            var policyInput = document.getElementById("customfield_15113-field");
            setInput(policyInput, policyNumber);
        }
        function assignToMe() {
            var assignTomeBtn = document.getElementsByClassName("css-nsst23")[1];
            assignTomeBtn.click();
        }
        function clickCreateBtn(){
            var submitCreateBtn = document.getElementsByClassName("css-1jk3zmn")[0];
            submitCreateBtn.click();
        }
        async function setDescription(newAddress) {
            var date = new Date();
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var todaysDate = date.toLocaleDateString('en-US', options);    
            const description = `
            Check if address already updated: Completed - ${todaysDate}<br>
            Check LIF1: Completed - ${todaysDate}<br>
            Check LIND: Completed - ${todaysDate}<br>
            Check STCR: Completed - ${todaysDate}<br>
            Check Verify Postal Post: - Completed - ${todaysDate}<br>
            LifeEntry: Completed - ${todaysDate}<br>
            Check coding: Completed - ${todaysDate}<br>
            Upload to Filenet: Completed - ${todaysDate}<br>
            Check PASS: Complete - ${todaysDate}<br>
            New Address: <strong><em>${newAddress}</em></strong>
            `;
            const descriptionDiv = document.getElementById("ak-editor-textarea");
            descriptionDiv.click();
            await delay(500);
            descriptionDiv.innerHTML = `<p>${description}</p>`;
            descriptionDiv.dispatchEvent(new Event('input', { bubbles: true }));
            descriptionDiv.dispatchEvent(new Event('change', { bubbles: true }));
            await delay(500); 

        }
        async function createAddressChangeTicket() {
            const summaryInfo = fetchTicketDetails();
            const policyNumber = summaryInfo[0];
            const policyOwnerName = summaryInfo[1];
            const newAddress = summaryInfo[2];
            const summaryString = "Address Update Request - Policy # " + policyNumber + " - " + policyOwnerName;
            const createBtn = document.getElementById("createGlobalItem");
            createBtn.click();
            await delay(1500);
            setSummary(summaryString);
            await delay(500);
            setChngTeam();
            setCategory();
            setSource();
            setPolicyNumber(policyNumber);
            assignToMe();
            await setDescription(newAddress);
            clickCreateBtn();
        }
        createAddressChangeTicket();
})();

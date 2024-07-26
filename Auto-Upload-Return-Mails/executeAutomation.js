javascript: (
    function () {
        function extractPolicyNumber(fileName) {
            var splitFileName = (fileName.split(' '));
            var result = [splitFileName[0].trim()];
            var a = 1;
            var breakLoop = false;
            while(a < splitFileName.length && breakLoop === false){
                if(splitFileName[a] === "&"){
                    result.push(splitFileName[a+1].trim());
                    a = a + 2;
                    }
                else if(splitFileName[a] === "-"){breakLoop = true;}
                else{ 
                    a++;}
            }
            
            return result;
        }
        async function selectDocType(checkbox, delay,rows) {
            if (checkbox && !checkbox.checked) {
                checkbox.click();
            }
            await delay(5);
            var dropdown = rows[0].children[4];
            dropdown.click();
            await delay(5);
            var dropdownMenu = document.getElementsByClassName("k-animation-container");
            var ulContext = dropdownMenu[0].firstChild.lastChild.children[1].firstChild;
            ulContext.children[7].click();
            document.getElementById("_cascadeValuesButton_en").click();
            await delay(5);
        }
        async function processRows() {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            var tableBody = document.querySelector('.k-grid-content .k-selectable tbody');
            if (tableBody) {
                var rows = tableBody.children;
                var checkbox = rows[0].querySelector('input[type="checkbox"]');
                document.querySelectorAll('.k-grid-content .k-selectable tbody tr input[type="checkbox"]').forEach(cb => {
                    if (cb.checked) {
                        cb.click();
                    }
                });
                await selectDocType(checkbox, delay, rows);
                for (var i = 0; i < rows.length; i++) {
                    var checkbox = rows[i].querySelector('input[type="checkbox"]');
                    document.querySelectorAll('.k-grid-content .k-selectable tbody tr input[type="checkbox"]').forEach(cb => {
                        if (cb.checked) {
                            cb.click();
                        }
                    });

                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }

                    await delay(5);

                    var docName = (rows[i].children[2]).innerText;
                    var policyNumArray = extractPolicyNumber(docName);
                    for(var x in policyNumArray){
                        var policyNum = policyNumArray[x];
                        var numberInput = document.getElementById("_number_text");
                        numberInput.value = policyNum;
    
                        var addButton = document.getElementById("_AddButton");
                        addButton.click();
                        await delay(5);
    
                        var updateButton = document.getElementById("_update_selected");
                        updateButton.click();
                        await delay(5);
                    }
                    var clearButton = document.getElementById("_ClearButton");
                    clearButton.click();
                    await delay(5);
                    rows[i].children[6].click();
                    await delay(5);
                    var docNameInput = document.getElementById("docName");
                    docNameInput.value = '';
                    docNameInput.value = 'Return mail';
                    docNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                    docNameInput.dispatchEvent(new Event('change', { bubbles: true }));
                    await delay(5);
                }
            } else {
                console.error('Table body not found.');
            }
        }
        processRows();
    })();

async function simulateScroll(element) {

    const  distance = 2;
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
        await new Promise(resolve => setTimeout(resolve, 10)); 
    }

    element.dispatchEvent(new MouseEvent('mouseup', {
        clientX: startX,
        clientY: startY + distance,
        bubbles: true
    }));

    await new Promise(resolve => setTimeout(resolve, 1000)); 

}


var navbar = document.querySelector('div[aria-label="Team Priority"]');
var navLength = navbar.children.length;
const adrsChngNav = navbar.children[navLength -1];
const rtrnMailNav = navbar.children[navLength -2];


rtrnMailNav.firstChild.click();
await new Promise(resolve => setTimeout(resolve, 100));

const rtnMailsList=  document.querySelectorAll("._ca0q1b66._n3tdhkvd")[0];
const scrollElement = document.querySelector('.track-vertical').firstChild; 

var allTickets = rtnMailsList.children;
for( var i = 0; i < 35 ; i++){
var eachTicket = allTickets[i];
// console.log(eachTicket);
    try{

        if (eachTicket && eachTicket.classList.contains("_4t3i2nrh")) {
            // console.log(eachTicket);
            await simulateScroll(scrollElement);
            i = 7;
        }
        else{
    
            var eachCol = eachTicket.querySelectorAll("._1e0c1txw._4cvr1h6o._1tke1ylp._vchhusvi._1bsb1osq");
            if (eachCol[8] && eachCol[8].firstChild && eachCol[8].firstChild.firstChild && eachCol[8].firstChild.firstChild.firstChild) {
                var resolutionDate = eachCol[8].firstChild.firstChild.firstChild.innerText;
                console.log(i+1, resolutionDate);
                let month = resolutionDate.substring(0, 3);
                // console.log(month);
                if(month === "May"){
                break;
                }
                
            }
        }
    }
    catch{
            console.error("here is the error", eachTicket, i)
    }
}

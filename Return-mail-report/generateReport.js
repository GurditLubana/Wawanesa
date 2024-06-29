var navbar = document.querySelector('div[aria-label="Team Priority"]');
var navLength = navbar.children.length;
const adrsChngNav = navbar.children[navLength -1];
const rtrnMailNav = navbar.children[navLength -2];

rtrnMailNav.firstChild.click();
await new Promise(resolve => setTimeout(resolve, 1000));
var rtnMailsList=  document.querySelectorAll("._ca0q1b66._n3tdhkvd")[0];

var allTickets = rtnMailsList.children;
for( var i = 0; i < 5 ; i++){
    var eachTicket = allTickets[i];
    var eachCol = eachTicket.querySelectorAll("._1e0c1txw._4cvr1h6o._1tke1ylp._vchhusvi._1bsb1osq");
    var resolutionDate = eachCol[8].firstChild.firstChild.firstChild.innerText;
    console.log(eachCol[8].firstChild.firstChild.firstChild.innerText);
}

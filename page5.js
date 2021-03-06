/**************************CONSTANT DISPLAY IN EVERY PAGE/SCREEN*********************/
// open/close phone
const phoneBtn = document.getElementById('see-phone-btn');
const mobile = document.querySelector('.mobile');
const mobileScreen = document.querySelector('.screen')
const mobilePwrBtn = document.querySelector('.power-btn')
let pwrBtnCont = 0;
let pwrBtnOn = false;
let mobileOpen = false;
const phoneReturnBtn = document.querySelector('.phone-return-div');

//phone screen contact
const phoneIcon = document.getElementById('phone-icon');
const phoneContactDiv = document.querySelector('.contact-div')
const phoneHeaderContact = document.getElementById('header-contacts-txt')
const phoneBodyContact = document.querySelector('.body-contacts')

const phonePhoneLog = document.getElementById('header-phone-txt')
const phoneBodyPhoneLog = document.querySelector('.body-phoneLog')
const phoneLabelDiv = document.querySelector('.body-phoneLog #keypad-txtbox')
const phoneKeypadNumber = []
for(let i = 0; i < 9; ++i){
	phoneKeypadNumber[i] = document.getElementById(i)
}

phoneIcon.addEventListener('click', function(){
	phoneContactDiv.style.visibility = "visible"
	phoneHeaderContact.style.color = "green"
	phoneBodyContact.style.visibility = "visible"
},false)

phoneHeaderContact.addEventListener('click', function(){
	phonePhoneLog.style.color = "black"
	phoneBodyPhoneLog.style.visibility = "hidden"

	phoneHeaderContact.style.color = "green"
	phoneBodyContact.style.visibility = "visible"
},false)

phonePhoneLog.addEventListener('click', function(){
	phonePhoneLog.style.color = "green"
	phoneBodyPhoneLog.style.visibility = "visible"

	phoneLabelDiv.focus()

	phoneHeaderContact.style.color = "black"
	phoneBodyContact.style.visibility = "hidden"
},false)

function inputKeypadPhone(event){
	// let numCode = event.keyCode
	// if(false){
	// 	console.log("true")
	// 	let numString = String.fromCharCode(numCode)
	// 	phoneLabelDiv.textContent = phoneLabelDiv.textContent + numString
	// }else{
	// 	console.log("false")
	// }
	var charCode = (event.which) ? event.which : event.keyCode;
	if (charCode != 46 && charCode > 31 
	  && (charCode < 48 || charCode > 57))
	   return false;

	return true;
}

//variables for message div
const msgIcon = document.getElementById('message-icon');
const msgNotif = document.querySelector('.notif-div');

const msgDiv = document.querySelector('.message-div');

//convo 1
const convo_one = document.querySelector('.convo-1');
const frnd_one = document.querySelector('.friend-1')
const msgNotifConvo1 = document.querySelector('.notif-div-convo-1');

//convo 2
/*
	note: every hour or every 2 hours , someone will message the users
	convo 2 will appear when it is 8 AM
	convo 3 - N is still to be determine
*/
let showConvo_two = false;
const convo_two = document.querySelector('.convo-2');
const frnd_two = document.querySelector('.friend-2')
const msgNotifConvo2 = document.querySelector('.notif-div-convo-2');
let showNotifFriend2 = false;

//reminder to turn off phone before leaving the phone view
const reminderDiv2 = document.querySelector('.reminder-div-2');

//map div
const mapBtn = document.getElementById('see-map-btn');
const map = document.querySelector('.map-div');
let mapOpen = false;

//items div
const itemsBtn = document.getElementById('see-items-btn');
const itemsDiv = document.querySelector('.items-div')
const inventoryDiv = document.querySelector('.inventory-div');
let itemsOpen = false;

//clock div
const clock = document.querySelector('.clock')
let am_pm = document.querySelector('.A-P-span');
let phoneAM = true

//variables for clock
const deg = 6;
const  hr =document.querySelector('#hr');
const  mn =document.querySelector('#mn');
const  sc =document.querySelector('#sc');

// ********************NEWLY CONSTANT VARAIBLES********************

const main = document.querySelector('.main')
const elipsis = document.querySelector('.elipsis')
var ellipsis_Is_visible = true

//all message bar and its child paragraph
const msgBar_P = document.querySelector('.characters-message-bar p')

//room ID
const roomImg = document.querySelector('#room')

//phone date text 
const phoneTime = document.getElementById('phone-time')



let clockVar;

let hh = 7;
let mm = 0;
let ss = 0;

function onload(){
	itemsBtn.style.pointerEvents = "none"
}

clockLoad()

if (localStorage.getItem("minutes") !== null) {
    mm = localStorage.getItem("minutes");
    mm = parseInt(mm)
}

if (localStorage.getItem("hours") !== null) {
    hh = localStorage.getItem("hours");
    hh = parseInt(hh)
}

function clockLoad(){
	clockVar = setInterval(function(){
			clearInterval(clockVar)
			ss++;

			if(ss == 360){
				ss = 0;
				mm += 15;
			}

			if(mm == 360){
				mm = 0;
				hh += 1;
			}

			if(hh == 24){
				// end of the day
				clearInterval(clockVar)
			}

			hr.style.transform = "rotate(" + (hh * 30) + "deg)";
			mn.style.transform = "rotate(" + (mm) + "deg)";

			localStorage.setItem("minutes",mm);
			localStorage.setItem("hours",hh);

			//6:30pm
			//also update the time in the phone
			let mm_str = parseInt(mm/6)

			if(mm_str <= 9){
				phoneTime.textContent = (phoneAM) ?  hh + ":0" + mm_str +  "am" :  hh + ":0" + mm_str + "pm"
			}else{
				phoneTime.textContent = (phoneAM) ?  hh + ":" + mm_str +  "am" :  hh + ":" + mm_str + "pm"
			}

			
			// second message/convo shows up
			if(hh == 8){
				showConvo_two = true;
				showNotifFriend2 = true
			}

			//am or pm
			if(hh >= 12){
				am_pm.textContent = "P"
				phoneAM = false
			}else{
				am_pm.textContent = "A"
				phoneAM = true
			}
	}, 20)
}

phoneBtn.addEventListener('click' , function(){

	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
	if(itemsOpen == true){
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "hidden"
		inventoryDiv.style.visibility = "hidden"
	}

	if(mobileOpen == true){
		/* the USER can't close the PHOVE VIEW if he/she didnt close his phone*/
		if(pwrBtnOn == true){
			reminderDiv2.style.visibility = "visible";
		}else{
			reminderDiv2.style.visibility = "hidden";
			mobile.style.right = "-590px"
			mobileOpen = false;
			mobile.style.visibility = "hidden"
		}
	}else{
		mobile.style.right = "90px"
		mobileOpen = true;
		mobile.style.visibility = "visible"


	}

	/* second convo/message will pop , only if the USER click the PHONE VIEW btn and open his/her phone at 8 AM
	*/
	if(showNotifFriend2 == true){
		msgNotif.style.visibility = "visible"
		showNotifFriend2 = false;
	}

}, false)

mobilePwrBtn.addEventListener('click' , function(){

	//update whether the power btn has clicked or not/ the phone is open or not
	if(pwrBtnOn == true){
		pwrBtnOn = false;
	}else{
		pwrBtnOn = true;
	}

} , false)

/*end ofphone open/close btn*/

/*PHONE MESSAGES FUNCTIONS*/
$(document).ready(function(){
	$('.power-btn').click(function(){
		$('.screen').toggleClass('active')

		/*when the USER turns off the phone . all DIV (convo 1, convo 2) will automatically close also*/

		msgDiv.style.visibility = "hidden"

		//convo -1
		convo_one.style.visibility = "hidden"
		frnd_one.style.visibility = "hidden"

		//convo -2
		convo_two.style.visibility = "hidden"
		frnd_two.style.visibility = "hidden"

		//contact div
		phoneContactDiv.style.visibility = "hidden"
		phoneBodyContact.style.visibility = "hidden"
		phoneBodyPhoneLog.style.visibility = "hidden"
	})
})

msgIcon.addEventListener('click' , function(){
	/* when the USER clicks the message icon on the phone , and reads the convo 1 or the other unopened convo , the notification
	message will be hidden.
	*/
	msgDiv.style.visibility = "visible"
	convo_one.style.visibility = "visible"
	msgNotif.style.visibility = "hidden"

	if(showConvo_two == true){
		convo_two.style.visibility = "visible";
	}
},false)

phoneReturnBtn.addEventListener('click' , function(){

	/* when the user press the back button of the phone , the screen of the phone will return to home screen and close all the convos*/
	frnd_one.style.visibility = "hidden";
	msgDiv.style.visibility = "hidden"	


	//convo -1
	convo_one.style.visibility = "hidden"
	frnd_one.style.visibility = "hidden"

	//convo -2
	convo_two.style.visibility = "hidden"
	frnd_two.style.visibility = "hidden"

	//contact div
	phoneContactDiv.style.visibility = "hidden"
	phoneBodyContact.style.visibility = "hidden"
	phoneBodyPhoneLog.style.visibility = "hidden"

},false)


convo_one.addEventListener('click' , function(){
	convo_one.style.visibility = "hidden";
	msgNotifConvo1.style.visibility = "hidden"
	frnd_one.style.visibility = "visible";

	//hide others convo
	convo_two.style.visibility = "hidden";
	
} , false)

convo_two.addEventListener('click' , function(){
	convo_two.style.visibility = "hidden";
	msgNotifConvo2.style.visibility = "hidden"
	frnd_two.style.visibility = "visible";

	//hide others convo
	convo_one.style.visibility = "hidden";
	
} , false)
/*end of PHONE MESSAGES FUNCTIONS*/


// map div functions
mapBtn.addEventListener('click', function(){
	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
	if(itemsOpen == true){
		itemsDiv.style.right = "-400px";
		inventoryDiv.style.right = "-400px";

		itemsOpen = false

		itemsDiv.style.visibility = "hidden"
		inventoryDiv.style.visibility = "hidden"
	}

	if(mobileOpen == true){
		mobile.style.right = "-590px";
		mobileOpen = false
		mobile.style.visibility = "hidden"
		
	}

	/* to hide and unhide the MAP whenever the user click the MAP VIEW btn*/
	if(mapOpen == false){
		map.style.visibility = "visible"
		map.style.right = "0px";
		mapOpen = true
	}else{
		map.style.right = "-555px";
		mapOpen = false
		map.style.visibility = "visible"
	}
} , false)

// items div functions
// itemsBtn.addEventListener('click', function(){

// 	//whenever user click another NAV BTNs , it will automaitcally close . so the MAP INVENTROY and PHONE VIEW will not overlap
// 	if(mobileOpen == true){
// 		mobile.style.right = "-590px";
// 		mobileOpen = false
// 		mobile.style.visibility = "hidden"
		
// 	}

// 	//to hide and unhide the INVENTORY whenever the user click the INVENTORY VIEW btn
// 	if(itemsOpen == false){
// 		itemsDiv.style.visibility = "visible"
// 		itemsDiv.style.right = "80px";

// 		inventoryDiv.style.visibility = "visible"
// 		inventoryDiv.style.right = "120px";

// 		itemsOpen = true
// 	}else{
// 		itemsDiv.style.right = "-400px";
// 		inventoryDiv.style.right = "-400px";

// 		itemsOpen = false

// 		itemsDiv.style.visibility = "visible"
// 		inventoryDiv.style.visibility = "visible"
// 	}
// } , false)


/**************************END CONSTANT DISPLAY IN EVERY PAGE/SCREEN**************************/

//page5 variables

//yes no promt variables
const yesNoBtn = document.querySelector('.yes-no-btn')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
let clicked_yes = false
let clicked_no = false

//convo variables
let done_JM_message = true
let done_Juls_message = false
let yes_done_JM_message2 = false
let no_done_JM_message2 = false
let done_JM_fading = false
let done_final_Juls_Msg = false

// need to click users phone number div
const clickMyNumber = document.querySelector('.click-myNumber-div')
let done_getting_number = false

//character JM
const char_Jm = document.getElementById('character-JM')

function spaceBarPressed(event){
	if(ellipsis_Is_visible){
		var spaceBarCode = event.keyCode
		if(spaceBarCode == 32 && done_JM_message){
            msgBar_P.textContent = "Juls: Oh that’s great. Nice to meet you man. I’m Juls."
            done_JM_message = false
            done_Juls_message = true
        }else if(spaceBarCode == 32 && done_Juls_message){
            msgBar_P.textContent = "JM: My friend Allen is throwing a party tonight at his place, so we will be seeing you there?"
            done_Juls_message = false
            elipsis.style.visibility = "hidden"
            ellipsis_Is_visible = false
            yesNoBtn.style.visibility = "visible"
        }else if(spaceBarCode == 32 && clicked_yes){
            msgBar_P.textContent = "JM: Oh so you guys are friends, I already asked him a while go! That’s great the more the merrier right"
            clicked_yes = false
            yes_done_JM_message2 = true
        }else if(spaceBarCode == 32 && yes_done_JM_message2){
            msgBar_P.textContent = "JM: Let me get your number, so I can text you the address."
            yes_done_JM_message2 = false
            elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false
			
			phoneIcon.style.pointerEvents = "auto"
		}else if(spaceBarCode == 32 && done_getting_number){
            msgBar_P.textContent = "JM: Okay cool! Well see ya later at the party."
			done_getting_number = false
			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false
			let jmInt = 9
			let jmVar = setInterval(function(){
				if(jmInt == -1){
					elipsis.style.visibility = "visible"
					ellipsis_Is_visible = true
					done_JM_fading = true
					clearInterval(jmVar)
				}else{
					char_Jm.style.opacity = "0." + jmInt
				}
				jmInt -= 1
			}, 200)
        }else if(spaceBarCode == 32 && clicked_no){
            msgBar_P.textContent = "JM: Well that was unfortunate. If you change your mind, you can contact Alvin for the address."
            clicked_no = false
            no_done_JM_message2 = true
		}else if(spaceBarCode == 32 && no_done_JM_message2){
            msgBar_P.textContent = "JULS: Alright. Thanks for the invite anyways."
			no_done_JM_message2 = false
			elipsis.style.visibility = "hidden"
			ellipsis_Is_visible = false
			let jmInt = 9
			let jmVar = setInterval(function(){
				if(jmInt == -1){
					elipsis.style.visibility = "visible"
					ellipsis_Is_visible = true
					done_JM_fading = true
					clearInterval(jmVar)
				}else{
					char_Jm.style.opacity = "0." + jmInt
				}
				jmInt -= 1
			}, 200)
        }else if(spaceBarCode == 32 && done_JM_fading){
            msgBar_P.textContent = "JULS: : Our lesson is coming up! This gonna be interesting I believed, because it is only first day. "
			done_JM_fading = false
			done_final_Juls_Msg = true
		}else if(spaceBarCode == 32 && done_final_Juls_Msg){
            alert("Page6.html")
			done_final_Juls_Msg = false
		}
    }
}

yesBtn.addEventListener('click' , function(){
    msgBar_P.textContent = "Juls: Oh yeah sure, you don’t mind if I bring a plus one? He is Jim; he is also one of our classmates here."
    clicked_yes = true
    elipsis.style.visibility = "visible"
    ellipsis_Is_visible = true
    yesNoBtn.style.display = "none"
}, false)

clickMyNumber.addEventListener('click', function(){
	msgBar_P.textContent = "Juls: Yeah no problem. Here."
	done_getting_number = true
	elipsis.style.visibility = "visible"
	ellipsis_Is_visible = true
	clickMyNumber.style.display = "none"
})

noBtn.addEventListener('click' , function(){
    msgBar_P.textContent = "Juls: I don’t think so. I have other plans tonight, so yeah, you guys have fun tonight tho."
    clicked_no = true
    elipsis.style.visibility = "visible"
    ellipsis_Is_visible = true
    yesNoBtn.style.display = "none"
}, false)
// ===============
// ********  DEMO  *******
// ===============

// Demo tone frequencies should cover most of range of possible tones.
// * Note: values are 2x the actual frequency because of the way they are named
var demo_tones = [600,1500,3400,5600];

// ******************************* response 1 -- ask questions ******************************************    
	document.getElementById('Dbutton1').onclick = function() {
			//s1[300*2].play();
			//s[demo_tones[0]].play();
			//s.get(demo_tones[0]).play();
			playSnd(audioCtx, s.get(demo_tones[0]), audioCtx.currentTime);
	} 
// ******************************* response 2 -- ask questions ******************************************    
	document.getElementById('Dbutton2').onclick = function() {
			//s1[800*2].play();
			//s[demo_tones[1]].play();
			// s.get(demo_tones[1]).play();
			playSnd(audioCtx, s.get(demo_tones[1]), audioCtx.currentTime);
	} 
// ******************************* response 3 -- ask questions ******************************************    
	document.getElementById('Dbutton3').onclick = function() {
			//s1[1500*2].play();
			//s[demo_tones[2]].play();
			// s.get(demo_tones[2]).play();
			playSnd(audioCtx, s.get(demo_tones[2]), audioCtx.currentTime);
	} 
// ******************************* response 4 -- ask questions ******************************************    
	document.getElementById('Dbutton4').onclick = function() {
			//s1[2700*2].play();
			// s[demo_tones[3]].play();
			// s.get(demo_tones[3]).play();
			playSnd(audioCtx, s.get(demo_tones[3]), audioCtx.currentTime);
	} 
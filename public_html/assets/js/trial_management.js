// ======
// Experiment IDs
// ======
var exp_id = 1;
var task_id = 0; // task_id

// ======
// Trial info
// ======
var duration = 100; // duration of each tone (used for scheduling tone 2)
var offset = 50; // number of ms before the buttons appear

// ================
// ******* Training ******* 
// ================
var trainingLength=5; //30
var trainingTrial=0;
var trainCorrect=0;

// ====================
// ******* Task! ******* 
// =====================
var nTrials = 160; //300 //160
	// number of trials per 2 blocks
var nTrainingTrials = 5;
var nAdaptTrials = 60; //60
var trial=0;
var block=0;
var pauseTime=80; //100 //80
	// number of trials before the break (in between blocks)
var breaks=0;

var response=[];
//response = range(0,299);
var acc = [];
var JND = 0; // setup JND variable
var smt_scalings = [0.5,1,1.5,2]; // set of scalings of JND for tone differences in the main block
var smt_diff_touse = new Array();
var smt_set = [];

var allow=false;

var feedbackTrial = 1;
var feedbackBlock = 0; // don't show block feedback

// =====================
// ******* Adaptive ******* 
// =====================
//var trig; var reversal; var step; var stepVec=[]; var success; var R;
var success; var smt_step;
initAdapt();

var R_block = 1.05;
var avg;
var feedstr;

// ================
// ******* 	Training ******* 
// ================
function startTaskTraining(){
	//console.log(onset)
	//console.log(duration)
	//console.log(ISI)

	//================end training================
	// change trainCorrect condition to 10 -- at most 2 repeats of training block?
	if (trainingTrial==trainingLength || trainCorrect==10) {		
			$('#instAdapt').show();$('#nextAdapt').show();$('.textQuestion').hide();	
	//================continue to play tones ================		
	}else {	
		trainingTrial++;

		// Use AudioBuffers to play the sounds
		playTonePair(audioCtx, s.get(tone1Training[trainingTrial-1]), s.get(tone2Training[trainingTrial-1]),
			onset[trainingTrial-1], duration, ISI[trainingTrial-1]);
			// audio scheduler takes seconds, not milliseconds
		// show the buttons after presenting both tones
		callTimeoutTraining(onset[trainingTrial-1]+2*duration+ISI[trainingTrial-1]+offset,trial); 
	}
}


function callTimeoutTraining(time){ 
	setTimeout(function () {$('.Qbuttons').show();$('.textQuestion').show();},time);	
	// ******************************* response 1 -- ask questions ******************************************    
	document.getElementById('button1').onclick = function() {
		$('.Qbuttons').hide();
		if (tone1Training[trainingTrial-1]>tone2Training[trainingTrial-1]){
			$('#incorrect').show();
			trainCorrect=0;
		}else{
			$('#correct').show();
			trainCorrect++;
		}		
		setTimeout(function () {$('.feedback').hide();startTaskTraining();},500);
	} 	
	// ******************************* response 2 -- ask questions ******************************************    
	document.getElementById('button2').onclick = function() {
		$('.Qbuttons').hide();
		if (tone1Training[trainingTrial-1]>tone2Training[trainingTrial-1]){
			$('#correct').show();
			trainCorrect++;

		}else{
			$('#incorrect').show();
			trainCorrect=0;
		}
		setTimeout(function () {$('.feedback').hide();startTaskTraining();},500);
	} 	
}



// =====================
// ******* 	Task ******* 
// =====================
function startTask(){
	console.log('trial')
	console.log(trial)

// ========================= block over============================
	if (trial == nTrials){
		if (task_id==2) { // if it's the second task, there are 2 more blocks
			// Save the data
			save_data();
			$('#instMain2').show();$('#nextMain2').show();$('.textQuestion').hide();$('#counter').hide();
		} else {
			save_data();
			finish(); // show a finish screen for the block
		}
// ========================= continue to play tones============================
	}else {
		trial++;		
	
		// -----play first tone ------
		//console.log(tone1[trial-1])

		// Run the trial (which plays the sounds with appropriate timing)
		run_trial(audioCtx, tone1[trial-1], tone2[trial-1], onset[trial-1],
			duration, ISI[trial-1], trial);
	}
}



function callTimeout(time,trial){ 
	setTimeout(function () {
		$('.Qbuttons').show();$('.textQuestion').show();$('#counter').show();
		var writeTrials=(trial-pauseTime*breaks);
		document.getElementById("counter").innerHTML = "Trial:  "+writeTrials+ "/" +pauseTime;
	

		// ******************************* KEYBOARD responses ******************************************    
		// allow=true;
		// $( document ).keyup(function(e) { 
		// if(e.which == 49 && allow==true) {
		// 	keyAnswer1();
		// 	allow=false;   

		// } 
		// else if (e.which == 50 && allow==true) {
		// 	keyAnswer2();
		// 	allow=false;   	
		// }	
	// });
	},time);	

	// ******************************* MOUSE response 1 ******************************************    
	document.getElementById('button1').onclick = function() {	
		$('.Qbuttons').hide();	
		response[trial-1]=1;
		
		if (tone1[trial-1]>tone2[trial-1]){
			$('#incorrect').show();
			acc[trial-1] = 0;
		}else{
			$('#correct').show();
			acc[trial-1] = 1;
		}	
		//pressButton();
		// Check if it's time for a break
		if (trial%pauseTime==0 && trial<nTrials) {
			setTimeout(function () {$('.feedback').hide();doBreak();},500);		
			//doBreak();
		} else {
			setTimeout(function () {$('.feedback').hide();startTask();},500);
		}
		//setTimeout(function () {$('.feedback').hide();startTask();},500);
	} 	
	// ******************************* MOUSE response 2 ******************************************    
	document.getElementById('button2').onclick = function() {
		$('.Qbuttons').hide();	
		response[trial-1]=0;
		
		if (tone1[trial-1]>tone2[trial-1]){
			$('#correct').show();
			acc[trial-1] = 1;
		}else{
			$('#incorrect').show();
			acc[trial-1] = 0;
		}	
		//pressButton();
		// Check if it's time for a break
		if (trial%pauseTime==0 && trial<nTrials) {
			setTimeout(function () {$('.feedback').hide();doBreak();},500);		
			//doBreak();
		} else {
			setTimeout(function () {$('.feedback').hide();startTask();},500);
		}
		//setTimeout(function () {$('.feedback').hide();startTask();},500);
	} 	
}

//=============
function staircaseTask(){
	// Reset the trial to 0
	//trial = 1;
	if (trial == nAdaptTrials){
		// Save the data
		save_data();
		// Calculate the JND at the end
		JND = calculate_jnd(smt_set);
		// Calculate the semitone differences to use in the main block
		for (var ii = 0; ii<smt_scalings.length; ii++) {
			smt_diff_touse[ii] = smt_scalings[ii]*JND;
		}

		$('#instMain1').show();$('#nextMain1').show();$('.textQuestion').hide();$('#counter').hide();
	} else {
		trial++;
		// Display information about the trial
		console.log('trial');
		console.log(trial);
		console.log(smt_set[trial-1]); // display the frequency difference for this trial
		// Calculate and load s2
		if (Math.random()>0.5) {
			// s2>s1
			var dir = 1;
		} else {
			// s2<s1
			var dir = -1;
		}
		var f = Math.round(tone1[trial-1]/2 * 2**(dir*smt_set[trial-1]/12) * 2); // calculate the frequency of tone2
		tone2.push(f);
		// Load this tone
		fl_nm = 'http://localhost/tones/'+tone2[trial-1]+'.wav';
		//fl_nm = 'http://localhost/tones/'+tone2[trial-1]+'.flac';
		// load into an audio buffer, then start the trial once it's loaded
		getSnd(audioCtx,fl_nm)
			.then((sndBuffer) => {
				// make sure s1 has been loaded as well
				run_adapt_trial(audioCtx, tone1[trial-1], sndBuffer, onset[trial-1],
					duration, ISI[trial-1], trial);
			});
	}

	// finish();
}

// Feedback and next trial for staircaseTask
function callTimeoutAdapt(time,trial){ 
	setTimeout(function () {
		$('.Qbuttons').show();$('.textQuestion').show();$('#counter').show();
		var writeTrials=trial;
		document.getElementById("counter").innerHTML = "Trial:  "+writeTrials+ "/" +nAdaptTrials;
	

		// ******************************* KEYBOARD responses ******************************************    
		// allow=true;
		// $( document ).keyup(function(e) { 
		// if(e.which == 49 && allow==true) {
		// 	keyAnswer1();
		// 	allow=false;   

		// } 
		// else if (e.which == 50 && allow==true) {
		// 	keyAnswer2();
		// 	allow=false;   	
		// }	
	// });
	},time);	

	// ******************************* MOUSE response 1 ******************************************    
	document.getElementById('button1').onclick = function() {
		$('.Qbuttons').hide();		
		response[trial-1]=1;
		
		if (tone1[trial-1]>tone2[trial-1]){
			$('#incorrect').show();
			acc[trial-1] = 0;
		}else{
			$('#correct').show();
			acc[trial-1] = 1;
		}	
		//pressButton();
		// Determine the next smt
		adapt(acc[trial-1]);

		setTimeout(function () {$('.feedback').hide();staircaseTask();},500);
		//setTimeout(function () {$('.feedback').hide();staircaseTask();},500);
	} 	
	// ******************************* MOUSE response 2 ******************************************    
	document.getElementById('button2').onclick = function() {	
		$('.Qbuttons').hide();
		response[trial-1]=0;
		
		if (tone1[trial-1]>tone2[trial-1]){
			$('#correct').show();
			acc[trial-1] = 1;
		}else{
			$('#incorrect').show();
			acc[trial-1] = 0;
		}	
		//pressButton();
		// Determine the next smt
		adapt(acc[trial-1]);
		setTimeout(function () {$('.feedback').hide();staircaseTask();},500);
		//setTimeout(function () {$('.feedback').hide();staircaseTask();},500);
	} 
	// Determine the next smt
	// adapt(acc[trial-1]);
	// setTimeout(function () {$('.feedback').hide();staircaseTask();},500);
}

//============================================================
function pressButton(){
	$('.Qbuttons').hide();
	if (feedbackTrial == 1){
	// ====FEEDBACK======
		if (acc[trial-1]==0){
		$('#incorrect').show();
		}else{
		$('#correct').show();
		}
	}
	//=====================
	//if (trial%pauseTime==0) {		
	//	doBreak();
	//} else {
	//	setTimeout(function () {$('.feedback').hide();startTask();},500);
	//}
}

function doBreak(){
	$('.Qbuttons').hide();$('.textQuestion').hide();$('.feedback').hide();$('#counter').hide(); // hide linking to the next page
	// if (breaks==(nTrials/pauseTime-2)){
	// 	$('#break2').show();
	// } else if (breaks==(nTrials/pauseTime-1)) {
	// 	$('#break3').show();
	// } else {
	// 	$('#break').show();
	// }
	$('#break').show();
	//===================== showing block feedback=============
	// var sum = 0;
	// for (var ii = trial - pauseTime; ii < trial; ii++){
	//     sum =sum+ acc[ii]; //don't forget to add the base
	// }	
	// avg = Math.round(sum/pauseTime*100);
	
	//blockFeedbackAdaptivity(avg);

	if (feedbackBlock == 1){		
		console.log("You performed " + avg + feedstr)
		document.getElementById("blockFeed").innerHTML = "You performed " + avg + feedstr;
		$('#blockFeed').show();
	}
	//========================================================
	breaks++;
	$('#continue').show();
	document.getElementById('continue').onclick = function (){
		$('.inst').hide();$('#continue').hide();$('#blockFeed').hide();
		startTask();
	}
}

// Setup a function that executes an adaptive trial, but also waits until s1 (stored in s) is loaded
function run_adapt_trial(audioContext, tn1, s2, o, dur, isi, t) {
	// get the first tone (returns undefined otherwise)
	const s1 = s.get(tn1); 
	if (s1 != undefined) { // the first sound has been loaded
		playTonePair(audioContext, s1, s2, o, dur, isi);
		callTimeoutAdapt(o+2*dur+isi+offset,t); // note: offset is a global
	} else {
		// wait 20 ms (not too long)
		setTimeout(() => {run_adapt_trial(audioContext, tn1, s2, o, dur, isi, t)}, 20);
	}
}

// Setup a function that executes a trial, but also waits until both sounds are loaded
function run_trial(audioContext, tn1, tn2, o, dur, isi, t) {
	// get the first and second tone (returns undefined otherwise)
	const s1 = s.get(tn1);
	const s2 = s.get(tn2);
	if (s1 != undefined && s2 != undefined) {
		playTonePair(audioContext, s1, s2, o, dur, isi);
		callTimeout(o+2*dur+isi+offset,t); // note: offset is a global
	} else {
		// wait 20 ms before re-running (not too long)
		setTimeout(() => {run_trial(audioContext, tn1, tn2, o, dur, isi, t)}, 20);
	}
}

//=================== Keyboard pressing functions - needed because keyup cannot pass the variable trial ==================
function keyAnswer1(){
	response[trial-1]=0;
	if (tone1[trial-1]>tone2[trial-1]){
		acc[trial-1] = 1;
	}else{
		acc[trial-1] = 0;
	}
	pressButton();
}
function keyAnswer2(){
	response[trial-1]=1;
	if (tone1[trial-1]>tone2[trial-1]){
		acc[trial-1] = 0;
	}else{
		acc[trial-1] = 1;
	}
	pressButton();
}

//======= Function for tone presentaiton =======
function playTonePair(audioContext, s1, s2, o, dur, isi) {
	cT = audioContext.currentTime;
	// note: audio scheduler takes seconds, not milliseconds
	playSnd(audioContext, s1, cT+o/1000);
	playSnd(audioContext, s2, cT+(o+dur+isi)/1000);
}

// Setup function to play sound
function playSnd(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
}
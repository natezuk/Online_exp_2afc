// ######################## Start script only when JQuary finish loading ###########################
(function($){
$(document).ready(function(){

// ======================
// ******* Preparing stimuli ******* 
// ======================
// when JQuary finishes loading, preLoading functions is called from "pre_loads.js", 
//where all the initial loading preloading of stimuli happens 

/// Load only the demo and training data here

//$( "#progressbarPre" ).progressbar({value: 0.01});
$(window).load(function(){
	/// Setup conditions for main task
	// Select tone frequency range
	// ** This will probably be run when the webpage is first loaded
	if (Math.random()>0.5) {
		// high frequency first
		low_freq_range = [800,200]; // designate the lower frequency of each range
	} else {
		low_freq_range = [200,800];
	}

	// Select constant/random
	if (Math.random()>0.5) {
		// select random first
		cntrnd = [1,0];
	} else {
		// select constant
		cntrnd = [0,1];
	}

	// Setup the web audio context (for Web Audio API)
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	audioCtx = new AudioContext();

	// Now load the demo/training stimuli
	loadTrainingTones([400,1600],nTrainingTrials);
	preLoadingToneSet(tone1Training.concat(tone2Training,demo_tones))

	// Display the headphones when loading is done
	$('#next1').show();$('#headphones').show();$('#instHeadphones').show();
}); 


// ========================
// ******* Start experiment flow ******* 
// ========================
// When all tones.wav are loaded we see the headphones
// instructions and next1 button


// ============================
// ******* Click next1 --> Instructions ******* 
// ============================
document.getElementById('next1').onclick = function() {
	$('#next1').hide();$('#headphones').hide(); $('#instHeadphones').hide();
	$('#inst1').show();$('#next2').show();
} 

// ============================
// ******* Click next2 --> Demo ******* 
// ============================
document.getElementById('next2').onclick = function (){
	$('#next2').hide();$('#inst1').hide();$('#title1').hide(); // hide stuff
	$('.Dbuttons').show(); $('#next3').show(); $('#demo').show();$('#axis').show();
	audioCtx.resume(); // start the audio context here
	
// ============================
// ******* Click next3 --> Instructions ******* 
// ============================
document.getElementById('next3').onclick = function (){
	$('#next3').hide();$('.Dbuttons').hide();$('#demo').hide();$('#axis').hide();
	$('#inst2').show();$('#next4').show();
	}
}

// ============================
// ******* Click next4 --> Training ******* 
// ============================
document.getElementById('next4').onclick = function() {
	$('#inst2').hide();$('#next4').hide();
	// ================= Sampling initialization===================
	//loadTrainingTones([700,1550]);
	// loadTrainingTones([400,1600]);
	loadOnsets([500,500],nTrainingTrials); //500
	//loadDurations([220,220],nTrials); //220
	// Changed sound durations to 10, add 20 ms
	// loadDurations([120,120],nTrainingTrials); // 50 ms tone durations, add 20 ms?
	//loadISIs([750,750],nTrainingTrials); //800
	loadISIs([650,650],nTrainingTrials); // 100 ms less than the interonset interval of 750 ms
	// ==================================================
	startTaskTraining();
	// Save the data
	//save_data();
} 

/// Run the adaptive procedure and calculate the just noticeable difference 
// ====
// *** Staircase block ***
// ====
document.getElementById('nextAdapt').onclick = function() {
	$('#instAdapt').hide();$('#nextAdapt').hide();
	// Show loading screen briefly
	$('#loading').show();
	// Change the task id
	task_id = 1;
	/// Start by loading the first tones only
	loadTones([400,1600],[2],nAdaptTrials,1); 
		// the [2] for the semitone difference is a place holder since the second tones aren't calculated here
	loadOnsets([500,500],nAdaptTrials);
	//loadDurations([120,120],nAdaptTrials);
	//loadISIs([750,750],nAdaptTrials);
	loadISIs([650,650],nAdaptTrials);
	/// Preload the wavs for the first tones
	preLoadingToneSet(tone1.slice()); // .slice() copies the array and creates a new reference
		// otherwise tone1 will change in addition the local array in the function
	/// Start the adaptive task
	//s.get(Math.max(...tone1)).addEventListener('canplaythrough',staircaseTask());
	staircaseTask();
	// Save the data
	//save_data(); // now placed in staircaseTask()
	// $.post('data_collector', {postTone1: tone1, postTone2: tone2, postResponse: response,
	// 	postDuration: duration, postOnset: onset, postISI: ISI}, function(data){
	// 	//console.log(data);	       
   	// });
}

// ============================
// ******* Click next5 --> Task block1 ******* 
// ============================

/// For each block, preload the tones that will be used

document.getElementById('nextMain1').onclick = function (){
	$('#nextMain1').hide();$('#instMain1').hide();
// ================= Sampling initialization===================
	//Show loading screen briefly
	$('#loading').show();
	// Change the task id
	task_id = 2;
	loadTones([low_freq_range[0],low_freq_range[0]*4],smt_diff_touse,nTrials); // Vincent and Itay
	loadOnsets([500,500],nTrials);
	//loadDurations([120,120],nTrials);
	if (cntrnd[0]==1) { // random ISIs
		// loadISIs([500,1000],nTrials);
		loadISIs([400,900],nTrials);
	} else {
		//loadISIs([750,750],nTrials);
		loadISIs([650,650],nTrials);
	}
	// Load the stimuli for these two blocks
	preLoadingToneSet(tone1.concat(tone2));
// ==================================================
//finish(); // for automatic testing
	// Reset breaks to 0;
	breaks = 0;
	// Reset trial counter
	trial = 0;
	startTask(); 
	// Save the data
	//save_data();
}

document.getElementById('nextMain2').onclick = function (){
	$('#nextMain2').hide();$('#instMain2').hide();
	// ================= Sampling initialization===================
	//show loading screen briefly
	$('#loading').show();
	// Change the task id
	task_id = 3;
	//loadTones([500,2000],[1.005,1.1],nTrials); // Vincent and Itay
	loadTones([low_freq_range[1],low_freq_range[1]*4],smt_diff_touse,nTrials); // Vincent and Itay
	loadOnsets([500,500],nTrials);
	//loadDurations([120,120],nTrials);
	if (cntrnd[1]==1) { // random ISIs
		loadISIs([400,900],nTrials);
	} else {
		loadISIs([650,650],nTrials);
	}
	// Load the stimuli for these two blocks
	preLoadingToneSet(tone1.concat(tone2));
// ==================================================
//finish(); // for automatic testing
	// Reset breaks to 0
	breaks = 0;
	// Reset trial counter
	trial = 0;
	startTask(); 
	// Save data (happens in the 'finish' function)
	//save_data();
}


});
}(jQuery));

// function save_training_data(){
// 	$.post('data_collector', {postTone1: tone1Training, postTone2: tone2Training, postResponse: response, postDuration: duration, postOnset: onset, postISI: ISI}, function(data){
// 		//console.log(data);	       
//    	});
// }

function save_data(){
	$.post('data_collector', {postTone1: tone1, postTone2: tone2, postResponse: response, 
		postDuration: duration, postOnset: onset, postISI: ISI, taskID: task_id, expID: exp_id}, function(data){
		//console.log($task_id);	       
   	});
}

function finish(){

	$('.textQuestion').hide()
	document.getElementById("counter").innerHTML = "";

	$('#thanks').show()
	
	// Removed data saving, placed in startTask instead
	// $.post('data_collector', {postTone1: tone1, postTone2: tone2, postResponse: response, postDuration: duration, postOnset: onset, postISI: ISI}, function(data){
	//       //console.log(data);	       
    //  });
}

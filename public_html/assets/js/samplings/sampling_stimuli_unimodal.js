// ================================================================
// ***************************************** Sampling stimuli ****************************************
// ================================================================
var tones = [];
var tone1Training=[];
var tone2Training=[];

var tone1 = [];
var tone2 = [];

var onset = [];
var duration = [];
var ISI = [];



// ===================================
// ******* 	Tones training ******* 
// ===================================
function loadTrainingTones(range,nTrials){
	// Reset arrays
	tone1Training = [];
	tone2Training = [];
	//for (var jj=0;jj<50;jj++){ // looping number of total presentations	
	for (var jj=0;jj<nTrials;jj++) {	
				//tones = sampleUniform(range,[1.2,1.2],2); 
				tones = sampleToneFreqs(range,[4,4],2);
					tone1Training[jj] = tones[0];
					tone2Training[jj]= tones[1];
	}
}

// ===================================
// ******* 	Adaptive task ******* 
// ===================================
//function loadAdaptTones(range)

// ==================================
// ******* 	Tones task  ******* 
// ==================================
function loadTones(range,drange,nTrials,nt=2){
	// Reset tone1 and tone2 arrays
	tone1 = [];
	if (nt==2) { tone2 = []; }
	for (var jj=0;jj<nTrials;jj++){ // looping number of total presentations
			tones = sampleToneFreqs(range,drange,nt); 
			tone1[jj] = tones[0];
			if (nt==2) { tone2[jj] = tones[1]; }
	}
}

// ==============================
// ******* 	Onset  ******* 
// ==============================
function loadOnsets(range,nTrials){
	for (var jj=0;jj<nTrials;jj++){ // looping number of total presentations
			onset[jj] = sampleUniform(range,[0,0],1); 
	}
}

// ================================
// ******* 	Duration  ******* 
// ================================
function loadDurations(range,nTrials){
	for (var jj=0;jj<nTrials;jj++){ // looping number of total presentations
			duration[jj] = sampleUniform(range,[0,0],1); 
	}
}

// ============================
// ******* 	ISI  ******* 
// ============================
function loadISIs(range,nTrials){
	for (var jj=0;jj<nTrials;jj++){ // looping number of total presentations
			ISI[jj] = sampleUniform(range,[0,0],1); 
	}
}

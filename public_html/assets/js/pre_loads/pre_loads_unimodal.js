// ######################## Start script only when JQuary finish loading ###########################


// =================================
// ******* Loading wavs ******* 
// =================================
//var s1=[];  //containers for the wavs
//var s2=[];
//var s=[]; // use one container for all sounds
var s=new Map(); // use a map to tag sounds by their 2x frequency values
var preLoaded=0; // counter for parallel load
var fails=0;
var numToLoad=0;
var low_freq_range; var cntrnd;
	// cntrnd == 0: constant condition
	// cntrnd == 1: random condition
//var ii;

// Load only at the beginning of each block

//var mode1 = [800,3200];
//var numToLoad = mode1[1] - mode1[0];
// ===============================
// ******* Preloading ******* 
// ===============================

// ====
// ** Preload specific tones **
// ====
function preLoadingToneSet(tone_freqs) { 
	// reset the mapping in s
	s = new Map();
	//let tone_freqs = tones; // copy the tones array (if it's global, it would be rearranged by this function)
	// tone_freqs specifies all of the frequencies that should be loaded
	// but first get the unique set of these tone frequencies, so tones aren't loaded twice
	tone_freqs.sort((a,b) => a-b); // ascending order
	// remove repeats
	var ii=1;
	var snd; // setup variable to store the temporary sound for each iteration
	while (ii<=tone_freqs.length) {
		if (tone_freqs[ii]==tone_freqs[ii-1]) {
			tone_freqs.splice(ii-1,1); // remove the previous value
			// don't increment ii (otherwise you will skip values)
		} else {
			ii++;
		}
	}
	// Set numToLoad to the number of stimuli being loaded
	numToLoad = tone_freqs.length;
	for (var ii=0;ii<tone_freqs.length;ii++){ // looping number of total presentations
		//name1='http://localhost/tones/'+tone_freqs[ii]+'.wav';
		name1='http://18.208.218.5/tones/'+tone_freqs[ii]+'.flac';

		// var snd_buffer = await getSnd(audioCtx, name1);
		//snd = new Audio(name1);
		// snd.addEventListener('canplaythrough', isPreLoad); 
		// snd.addEventListener('error', failFunc(fails)); 
		// snd.removeEventListener('canplaythrough',function(){}); 	
		// store it in the Map
		//s.set(tone_freqs[ii],snd);
		getSnd(audioCtx, name1)
			.then((audioBuffer) => {
				s.set(tone_freq[ii],snd_buffer);
			});
		// s[ii]= new Audio(name1);
		// s[ii].addEventListener('canplaythrough', isPreLoad); 
		// s[ii].addEventListener('error', failFunc(fails)); 
		// s[ii].removeEventListener('canplaythrough',function(){}); 		
	}						
}

// =================================
// ******* this functions counts parllel wav loading 
// and informs the pre-progressbar ******* 
// ================================
function failFunc(fails) {
	fails++;
}

function isPreLoad() {
	preLoaded++;
	//console.log(preLoaded)
	//console.log(fails)
	// drawProgressPre(preLoaded);
	if (fails>0 && preLoaded==(numToLoad-fails)){
				location.reload();
	}	
	if (preLoaded==numToLoad) {
		//s2=s1;
		$('.loading').hide(); 
		// $("#progressbarPre").progressbar( "destroy" ); 
		// $("#progressbarPre").hide();
		//$('#next1').show();$('#headphones').show();$('#instHeadphones').show();
	}
}

// Create an asynchronous function that loads a sound file and stores it in an AudioBuffer
async function getSnd(audioContext, filepath) {
	const response = await fetch(filepath);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	return audioBuffer;
}

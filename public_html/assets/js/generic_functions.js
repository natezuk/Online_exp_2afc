// ================================================================
// ***************************************** General functions ****************************************
// ================================================================

// ===================
// ******* Progress Bar ******* 
// ===================

 function drawProgressPre(preLoaded) {   
	val=preLoaded/numToLoad*100;     
                       
	//console.log(val);
	$( "#progressbarPre" ).progressbar({
	value: val
    });
  };



// ===================
// ******* Sample tones ******* 
// ===================
//according to (may change): Uniform sampling of "s1" in the range "range" and 
// Uniform sampling of s2|s1 in the range of dfrange (copied the matlab code) 
// Range 

// Change sampleUniform to pick with linear (non-log) sampling (18-7-2021)
function sampleUniform(range,dfrange,numSamples) {
	//----------------- sampling s1 --------------
		// var logrange = [Math.log(range[0]),Math.log(range[1])];
		// var logdfrange = [Math.log(dfrange[0]),Math.log(dfrange[1])];
		// var df = Math.random()*(logdfrange[1]-logdfrange[0])+logdfrange[0];
		// //var df = (logdfrange[1]-logdfrange[0])+logdfrange[0];
		// var f1 = Math.random()*(logrange[1]-logrange[0])+logrange[0];	
		var df = Math.random()*(dfrange[1]-dfrange[0])+dfrange[0];
		var f1 = Math.random()*(range[1]-range[0])+range[0];
		
		if (numSamples == 2){
			var f2;	
			if (Math.random()>0.5) {
				f2 = f1 + df;
			}else {
				f2 = f1 - df;
			}
		
			
			// while (f2>logrange[1] || f2<logrange[0]){
			// 	var f1 = Math.random()*(logrange[1]-logrange[0])+logrange[0];	
						
			// 	if (Math.random()>0.5) {
			// 		f2 = f1 + df;
			// 	}else {
			// 		f2 = f1 - df;
			// 	}
			// }
	
		//----------------- deciding who is s1 and who is s2 --------------
			if (Math.random()>0.5) {
				// t1 = Math.round(Math.exp(f1));
				// t2 = Math.round(Math.exp(f2));
				t1 = Math.round(f1);
				t2 = Math.round(f2);
			} else {
				t2 = Math.round(f1);
				t1 = Math.round(f2);
			}
				
			return [t1,t2];
		}
		else {
			//t1 = Math.round(Math.exp(f1));
			t1 = Math.round(f1);
			return t1;
		}
	}

// This samples tone frequencies, but based on log2 of the values and using a semitone range
// (it cannot be reapplied to other trial parameters, like durations or ISI)

function sampleToneFreqs(range,smtrange,numSamples) {
//----------------- sampling s1 --------------
	var logrange = [Math.log2(range[0]),Math.log2(range[1])];
	//var logdfrange = [Math.log(dfrange[0]),Math.log(dfrange[1])];
	// Randomly select a semitone difference 
	var dsmt = smtrange[Math.floor( Math.random() * smtrange.length )];
	//var dsmt = Math.random()*(smtrange[1]-smtrange[0])+smtrange[0];

	//var df = (logdfrange[1]-logdfrange[0])+logdfrange[0];
	var f1 = Math.random()*(logrange[1]-logrange[0])+logrange[0];	
	
	if (numSamples == 2){
		var f2;	
		if (Math.random()>0.5) {
			f2 = f1 + dsmt/12;
		}else {
			f2 = f1 - dsmt/12;
		}
	
		// Double the resulting frequency, then round.
		// Tone wavs are named for 2x the actual frequency
		t1 = Math.round((2 ** f1)*2);
		t2 = Math.round((2 ** f2)*2);
		return [t1,t2];
	}
	else {
		//t1 = Math.round(Math.exp(f1));
		t1 = Math.round((2 ** f1)*2);
		//return t1;
		return [t1];
	}
}


// ===================
// ******* Sample tones Markov ******* 
// ===================
//according to (may change): Uniform sampling of "s1" in the range "range" and 
// Uniform sampling of s2|s1 in the range of dfrange (copied the matlab code) 

function sample_s1_s2_markov(samples, frange, dfrange, mrange_close, mrange_far,inner){
	
    logdfrange = []
    logdfrange[0] = Math.log(dfrange[0]);
    logdfrange[1] = Math.log(dfrange[1]);
    
    logdfrange_dummy = []
    logdfrange_dummy[0] = Math.log(1.05);
    logdfrange_dummy[1] = Math.log(1.1);
    var randomizer = []
	randomizer = randInt(1,samples,20)
	
    var t1 = [];
    var t2 = [];
    t1[0] = Math.random() * (Math.log(frange[1]) - Math.log(frange[0])) + Math.log(frange[0]);
    t2[0] = t1[0] + (Math.random()*(logdfrange[1]-logdfrange[0]) + logdfrange[0]);
    if (Math.random()>0.5){
      t2[0] = t1[0] - (Math.random()*(logdfrange[1]-logdfrange[0]) + logdfrange[0]);
    }

    if (Math.random()>0.5){
      temp = t2;
      t2 = t1;
      t1 = temp;
    }

  	for (var ii = 1; ii < samples; ii++) {
      if (Math.random()>0.3){
        bias = 1;
        add_sub = Math.round(Math.random())*2-1;
        t1[ii] = 0.5*(t1[ii-1]+t2[ii-1]) + add_sub*(Math.random()*(mrange_close[1] - mrange_close[0])+ mrange_close[0]);
        while ((t1[ii] < Math.log(frange[0])) || (t1[ii] > Math.log(frange[1]))){
          add_sub = Math.round(Math.random())*2-1;
          t1[ii] = 0.5*(t1[ii-1]+t2[ii-1]) + add_sub*(Math.random()*(mrange_close[1] - mrange_close[0])+mrange_close[0]);
        }
      }else{
          bias = -1;
          add_sub = Math.round(Math.random())*2-1;
          t1[ii] = 0.5*(t1[ii-1]+t2[ii-1]) + add_sub*(Math.random()*(mrange_far[1] - mrange_far[0]) + mrange_far[0]);
          while ((t1[ii] < Math.log(frange[0])) || (t1[ii] > Math.log(frange[1]))){
            add_sub = Math.round(Math.random())*2-1;
            t1[ii] = 0.5*(t1[ii-1]+t2[ii-1]) + add_sub*(Math.random()*(mrange_far[1] - mrange_far[0]) + mrange_far[0]);
          }
      }
      dist = t1[ii] - 0.5*(t1[ii-1]+t2[ii-1]);
      if (any(randomizer,[ii])){
      	t2[ii] = t1[ii] + inner*bias*Math.sign(dist)*(Math.random()*(logdfrange_dummy[1]-logdfrange_dummy[0]) + logdfrange_dummy[0]);
	  }else{
      	t2[ii] = t1[ii] + inner*bias*Math.sign(dist)*(Math.random()*(logdfrange[1]-logdfrange[0]) + logdfrange[0]);
	  }
    }
  	for (var ii = 0; ii < samples; ii++) {
    	t1[ii] = Math.round(Math.exp(t1[ii]));
    	t2[ii] = Math.round(Math.exp(t2[ii]));
    }
    return [t1,t2]
}


// =========================
// *******  shuffle same-different ******* 
// =========================

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// =========================
// *******  Initialize adaptivity   ******* 
// =========================
function initAdapt() {
    //trig=-1; // signal for reversal
    //reversal=0; // reversals counter
    //step=0.045; // starting step size
    //stepVec=[0.02,0.01,0.005,0.001]; // other step sizes.
    success=0;
	var smt_start=2; // starting frequency difference in semitones
	smt_set=[smt_start]; // set up the semitone ranges to start
    //R=1.2; // starting ratio
}

// =========================
// *******  Perform adaptivity   ******* 
// =========================
/// This function does a 3-down 1-up staircase procedure
function adapt(acc) {
	if (acc == 1){ // following *correct* answer
		success++;
		if (success==3){  //step down
			//if (trig==0){
			//    reversal++;
			//}
			// Divide the semitones by half
			smt_set.push(smt_set[smt_set.length-1]/2);
			//if (R-step<1){
				//R=1.002;
			//} else {
				// R=R-step;
			//}
			success=0;
			//trig=1;
		} else { // if there are < 3 correct responses in a row
			smt_set.push(smt_set[smt_set.length-1]);

			}
	} else { // following *incorrect* answer
		success=0;     //step up
		//if (trig==1) {
		//    reversal++;
		//}
		//R=R+step;
		smt_set.push(smt_set[smt_set.length-1]*2); // double the semitone difference
		//trig=0;
	}
		
	//if (reversal>0 && (reversal%4)==0 && reversal<20) {
	//         step=stepVec[(reversal/4)-1];
	//}
}

// Function to calculate the JND
function calculate_jnd(smt_set) {
	/// Find the first reversal
	var ii = 0;
	while (smt_set[ii]<=smt_set[ii-1]) {
		// iterate through each trial as long as smt is <= the previous trial
		ii++;
	}
	var first_reversal = ii;

	/// Calculate the geometric average semitone difference from the first reversal
	/// (geometric average is more appropriate because intervals are doubled/halved each step)
	/// (geomean may be too inaccurate, change back to mean)
	/// (smt_set has one additional index, added after the last trial)
	var jnd_rev = 0;
	//var jnd_rev = 1;
	for (ii=first_reversal; ii<smt_set.length-1; ii++) {
		jnd_rev += smt_set[ii]; // sum the smt together after the first reversal
		//jnd_rev *= smt_set[ii]; // multiply smt into total
	}
	jnd_rev = jnd_rev/(smt_set.length-first_reversal-1);
	//jnd_rev = Math.pow(jnd_rev,1/(smt_set.length-first_reversal));

	/// Calculate the average from 8th trial
	var jnd_ntr = 0;
	for (ii=7; ii<smt_set.length-1; ii++) {
		jnd_ntr += smt_set[ii];
	}
	jnd_ntr = jnd_ntr/(smt_set.length-8);
	//jnd_ntr = Math.pow(jnd_ntr,1/(smt_set.length-7));

	/// Use the minimum of the two possible values
	/// (if subjects accidentally make a wrong choice early on, the second option
	/// will give them a more appropriate JND)
	jnd = Math.min(jnd_rev,jnd_ntr);

	// Return this value
	return jnd;
}

function blockFeedbackAdaptivity(avg) {
	
	if (avg<60){
			R_block=R_block+0.02;
			feedstr = "% correct in this block - Dont worry, you'll get better!" ;
			
		}else if (avg>59 && avg<75){
			R_block=R_block+0.01;
			feedstr = "% correct in this block- nice, lets see if you can do even better!" ;
			
		}else if (avg>74 && avg<86){
			feedstr = "% correct in this block- very good, keep it up!" ;
			
		}else if (avg>85 && avg<93){
			if (R_block >1.01) {
				R_block=R_block-0.01;
				feedstr = "% correct in this block- nice, good job!" ;
			}else{
				feedstr  =  "% correct in this block - nice, you're awfully good at this!" ;
			}
	
		} else if (avg>92){
			if (R_block>1.02){
				R_block=R_block-0.02;
				feedstr  =  "% correct in this block - nice, you're awfully good at this!" ;
			}else if (R_block>1.01) { 
				R_block=R_block-0.01;
				feedstr  =  "% correct in this block - nice, you're awfully good at this!" ;
			}else{
				feedstr  =  "% correct in this block - nice, you're awfully good at this!" ;
			}
			
		}		
		
		return feedstr
}



function range(lowEnd,highEnd){
	var list = [];
	for (var i = lowEnd; i <= highEnd; i++) {
	    list.push(i);
	}
	return list;
}


/* note - both should be arrays, for example arr = [1,2,3] and check = [1] */
function any(arr,check){
  var found = false;
  for (var i = 0; i < check.length; i++) {
    if (arr.indexOf(check[i]) > -1) {
        found = true;
        break;
    }
  }
  return(found);
  
}



function randInt(start,samples,select){
	var array = [];
	var randomizer = [];
	for (var ii = 0; ii < samples-1; ii++) {
	  array[ii] = ii+1
	}
	var temper = shuffle(array);
	for (var ii = 0; ii < select; ii++) {
	  randomizer[ii] = temper[ii]  ;
	}	
	return(randomizer);
}





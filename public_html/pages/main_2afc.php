<!-- ======================================= HTML======================================== -->

<!-- title -->
<h3 id="title1" >Auditory perception</h3>

<!-- ############### INST CLASS ################ -->

<!-- headphones -->
<div id="instHeadphones" class="inst">
<p>Please make sure you have your headphones set up and on you.</p>
<p>IMPORTANT: If you do not have a set of headphones, please do not proceed with the experiment</p>
<p>Press next to continue. To exit, simply close the tab</p>
<p>WARNING: Refreshing the browser will restart the experiment.</p>
</div>
<input type="button" id="next1" class = "passButtons" value="Next"  />

<!-- Sound level test -->


<!-- inst1 -->
<div id="inst1" class="inst">
<p><strong>In our lab we study auditory perception. You are now going to participate in a key task of our lab!</strong></p>
<p>In this experiment you will hear two tones (beeps) on each trial.</p>
<p>Your task is to judge if the first or the second tone has a higher pitch.</p>
</div>
<input type="button" id="next2" class = "passButtons" value="Next"  />

<!-- demo -->
<div id="demo" class="inst">
<p>What do I mean by "high" and "low" pitch? </p>
 <p>Let's get a feeling of "higher" and "lower" tones by pressing on these squares</p>
 <p>The tones <strong>increase</strong> in pitch from left to right - try it!</p>
 <p>Can you hear all of the tones? If not, make sure your headphones are connected,</p>
 <p>and set the volume so that you can comfortably hear all of them.</p>
 <br>
 <p>Got it? Great - press next</p>
</div>
<!-- demo buttons-->
<input type="button" id="Dbutton1" class = "Dbuttons" name = "button1" value=""  />
<input type="button"  id="Dbutton2" class = "Dbuttons" name = "button2" value=""  />
<input type="button" id="Dbutton3" class = "Dbuttons" name = "button3" value=""  />
<input type="button"  id="Dbutton4" class = "Dbuttons" name = "button4" value=""  />


<input type="button" id="next3" class = "passButtons" value="Next"  />

<!-- inst2 -->
<div id="inst2" class="inst">
<p>The task:</p>
<p>On each trial, two tones will be played consecutively: tone 1 --> tone 2</p>
<p>Your task: <i>Which of the two tones had the higher pitch?</i> </p>
<p><strong>If the first tone had a higher pitch, press 1. Otherwise press 2.</strong></p>
<p>We will begin with a short training session.</p>
</div>
<input type="button" id="next4" class = "passButtons" value="Next"  />

<!-- instAdapt -->
<div id="instAdapt" class="inst">
<p>Onto the main experiment!</p>
<p>The starting block has 60 trials that will last about 3 minutes.</p>
<p>Your task is the same as before:</p>
<p><strong>If the first tone had a higher pitch, press 1. Otherwise press 2.</strong></p>
<p><strong>Note:</strong> The trials will get very difficult, but there is always a correct answer.</p>
<p>If you don't know the answer - that's ok, just guess</p>
</div>
<input type="button" id="nextAdapt" class = "passButtons" value="Next"  />

<!-- inst3 -->
<!-- <div id="inst3" class="inst">
<p>Good job, now we can start the real task</p>
<ul>
<li>Its going to be a little different - each trial(question) will start with some wierd sounds, then a single tone will be played. 
	<br>Only then the tones you need to compare will be played:</li>
<br><li><strong>Wierd sounds -> single tone -> two tones you need to compare (like you did before)</strong></li>
<br><li>The time between the single tone and the two target tones will vary (could be up to a few seconds).</li>
<br><li>When the first tone to be compared will be played, a cue <strong>"Start trial!"</strong> will be displayed</li>
<br><li>The task will last for ~30 minutes, 6 blocks of 50 trials with breaks in between</li>
<br><li><strong>Note:</strong> Trials will be much harder now (there is always a correct answer), if you dont know the answer - that's ok, just guess </li>
<br><li>You can now also use the keyboard keys "1" and "2", the ones on the left of the keyboad (not the numped)</li>
</ul>
</div>-->

<!-- inst3 -->
<div id="instMain1" class="inst">
<p>Good job!</p>
<p>Next is the main task, which consists of 4 blocks of 80 trials each. It will take about 20 minutes in total.</p>
<!--<p><strong>Note:</strong> Trials will be harder now (there is always a correct answer), if you dont know the answer - that's ok, just guess </p>-->
<!--<p>You can now also use the keyboard keys "1" and "2", the ones on the left of the keyboad (not the numped)<p>-->
<!--<p>Lastly - this time there will be  <strong>NO</strong> feedback after each trial, but only after each block</p>-->
</div>
<input type="button" id="nextMain1" class="passButtons" value="Next" />

<div id="instMain2" class="inst">
<p>Good job!</p>
<p>You have two more blocks to go. The trials in these blocks will be a little different.</p>
<!--<p>Lastly - this time there will be  <strong>NO</strong> feedback after each trial, but only after each block</p>-->
</div>
<input type="button" id="nextMain2" class = "passButtons" value="Next" />


<!-- inst3 -->
<div id="inst4" class="inst">
<p>Great! you have finished the first block, only one more to go!</p>
<p>Take a minute to freshen up, when ready click next</p>
</div>
<input type="button" id="next6" class = "passButtons" value="Next"  />

<!-- demo2 -->
<div id="axis" class="inst">
<p>LOWER <------------------       ------------------ > HIGHER</p>
</div>

<!-- demo2 -->
<div id="demo2" class="inst">
<p>The corrent answer is number 2</p>
</div>

<!-- break-->
<div  id="break" class="inst">
<p>You finished a block. Good work!</p>
<p>Before continuing, feel free to take a break for a minute or two.</p>
</div>
<input type="button" id="continue" class = "passButtons" value="Continue"  />

<!--<div  id="break2" class="inst">
<p>One more block to go!</p>
<p>Before continuing, maybe take a minute or two to freshen up.</p>
</div>-->

<div  id="thanks" class="thanks">
<p>Thats it!</p>
<p>Many thanks for participating.</p>
<p>M-turk password: hey hey bokuto</p>
<p>You may close this window now.</p>
</div>

<p id="blockFeed"> </p>
<!-- ############### OTHER CLASSES ################ -->

<!-- Question -->
<div  class="textQuestion">
<p> Which of the two tones had a higher pitch? </p>
<!--<p id="counter"> </p>-->
</div>
<input type="image" id="button1"  class = "Qbuttons" src="assets/img/1.png" alt="1">
<input type="image" id="button2" class = "Qbuttons"src="assets/img/2.png" alt="2">
<div id="counter"> </div>

<!-- Loading -->
<div  class="loading">
<p>Loading the stimuli....</p>
<!--<p>This may take a moment to complete, please be patient.</p>-->
</div>


<!-- Task cue -->
<div  class="taskCue">
<p>Start trial!</p>
</div>

<!-- Prgress bar-->
<div id="progressbarPre"></div>

<!-- @@@@@@@@ images @@@@@@-->
<!-- Feedback -->
<p><img alt="" id='correct' class="feedback" src="assets/img/correct.png" alt="correct"></p>
<p><img alt="" id='incorrect' class="feedback" src="assets/img/incorrect.png" alt="incorrect"></p>
<!-- Headphones -->
<p><img alt="" id='headphones' class="headphones" src="assets/img/headphones.jpg" alt="headphones"></p>
<!-- @@@@@@@@ links @@@@@@-->
<!--<a href="main_routing_test.php" name="thanks" id="thanks" class="passButtons" alt="thanks">Finish and submit!</a>-->

<script>
$('.inst').hide();
$('.headphones').hide();
$('.passButtons').hide();
$('.Dbuttons').hide();
$('.textQuestion').hide();
$('.Qbuttons').hide();
$('.feedback').hide();
$('#blockFeed').hide();
$('#title1').hide();
$('.thanks').hide();
</script>




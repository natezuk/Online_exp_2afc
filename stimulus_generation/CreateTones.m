% Create the set of pure tones used in the two_tone_varyisi experiment
% Nate Zuk (2021)

frq = 150:0.5:5100; % set of stimulus frequencies (in Hz)
Fs = 44100; % sampling rate of the stimuli (in Hz)
tone_dur = 100; % duration of the tone (in ms)
ramp_time = 5; % duration of onset and offset cosine ramp
snd_path = '../tones/';

for n = 1:length(frq)
    % Create the tone
    t = (0:round(tone_dur/1000*Fs)-1)/Fs; % time array for the tone
    x = sin(2*pi*frq(n)*t)';
    % Apply the ramp
    x = apply_ramps(x,ramp_time,Fs);
    % Save the audio
    snd_fl = sprintf('%d.wav',frq(n)*2); % save at 2x the actual frequency,
        % so it can be saved as an integer value
    audiowrite([snd_path snd_fl],x,Fs);
    % Display that the sound has been saved
    disp(snd_fl);
end
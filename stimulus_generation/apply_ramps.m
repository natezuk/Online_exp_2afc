function y = apply_ramps(x,ramp_dur,Fs)
% For an input waveform 'x' apply cosine onset and offset ramps
% Inputs:
% - x = input waveform (should be a column array)
% - ramp_dur = duration of each ramp (in ms)
% - Fs = sampling rate of the waveform (in Hz)
% Outputs:
% - y = output waveform
% Nate Zuk (2021)

% Compute a window containing the ramp up and down for each tone
tone_duridx = length(x);
t_ramp = (0:ramp_dur/1000*Fs); t_ramp = t_ramp/max(t_ramp); % goes from 0 to 1 over the course of the rampe
ramp = -cos(pi*t_ramp)*0.5+0.5;
wnd = [ramp'; ones(tone_duridx-2*length(ramp),1); fliplr(ramp)'];

% apply the ramps
y = x.*wnd;
% Plot the spectra of a bunch of example tones

exmp_tones = 300*2.^(0:5);
% exmp_tones = 5000:5010;

tone_path = '../tones_flac/';

figure
subplot(2,1,1);
hold on
for ii = 1:length(exmp_tones)
    fl = sprintf('%d.flac',exmp_tones(ii));
    [a,rFs] = audioread([tone_path fl]);
    A = fft(a);
    frq = (0:length(A)-1)/length(A)*rFs;
    plot(frq,abs(A));
end
set(gca,'FontSize',14,'XScale','log','YScale','log');
xlabel('Frequency (Hz)');
ylabel('Magnitude');

subplot(2,1,2);
hold on
for ii = 1:length(exmp_tones)
    fl = sprintf('%d.flac',exmp_tones(ii));
    [a,rFs] = audioread([tone_path fl]);
    t = (0:length(a)-1)/rFs;
    plot(t*1000,a);
end
set(gca,'FontSize',14);
xlabel('Time (ms)');
ylabel('Waveform');
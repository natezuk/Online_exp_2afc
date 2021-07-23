% Plot the spectra of a bunch of example tones

exmp_tones = 300*2.^(0:5);

tone_path = '../tones_smallwav/';

figure
hold on
for ii = 1:length(exmp_tones)
    fl = sprintf('%d.wav',exmp_tones(ii));
    [a,rFs] = audioread([tone_path fl]);
    A = fft(a);
    frq = (0:length(A)-1)/length(A)*rFs;
    plot(frq,abs(A));
end
set(gca,'FontSize',14,'XScale','log','YScale','log');
xlabel('Frequency (Hz)');
ylabel('Magnitude');
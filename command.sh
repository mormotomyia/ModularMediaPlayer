Xvfb :42 -screen 0 3840x2160x24 -ac +extension GLX +render -noreset &> /dev/null &

DISPLAY=:42 chromium-browser ....
DISPLAY=:42 x11vnc
xthightvncviewer :0
DISPLAY=:42 import -silent -window root +repage miff:- | convert miff:- -scale 1920x1080 -fill '#0008' -draw 'rectangle 0,0,1920,50' -font '/usr/share/fonts/ttf-bitstream-vera/VeraMoBd.ttf' -pointsize 30 -fill white -annotate +800+30 "$P_DATE" -depth 8 screenshot.png


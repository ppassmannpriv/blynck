# blynck

So, I like blinking lights in rapid succession. Therefor I got into doing visuals and lightshows. There are really powerful and amazing tools out there like touchDesigner or Resolume Arena. These however are not open source and also not free. Free tools to control lights over stuff like DMX/ArtNet or similar stuff do exist, but are either not maintained anymore and closed-source or just not really great. This invoked the wish to make my own thing. WLED is amazing, LedFX is great too! If you just want to light up your living room, bed room or front yard or garden party - go check them out! blynck will not be for you, I promise.

Do you however want full control over every single lightpoint on your fixture, map them onto multiple universes and subnets on ArtNet, make scenes, chases and custom animations? Or even design complete stages yourself for a rave or concert? Well, I hope I can provide. 

For now I am at a very basic point and just got some stuff running to address a fixture over ArtNet. This is already cool and kinda snappy to be honest. 

## How to use
Well, this is made in JavaScript... eek, I know, how could i not make this in obscure Qt based apps that are hard to maintain or in Python or Rust or Go?! HOW COULD I?! Well, I know JavaScript. JavaScript runs everywhere - not in Java REEEEE JVM Runtime kinda way too. You will need to install node on your machine and maybe also please keep it sort of up to date. Once you downloaded this repository (I assume that you know how to) you just need to run ```npm install``` and wait for a minute or two. Once everything is installed you need 2 shells. The first one runs ```npm run backend``` the second one runs ```npm run serve```. Will this one day change? Most likely. Is this some kind of Proof of Concept alpha? Also yeah. I am working on it folks.

## What makes it tick?
The backend is basically just a small server that listens to a local websocket connection and parses info from that to a UDP socket to puke out stuff per ArtNet to your fixtures. I don't care if it is over WiFi or a wired connection. As long as it all is in the same LAN you will be fine. Frontend basically just yells at that websocket connection to make lights go on or off. (DMX is a VERY simple protocol)

## What to expect?
Not a lot. I am going to be honest with you. I do this as a hobby and nobody pays for this. Collaborate with me, if you want! Currently I am just going to make some models for my own custom fixtures. Next would probalby a good form of mapping fixtures out over all channels, universes and subnets. If you know anything about DMX and ArtNet, you know exactly what kind of headaches can pop up with large channel fixtures :). Should this all work I will try some good form of persistency. LocalStorage, sqlite, JSON files who knows?

## FAQ
You are still reading this? Well fuck, I haven't had any questions yet. Also not expecting any to be honest here. Interact with me and help me out, if you feel like it!
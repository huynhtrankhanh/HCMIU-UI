# Manual
## How to use the device
1. Plug the device into your computer
2. Navigate to https://gustatory.netlify.app with Google Chrome, Edge, or Brave
3. Click Connect Device, then select the device
4. Now you can change the intensity of each pump
## How to play the Crusgkeo game with the device
1. Navigate to https://gustatory.netlify.app
2. Open Chrome DevTools, type `localStorage.experience = "crusgkeo"`
3. Click Connect Device, then select the device
4. Now you can play the Crusgkeo game
5. **If you want to go back to the pump intensity screen,** open Chrome DevTools, type `localStorage.experience = ""`, then reload the page
## Why do I have to type a command?
This website was used for an experiment. I had to make changing the experience type hard because I didn't want the user to select the experience on their own.
## How do I develop my own game with this device?
Check out a simplified demo in [`pumpHTML/pump.html`](pumpHTML/pump.html). In this file you can see how you can talk to the device.

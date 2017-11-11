# Photoshop Test Panel
This panel/extension has no purpose, at the moment, it's more about learning how to develop an extension for Photoshop. If you want to try it out, you need to put the folder under %AppData%/Roaming/Adobe/CEP/extensions + you need to put Photoshop into debug mode in the registry HKEY_CURRENT_USER/Software/Adobe/CSXS.8 --> Add a new String key PlayerDebugMode and at to it the value 1.
You have to do that, because else it asks for an encyrpted signature to run, which for development purposes doesn't make much sense.

## Current Progress
![alt text](https://github.com/Zmote/PhotoshopTestPanel/blob/master/screenshots/testpanel.png)
![alt text](https://github.com/Zmote/PhotoshopTestPanel/blob/master/screenshots/animatedExample.gif)

Features:
- Add Named Layers
- Add Named Groups
- Add One-Point Perspective (with density and radius) at center
- Add One-Point Perspective at selection (with density and radius) at center

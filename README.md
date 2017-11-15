# Photoshop Test Panel
This panel/extension has no purpose, at the moment, it's more about learning how to develop an extension for Photoshop. If you want to try it out, you need to put the folder under %AppData%/Roaming/Adobe/CEP/extensions + you need to put Photoshop into debug mode in the registry HKEY_CURRENT_USER/Software/Adobe/CSXS.8 --> Add a new String key PlayerDebugMode and at to it the value 1.
You have to do that, because else it asks for an encyrpted signature to run, which for development purposes doesn't make much sense.

## Current Progress
![alt text](https://github.com/Zmote/PhotoshopTestPanel/blob/master/screenshots/testpanel.png)  
## Presentation Video
![Youtbe Video](https://www.youtube.com/watch?v=retbm9ffJTg&list=PLqPGjCOaSLWFjFn0jlo1Khh5U6gL6rAWp)

## Features
- ~~Add Named Layers~~
- ~~Add Named Groups~~
- Add One-Point Perspective (with density, radius,eye margin, start angle, stop angle) at center
- Add One-Point Perspective at selection (with density and radius) at center
- Add One-Point Perspective at Center calculated from multiple selections
- Add One-Point Perspective at Path Point
- Add One-Point Perspective at Center calculated from multiple Path Points
- Add Multi-Point Perspective at Path Point(s) (some settings are available for Multipoint that are available for One-Point, like radius, density etc.)
- Add One-Point/Multi-Point Perspective with simulated depth

I removed Add Named Layers and Ad Named Groups, because they didn't fit the context anymore.



# Sun Direction Toggle for 3D Fence Preview

## Overview

Add an interactive sun position slider to the 3D view that lets users rotate the directional light around the fence, showing how shadows fall at different times of day. The reference image shows a slider with a sun icon on the left and a "cloudy/shade" icon on the right, controlling the sun angle.

## UI Control

- A floating overlay panel in the top-right area of the 3D canvas (similar to the existing segment label overlay)
- Contains a horizontal slider with a sun icon on the left and a shade/overcast icon on the right
- Slider value maps to a 0-360 degree rotation of the main directional light around the fence
- Optionally includes a "Afmetingen tonen" (show dimensions) toggle, matching the reference

## How It Works

- The slider value (0 to 1) maps the sun's horizontal angle from east (morning) through south (noon) to west (evening)
- At the "sun" end (left): bright directional light, strong shadows, high intensity
- At the "shade" end (right): diffuse light, soft/minimal shadows, lower intensity -- simulating overcast conditions
- The directional light position is computed as a point on a circle around the fence, maintaining elevation
- Shadow direction rotates in real-time as the slider moves

## Technical Changes

### File: `src/components/fence-planner/ThreeDViewCanvas.tsx`

1. **Add state** for `sunAngle` (0-1 range) in the main `ThreeDViewCanvas` component
2. **Add UI overlay** with a slider, sun icon (Lucide `Sun`), and shade icon (Lucide `CloudFog` or `Cloudy`)
3. **Pass `sunAngle`** as a prop into `FenceScene`
4. **Compute light position** from `sunAngle`:
   - Horizontal angle: `sunAngle * Math.PI` (0 = east, PI = west)
   - Light position: `[radius * cos(angle), height, radius * sin(angle)]`
   - At high sunAngle values (toward shade end), reduce light intensity and increase ambient to simulate overcast
5. **Adjust shadow softness**: As the slider moves toward shade, increase shadow bias slightly for softer edges

### Light Calculation (pseudocode)

```text
angle = sunAngle * Math.PI          // 0 to PI (east to west)
radius = 12
x = radius * cos(angle)
z = radius * sin(angle)
y = 10 + 2 * sin(angle)             // sun higher at midday
intensity = lerp(1.8, 0.4, sunAngle) // bright sun to overcast
ambientBoost = lerp(0.15, 0.5, sunAngle)
```

### UI Layout

```text
+----------------------------------+
|  [sun icon]  ====O========  [cloud icon]  |
+----------------------------------+
```

- Positioned as an absolute overlay in the bottom-left or top-right of the 3D canvas
- Uses existing Shadcn Slider component
- Styled with `bg-background/80 backdrop-blur-sm` matching the existing overlays

## No New Dependencies

Uses existing Lucide icons (`Sun`, `Cloud`) and Shadcn `Slider` component already installed.


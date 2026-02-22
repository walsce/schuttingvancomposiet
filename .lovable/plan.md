
# Make 3D Fence Preview 10x More Realistic

## What Changes

The current 3D view uses basic flat colors, a tiny ground strip, and simple lighting. The reference images show a professional configurator with a large grass ground, realistic shadows, proper isometric camera angle, and detailed fence geometry.

## Improvements

### 1. Ground and Environment
- Replace the small green strip with a large grass-textured ground plane (20x20 meters) using a procedural noise pattern for realistic grass appearance
- Add a subtle grid overlay on the ground for spatial reference (matching the light grey grid in image 50)
- Use a soft sky-blue gradient background instead of flat grey-green
- Add fog for depth perception

### 2. Lighting and Shadows
- Add a shadow-casting directional light simulating the sun, with proper shadow map resolution (2048x2048)
- Add hemisphere light (sky blue from above, ground green from below) for natural ambient
- Enable shadow receiving on the ground plane
- Enable shadow casting on posts and panels
- Add a soft fill light from the opposite side to reduce harsh contrast

### 3. Post Geometry
- Make posts taller (extend 8cm above panel height as a cap)
- Add a detailed post cap (pyramid or flat cap on top)
- Use darker metallic material with higher metalness for realistic aluminum/steel look
- Add a base plate detail at the bottom of each post

### 4. Panel Materials
- Add subtle color variation per plank/slat for wood-grain realism
- Increase depth of panels slightly for more 3D effect
- Add a thin frame/rail at top and bottom of each panel section
- For "decorative" and "mosaic" styles, render as a semi-transparent mesh pattern (like the wire-mesh look in the reference)

### 5. Camera and Controls
- Set initial camera to an isometric-like angle (elevated, looking down at ~30 degrees) matching reference images
- Improve OrbitControls with smoother damping
- Better auto-fit margins so the fence is centered with plenty of ground visible

### 6. Dimension Lines (optional visual)
- Add 3D dimension arrows on the ground showing total fence length
- Small label sprites showing measurements

## Technical Details

### File Modified
- `src/components/fence-planner/ThreeDViewCanvas.tsx` -- full rewrite of the scene

### Key Changes in Code

**Ground**: Large `PlaneGeometry(40, 40)` with a custom green material. Add a second transparent grid plane on top.

**Shadows**: Enable `shadowMap` on Canvas, configure `directionalLight` with `shadow-mapSize={[2048, 2048]}`, set `shadow-camera` frustum to cover the fence area. All mesh objects get `castShadow` and ground gets `receiveShadow`.

**Posts**: Taller box geometry with `meshPhysicalMaterial` using metalness 0.7, roughness 0.3 for realistic metal. Add pyramid cap mesh on top.

**Panels**: Each plank/slat gets slight random color offset for wood grain. Use `meshPhysicalMaterial` with clearcoat for WPC-like sheen. Add horizontal rail meshes at top and bottom.

**Lighting setup**:
- `hemisphereLight` skyColor="#87ceeb" groundColor="#4a7c3f" intensity=0.4
- `directionalLight` position=[8, 12, 6] intensity=1.5 castShadow
- `directionalLight` position=[-4, 6, -3] intensity=0.3 (fill)

**Camera**: Initial position offset to give an elevated isometric perspective, FOV reduced to 35 for flatter look.

**Canvas config**: `shadows={{ type: THREE.PCFSoftShadowMap }}`, `dpr={[1, 2]}` for retina quality.

## No New Dependencies
All improvements use existing three.js and drei features already installed.

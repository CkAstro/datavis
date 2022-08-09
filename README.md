# DataVis

This project is available at [datavis.chriskolb.dev](https://datavis.chriskolb.dev).

The app allows you to view volumetric scalar data on the go. After uploading your data (or just using the default dataset), you may create multiple planar, spherical, or constant-value slices to explore the data however you want. The toolbar on the right allows you to rename the slices, adjust their values, and even toggle visibility of each individual piece. The app also offers a compare mode which splits the viewport in two and allows the user to adjust views independently. You may also save and load your sessions.

## How it Works

This project uses a custom voxel engine which reads data from an image file (lossless format). Image input is used because it allows large datasets (3 x 256^3 in the example on the app) can easily be compressed to very small files (e.g. three 64MB float[256\*\*3] data files reduced to a single ~5MB Uint8[3\*4096\*\*2] .png image), with virtually no loss in visual quality. This also significantly reduces communication time between client/server and required storage space once such a feature is added.

#### Why not THREE?

The main idea is to lose the overhead from THREE.js, since the majority of its features are not used - the app simply loads in a 3D Texture and performs ray marching and some simple math to render the scene. It was also a good opportunity to get a closer look at WebGL2 and the rendering pipeline.

That said, A THREE.js version (using `@react-three/fiber`) is in the works, mainly for comparison purposes. Eventually this will be used to add more advanced features to the app.

## Front End

The front end is primarily built using React and a light-weight, custom implementation of WebGL/GLSL (to avoid overhead from three.js) and communicates with the server using RESTful API calls.

## Back End

The back end runs on node/Express. The primary function is to process user-submitted data and re-serve it to the user in an easily-renderable format. Currently only data using a specific image format is supported, but more features are on the way.

## Imports not Working?

`jsconfig.json` may have issues with the `baseUrl` and `path` compiler options.\
Since node will always check `node_modules` for an import, a simple work-around is to create a new `node_modules` in `src` and add symlinks pointing back to the `src` directory. e.g.,

```
cd server/src/node_modules
ln -s .. @
```

and now you may use absolute imports: `import { gameService } from '@/services';`  
**Note**: This is automated with a post-install script in `server/packages.json`

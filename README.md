# DataVis

This project is available at [datavis.chriskolb.dev](https://datavis.chriskolb.dev).

The app allows you to view volumetric scalar data on the go. After uploading your data (or just using the default dataset), you may create multiple planar, spherical, or constant-value slices to explore the data however you want. The toolbar on the right allows you to rename the slices, adjust their values, and even toggle visibility of each individual piece. The app also offers a compare mode which splits the viewport in two and allows the user to adjust views independently. You may also save and load your sessions.

## Front End

The front end is primarily built using React and a light-weight, custom implementation of WebGL (to avoid overhead from three.js) and communicates with the server using RESTful API calls. 

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

# Run on docker
# Building the docker image
 Run the below command

``docker build . -t unyte-react-image:1.0 .``

Once the build is completed, let’s run

``docker image ls``

to list all the images. You should be able to see the newly created image.

# Create and run a container with the image
Execute the command

``docker run -d -p 8080:8080 unyte-react-image:1.0``

# Running the application
Go to localhost:8080.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

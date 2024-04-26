# Imagination App

Imagination App is a web application built with React and Vite. It allows users to generate random images with IA like GPT and Dall-e

## Run Locally

### Pre requisites

Make a copy from `.env.local.example` and rename it to `.env.local` and fill the variables with the correct values.

```bash
VITE_API_BASE_URL=
VITE_API_KEY_HEADER=
VITE_API_KEY=
```

The backend for this project is hosted on [Imagination API](https://github.com/diegohumpire/imagination-api) and runs throught an APIM instance on Azure. So you need to have an API key to access the endpoints. You can get one by contacting me.

Otherwhise you can run the backend locally by following the instructions on the [Imagination API](https://github.com/diegohumpire/imagination-api) repository. Or you can adapt the project to use another backend.

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Preview production locally

```bash
npm run preview
```

## TODO

- Improve UI for mobile
- Add more options for the image generation
- Mail notification for images generated

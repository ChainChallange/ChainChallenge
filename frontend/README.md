
### ChainChallenge Frontend Documentation 🖥️

---

## Figma Design Overview 🎨

The design for this frontend application is organized in Figma, which you can access [here](https://www.figma.com/design/0iUblelhNitipYEuloPimu/Hackthon?node-id=19-2&t=7GjMjwVuw2jS5zCf-1). The Figma file is structured as follows:

1. **Diagrams Page**: Contains all the diagrams used for planning and structuring the application.
2. **Prototyped Screens**: Includes all the prototyped screens that demonstrate the user interface and user flow.
3. **Component Repository**: A collection of reusable components used to build the pages. This repository ensures consistency across the application and speeds up the design process.

---

## Project Structure 📂

The project is organized in a way to ensure modularity and maintainability. Below is a brief overview of each folder and its purpose:

```
frontend/
├── .next/
├── node_modules/
├── api/
├── app/
├── context/
├── public/
│   └── (Assets)
├── components/
│   └── (Component Files)
├── models/
│   └── (Interfaces)
├── utils/
│   └── (Utility Files)
├── .env
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── yarn.lock
```

## How to Run the Application 🚀

To run the application locally, follow these steps:

1. **Install Dependencies**: Ensure you have Node.js and Yarn installed on your machine. If Yarn is not installed, you can install it globally using npm:
   ```bash
   npm install -g yarn
   ```

2. **Install Project Dependencies**: Navigate to the project directory and install the required dependencies:
   ```bash
   yarn 
   ```

3. **Run the Development Server**: Start the development server to run the application locally. This command will compile the project and serve it on a local server (usually `http://localhost:3000`):
   ```bash
   yarn dev
   ```

4. **Build for Production**: Compile the application for production. This step optimizes the build for better performance:
   ```bash
   yarn build
   ```

5. **Start the Production Server**: After building the application, you can start the production server to serve the optimized build:
   ```bash
   yarn start
   ```

By following these steps, you can set up, develop, and deploy the frontend application efficiently. If you have any further questions or need additional information, feel free to reach out!

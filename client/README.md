# How to Run Baseball-App

1. First step is to download and install Git and Node.js/npm on your computer. 
If you're unsure on this, please reference: https://git-scm.com/download/ & https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Once both are installed, open up the command prompt or terminal on your device and navigate to the location where you want to store the application.
3. Enter the following command: git clone https://github.com/jennmohr/baseball-app.git
4. After a few moments, the repo should successfully be cloned to the location you navigated to.
5. In order to install all dependencies needed for running the application, first run "cd baseball-app" to navigate into the folder. Run "npm install" on the root folder AND on the client folder (by running "cd client" then "npm install"). The relevant packages will be installed. 
6. Now you're ready to run the application. You will need two terminal/command prompts: one for running the node express server (API) & one for running the react application. 
7. Similar to step 5: Run "npm start" on the root folder. Once you see "Server listening on 3001" the node express server is successfully running. There is nothing more to do here: just continue to leave it running while accessing the react app. 
8. On the other terminal/command prompt, navigate into the client folder "cd client" and run "npm start". The react application will open in your default browser once it is successfully started.
9. Everything is good to go! Enjoy exploring "Baseball App" !
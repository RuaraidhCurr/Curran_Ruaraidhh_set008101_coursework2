MONGODB installation

To run this program. Launch a comand line tool, and download mongodb through the link given in my Report
Once mongodb has been installed on the machine direct youre command line to the mongodb folder
through the File explorer creat a new folder called data and a new folder called logs in the mongodb folder
inside the data folder create a new folder called db
in the command line direct youreself to the mongodb/bin folder and type in the following commands
"—directorydb –dbpath C:/mongodb/data/db –logpath C:/mongodb/log/mongo.log –logappend –install"
aferwhich type in these commands
"net start MongoDB"
this will start the mongodb server in the background
then continue to type in the commandline 
"mongo"
which will open the mongodb shell
from here we create the Blog DataBase to do this type
"use blogdb"

Node.js Module Installation

From the command line direct youresel to the containing folder Of my coursework

from there simply type "npm install" as i have all my modules loaded in my json file it will automatically load them to youre machine

after which simply type "nodemon" and that should be the web-site up and running on you're local server.
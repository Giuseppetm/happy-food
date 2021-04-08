<p align="center">
  <a href="https://happyfoodwebsite.herokuapp.com/">
    <img src="logo.png" width=380 height=120>
  </a>
</p>

## What is "Happy Food"?
Happy Food is a web application for searching Tuscan restaurants,
which allows users who use it to find informations about restaurants in a particular city,
and their location indicated on the map. The only operation the user will have to do is to select the type
of the category, and the city of research. Once the appropriate button is pressed,
you will be able to see the list of restaurants, some information about them such as the name,
telephone number and address, and their location.

### Additional info
This web application is based on the use of ajax for the asynchronous reception of data, bootstrap for front-end development, and nodejs (express) for back-end development; 
the researches are analyzed and then inserted into a database (MongoDB). The dataset I used is stored in a Json file.

### Some notes
The project isn't running MongoDB at the moment, but the code I used is still in the project.

### How to run the project locally
```node server.js``` \
The server will be running in localhost:5000
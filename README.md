# Slothitude

Deployed on [Slothitude](https://slothitude.onrender.com/)
[Figma over here](https://www.figma.com/board/51d88IkQ4KaqAMCIKqIA99/Slothitude?node-id=0-1&t=gqbGcJcQ5eEBB1d4-1)
Example data schema [over here](https://docs.google.com/spreadsheets/d/1akO6-PVAiTmfeqrFYqwf8tgg4TNqR5G9OA77SBsUar8/edit?usp=sharing)

# Introduction

Slothitude is a pilates booking app to manage booking process for Pilates classes. It provides a platform for both studio owners and pilates goers to facilitate class booking and managing.

# User Stories

As a User,

- I would like to view the list of available classes
- I would like to view details of a specific class such as date, time, location and instructor
- I would like to book a class such that I am able to reserve a spot in the chosen class
- I would like to see my future and past bookings so that I am able to look back to see what classes I have attended before

As a Studio Owner,

- I would like to see the classes on the calendar
- I would like to add new classes with details so that users can book them
- I would like to delete class that is not available for booking

# Wireframe

<p align="center">
<img src="/public/Figma.png" width="100" height="100" border="10"/>
</p>

# Screenshots

Login Page

<p align="center">
<img src="/public/LoginPage.png"  height="350px" border="10"/>
</p>

Sign Up Page

<p align="center">
<img src="/public/SignUpPage.png" height="350px" border="10"/>
</p>

User/Studio Owner Dashboard

<p align="center">
<img src="/public/User_dashboard.png" height="350px" border="10"/>
</p>

Filter By Location function

<p align="center">
<img src="/public/FilterByLocation.png" height="350px" border="10"/>
</p>

Calendar Modal

<p align="center">
<img src="/public/Calendar_modal.png" height="350px" border="10"/>
</p>

User Available CLasses Page

<p align="center">
<img src="/public/User_AvailableClassesPage.png" height="350px" border="10"/>
</p>

User My Bookings Page

<p align="center">
<img src="/public/User_MyBookingsPage.png" height="350px" border="10"/>
</p>

Studio Owner Available Class Page

<p align="center">
<img src="/public/StudioOwner_AvailableClassPage.png" height="350px" border="10"/>
</p>

Studio Owner Create Class

<p align="center">
<img src="/public/StudioOwner_createClass.png" height="350px" border="10"/>
</p>

Studio Owner Create class success toast

<p align="center">
<img src="/public/studioOwner_createClassSuccess.png" height="350px" border="10"/>
</p>

Studio Owner delete class success toast

<p align="center">
<img src="/public/StudioOwner_deleteClassSuccessToast.png" height="350px" border="10"/>
</p>

# Discussion

Main Entity: Class Schema as it holds the essence of the app, it represents each individual classes.

Favourite server controller method: It is the classController specifically the "create" method as it is the start to the magic of booking

Favourite Client Component: It has to be the Calendar by react-big-calendar, displays all the available classes for bookings and could be filtered by locations.

Client-Side Routing: The validation to ensure that only studio owner are able to enter the add class route to add class

<p align="center">
<img src="/public/Validation.png" height="350px" border="10"/>
</p>

# Biggest Challenges

- Validating that the role is studioOwner before they are allowed to add class
- Figuring out the calendar library to make it customised to my wants

# Key Takeaways

- Planning is the most crucial step of the whole project
- Reading documentation is important

# Technologies Used

- MongoDB
- Mongoose ODM
- Express.js
- React.js
- Node.js
- TailwindCSS
- React-big-calendar
- Vite
- Render Deployment
- Trello
- Figma

# Icebox

- Studio Owner to be able to edit the class details
- Studio Owner to be able to view the attending users
- Pilates goer to be able to reserve a specific spot in the chosen class
- Search by location
- Map to show locations of the studios

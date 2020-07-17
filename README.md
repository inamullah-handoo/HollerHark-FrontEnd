# HollerHark-BackEnd

This is the frontend code of the complaint management system. The backend code is also available at https://github.com/inamullah-handoo/HollerHark-Backend.

### Introduction
The project works as when the user registers a complaint, the complaint gets forwarded to the dean of the category provided by the user as soon as the complaint is submitted. When the dean checks that complaint, he then forwards it to the faculty with information on what things need to be done in order to resolve the complaint. Then that faculty member after doing the stuff dean said in the message, responds back to the dean with its information. And the process continues till dean is satisfied with the result. When, dean thinks the complaint is resolved, he then marks the complaint as completed and changes the status of the complaint as completed. The user can then give feedback of the performance. If the user is not satisfied, the dean can then mark the complaint as incomplete and then repeats the things in order to resolve the complaint. And then the circle continues till the user is satisfied by the result. The user can also check the log of the complaint in order to check what is happening with the complaint. And can also edit/modify the complaint but not after it is being resolved.
The dashboard of the Dean will tell all about complaints that are under him. How many complaints are been registered under him, how many are responded and how many are completed. And only the user can delete the complaint (before being worked on), which makes sure that proper data is maintained and dean can’t alter the data.
The admin gets all the data. He can check all the data, whether it be complaints, students, faculty or deans. He can get all the data of the system, but again he can’t alter the data. He can only view the data. Also, the dean can be registered by admin only and assigning the categories to particular dean is also done by the admin. It makes sure, that the categories are properly marked with the deans, and there is no leak of data.

### Technologies used
#### - Angular 8
#### - Material Dashboard Theme (Create a folder 'assets' an import it there)

### Users
#### - Student (Can register the complaint)
#### - Dean (Can register a complaint and a complaint can be registered under him)
#### - Faculty (Can register a complaint and a complaint can be forwarded to him by Dean)
#### - Admin (Has every data available to him, and he can only register a Dean and assign category to him)

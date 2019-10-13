# Dumblr-React-Social-Network
![Dumblr Logo](https://upload.cc/i1/2019/10/13/UKPHFq.jpg)


A social network powered by ReactJS, Express and Firebase Storage / Authentication / Real-Time Database.

Tumblr clone - A social networking platform where users can post various types of content, reply to others' posts, edit personal information and get notification from others.

## website demo link
https://react-personal-project.firebaseapp.com/

## Technologies
* Front-End
  * Built a SPA with React and Router
  * Utilized Redux for global state management
  * Managed async data-flow with Redux-Thunk
  * Adopted Material Design and Flex-box for the UI layout
  * Provided native signed-in via Firebase Authentication
  * Well supported different user devices through RWD
  * Module bundling with Webpack
* Backend
  * Built a RESTful API with Node.js and Express.js
  * Designed backend data structure in Cloud Firestore
  * Deployed on Firebase Function

## Features

**Login / Registering with Email**
###### Users can sign up and login by email and password.
![Login Screenshot](https://upload.cc/i1/2019/10/13/sy6AP5.png)

**Various types of post contents**
###### Text with photos / Link / Quote / GIF / Video
![Post Screenshot](https://upload.cc/i1/2019/10/13/UlALNc.jpg)

**Text post: uploading photos w/ title, description also the tags**
###### The post won't be sent out if the description is empty
###### File storage with Firebase Storage
![Text Post](https://upload.cc/i1/2019/10/13/aJQ7n8.jpg)

**Link post: paste link w/ description for this link**
###### The post desplays the screenshot of this page, title and content
![Link Post](https://upload.cc/i1/2019/10/13/UaTfpM.jpg)

**Quote post: post the sentence and resource**
###### Use different font style to highlight the quote
![Quote Post](https://upload.cc/i1/2019/10/13/yBYaSg.jpg)

**GIF post: the post is with the content and one GIF**
###### Enter the key word in GIF input, select one and create the content to post
![GIF Post](https://upload.cc/i1/2019/10/13/wa8sSx.jpg)

**Like and dislike the post**
###### Hint word: user can like or undo like
###### Evry post displays number of likes for post
![like & dislike post](https://upload.cc/i1/2019/10/13/uZa0zX.jpg)

**Comment on the post**
###### Display comments from other users by time
###### Display comment time and user profile photo
![comment post](https://upload.cc/i1/2019/10/13/679mg2.jpg)

**Delete the post**
###### User can only delete himself/herself post. Double check then allow user to delete the post
![delete post](https://upload.cc/i1/2019/10/13/xPUbWL.jpg)

**Change profile picture, cover photo and edit personal bio**
###### Update immeditely after uploading the photo or editing 
![upload profile pic](https://upload.cc/i1/2019/10/13/T6fmjY.png)
![edit personal bio](https://upload.cc/i1/2019/10/13/iWDxnS.jpg)

**Post Notifications**
###### user can see who liked thier post and who left the comment. They also can click and being directed to the post.
![notifications](https://upload.cc/i1/2019/10/13/ZHSw08.jpg)

**User Main Pgae - Masonary Design**
###### Click user name and user can see all the posts
![user main page](https://upload.cc/i1/2019/10/13/l4v1BI.jpg)

**Search for other users**
###### The user name have to be matched

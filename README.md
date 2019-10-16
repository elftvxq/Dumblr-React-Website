# Dumblr - Share your thoughts anytime
![Dumblr Logo](https://upload.cc/i1/2019/10/13/UKPHFq.jpg)
![main page](https://upload.cc/i1/2019/10/16/PIA6qk.jpg)

A social network powered by ReactJS, Express and Firebase Storage / Authentication / Real-Time Database.

Tumblr clone - A social networking platform where users can post various types of content, reply to others' posts, edit personal information and get notification from others.

## Website demo link
<https://react-personal-project.firebaseapp.com/>
#### Test account
* account: public_test@mail.com
* password: 123456

## Technologies
* Front-End
  *  Built a SPA with React and Router
  * Utilized Redux for global state management
  * Managed async data-flow with Redux-Thunk
  * Adopted Material Design and Flex-box for the UI layout
  * Provided native signed-in via Firebase Authentication
  * Well supported different user devices through RWD
  * Module bundling with Webpack
  * Database with Firebase Real-Time Database
* Backend
  * Built a RESTful API with Node.js and Express.js
  * Designed backend data structure in Cloud Firestore
  * Deployed on Firebase Function
  
#### Database Schema
###### Link: <https://github.com/elftvxq/react-dumblr-functions>
![database scheama](https://upload.cc/i1/2019/10/15/5bE9wC.png)


## Features

### Login / Registering with Email
Users can sign up and login by email and password.
![Login Screenshot](https://upload.cc/i1/2019/10/13/sy6AP5.png)

### Various types of post contents
Post content with photos / Link / Quote / GIF / Video

### Text post: uploading photos w/ title, description also the Hashtags
The post won't be sent out if the description is empty.
Use file storage with Firebase Storage.
![Text Post](https://upload.cc/i1/2019/10/13/aJQ7n8.jpg)

### Link post: paste link w/ description for this link
The post desplays the image of this page, title and content.
![Link Post](https://upload.cc/i1/2019/10/13/UaTfpM.jpg)

### Quote post: post the sentence and resource
Use different font style to highlight the quote.
![Quote Post](https://upload.cc/i1/2019/10/13/yBYaSg.jpg)

### GIF post: the post is with the content and one GIF
Enter the keyword in GIF search input, select one and create the content to post.
![GIF Post](https://upload.cc/i1/2019/10/13/wa8sSx.jpg)

### Like and dislike the post
Hint word: user can like or undo like. After like the post, the heart turns into the red filled icon.
Evry post displays number of likes and comments.
![like & dislike post](https://upload.cc/i1/2019/10/13/uZa0zX.jpg)

### Comment on the post
Display comments from other users by time order.
Show comment time and user profile photo.
![comment post](https://upload.cc/i1/2019/10/13/679mg2.jpg)

### Delete the post
User can only delete himself/herself post. Double check then it allows user to delete the post.
![delete post](https://upload.cc/i1/2019/10/13/xPUbWL.jpg)

### Change profile picture, cover photo and edit personal bio
Update immeditely after uploading the photo or editing. 
![upload profile pic](https://upload.cc/i1/2019/10/13/T6fmjY.png)
![edit personal bio](https://upload.cc/i1/2019/10/13/iWDxnS.jpg)

### Notifications
User can see who liked their post and who replied the comment. User also can click and will be directed to that post.
![notifications](https://upload.cc/i1/2019/10/13/ZHSw08.jpg)

### User Main Pgae - Masonary Design
Click user name and user can see all the posts.
![user main page](https://upload.cc/i1/2019/10/13/l4v1BI.jpg)

### Search for other users
The user name have to be every letter matched.


## To-Do
* Upload multiple images
* Password reset
* Delete comment
* Emoji keyboard avalaible when creating post or reply 


# Project One - Tetris

## Table of Contents:

1.  Project Overview
2.  How to Play
3.  Game Brief
4.  Technologies Used
5.  Timeline
6.  Features
7.  Bugs
8.  Wins and Challenges
9.  Future Content and Improvements
10. Key Learnings
11. Credits

## Project Overview

This project is an implementation of the classic game Tetris. It allows the player to move and rotate differently shaped falling pieces also known as tetrominoes to clear lines and score points. The game ends when the uncleared lines reach the top of the playing field. Most of the project was created using arrays and their methods, its purpose, practicing and improving javascript knowledge.

Tetris is a puzzle video game created by the Soviet software engineer Alexey Pajitnov in 1984. It has been published by several companies for multiple platforms and is one of the best-selling video games of all time.

This was my first project from General Assembly's Software Engineering Immersive course built in 13 days and my first real-world type practice with JavaScript.

Play Tetris here: https://stylok5.github.io/

![Alt text](https://i.imgur.com/IdCblQA.png "Optional title")

## How to Play

- Click play/pause to start the game, click again to pause and click reset to reset everything back to 0.
- Move the falling tetrominoes and adjust them to complete horizontal lines.
- Use the left and right arrow keys to move the tetrominoes horizontally.
- Use the up arrow key to rotate the tetrominoes.
- Use the down arrow key to move the tetrominoes faster.
- Score points for each completed line.
- Level 2 when you reach 5 completed lines and level 3 for 10 lines.
- The game ends when the tetrominoes reach the top of the game grid.

## Game Brief

Out of the options we were given for this project, Tetris ranked as one of the highest in difficulty. For a first project it was quite intimidating, but I really wanted to test and improve my skills, but also learn how to research and figure out problems on my own or by using sites like Stack Overflow.

Before I started with coding I wrote some pseudocode and did some wireframing using Excalidraw, so that I could better plan out what I would do each day by breaking the project into smaller parts.
This was the plan I ended up with :

- Write the html and create the grid where the game would take place
- Draw the different tetrominoes on the grid using arrays and write the function to create a tetromino
- Logic for the tetromino to move down and freeze at the last line and when its next to another previously placed tetromino
- Adding key inputs for moving the tetromino left right or down using arrow keys and rotating it with the up arrow
- Figuring out how to remove a horizontal line when filled with tetrominoes
- Adding a game over message for when the tetromino reaches the top
- Adding score lines and levels that change when you complete a number of lines
- Add a reset button and work on the styling using css
- Stretch goals like adding a smaller grid that displays the next falling tetromino, adding sound effects and improving styling
- Bug fixes

## Technologies Used

- HTML5 with HTML5 audio
- CSS3 with animation
- JavaScript (ES6)
- Git
- GitHub
- Google Fonts

## Timeline

### Day 1 :

The first day was mostly spent on writing down what I had to do for the next two weeks and breaking everything down into smaller chunks. I tried to predict how many days I would need for the essential functionalities while leaving some room for my stretch goals.

### Day 2 :

On the second day I started with creating a 10*21 grid. I used a simple for loop to create the divs and append them to the grid element and also pushed them inside an initially empty boxes array which I would later use to display the tetrominoes. I then styled the grid-wrapper, grid and grid div.

![Alt text](https://i.imgur.com/1eNXKBf.png "Optional title")

![Alt text](https://i.imgur.com/9f4GkfO.png "Optional title")

After I was done with the grid I started thinking about it how I would display the tetrominoes. After thinking and researching about I decided I would use arrays. Tetrominoes with their four different rotations:

![Alt text](https://i.imgur.com/kft3VCH.png "Optional title")

Created two more arrays, first one containing the tetrominoes and second one for their colors:

![Alt text](https://i.imgur.com/kzasLwv.png "Optional title")

### Day 3 :

I started getting into the trickier parts. First I had to figure out how to display the tetromino. So I decided the tetromino would appear in position 4 with its first rotation. I also used quite a lot of console logging and comments, to test and better understand how everything worked out as this was also my first big project. I also need a random tetromino to appear each time so I had to use a random variable.

![Alt text](https://i.imgur.com/mwCn2Q0.png "Optional title")

For now creating the tetromino I looped through the current array, and added currentPosition and index. The currentPosition variable represents the current vertical position of the tetromino on the game board. Index refers to the individual cells that make up the tetromino. With adding those two together we get the absolute position of each div on the game board. I then access the corresponding boxes array which represents the DOM element of the div in the game board grid using this code _boxes[currentPosition + index]_ and set the color of the tetromino.

![Alt text](https://i.imgur.com/4hPQ4Z7.png "Optional title")

After this I needed to create a goDown function that would make the tetromino fall down. For that I would need to add the width to the currentPosition so that the tetromino would move a row down. But I also needed to remove the previous tetromino otherwise they would keep stacking together. So I created a remove function and then combined itc all together in my goDown function.

![Alt text](https://i.imgur.com/Dc9q8PY.png "Optional title")

![Alt text](https://i.imgur.com/lVjAIRH.png "Optional title")

### Day 4 and 5 :

For the fourth day I had two goals. First one was to make the tetrominoes stop moving when reaching the bottom row and to also make them stop when reaching another previously placed tetromino. This took me quite some time to work out. I decided that I would have another line underneath the last row of the grid that would basically be invisible by setting the width and border to 0. I then added a classlist of taken for each div of this line.

![Alt text](https://i.imgur.com/bLzkGiY.png "Optional title")

Then in my goDown function I added this line of code _current.some(
(index) =>
boxes[currentPosition + index + width].classList.contains("taken")
)_
that checks if the div contains a class of taken. Now I needed to make a freeze function that would freeze the tetromino in place if another already existed and also continue creating tetrominoes after a tetromino had reached the bottom. I ended up with this freeze function,

![Alt text](https://i.imgur.com/2BNncJF.png "Optional title")

which I then used in my goDown function

![Alt text](https://i.imgur.com/x8Fvel8.png "Optional title")

that checks if there is a div that contains a class of taken. If there is, it calls the freeze function, otherwise the tetromino keeps falling.

### Day 6 and 7 :

On day 6 I wanted to add movement with the arrow keys.

![Alt text](https://i.imgur.com/1gt8kSs.png "Optional title")

I then needed to actually create the functions that would move the tetrominos around. This is my goLeft function, did the sam thing with the goRight one and just swapped the -- and ++ operators.

![Alt text](https://i.imgur.com/4JRE100.png "Optional title")

And finally for the rotate function,

![Alt text](https://i.imgur.com/blbXywL.png "Optional title")

I incremented the currentPosition by one and then set the rotation to 0 after looping throught all rotation states. Then with the last two lines the current variable is updated with the next rotation and the tetromino is then created and displayed.

### Day 8 and 9 :

Rotating the tetrominoes posed a lot of new problems. First when the tetrominoes were rotated at the right, left or bottom side they would split and second when rotating next to other tetrominoes they would pass through them. This was quite tricky to solve and required a bit of research. The t and l tetrominoes specifically were the most challenging to fix. Making them not split when on the edge of each side was the easier part as it was similar to the movement part.

![Alt text](https://i.imgur.com/y1n4O4i.png "Optional title")

I then used another function that would implement the previous functions to prevent splitting and also add conditions for the second rotation problem mentioned above.

![Alt text](https://i.imgur.com/zlktDRb.png "Optional title")

I used a lot of comments inside this checkRotatedPosition function to better understand how everything is working together in each step.

![Alt text](https://i.imgur.com/NWgsB1t.png "Optional title")

### Day 10 and 11 :

Now the basic functionalities left were to add the logic for removing a line when its filled with tetrominoes and a game over function when a tetromino reaches the top.

![Alt text](https://i.imgur.com/DMtXjDh.png "Optional title")

The remove line logic is explained throughout the comments. It basically checks if every div in a row contains the taken class. If that is true the line is removed by using the splice method, then the removedBoxes array is concatenated with the remaining boxes array using the concat method and finally the removed divs are appended back to the top of the grid using the appendChild method so that the grid does not appear smaller.

I then proceeded to create the gameOver function.

![Alt text](https://i.imgur.com/19s7oMn.png "Optional title")

The function first checks if the topRow contains a class of taken, if it does it clears the interval and creates an h1 element with game over text that is appended on the footer. It also disables key movement.

**Day 12**:

I started with adding a play/pause and a reset button for the game. For the play/pause we use a _let timerId_ variable. Its initial value is falsy so we can use that to define the play and pause functionality that depends on the timerId's value.

![Alt text](https://i.imgur.com/DO1dDy2.png "Optional title")

And then for the reset button I added a delay to the page reload for a sound to play when the button is clicked.

![Alt text](https://i.imgur.com/FF9fDOH.png "Optional title")

After having basically completed the core functionalities of the game I started working on the styling and the overall presentation of the project using css. I also created a sound effects folder to add some audio for some of the actions in game and added text for score lines and levels that would be incremented depending on some actions that were completed.

![Alt text](https://i.imgur.com/IXh66a8.png "Optional title")

Lastly an event listener so that the page wouldn't scroll down when pressing the arrow key.

![Alt text](https://i.imgur.com/70xnl9Q.png "Optional title")

### Day 13 :

As I still had some time I decided to go for my stretch goal which was to make a smaller grid that would display then next tetromino falling down. I used a for loop for creating the small grid the same way I did for the game grid. Then I created an array that contained every first rotation of each tetromino and a function for displaying the next tetromino.

![Alt text](https://i.imgur.com/LhxGd9F.png "Optional title")

Spent the rest of the day testing everything for any errors and bugs, and policing the look of the game, so that it gives off an arcade feel. The app was finally deployed using GitHub pages.

## Features

- Grid of 10 columns and 21 rows.
- Five different tetromino shapes.
- Score awarded if the user presses the down arrow key to accelerate.
- Game over text if a tetromino reaches the top.
- Play/pause and reset button
- Scoring system that awards extra points for completed lines.
- Levels that increase the game speed as the player scores more points.
- Sound effects for line completion and game over.
- Small grid to display the next tetromino.

## Bugs

Throughout the project I experienced quite a lot of bugs. Most of them had to do with the rotation of the tetrominoes. I managed to fix most of them, but I think there are still two small ones left, first one would be when a tetromino reaches the top there is a small delay before the game over function is triggered and also I think that the l tetromino still sometimes passes through other previously placed tetrominoes when rotating depending on its location on the grid.

## Wins and Challenges

I was particularly happy when I figured a way to freeze a tetromino at the bottom by making a new invinsible line that would contain the class of taken. Another big win was achieving my stretch goal of making a smaller grid that would display the next tetromino and also accomplishing the arcade feel I wanted for the game.

I would say the biggest challenges would be the freeze function and the conditions for the rotating tetrominoes.

## Future Content and Improvements

Some future improvements would be to make the app mobile responsive as the styling only works for a 27 inch screen or a 14 inch macbook screen but breaks for smaller screens. Prioritizing the resolution of those smaller bugs as well as improving code readability and conciseness would propably be my final improvements.

## Key Learnings

I found the project challenging but at the same time a really usefull learning experience. In general I would say that even the challenges I faced were quite beneficial as I became more accostumed to paying more attention to every single detail, writing comments and console logging everything to have a better understanding of what I need to do. I also learned that sometimes I need to take a break when I'm stuck on a problem for too long and look at it again the next day with a clearer mind. I also improved my researching and problem solving skills that were put to the test during this project.

## Credits

- Niklas Fischer, SEI instructor for starter code -- helped in the creation of the grids.

- Ania Kubow's Code Tetris: JavaScript Tutorial for Beginners https://www.youtube.com/watch?v=rAUn1Lom6dw

- Stack Overflow: https://stackoverflow.com/


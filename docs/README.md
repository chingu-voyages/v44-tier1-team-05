![](./images/THE%20ARRAY%20GAME.png)

## Table of Contents

- [Overview](#overview)
- [Requirements & Specifications](#requirements-specifications)
- [About Chingu](#about-chingu)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## Overview

### The Project

The Array Game is designed to help early learners build and expand on their
multiplication skill for the numbers 1-6. Players use a simple grid that
visually represents the calculation.

The goal of this game is to help kids supplement what they are learning about
multiplication with a fun activity they use for practice.

The objective of the game is for players to shade in as much of the 10x10 grid
as possible. Players take turns rolling dice and then shading an array whose
dimensions are equal to the numbers on the dice.

For example, if you roll a 2 and a 3 you would shade in a 2x3 array on the
grid either vertically or horizontally. In this example, the array could be
either 2 rows by 3 columns or it could be 3 rows by 2 columns.

If it turns out that there's no room on the grid for your array, the player
can't update the grid and must wait until their next turn to roll again.

The game will end when one of these conditions are reached:

1. A pre-defined period of time is reached. Whoever has the highest score wins.
2. A player forfeits two consecutive turns. In this situation,
   that player loses the game.
3. A player completely fills in their grid. This will take longer than the first two options. Depending on the luck of the roll, players may end up forfeiting many turns.

### Screenshot

### Links

-[Repository](https://github.com/chingu-voyages/v44-tier1-team-05)

-[Live Site URL](https://chingu-voyages.github.io/v44-tier1-team-05/)

## Requirements & Specifications

### What We Need to Do

#### Structure

- [ ] This is a purely frontend application. No backend is required.
- [ ] Useful links and resources: - [The Array Game](https://www.whatdowedoallday.com/array-game/)

#### Functionality

- User can see the game window with these components

  - Leaderboard showing the number of games the current player has won and lost
  - Game controls
  - A 10x10 grid the game is played on
  - View the optimal layout for the interface depending on their device's screen size
  - See focus and hover states for all interactive elements on the page

- Leaderboard

  - [ ] User can see the display of the total number of wins and losses for each
  - [ ] User can see the tally of wins for each of the three ways the game
        can end
  - [ ] User can see the tally of losses for each of the three ways the game
        can end

- Game Controls

  - [ ] User can see a button in the game control panel to start a new game, which updates the Leaderboard, clears the grid, and starts a new game.
  - [ ] If the user tries to start a new game while one is in progress a modal alert will be displayed to confirm that the current game may be abandoned.
  - [ ] When a game is started the user will see a button to roll the dice
  - [ ] After rolling the dice a new roll will be blocked until the new
        array has been marked on the grid by clicking squares in the grid
  - [ ] User can see a the value of each dice after they are rolled
  - [ ] The user will see a button to allow them to clear the grid and
        to start refilling it using the values from the current roll. This allows
        the user to try different options.
  - [ ] The user will see a button that allows them to submit their answer
        after filling in the grid from the current roll of the dice.

- Grid
  - [ ] When the dice are rolled the user will be able to click on squares
        to mark their array.
  - [ ] When a square is clicked it's color will change from the color used
        for unoccupied squares to the color designation for occupied squares.
  - [ ] If the total number of squares marked on the grid don't match the
        numbers on the dice an error message must be issued and the user should be
        given the option to re-mark the grid to match the dice.

### Extras (Not Required)

- [ ] Implement the game to allow human-to-human competition between 2
      players or human-vs-computer competition.
- [ ] Allow the user to choose the color to be used to fill in the grid
- [ ] Maintain player metrics across sessions for the last 3 games that have
      been played
- [ ] Allow the user to specify the dimensions of the grid
- [ ] Add a countdown timer showing time remaining in the game and create an
      input field to allow the user to set the starting number of minutes and seconds.
- [ ] Animate the rolling of the dice
- [ ] Play a sound to simulate the rolling dice
- [ ] Add a graph to the leader board to show the number of times a number
      has been rolled.
- [ ] Support dark/light mode

### Built With

- [Figma](https://www.figma.com/) - A cloud-based design tool
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) - The web framework used
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - The styling language used
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The programming language used

## About Chingu

If you aren’t yet a member of Chingu we invite you to join us. Chingu helps members transform what they’ve learned in courses & tutorials into the practical experience employers need and want.

## Authors

- [Chingu Voyages](https://www.chingu.io/) -- Initial work -
- [Jim Medlock](https://github.com/jdmedlock) -- Initial work --
- [Alex Papparotto-Goodman](https://github.com/goodman2814) -- Developer --
- [Gabriela de Paula](https://github.com/PaulaR-05) -- Developer --
- [John Foughty](https://github.com/Foughty) -- Designer --
- [Moriah S](https://github.com/MoriahSWalker) -- Developer --
- [Nazgul Duisenbay](https://github.com/nazgul7d) -- Developer --

## Acknowledgements

- A big high-five to the staff at [Chingu](https://www.chingu.io/). We would like to to extend our appreciation to everyone for providing us this wonderful oppurtunity!

- A special mention to our personal Mentor, Angela for helping guide us along the way.

- A special mention to [Charlie Britton](https://codepen.io/charliebritton) for the Dice Roller Animation. [Step-by-step Guide](https://codepen.io/charliebritton/pen/RVyBLr)

- Thanks to George Whiting for his tutorial on making a grid for players. [link](https://medium.com/@thewebdevg/creating-a-gameboard-with-css-grid-47da8ac25078)

- Thanks to [Matheus Battisti](https://github.com/matheusbattisti) for his tutorial on creating a countdown timer. [Tutorial Link](https://www.youtube.com/watch?v=nMn2_5kvbHo&t=355s)

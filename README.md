# calculator
The Odin Project: Calculator

What I've learned:

Putting the parent div as relative and making the child as aboslute will have the child be positioned according to to the parent.

To make the buttons have 4 per row, we set the parent to display: grid and use grid-template-columns(4, 1fr) to make 4 columns, each taking up a same percentage

To make a button span 2 columns, do grid-colum: span 2;

Use padding for button flexibility, but in this case I use predetermined width and height to make buttons not have weird padding based on text

To make the 0 button, I made it span 2 columns, force the width to take up the remaining space, and put border-radius at 2.5rem, which means 2.5x the font size of the root (html) element

When writing the equals function, I realize its better to have an evaluate "middle-man" function to check the cases, and then from there call operate if it seems fit.
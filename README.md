# Ballantyno

Personal library for my, Andrew "Ballantyno" Ballantyne, JavaScript fiddles.

## Contents

1. [Scope And Goals](#scope-and-goals)
1. [External Libraries](#external-libraries)
1. [Standing Bugs](#standing-bugs)
1. [License](#license)

## Scope And Goals

I aim to create as many wacky, fun and crazy ideas that come to my mind. With no obligations to structure code in any specific way, I will
code to my own standards (which are probably higher than the average, but always could use with a few improvements).

**Primary Goals:**

 - A Lobby full of games... games ranging from any old arcade game (TIC TAC TOE, Pong, etc) to any full fledged game, such as an RTS or a
  Simulation-type game
 - Testing Library (although I have been looking at other libraries and I have noticed this may be quite awful... it may get redone in the
 future)

## External Libraries

Since this is my own brainchild, under my own time, I have no pressures to use other libraries. I looked at libraries like *Prototype*,
I have used *ExtJS* in the past and I currently use *TypeScript* in my professional career. All of these libraries lack something or don't
qualify for some annoyance or another. I truly also enjoy making the foundation classes and building it upwards. That way I know everything
that is in use and not relying on someone else to update/maintain.

**Current libraries included are:**

 - jQuery (DOM Library)
 - Createjs (Canvas Library)

**Possible future libraries:**

 - Handlebars (templating for DOM stuff - currently I don't plan to have a lot of that)

## Standing Bugs

I may, from time to time, say f' it to an issue for the sake of still enjoying coming back to this day-to-day. Eventually I will solve
all the issues, but they may end up on the back burner for some time. This will be a log of all those issues.

#### ClassVehicle Tests Are Broken

- All ClassVehicle Tests are broken now that the class structure has changed from the factory to IDE templates. I may or may not fix
 them. Time will tell.

#### Log.js

- The listeners that are fired off in *\_console()* only pass the first argument back. There currently isn't proper support for any args
  beyond 1 to be sent to the listeners.
    - The solution to this seems to be `method.apply(this, arguments);`

#### Tick Tac Toe - createjs.Shape.hitArea

- Not sure why, but I can't seem to get a hitArea to work on a shape for TickTacToe. This has caused me to have to hack a small bg
  highlight that is clickable, instead of an invisible hitArea.

## License

Currently this is all private and not open for others to use, modify or fork. But I am open to suggestions if anyone does want to
 participate or suggest changes.

# Incremental Googology
Incremental Googology is an incremental game (a.k.a. idle game or clicker game),
with googological content, including large numbers, fast-growing functions,
notations for large numbers, ordinals and ordinal notations (mainly comes from [Googology Wiki](https://googology.wikia.com)).
The numbers in the game can also be very large.

[Link to the first game](https://hypcos.github.io/incremental-googology/Tetration/)

The final goal of Incremental Googology is to include the whole computable googology.
It is a very big program, and there is little hope to complete.
## Constructions of Files
The repository is separated into folders, with names indicating their numeric limit.
e.g. "Tetration" means numbers go up to 10^^n,
where n may be 2<sup>53</sup>-1 or 2<sup>1024</sup>-2<sup>971</sup> (or other Number limits).

Every separated folder can extend to a web game.
## Current State
The repository started with folder "Tetration", now at 4th version, with only item "Bashicu matrix system" (BMS).

(BMS is believed to be one of the strongest recursive notations,
competing with fast-growing hierarchy (FGH) + Taranovsky's ordinal notation
or several ordinal collapsing functions by Michael Rathjen.
Also, people working on BMS are interested in larger structures, so they did not name small numbers.
In the game, the beginning system should be able to accept bonus from higher structure,
while named numbers should have their place for special effects, which should come in later game,
so a strong system without named numbers, such as BMS, suits the beginning.)

The game is now playable for hours, or days for some achievements.
## Main Difficulty 1
First main difficulty of Incremental Googology is the googology itself - numbers are large.

To illustrate, googolisms (i.e. numbers relevant to googology) are compared with the physical universe.
The entropy of observed universe is approximately 10<sup>120</sup> times of Boltzmann constant,
so observed universe has e<sup>10<sup>120</sup></sup> microstates.
So it is impossible to distinguish 1, 2, 3, ..., 10<sup>10<sup>120</sup></sup>
(10<sup>10<sup>120</sup></sup> different numbers in total) in reality.

Actually the microstate number of observed universe will grow in future due to the growth of its age.
But there is still some limit.
According to [Timeline of the far future](https://en.wikipedia.org/wiki/Timeline_of_the_far_future),
a new universe will be generated from quantum tunnelling in 10^10^10^56 (Planck times, millennia, or whatever),
so it is impossible to distinguish 1, 2, 3, ..., 10^10^10^10^56 (10^10^10^10^56 different numbers in total)
even in far future.

Despite of the space limit, 10^10^10^56 is also the time limit of the reality.
i.e. calculations taking more than 10^10^10^56 (Planck times, millennia, or whatever) cannot be done in reality.
### Lower the Precision
If you think in the way of previous section, you want too much precision.
#### Scientific Notation
Consider numbers 1, 2, 3, ..., 10<sup>10<sup>120</sup></sup>.
9/10 of them have 10<sup>120</sup> significant digits, but so high precision is unnecessary in physical reality.
According to the size of universe and Planck units, 240 significant digits is already more than enough.

If we use "a<sub>0</sub>.a<sub>1</sub>a<sub>2</sub>...a<sub>239</sub>×10<sup>n</sup>"
(where a<sub>i</sub> are single digits and n is expressed exactly)
to express numbers,
there are only 9×10<sup>359</sup> distinguishable terms up to 10<sup>10<sup>120</sup></sup>,
which can be stored within 150 bytes.

But it is again impossible to express numbers up to 10^10^10^120.
In this case, 9/10 of distinguishable terms have 10<sup>120</sup> significant digits in their exponent (the n),
which take much more space than the a<sub>i</sub>.
#### Up to Tetration
To express further, one must accept the imprecision that very large n and n×10^1000, for example, are indistinguishable.
Then, numbers can be expressed in "10<sup>n</sup>" where n is expressed in scientific notation.

But it is again impossible to express numbers up to 10^10^10^10^120.

To express further, one must accept the imprecision that very large n and n^10^1000, for example, are indistinguishable.
Then, numbers can be expressed in "10<sup>10<sup>n</sup></sup>" where n is expressed in scientific notation.

But it is again impossible to express numbers up to 10^10^10^10^10^120.

And so on.

Continue this process, we finally have a representation system up to tetration - "10^10^...10^_a_ with b 10's".
When _a_ is "too large", b will increase by 1 and _a_ will be replaced by a smaller value.
Its limit is thus when b is "too large", 10^^10^10^120.
If the b is stored in IEEE 754 binary64 floating-point format, the limit will be 10^^(2<sup>53</sup>-1)
(or 10^^(2<sup>1024</sup>-2<sup>971</sup>) if further "very large n and n^n are indistinguishable" is accepted).
#### Beyond
The computable googology beyond tetration focus on fast-growing functions and ordinals.
So is the representation system.
### But I Want to Distinguish Everything I Can Name
To parse natural languages, or even some formal system such as language of first-order set theory, is uncomputable.

Instead, there are some representation system with "flexible" precision.
For example, [fast-growing hierarchy](https://googology.wikia.com/wiki/Fast-growing_hierarchy)
may express very large numbers in compact form, and also distinguish very large n and n+1.
One may also combine several systems into one, and express numbers in compact form if any of them can.
## Main Difficulty 2
Second difficulty of Incremental Googology is the numeric design for a playable gaming process.

Ideally, each "stage" of an incremental game should last approximate similar time,
with some fluctuation, after which a next concept or operation comes.
Also, the balance between "idle" and "active" playing mode counts.
So it require some growing curve of "costs of items" and "effects of items".

But in Incremental Googology, numbers, functions and notations, should fit special googological meaning.
The occurences of items should also fit the logic of googology,
e.g. "superfactorial" items should come after factorial items, which comes after multiplication items.
With this kind of considering, only a small fraction of "source numbers" (or "source functions", "source notations")
can be used in Incremental Googology.

Thus, the way of numeric design cannot be changing the numbers as usual,
but changing how the source googologisms combine.
When tuning, the usual way is to change some numbers, so it requires small changes on codes,
but the Incremental Googology way requires reconstruction of how sources combine,
which need large changes on codes, so it is more difficult.
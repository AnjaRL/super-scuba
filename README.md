# SUPER-SCUBA

So excited to build my very first game at Ironhack !

<h1> Description </h1>
Do you know how long does a can last in the ocean ?
<b>Up to 200 years ! </b>
<p>As a super scuba, you cannot stand to see so much waste on the ocean floor, it is totally insane !
So, your mission here is to catch as many cans as possible, that have been thrown into the sea by lazy or foolish people. </p>
<p>Meanwhile, do not forget that beautiful creatures live in the ocean, making its beauty ! You understand that it is totally forbidden to touch them. </p>

<p> Let's save our oceans ! </p>

<h1> MVP </h1>
<ul>
<li> Player can move horizontally or vertically on the screen, but cannot reach the very bottom nor the surface </li>
<li> Cans randomly fall down from different points of the surface to the bottom</li>
<li> Fishes randomly come from the right </li>
<li> If the player touches 1 can, the score increases by 5</li>
<li> If a can is missed, it will sink and stay on the floor </li>
<li> One tank increases the oxygen level by 1 </li>
<li> Every 20 points, the oxygen level decreases by 1 </li>
<li> Every 30 points, a tank appears </li>
<li> It's game over when 5 cans are missed or when 5 fishes are hit or when the oxygen tank is empty </li>
</ul>

<h1> Backlog </h1>
<ul>
<li> Choose between two players to play the game </li>
<li> Main screen with instructions, music settings </li>
<li>Collisions with tank for gaining more oxygen</li>
<li> Add background music : main screen, game screen, game over screen </li>
<li> Add specific sounds : for each thing hit </li>
<li> Speed of the game is increasing : more fishes, more cans, more tanks</li>
</ul>

<h1> Data structure </h1>

<h2> screens.js</h2>
<ul>
<li> mainScreen(){}</li>
<li> gameScreen(){}</li>
<li> gameOverScreen(){}</li>
</ul>

<h2> gamefeatures.js </h2>
<ul>
<li> startGame(){}</li>
<li> startLoop(){}</li>
<li> clearCanvas(){}</li>
<li> updateCanvas(){}</li>
<li> addBubbles(){}</li>
<li> addFishes(){}</li>
<li> addCans(){}</li>
<li> tankLevel</li>
<li> addEventListener(){}</li>
<li> detectCollision(){}</li>
<li> gameOver(){}</li>
</ul>

<h2> diver.js</h2>
<ul>
<li> diver(){this.x; this.y; this.direction; this.size}</li>
<li> draw(){}</li>
<li> swim(){}</li>
<li> collision(){}</li>
</ul>

<h2> can.js</h2>
<ul>
<li> can(){this.x; this.y; this.direction; this.size}</li>
<li> draw(){}</li>
<li> sink(){}</li>
</ul>

<h2> fish.js</h2>
<ul>
<li> fish(){this.x; this.y; this.direction; this.size}</li>
<li> draw(){}</li>
<li> move(){}</li>
</ul>

<h2> tank.js</h2>
<ul>
<li> tank(){this.x; this.y; this.direction; this.size}</li>
<li> draw(){}</li>
</ul>

<h1> States & States Transitions</h1>
Definition of the different states and their transition (transition functions)
<ul>
<li> <b> mainScreen</b> : instructions, choice between two divers ( choice of background if there is time)</li>
<li> <b> gameScreen</b> : the canvas, scoreboard, oxygen level</li>
<li> <b> gameOverScreen</b> : background, sad audio, try again button, main screen button</li>
</ul>

<h2> Task </h2>
<ul>
<li> images - prepare images</li>
<li> audio - prepares audios</li>
<li> screen - buildDom</li>
<li> screen- addEventListener</li>
<li> buildCanvas(){}</li>
<li> updateCanvas(){}</li>
<li> diver swim(){} </li>
<li> diver draw(){} </li>
<li> can sink(){} </li>
<li> can draw(){} </li>
<li> fish draw(){} </li>
<li> fish move(){} </li>
<li> tank draw(){} </li>
<li> addTank(){}</li>
<li> addFishes(){}</li>
<li> addCans(){}</li>
<li> tank increaseTankLevel(){}</li>
<li> game startLoop(){} </li>
<li> game detectCollision(){}</li>
<li> gameOver(){}</li>

</ul>

<h2> Additional links </h2>
<li> <b> Notions tasks list</b> </li>
<a href="https://www.notion.so/d0f740dd395e42cb9d702cb66794b347?v=8fd16e9a4ec04c16b173d924528e3433" >Notions</a>

<li> <b> Slides</b> </li>
<a href="https://slides.com"></a>

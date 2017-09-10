import React from 'react';



/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/a_killer_insertion_sort.css"


class a_killer_insertion_sort extends React.Component {
   render() {
      return (
         <Grid>
            <Row>
              <Col md={12}>
                <h1 className="Blog-Headers"> "A Kiler Insertion Sort" </h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h3 className="Blog-Headers"> Overview </h3>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p className="Blog-Text">
                  I remember being in high school and spending my lunch time playing a card
                  game called "killer" in the art room. Odd name for a card game, but essentially it is the Hawaiian equivalent
                  of <a href="https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn" target="_blank"> Ti&ecirc;n l&ecirc;n </a>.
                </p>
                <p className="Blog-Text">
                  One of the things that kind of stands out in the game is how fluid the gameplay was.  If everyone knew what they were
                  doing, each round could take less than 5 minutes.
                </p>
                <p className="Blog-Text">
                  Part of that has to do with how quickly people are able to arrange their hand prior to the beginning of the round.
                </p>
                <p className="Blog-Text">
                  Then, while re-reading my Algorithm Analysis book, I wondered if insertion sort could be applied as easily to Killer as it
                  could be applied to poker (5 card stud). The answer is "kind of...?"  But you might not win.  That is, it will not give you an
                  optimized hand, there is a bit more to it.
                </p><br/>
                <p className="Blog-Text">
                  In order to do this I will...
                </p><br/>
                <ol className="Blog-Text">
                  <li> <em>Kind of</em> go over insertion sort, but will not give you the full brief because you should be able to find that stuff in every algorithm book out there. </li>
                  <li> Spam you with code in various languages.  Because I can damnit, and algorithms are language agnostic...and I also want to plug repl.it </li>
                  <li> Show you why you will probably lose at Killer if you just insertion sort the hand you are given. </li>

                </ol>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h3 className="Blog-Headers"> Insertion Sort </h3>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4 className="Blog-Headers"> Here is What It Is </h4>
              </Col>
              <Col md={12}>
                <div className="gif_content"></div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4 className="Blog-Headers"> Here is the Code.  Because repl.it is awesome apparently. </h4>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in C </h5>
                <div>
                  <iframe src="https://repl.it/Ko4I/0" height="600px" width="400px">
                    <script src="//repl.it/embed/Ko4I/0.js"></script>
                  </iframe>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in C# </h5>
                <div>
                  <iframe src="https://repl.it/Ko8J/0" height="600px" width="400px">
                    <script src="//repl.it/embed/Ko8J/0.js"></script>
                  </iframe>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in GO </h5>
                <div>
                  <iframe src="https://repl.it/KoiP/1" height="600px" width="400px">
                    <script src="//repl.it/embed/KoiP/1.js"></script>
                  </iframe>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in Java </h5>
                <div>
                  <iframe src="https://repl.it/Kn5t/1" height="600px" width="400px">
                    <script src="//repl.it/embed/Kn5t/1.js"></script>
                  </iframe>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in JavaScript </h5>
                <div>
                  <iframe src="https://repl.it/KncT/0" height="600px" width="400px">
                    <script src="//repl.it/embed/KncT/0.js"></script>
                  </iframe>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in PHP </h5>
                <div>
                  <iframe src="https://repl.it/KoqF/0" height="600px" width="400px">
                    <script src="//repl.it/embed/KoqF/0.js"></script>
                  </iframe>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in Python </h5>
                <div>
                  <iframe src="https://repl.it/KnV6/5" height="600px" width="400px">
                    <script src="//repl.it/embed/KnV6/5.js"></script>
                  </iframe>
                </div>
              </Col>
              <Col md={6}>
                <h5 className="Blog-Headers"> Insertion Sort in Ruby </h5>
                <div>
                  <iframe src="https://repl.it/Koq3/4" height="600px" width="400px">
                    <script src="//repl.it/embed/Koq3/4.js"></script>
                  </iframe>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h3 className="Blog-Headers"> Summary of Killer </h3>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p className="Blog-Text">
                  To explain this game is rather complex, but it is actually incredibly easy (and a lot of fun) to play.
                </p>
                <br/>
                <h4 className="Blog-Headers">Basic Rules</h4>
                <ol className="Blog-Text">
                  <li>
                    Each person is given 13 cards, and he/she arranges them based upon a perspective of how well they will be able to chain combos and control the game
                  </li>
                  <li>
                    The person with a 3 of spades is the first player in the game, and he or she, plays it either by itself, or in a combo.
                  </li>
                  <li>
                    The next person (going either clockwise or counter-clockwise) must match the single or combo and beat it.
                    <ul>
                      <li>That is, if they play a single 3-of-spades, the next player must play a single 3-of-clubs or higher.
                        <ul><li>The next player may also play a "bomb" which beats anything except for another bomb.</li></ul>
                      </li>
                      <li>That is, if they play the 3-of-spades in a a pair (two/three/four-of-a-kind), the next player must also play a pair where the last card in the pair is higher in suite or number than the pair they are beating.
                        <ul><li>The next player may also play a "bomb" which beats anything except for another bomb.</li></ul>
                      </li>
                      <li>That is, if they play a 3-of-spades in a straight of 5 cards, the next player must play a straight of 5 or more cards where the start and end of the straight is higher than the straight he/she is beating.
                        <ul><li>The next player may also play a "bomb" which beats anything except for another bomb.</li></ul>
                      </li>
                      <li>That is, if they played a 3-of-spades in a "bomb" (3 or more consecutive pairs), the next player must play a bomb which matches the number of consecutive pairs, and where each pair exceeds its corresponding pair in precedence.</li>
                    </ul>
                  </li>
                  <li> The next player must beat or pass (if they pass, they are out for the round) whatever the prior player played (using the same logic mentioned above)</li>
                  <li> If noone can beat what was just played, everyone would pass and "control" would be given to the last player who played something.  That person can then play whatever they want. </li>
                  <li> The first person to run out of cards, wins the game. </li>
                </ol>
                <br/>
                <h4 className="Blog-Headers">Card Ranking</h4>
                <ul className="Blog-Text">
                  <li> In terms of single cards, the card ranking is as follows:
                    <ul> <li>3 &lt; 4 &lt; 5 &lt; 6 &lt; 7 &lt; 8 &lt; 9 &lt; 10 &lt; jack &lt; queen &lt; king &lt; ace&lt; 2 </li>
                    </ul>
                  </li>
                  <li> In terms of suites, the card ranking is as follows:
                    <ul> <li>spades &lt; clubs &lt; diamonds &lt; hearts </li>
                    </ul>
                  </li>
                </ul>

                <br/>
                <Row>
                  <Col md={12}>
                    <h3 className="Blog-Headers"> Optimizing a Killer Hand </h3>
                  </Col>
                </Row>
                <h5 className="Blog-Headers"><u>Assess the Strength of the Combo</u></h5>
                <p className="Blog-Text">
                  The "stronger" the combo the less likely your opponent will be able to match and beat it.  If they cannot beat your combo, they will be forced to pass and turn over control to you.
                  You want control to be passed to you, so you can play a set of cards which would enable you to most get rid of your hand.  First, however, you need to assess and order your combinations based upon strength.
                  The stronger combos will have a lot of cards, with the highest numbers possible of the highest suites.

                </p>
                <br/>
                <p className="Blog-Text">
                  Thus, ranking combo structure from most to least signficant, the "strength" of your combination can be defined based upon:
                </p>
                <ol className="Blog-Text">
                  <li> <strong>The number of cards in the combo </strong>
                    <ul><li>as the more cards your combo has, the less likely your opponent will match it</li></ul>
                  </li>
                  <li> <strong>The number/facecard rank of the cards you are playing</strong>.
                    <ul><li>as the higher in number rank of your cards, the less cards in the deck exist to beat it. e.g. there exist less cards that can beat a King than there are to beat a 3.</li></ul>
                  </li>
                  <li> <strong>The suite of the card of the cards you are playing </strong>
                    <ul><li>as, again, there exist less cards that beat hearts than spades</li></ul>
                  </li>
                </ol><br/><br/>


                <h5 className="Blog-Headers"><u>Assess the Strength of Your Hand</u></h5>

                <p className="Blog-Text">
                  However, even if you have the highest combination in the game (a bomb, 3 to 6 consecutive pairs), it does not gaurantee that you will control the game and win.
                  Not only that, but you must think of a strategy when arranging your hand into combos if you want to win.
                </p><br/>

                <p className="Blog-Text">
                  Assume that you are given a hand [Q &diams; , 9 &diams; , 9 &#9828; , 8 &#9831; , 6 &#9828; , 9 &#9831; , 4 &#9828; , J &hearts; , 3 &#9828; , 10 &#9831; , A &#9831; , 2 &#9831; , K &diams;]
                </p>
                <br/>
                <p className="Blog-Text">
                  How would you arrange your hand to reflect an optimal, winning, strategy?
                </p><br/><br/>

                <p className="Blog-Text"><span><strong>First arrange hand based upon the strongest possible combos</strong></span></p>
                <p className="Blog-Text">
                  <ol className="Blog-Text">
                    <li>Starting with the second card to the left, is the card higher (factoring in suite) than the Q &diams; ? No.  Insert to the left.
                      <ul><li> [9 &diams; , Q &diams; , 9 &#9828; , 8 &#9831; , 6 &#9828; , 9 &#9831; , 4 &#9828; , J &hearts; , 3 &#9828; , 10 &#9831; , A &#9831; , 2 &#9831; , K &diams;] </li> </ul>
                    </li>
                    <li>For the third card,  is the card higher (factoring in suite) than the Q &diams; and cards to the left of it? No.  Insert to the left.
                      <ul><li> [9 &#9828; , 9 &diams; , Q &diams; , 8 &#9831; , 6 &#9828; , 9 &#9831; , 4 &#9828; , J &hearts; , 3 &#9828; , 10 &#9831; , A &#9831; , 2 &#9831; , K &diams;] </li> </ul>
                    </li>
                    <li>For the fourth card, is it &gt; Q &diams; ? No. Is it &gt; 9 &diams;  ? No. Is it &gt; 9 &#9828; ? No. Insert to the left.
                      <ul><li> [8 &#9831; , 9 &#9828; , 9 &diams; , Q &diams; , 6 &#9828; , 9 &#9831; , 4 &#9828; , J &hearts; , 3 &#9828; , 10 &#9831; , A &#9831; , 2 &#9831; , K &diams;] </li> </ul>
                    </li>
                    <li>For the fifth card, is it &gt; Q &diams; ? Using the same logic above, insert card into the appropriate place.
                      <ul><li> [6 &#9828; , 8 &#9831; , 9 &#9828; , 9 &diams; , Q &diams; , 9 &#9831; , 4 &#9828; , J &hearts; , 3 &#9828; , 10 &#9831; , A &#9831; , 2 &#9831; , K &diams;] </li> </ul>
                    </li>
                    <li> etc. etc.
                    </li>
                    <li>You should now have the following.
                      <ul><li> [3 &#9828; , 4 &#9828; , 6 &#9828; , 8 &#9831; , 9 &#9828; 9 &#9831; , 9 &diams; 10 &#9831; , J &hearts; , Q &diams; , K &diams; , A &#9831; , 2 &#9831; ] </li> </ul>
                    </li>
                  </ol>
                </p><br/>

                <p className="Blog-Text">
                  This is essentially <a href=""> insertion sort </a>, right?  You are taking the second card, and placing it relative to the cards to the left of it.  You do not really need to worry about suites at this point,
                  because you will probably take into consideration suite precedence during your insertion sort, and simply because you are simply arranging your cards just to see what you have, combo-wise.
                </p><br/><br/>


                <p className="Blog-Text"><span><strong>Second after you recognize existing combos, perform optimization </strong></span></p>
                <p className="Blog-Text">
                  Is one insertion sort, enough to achieve an optimal sorting arrangment for Killer? Nope!  Not quite, but it is a good place to start!
                </p><br/>

                <p className="Blog-Text">
                  In this case, observe that you have a bunch of singles (3 &#9828; , 4 &#9828; , 6 &#9828;  8 &#9831; ) that
                  you need to keep track of.  They are the "least strong" because you only get rid of one card when playing them.  The next strongest combo is the ( 9 &#9828; 9 &#9831; ), which is a basic pair
                  that you can sneak when people play pairs (or, better, play at the end after you grab control after the long run).  The strongest combo is the run (9 &diams; 10 &#9831; , J &hearts; , Q &diams; , K &diams; , A &#9831; , 2 &#9831;).
                </p><br/>



                <p className="Blog-Text">
                  However, you just have that 8 &#9831; clustered with the singles.  Shouldn&#39;t that be part of the run?  Yes...yes, it should be.  You&#39;ll have a much easier time getting rid of that 8 in a run,
                  than you would by playing it a single.
                </p>
                <ul className="Blog-Text">
                  <li>You should now have the following.
                    <ul><li> [3 &#9828; , 4 &#9828; , 6 &#9828; , 9 &#9828; 9 &#9831; , 8 &#9831; , 9 &diams; 10 &#9831; , J &hearts; , Q &diams; , K &diams; , A &#9831; , 2 &#9831; ] </li> </ul>
                  </li>
                </ul><br/>
                <p className="Blog-Text">
                  Great! Now...look at that 9 &diams; in the run.  Does it need to be there? Can you not just sub in another, lower suited 9, in its place?  Yep, you sure can!  Remember, all you need
                  to beat a straight is have greater than or equal to the number of cards, and have the beginning/ending cards be greater (in suite or number).  Everything in the middle suite-wise does not matter.
                </p>
                <ul className="Blog-Text">
                  <li>You should now have the following.
                    <ul><li> [3 &#9828; , 4 &#9828; , 6 &#9828; ,  9 &#9831; ,  9 &diams; 8 &#9831; , 9 &#9828; 10 &#9831; , J &hearts; , Q &diams; , K &diams; , A &#9831; , 2 &#9831; ] </li> </ul>
                  </li>
                </ul><br/>
                <p className="Blog-Text">
                  Awesome, almost done.  Now...see that 2 &#9831; ?  Should you really play it as part of a run?  Well...maybe.  I mean, after you lose control of the round playing singles, and your opponent plays pairs or straights,
                  then sure, I guess it is possible you can still win, but shouldn&#39;t <em>you</em> want to dictate the order of things?  Yes.  How might you be able to do that? With luck, and playing that 2 &#9831; during the single run
                  and hoping noone will beat it (the only ones that can are a higher suited 2, and a bomb).
                </p>
                <ul className="Blog-Text">
                  <li>You should now have the following <em> killer optimized</em> hand.
                    <ul><li> [3 &#9828; , 4 &#9828; , 6 &#9828; , 2 &#9831; 9 &#9831; ,  9 &diams; 8 &#9831; , 9 &#9828; 10 &#9831; , J &hearts; , Q &diams; , K &diams; , A &#9831; ] </li> </ul>
                  </li>
                </ul><br/>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h3 className="Blog-Headers"> Conclusion </h3>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              <p className="Blog-Text">
                As you can see, while one run of insertion sort might be enough to ascertain the presence of most combinations, it is isn&#39;t quite able to give us a straight optimized Killer hand straight out the gate.
                There exists a set of strategies (or heurestics) that must be applied.  Hopefully in future blog posts, we will be able to see such things in action.
              </p>
              </Col>
            </Row>


         </Grid>
      )
   }
}

export default a_killer_insertion_sort;

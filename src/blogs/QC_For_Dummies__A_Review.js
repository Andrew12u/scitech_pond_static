import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/QC_For_Dummies__A_Review.css"
import "./css/General_Blog.css"


class QC_For_Dummies__A_Review extends React.Component {
   render() {
     return(
       <Grid>
         <Row>
           <Col md={12}>
             <h1 className="Blog-Headers"> "QC For Dummies - A Review" </h1>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Introduction </h3>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <p className="Blog-Text">
               Just some notes on a particularly antiquated book written in 2007 called
               "Quality Control for Dummies" by Larry Webber and Michael Wallace.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Quality Control vs. Quality Assurance </h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               I have always been fascinated with the difference between "quality assurance" and
               "quality control."  Having used the terms interchangably at times,
               I feel that like their definitions can easily blur if one isn't too careful.
             </p>
             <p className="Blog-Text">
               The authors distinguish <strong> quality control </strong> from <strong> quality assurance </strong>
               by stipulating that
               <br/><br/>
               <strong> quality control </strong>
               <ul>
                 <li>Focuses on identifying problems <em> after they occur</em></li>
                 <li>Looks at individual parts of the process</li>
               </ul>
               <br/><br/>
               whereas
               <br/><br/>
               <strong> quality assurance </strong>
               <ul>
                 <li>Focuses on preventing problems <em> before they occur</em></li>
                 <li>Looks at the entire system</li>
               </ul>
             </p>
             <br/>
             <p className="Blog-Text">
               "Problem" in this case being anything that impacts the customer, e.g. production concerns.
             </p>
             <br/>
             <hr/>
             <p className="Blog-Text">
               Of course, in reality, there are many different definitions for the two terms.
               At the moment, I'm more prone to agree with <a href="https://asq.org/quality-press/display-item?item=T1039">ISO 9000:2015: Quality management systems—Fundamentals and vocabulary</a>
               <br/>
               which stipulates:
             </p>
             <p className="Blog-Text">
               <br/><br/>
               <strong> quality assurance </strong>
               <ul>
                 <li>consists of that “part of quality management focused on providing confidence that quality requirements will be fulfilled.” The confidence provided by quality assurance is twofold—internally to management and externally to customers, government agencies, regulators, certifiers, and third parties.</li>
                 <li>quality assurance relates to how a process is performed or how a product is made</li>
               </ul>
               <br/><br/>
               whereas
               <br/><br/>
               <strong> quality control </strong>
               <ul>
                 <li>is that “part of quality management focused on fulfilling quality requirements.”</li>
                 <li>quality control is more the inspection aspect of quality management.</li>
               </ul>
               <br/><br/>
               Cite: ASQ's article <a href="http://asq.org/learn-about-quality/quality-assurance-quality-control/overview/overview.html"> WHAT ARE QUALITY ASSURANCE AND QUALITY CONTROL? </a>
             </p>
             <hr/>
             <p className="Blog-Text">
               Side Note: It is easy to see, by these simple definitions, that both white-box and black-box testing
               falls under "quality assurance" and <em>not</em> "quality control", as the goal behind testing
               is to prevent bugs from reaching production, not find them after they occur. Also, arguably,
               the whole end-to-end system (including business processes) is the thing being evaluated.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Plan-Do-Check-Act (PDCA)</h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               This cyclic methodology, pioneered by Walter Shewart while at Bell Laboratories in 1930s, is the super
               simple concept of trying to cyclically
               <ol>
                 <li><strong>Plan</strong> to improve a process</li>
                 <li><strong>Do</strong> small changes to improve a process</li>
                 <li><strong>Check</strong> whether your small changes are doing what you expect.</li>
                 <li><strong>Act</strong> on whatever you learned from your little experiment.</li>
               </ol>
             </p>
             <p className="Blog-Text">
               At each stage you can use a variety of "tools" (e.g. any sort of form of charting, strategy, etc.)
               that you need to accomplish your goals.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={6}>
             <div className="pdca_multiloop"></div>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <hr/>
             <p className="Blog-Text">
               Side Note Regarding Applicability: There are some questions whether this methodology could be adapted
               to modern agile methodologies.  It might be possible incorporate this in a sprint...PDCA planning might
               occur simultaneously with Sprint Planning; this might make sprint planning significantly longer, it's
               possible.  PDCA Do & Check actions could occur as taskable items to be included in the backlog.
               The PDCA Act portion could be included in the Sprint Retrospective.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Attribute vs. Variable Data</h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               When talking about quality of a particular product, the authors distinguish
               between
             </p>
             <p className="Blog-Text">
               <ul>
                 <li><strong>Attribute Data:</strong> data which can be discretely measured. (e.g. arguably, colors on a traffic light)</li>
                 <li><strong>Variable Data:</strong> data that can be continuously meadured (e.g. measurements on a ruler).</li>
               </ul>
             </p>
             <p className="Blog-Text">
               The authors astutely observe that there are benefits to using each.  Variable data might be easier to analyze, giving you
               more information on qualitative characteristics.  Attribute data might be used for making fuzzy concepts, like satisfaction
               of customer requirements, more transparent/measurable.  Variable data can be categorized into Attribute data, but it might be
               unwise to go the other way.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Supplier Self-Survey</h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               When working with a varied set of suppliers, sometimes it might be useful to know if they are undergoing changes.
               Changes in suppliers might lead to negative impacts downstream.  One simple way of monitoring supplier changes is
               to simply ask them if there are have been any changes in
               <ul>
                 <li>Facilities</li>
                 <li>Equipment</li>
                 <li>Management Personnel</li>
                 <li>Organizational Structure</li>
                 <li>The Products being Used</li>
                 <li>Financial Situation</li>
               </ul>
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <hr/>
             <p className="Blog-Text">
               Side Note Regarding Applicability: It goes without saying that getting all of this information presupposes a
               fantastic, trusting, relationship with your supplier.  The authors want to remind you to inform your suppliers
               that you'll be sure to keep all of that information confidential but...honestly, that's a lot of sensitive material to ask for.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Consumer vs Producer Risk</h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               When talking about Quality Control, in this case inspecting goods after they're produced, there are two levels of Risk
               <ul>
                 <li><strong>Consumer Risk</strong>: Inpection doesn't reveal an error (consumer can use a product that doesn't satisfy quality requirements).</li>
                 <li><strong>Producer Risk</strong>: Inpection reveals a false positive (producer can throw away a perfectly good product). </li>
               </ul>
               <hr/>
               Side Note: I thought this would be an interesting concept to apply towards software QA.  Deterimining these levels of risk might be useful during
               future sprint planning sesssions.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Lot Sampling </h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               This isn't so much an issue with software develpoment, unless the output of your product is something tangible.  Perhaps...fabricated
               CMOS chips produced in large quantities.  The software in charge of running the machinery to produce these chips might function
               as expected, but there might still be environmental factors that might affect the quality of the resulting CMOS chips.  There are several
               ways to inspect material after it's produced but the authors mentioned batch sampling in particular.
              <br/>
              <ul>
                <li><strong>Single Sampling</strong>: Randomly take a single sample from a given lot.  Reject the lot if the number of defects is greater than some <em>acceptance number</em></li>
                <li><strong>Double Sampling</strong>: Randomly take a single sample from a given lot.  If this sample contains a number of defects greater than some <em>acceptance number</em>, take another randome sample.
                If the number of defects is still unacceptaple, reject the lot.
                </li>
                <li><strong>Sequential Sampling</strong>: Sequentially take a samples from a lot.  After each subsequent sample, a decision is made as to whether accept or reject the lot.</li>
              </ul>
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Kano Models </h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               The Kano model is a way to gauge product features based upon customer desires:
               <br/>
               <ul>
                 <li><strong>Must-Haves</strong>: These are necessary features that must exist prior customers doing business with you (bicycles must have wheels).</li>
                 <li><strong>Performance</strong>: If these aspects of the product perform well, the customer is satisfied (acceleration on a car).</li>
                 <li><strong>Satisfiers</strong>: If you include these features, the customer might be impressed with the product.  They're not necessary, however.</li>
               </ul>
               <br/>
               Based upon a poll given (0-[Not at all interested] to 5-[Awesome feature!]) to the customer on each feature, you can form a kano graph which looks like the graph below.
               <br/>
             </p>
           </Col>
         </Row>
         <Row>
          <Col md={1}></Col>
           <Col md={6}>
             <div className="kano_graph"></div>
             <p className="Blog-Text">
               Blue Line = Satisfiers
               <br/>
               Yellow Line = Performance
               <br/>
               Red Line = Must-Haves
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> SIPOC Map </h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               A SIPOC map is a pictoral representation of what data to collect in order to identify elements relating to quality.  In Particular, SIPOC stands for:
               <br/>
               <ul>
                 <li><strong>Suppliers</strong>: Anyone/Anything responsible for supplying input (could be a 3D-Printer, car manufacturer, etc.)</li>
                 <li><strong>Input</strong>: Raw material for the process (fuel, car, windshield wipers, etc).</li>
                 <li><strong>Process</strong>: A sequence of steps for transforming input to output.</li>
                 <li><strong>Output</strong>: The end-product you're left with (paycheck, CMOS chip, car, haircut, etc.)</li>
                 <li><strong>Customers</strong>: Entity responsible for consuming/using/buying the end-product (car buyer, grocery shopper, etc.)</li>
               </ul>
               <br/>
               See below for an example SIPOC diagram.
               <br/>
             </p>
           </Col>
         </Row>
         <Row>
          <Col md={1}></Col>
           <Col md={6}>
             <div className="sipoc_diagram"></div>
             <p className="Blog-Text">
               <hr/>
               Side Note Regarding Applicability: This might be an interesting tool to use, in conjunction with flowcharting or value stream mapping.
               <br/>
               Cite:
              <br/>
               <a href="https://www.lucidchart.com/pages/examples/process-map/sipoc-diagram-template"> https://www.lucidchart.com/pages/examples/process-map/sipoc-diagram-template</a>
             </p>
             <div className="sipoc_diagram2"></div>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Value Stream Mapping (VSM) </h3>
           </Col>
         </Row>
         <Row>
           <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               A Value Stream Map is a graph that can be used for identifying waste (per LEAN definitions).
               It's tool to use when you have full visibility into the product/service you're providing.
               Conversely, its utility diminishes with the less visibility you have.
             </p>
           </Col>
         </Row>
         <Row>
          <Col md={1}></Col>
           <Col md={11}>
             <p className="Blog-Text">
               <strong>Value Added</strong> - any time where value is added to end-product
               <br/>
               <strong>Non-Value Added</strong> - any time where no value is added to end-production
               <br/>
               <strong>Uptime</strong> - the percentage of time where process step is active
               <br/>
               <strong>C/T - Cycle time</strong> - <a href="https://www.isixsigma.com/dictionary/cycle-time/">"total time from the beginning to the end of your process, as defined by you and your customer"</a>
               <br/>
               <strong>C/O - Changeover time</strong> - elapsed time between the first and last product being produced.
               <br/>
               <strong>Lead Time (not shown)</strong> - total time between receiving the order and delivering the item
               <br/>
               <strong> Takt Time (not shown)</strong> - total time between starting work on one product and starting the next.  <a href="https://toggl.com/takt-time-cycle-time-lead-time/"> And/or "the rate at which you need to comple the production process in order to meet customer demand" </a>
             </p>
             <p className="Blog-Text">
               <a href="https://en.wikipedia.org/wiki/Value_stream_mapping"> See Wikipedia Article on VSM</a> for more details.
             </p>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h1 className="Blog-Headers"> Conclusion </h1>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <p className="Blog-Text">
               I can go on and on about the various other SixSigma, 5S, LEAN, QFD tools, but that would make this already long blog post longer.
               The point is that, even though this book was written in 2007, it introduced enough QC concepts to get its audience interested in learning more.
               It would be an excellent book recommendation for Non-QC managers who can be potential sponsors for projects.
             </p>
           </Col>
         </Row>
       </Grid>
     );
   }
}

export default QC_For_Dummies__A_Review;

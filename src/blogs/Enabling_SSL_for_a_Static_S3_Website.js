import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/Enabling_SSL_for_a_Static_S3_Website.css"
import "./css/General_Blog.css"


class Enabling_SSL_for_a_Static_S3_Website extends React.Component {
   render() {
     return(
       <Grid>
         <Row>
           <Col md={12}>
             <h1 className="Blog-Headers"> "Enabling SSL for a Static S3 Website" </h1>
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
               Today I just wanted to go over the basics of enabling SSL encryption
               while hosting a static website on S3. Most of the leg work has already
               been done by other people, it&#39;s just a matter of putting it all together.
             </p><br/>
           </Col>
         </Row>
         <Row>
           <Col md={12}>
             <h3 className="Blog-Headers"> Procedure </h3>
             <ol className="Blog-Text">
               <li> <strong>First create your static S3 website.</strong>
                 <ul>
                   <li> You can find useful instructions for this in the <a href="http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">AWS documentation</a>.</li>
                 </ul>
               </li>
               <li> <strong>Familiarize yourself with an organization called Let&#39;s Encrypt.</strong>
                 <ul>
                   <li> A non-profit organization dedicated to providing a more secure and privacy-respecting web</li>
                   <li> Other certificate authorities require mullah (which I do not have)</li>
                   <li> Certs provided by this organization are actualy recognized by <a href="https://letsencrypt.org/docs/certificate-compatibility/">many common browsers</a>.</li>
                 </ul>
               </li>
               <li> <strong>After hosting your S3 website, and making sure you can navigate to it via the bucket URL, Create a clean VM so you can execute Certbot calls.</strong>
                 <ul>
                   <li> Don&#39;t create your DNS routes just yet.  You will do this after you create your Cloudfront Distribution</li>
                 </ul>
               </li>
               <li> <strong>Create a clean VM (with an <a href="https://certbot.eff.org/all-instructions/">OS chosen from amongst the many recognized by Certbot</a>)</strong>
                 <ul>
                   <li> While not strictly necessary, having a clean VM can help you avoid dependency problems later.</li>
                 </ul>
               </li>
               <li> <strong>Install your choice of server</strong>
                 <ul>
                   <li> Certbot will need to make outbound calls.</li>
                   <li> Obviously, make sure the server is running.</li>
                 </ul>
               </li>
               <li> <strong><a href="https://certbot.eff.org/all-instructions/">Install Certbot</a></strong></li>
               <li> <strong>Recommended: Install <a href="https://github.com/dlapiduz/certbot-s3front">https://github.com/dlapiduz/certbot-s3front</a></strong>
                 <ul>
                   <li> While not strictly necessary, this takes a lot of pain out of having to create directories within the s3 bucket and doing manual manipulations.</li>
                   <li> It also auto-uploads the SSL cert to your Cloudfront Distribution automatically.</li>
                   <li> Make sure you read the instructions of the repo, and make sure it is somewhat up-to-date (as such things change)</li>
                   <li> Make sure you create a special IAM user with attached policy mentioned in the README.md.  Take note of the ACCESS_KEY and SECRET_ACCESS_KEY as you will need these later</li>
                 </ul>
               </li>
               <li> <strong>If you do not want to use certbot-s3front, you might need to <a href="https://certbot.eff.org/docs/using.html#manual">trigger certbot manually</a></strong>
                 <ul>
                   <li> Beyond the scope of this blog.</li>
                 </ul>
               </li>
               <li> <strong><a href="http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html">Create your cloud front distribution</a></strong>
                 <ul>
                   <li> Do not always take these AWS tutorials as face value.  Usually they try to sign you up for more than you need. </li>
                   <li> You probably do not need to use &#39;All Edge Locations&#39;. Select the regions which you deem are appropriate</li>
                   <li> You list your CNAMEs during this cloudfront disribution creation.  Make sure you have www.website.com and website.com CNAMEs listed here.</li>
                   <li> You want to ensure that &#39;Viewer Protocol Policy&#39; is set to HTTP and HTTPS, at least for now.</li>
                   <li> Do not worry if your CloudFront Distribution remains &#39;In Progress&#39; for a while. It will eventually go through</li>
                   <li> Important: Take note of your CloudFront Distribution ID, as you will need it later. </li>
                   <li> Note: For some weird reason, <a href="https://aws.amazon.com/cloudfront/pricing/">AWS charges extra for HTTPS requests</a></li>
                 </ul>
               </li>
              <li> <strong> Within Route 53, make sure that you create alias records that point to your recently created CloudFront distribution</strong></li>
              <li> <strong>If you are using certbot-s3front, trigger it using the command mentioned in the README</strong>
                 <pre>
                   <code>
                    AWS_ACCESS_KEY_ID="REPLACE_WITH_YOUR_KEY"
                    AWS_SECRET_ACCESS_KEY="REPLACE_WITH_YOUR_SECRET"
                    certbot --agree-tos -a certbot-s3front:auth
                    --certbot-s3front:auth-s3-bucket REPLACE_WITH_YOUR_BUCKET_NAME
                    [ --certbot-s3front:auth-s3-region your-bucket-region-name ] #(the default is us-east-1, unless you want to set it to something else, you can delete this line)
                    [ --certbot-s3front:auth-s3-directory your-bucket-directory ] # (default is "")
                    -i certbot-s3front:installer
                    --certbot-s3front:installer-cf-distribution-id REPLACE_WITH_YOUR_CF_DISTRIBUTION_ID
                    -d REPLACE_WITH_YOUR_DOMAIN
                   </code>
                 </pre>
                 <ul>
                   <li> Note: Brackets denote optional arguments</li>
                   <li> Note: REPLACE_WITH_YOUR_DOMAIN is the domain name of your website</li>
                 </ul>
               </li>
               <li> <strong> Now check your CloudFront distribution.  You should see it&#39;s status as In-Progress.</strong>
                 <ul>
                   <li> This should mean that it is deploying</li>
                   <li> If you open the CF distribution, you should see that it is mentioning your SSL cert as a &#39;Custom SSL Certificate&#39; under General details</li>
                 </ul>
               </li>
               <li> <strong> Either after or before the CF distro is done deploying, you can open it up, go to Behaviors and edit the default so that it Redirects HTTP to HTTPS.</strong></li>
               <li> <strong> Open website in preferred browser and verify you are seeing HTTPs traffic after CF is deployed.</strong></li>
             </ol>
           </Col>
         </Row>
       </Grid>
     );
   }
}

export default Enabling_SSL_for_a_Static_S3_Website;

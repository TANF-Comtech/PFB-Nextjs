import Head from 'next/head'

import Wrapper from '../components/global/wrapper'
import Heading1 from '../components/global/h1'
import MainContent from '../components/global/main-content'

import Img1 from '../public/sample-images/sample-image-1.jpg'
import Img2 from '../public/sample-images/sample-image-1.jpg'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <Wrapper>
        <Heading1>Community Grants</Heading1>
        <MainContent>
          <h2>Grant Guidelines</h2>
          <p>The PeopleForBikes Community Grant Program supports bicycle infrastructure projects and targeted advocacy initiatives that make it easier and safer for people of all ages and abilities to ride. Please review the following information carefully before submitting a grant application. Proposals that are incomplete or do not fall within our funding priority areas will not be considered. Visit the Get Local map and click on any state for examples of funded projects in each location.</p>
          <h3>Who Can Apply</h3>
          <p>PeopleForBikes accepts grant applications from non-profit organizations with a focus on bicycling, active transportation, or community development, from city or county agencies or departments, and from state or federal agencies working locally. <strong>PeopleForBikes only funds projects in the United States</strong>. Requests must support a specific project or program; we do not grant funds for general operating costs.</p>
          <img src={ Img1 } alt="Sample Image 1" />
          <p>Implement the Employee Pro Purchase Program in three easy steps:</p>
          <ul>
            <li><strong>STEP 1</strong>: Add a line on the fee section of your Pro Deal Form titled, “Community Grant Donation: Add $20” **</li>
            <li><strong>STEP 2</strong>: Create a SKU code for this fee so you can track it</li>
            <li><strong>STEP 3</strong>: Run a report on the money collected by this fee every <i>quarter and make the donation to PeopleForBikes</i>, noting it is for EPP</li>
          </ul>
          <p>**EPP Participants collect <em>$20 on every bicycle sold as a pro deal</em>; you can identify an appropriate donation amount for other gear or equipment.</p>
          <p><b>Every dollar we collect through the Employee Pro Purchase Program goes directly to our Community Grant Program</b>. Each year we award more than $100,000 in cash grants to fund new bike paths, trails, and other programs that encourage people to ride. We’ve awarded more than $3.5 million since 1999.</p>
          <h2>Next Section</h2>
          <p>This comprehensive advocacy campaign will help Bike Durham develop a complete multimodal network. Their ambitious goal:  A City commitment to and fund and implement 125 miles of slow streets, protected lanes and greenway infrastructure by 2025.</p>
          <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar, metus non convallis mattis, lacus eros pretium diam, ut consectetur lorem lorem sed augue. Duis pharetra odio et lorem finibus consectetur.
          </blockquote>
          <p>This PeopleForBikes grant will help the Cacapon Resort State Park foundation build a 2.6 mile beginner-level mountain bike trail to complement their existing advanced trails. This addition will create a trail loop that qualifies for NICA mountain bike team races, supporting their local team, residents and visitors near and far.</p>
        </MainContent>
      </Wrapper>
    </>
  )
}


export default Homepage

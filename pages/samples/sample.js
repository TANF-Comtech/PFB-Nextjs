import Head from 'next/head'

import Wrapper from '../../components/global/wrapper'
import MainContent from '../../components/global/main-content'
import Accordion from '../../components/global/accordion'
import BlueQuestion from '../../components/global/blueQuestion'

import Heading1 from '../../components/primitives/h1'
import BasicButton from '../../components/primitives/button'
import CheckboxSwitch from '../../components/primitives/checkbox-switch'
import RadioSet from '../../components/primitives/radio'

import Img1 from '../../public/sample-images/sample-image-1.jpg'
import Img2 from '../../public/sample-images/sample-image-2.jpg'

function Homepage({props}) {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <Wrapper postTitle="Sample Title">
        <Heading1>Heading 1: Community Grants</Heading1>
        <MainContent>
          <h2>Heading 2: Grant Guidelines</h2>
          <p>The PeopleForBikes Community Grant Program supports bicycle infrastructure projects and targeted advocacy initiatives that make it easier and safer for people of all ages and abilities to ride. Please review the following information carefully before submitting a grant application. Proposals that are incomplete or do not fall within our funding priority areas will not be considered. Visit the Get Local map and click on any state for examples of funded projects in each location.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut pharetra sit amet aliquam. Volutpat maecenas volutpat blandit aliquam. Nullam ac tortor vitae purus faucibus ornare suspendisse. Aenean pharetra magna ac placerat vestibulum lectus mauris. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Sodales ut eu sem integer vitae justo eget. Et malesuada fames ac turpis egestas sed. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Imperdiet sed euismod nisi porta lorem mollis. Congue nisi vitae suscipit tellus mauris a diam maecenas.</p>
          <p>Facilisis mauris sit amet massa vitae. Nisl condimentum id venenatis a. Velit aliquet sagittis id consectetur. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Viverra adipiscing at in tellus integer. In egestas erat imperdiet sed euismod nisi porta lorem. Ullamcorper dignissim cras tincidunt lobortis feugiat. Eleifend donec pretium vulputate sapien nec. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Et molestie ac feugiat sed. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Arcu vitae elementum curabitur vitae. At tellus at urna condimentum mattis. Ultrices vitae auctor eu augue.</p>
      
          <h3>Heading 3: Who Can Apply</h3>
          <p>PeopleForBikes accepts <a href="https://www.airbnb.com">grant applications</a> from non-profit organizations with a focus on bicycling, active transportation, or community development, from city or county agencies or departments, and from state or federal agencies working locally. <strong>PeopleForBikes only funds projects in the United States</strong>. Requests must support a specific project or program; we do not grant funds for general operating costs.</p>
          <p>Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Venenatis tellus in metus vulputate eu scelerisque felis. Sed blandit libero volutpat sed cras. Habitant morbi tristique senectus et. Gravida arcu ac tortor dignissim convallis aenean et. Egestas tellus rutrum tellus pellentesque eu tincidunt. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Diam phasellus vestibulum lorem sed risus ultricies tristique. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Ipsum dolor sit amet consectetur adipiscing. Ut lectus arcu bibendum at varius vel pharetra vel. Rutrum quisque non tellus orci ac auctor augue.</p>
          <p>Aenean vel elit scelerisque mauris pellentesque pulvinar. Leo integer malesuada nunc vel risus commodo. Bibendum est ultricies integer quis. Imperdiet nulla malesuada pellentesque elit. Placerat vestibulum lectus mauris ultrices eros in cursus. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Laoreet non curabitur gravida arcu. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Nibh mauris cursus mattis molestie. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Congue quisque egestas diam in arcu cursus euismod quis. A diam sollicitudin tempor id eu nisl. Velit egestas dui id ornare. Nibh ipsum consequat nisl vel. Risus ultricies tristique nulla aliquet enim. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Donec adipiscing tristique risus nec.</p>
          <img src={ Img1 } alt="Sample Image 1" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut pharetra sit amet aliquam. Volutpat maecenas volutpat blandit aliquam. Nullam ac tortor vitae purus faucibus ornare suspendisse. Aenean pharetra magna ac placerat vestibulum lectus mauris. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Sodales ut eu sem integer vitae justo eget. Et malesuada fames ac turpis egestas sed. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Imperdiet sed euismod nisi porta lorem mollis. Congue nisi vitae suscipit tellus mauris a diam maecenas.</p>
          <p>Facilisis mauris sit amet massa vitae. Nisl condimentum id venenatis a. Velit aliquet sagittis id consectetur. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Viverra adipiscing at in tellus integer. In egestas erat imperdiet sed euismod nisi porta lorem. Ullamcorper dignissim cras tincidunt lobortis feugiat. Eleifend donec pretium vulputate sapien nec. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Et molestie ac feugiat sed. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Arcu vitae elementum curabitur vitae. At tellus at urna condimentum mattis. Ultrices vitae auctor eu augue.</p>
          <p>Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Venenatis tellus in metus vulputate eu scelerisque felis. Sed blandit libero volutpat sed cras. Habitant morbi tristique senectus et. Gravida arcu ac tortor dignissim convallis aenean et. Egestas tellus rutrum tellus pellentesque eu tincidunt. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Diam phasellus vestibulum lorem sed risus ultricies tristique. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Ipsum dolor sit amet consectetur adipiscing. Ut lectus arcu bibendum at varius vel pharetra vel. Rutrum quisque non tellus orci ac auctor augue.</p>          
          <p>Implement the Employee Pro Purchase Program in three easy steps:</p>
          <ul>
            <li><strong>STEP 1</strong>: Add a line on the fee section of your Pro Deal Form titled, "Community Grant Donation: Add $20" **</li>
            <li><strong>STEP 2</strong>: Create a SKU code for this fee so you can track it</li>
            <li><strong>STEP 3</strong>: Run a report on the money collected by this fee every <i>quarter and make the donation to PeopleForBikes</i>, noting it is for EPP</li>
          </ul>
          <p>**EPP Participants collect <em>$20 on every bicycle sold as a pro deal</em>; you can identify an appropriate donation amount for other gear or equipment.</p>
          <img src={ Img2 } alt="Sample Image 2" />
          <p><b>Every dollar we collect through the Employee Pro Purchase Program goes directly to our Community Grant Program</b>. Each year we award more than $100,000 in cash grants to fund new bike paths, trails, and other programs that encourage people to ride. We’ve awarded more than $3.5 million since 1999.</p>
          <h2>Next Section</h2>
          <p>This comprehensive advocacy campaign will help Bike Durham develop a complete multimodal network. Their ambitious goal:  A City commitment to and fund and implement 125 miles of slow streets, protected lanes and greenway infrastructure by 2025.</p>
          
          <p>Aenean vel elit scelerisque mauris pellentesque pulvinar. Leo integer malesuada nunc vel risus commodo. Bibendum est ultricies integer quis. Imperdiet nulla malesuada pellentesque elit. Placerat vestibulum lectus mauris ultrices eros in cursus. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Laoreet non curabitur gravida arcu. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Nibh mauris cursus mattis molestie. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Congue quisque egestas diam in arcu cursus euismod quis. A diam sollicitudin tempor id eu nisl. Velit egestas dui id ornare. Nibh ipsum consequat nisl vel. Risus ultricies tristique nulla aliquet enim. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Donec adipiscing tristique risus nec.</p>
          <p>Tempus iaculis urna id volutpat lacus laoreet non curabitur. Facilisis volutpat est velit egestas dui. Pretium viverra suspendisse potenti nullam ac. Lorem ipsum dolor sit amet. Praesent elementum facilisis leo vel fringilla. Nisl purus in mollis nunc sed id semper. Id leo in vitae turpis massa. Vulputate mi sit amet mauris. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Justo laoreet sit amet cursus sit amet dictum sit amet. Purus in mollis nunc sed id semper risus in hendrerit. Adipiscing elit pellentesque habitant morbi tristique senectus et. Arcu ac tortor dignissim convallis aenean et tortor at. Ultricies integer quis auctor elit sed vulputate. Elementum nisi quis eleifend quam adipiscing. Congue eu consequat ac felis donec.</p>
          <p>Tellus mauris a diam maecenas. Sociis natoque penatibus et magnis dis parturient. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Et leo duis ut diam. Amet porttitor eget dolor morbi non arcu. Massa tincidunt nunc pulvinar sapien et. Aliquet enim tortor at auctor urna nunc id cursus metus. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Dui sapien eget mi proin sed libero enim sed faucibus. Morbi tristique senectus et netus et malesuada fames ac turpis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque diam volutpat commodo sed. Donec ac odio tempor orci dapibus ultrices in iaculis nunc.</p>
          <p>Tincidunt augue interdum velit euismod in pellentesque massa. Quis auctor elit sed vulputate mi sit amet mauris. A iaculis at erat pellentesque adipiscing commodo elit at. Enim neque volutpat ac tincidunt. Id consectetur purus ut faucibus pulvinar elementum integer. Pretium nibh ipsum consequat nisl vel pretium lectus. Nulla pellentesque dignissim enim sit amet venenatis urna. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Sit amet aliquam id diam maecenas. Turpis tincidunt id aliquet risus.</p>
          <p>Turpis massa tincidunt dui ut ornare lectus sit. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Aliquet enim tortor at auctor. Sem nulla pharetra diam sit amet nisl suscipit. Donec ac odio tempor orci dapibus ultrices. Ac turpis egestas sed tempus urna et pharetra pharetra. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Et ligula ullamcorper malesuada proin libero. Augue lacus viverra vitae congue eu consequat ac. Dolor magna eget est lorem. Ultricies lacus sed turpis tincidunt. Enim diam vulputate ut pharetra sit amet aliquam. Et malesuada fames ac turpis egestas sed tempus. Fames ac turpis egestas maecenas. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Hac habitasse platea dictumst vestibulum. Viverra suspendisse potenti nullam ac. Est velit egestas dui id ornare arcu odio. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Mauris pharetra et ultrices neque.</p>
          <BlueQuestion>
            <strong>Questions?</strong> For assistance in setting up your Employee Pro
            Purchase Program, please contact Erik Esborg at 303/449-4893 x103,
            erik@peopleforbikes.org.
          </BlueQuestion>          
          <p>Purus sit amet volutpat consequat mauris nunc congue nisi vitae. Elit ut aliquam purus sit amet luctus. Tempor id eu nisl nunc mi ipsum faucibus vitae. Aenean et tortor at risus viverra adipiscing at. Ut sem nulla pharetra diam sit amet nisl suscipit. Egestas diam in arcu cursus euismod. Enim nunc faucibus a pellentesque sit amet. Lobortis feugiat vivamus at augue. Tempus quam pellentesque nec nam aliquam sem et. At augue eget arcu dictum varius. Suspendisse in est ante in. Sed blandit libero volutpat sed cras ornare arcu dui vivamus.</p>
          <p>Gravida cum sociis natoque penatibus. Volutpat sed cras ornare arcu dui vivamus. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Id aliquet risus feugiat in ante metus dictum at. Scelerisque purus semper eget duis at. Nunc non blandit massa enim nec dui nunc. Mauris sit amet massa vitae tortor condimentum lacinia. Interdum velit laoreet id donec ultrices. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis. Scelerisque eleifend donec pretium vulputate sapien nec. Ac auctor augue mauris augue neque gravida in fermentum. Turpis in eu mi bibendum neque. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Cursus metus aliquam eleifend mi in nulla. Lobortis scelerisque fermentum dui faucibus in ornare.</p>
          <p>Diam quam nulla porttitor massa id neque. Cursus eget nunc scelerisque viverra mauris in aliquam. Posuere ac ut consequat semper. Leo vel orci porta non pulvinar neque laoreet suspendisse. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Velit euismod in pellentesque massa placerat. Sagittis purus sit amet volutpat consequat mauris nunc. Viverra vitae congue eu consequat ac felis donec et. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Egestas tellus rutrum tellus pellentesque. Id neque aliquam vestibulum morbi blandit cursus risus at. Aliquam sem fringilla ut morbi tincidunt augue interdum. Maecenas pharetra convallis posuere morbi leo urna. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Sed viverra ipsum nunc aliquet bibendum enim. Pellentesque pulvinar pellentesque habitant morbi tristique. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Nunc mattis enim ut tellus.</p>
          <Accordion title="What is your return policy?">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Accordion>
          <p>Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Aenean pharetra magna ac placerat vestibulum. Nibh nisl condimentum id venenatis a condimentum vitae. Neque vitae tempus quam pellentesque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Est velit egestas dui id ornare arcu. Nullam eget felis eget nunc. Nullam non nisi est sit amet facilisis. Diam quam nulla porttitor massa id neque aliquam vestibulum. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. At in tellus integer feugiat scelerisque varius morbi enim nunc. Enim eu turpis egestas pretium aenean. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Malesuada proin libero nunc consequat. Aliquam purus sit amet luctus venenatis lectus magna. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Porta lorem mollis aliquam ut porttitor leo. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit.</p>
          <p>Pellentesque massa placerat duis ultricies lacus sed turpis. Fermentum odio eu feugiat pretium nibh. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. Dictum varius duis at consectetur lorem donec. Mi quis hendrerit dolor magna eget est lorem ipsum. Ut ornare lectus sit amet est placerat. Et netus et malesuada fames ac turpis egestas. Ut sem viverra aliquet eget sit amet. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Tellus at urna condimentum mattis. Orci porta non pulvinar neque laoreet. Dictumst vestibulum rhoncus est pellentesque elit. Elementum facilisis leo vel fringilla est ullamcorper. Massa tempor nec feugiat nisl pretium fusce. Lectus sit amet est placerat in egestas. Interdum posuere lorem ipsum dolor sit amet consectetur. Pulvinar neque laoreet suspendisse interdum consectetur libero id. Cursus in hac habitasse platea dictumst quisque sagittis purus sit.</p>
          <p>Nec ultrices dui sapien eget mi proin sed. Sit amet justo donec enim diam vulputate ut. Volutpat est velit egestas dui id ornare arcu. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Fames ac turpis egestas sed tempus urna et pharetra. Donec enim diam vulputate ut pharetra sit. Aenean et tortor at risus viverra adipiscing. Tellus at urna condimentum mattis pellentesque id. Arcu felis bibendum ut tristique et. Sapien faucibus et molestie ac feugiat sed lectus. Ultricies mi quis hendrerit dolor magna eget. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Quam viverra orci sagittis eu volutpat. Magnis dis parturient montes nascetur ridiculus mus. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.</p>
          <p>Convallis a cras semper auctor. Dictumst quisque sagittis purus sit. Cras tincidunt lobortis feugiat vivamus at. Fusce id velit ut tortor pretium. Ultrices eros in cursus turpis. Sed id semper risus in hendrerit. Sed tempus urna et pharetra pharetra massa massa ultricies. Nulla facilisi cras fermentum odio eu feugiat pretium. Sed egestas egestas fringilla phasellus. Dictum varius duis at consectetur lorem donec massa. Arcu felis bibendum ut tristique et. Sem viverra aliquet eget sit amet. Tempor orci dapibus ultrices in. In dictum non consectetur a erat nam.</p>
          <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar, metus non convallis mattis, lacus eros pretium diam, ut consectetur lorem lorem sed augue. Duis pharetra odio et lorem finibus consectetur.
          </blockquote>
          <p>This PeopleForBikes grant will help the Cacapon Resort State Park foundation build a 2.6 mile beginner-level mountain bike trail to complement their existing advanced trails. This addition will create a trail loop that qualifies for NICA mountain bike team races, supporting their local team, residents and visitors near and far.</p>
          
          <BasicButton href="/">Basic Button</BasicButton>
          <BasicButton
            buttonBg={ "#D23823" }
            buttonBgHover={ "#D0021B" }
            buttonBorder={ "none" }
            buttonColor={ "white" } 
            buttonColorHover={ "white" }  
            buttonPosition={ "center" }
            href="/"
          >
            Red button
          </BasicButton>
          <BasicButton
            buttonBg={ "#3E9FDC" }
            buttonBgHover={ "#68b4e3" }
            buttonBorder={ "none" }
            buttonColor={ "white" } 
            buttonColorHover={ "white" }  
            buttonPosition={ "right" }
            href="/"
          >
            Blue button
          </BasicButton>
          <h3>Section 7</h3>
          <p>This PeopleForBikes grant will help the Cacapon Resort State Park foundation build a 2.6 mile beginner-level mountain bike trail to complement their existing advanced trails. This addition will create a trail loop that qualifies for NICA mountain bike team races, supporting their local team, residents and visitors near and far.</p>
          
          <form>
            <fieldset>
              <legend>Form Test</legend>

              {/* Text */}
              <label htmlFor="text">Text</label>
              <input type="text" id="text" placeholder="Text Input" /> 

              {/* Checkboxes */}
              <h4>Checkboxes Input Set</h4>
              <CheckboxSwitch 
                checkboxLabel="Checkbox (Unchecked)"
              />
              <CheckboxSwitch 
                checkboxLabel="Checkbox (Checked)"
                checked="checked"
              />
              <CheckboxSwitch 
                checkboxLabel="Checkbox (Disabled)"
                disabled="disabled"
              />
              <CheckboxSwitch 
                checkboxLabel="Checkbox (Checked and Disabled)"
                checked="checked"
                disabled="disabled"
              />

              {/* Switches */}
              <h4>Switch Input Set</h4>
              <CheckboxSwitch 
                checkboxLabel="Switch (off)"
                className="switch"
              />
              <CheckboxSwitch 
                checkboxLabel="Switch (on)"
                checked="checked"
                className="switch"
              />
              <CheckboxSwitch 
                checkboxLabel="Switch (disabled)"
                className="switch"
                disabled="disabled"
                
              />
              <CheckboxSwitch 
                checkboxLabel="Switch (on but disabled)"
                checked="checked"
                className="switch"
                disabled="disabled"
              />

              {/* Radios */}
              <h4>Radio Input Set</h4>
              <RadioSet 
                radioGroupName="radio-trial-set"
                radioLabels={[
                  'Radio - Option 1',
                  'Radio - Option 2',
                  'Radio - Option 3',
                  'Radio - Option 4'
                ]}
                radioValues={[
                  '1',
                  '2',
                  '3',
                  '4'
                ]}
              />

              {/* Select */}
              <label htmlFor="select">Select List</label>
              <select id="select">
                <option value>Choose</option> 
                <optgroup label="Option Group 1"> 
                  <option value>Option 1</option> 
                  <option value>Option 2</option>
                </optgroup>
              </select>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </fieldset>
          </form>

        </MainContent>
      </Wrapper>
    </>
  )
}


export default Homepage

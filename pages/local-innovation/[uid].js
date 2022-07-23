import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import styled, { ThemeContext } from 'styled-components';

import { getPrograms, getProgramPage } from '../../lib/queries/local-innovation';
import { randomID, linkResolver } from '../../lib/utils';

import DefaultContext from '../../context/default/default-context';
import FallbackImage from '../../components/content/fallback-image';

import Wrapper from '../../components/global/wrapper';
import SiteMetaCustom from '../../components/meta/site-meta-custom';
import BigTitleBanner from '../../components/content/big-title-banner';
import Heading1 from '../../components/primitives/h1';
import MainContent from '../../components/global/main-content';
import Accordion from '../../components/global/accordion';
import Promo from '../../components/slices/promo';
import VisualGrid from '../../components/global/visual-grid';
import Grid from '../../components/global/grid';

import Atlanta from '../../public/cities/atlanta.jpg';
import Austin from '../../public/cities/austin.jpg';
import Boston from '../../public/cities/boston.jpg';
import Chicago from '../../public/cities/chicago.jpg';
import Denver from '../../public/cities/denver.jpg';
import Indianapolis from '../../public/cities/indianapolis.jpg';
import Memphis from '../../public/cities/memphis.jpg';
import NYC from '../../public/cities/nyc.jpg';
import Pittsburgh from '../../public/cities/pittsburgh.jpg';
import Portland from '../../public/cities/portland.jpg';
import Seattle from '../../public/cities/seattle.jpg';
import SF from '../../public/cities/sf.jpg';
import WashingtonDC from '../../public/cities/dc.jpg';

const RedHeading = styled.h2`
  color: ${(props) => props.theme.red};
  font-weight: 700;
  text-transform: uppercase;
`;

const BlueBox = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.blueBright};
  display: flex;
  justify-content: center;
  margin-top: 4vh;
  width: 180px;
`;

const ArchiveTitle = styled.h2`
  font-size: 48px;
  margin: 0;
  padding: 0 10px;
  text-transform: uppercase;
`;

const GridBox = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.lightestGray};
  display: flex;
  justify-content: center;
  padding: 30px 40px;
  text-align: center;

  a,
  a:active,
  a:focus,
  a:hover {
    font-weight: 700;
    text-decoration: underline !important;
  }
`;

const VideoFrame = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  margin-bottom: 4vh;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const BlueHeading = styled.h2`
  color: ${(props) => props.theme.blueBright};
`;

const Container = styled.section`
  .embed-container {
    position: relative;
    padding-bottom: 80%;
    height: 0;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  small {
    position: absolute;
    z-index: 40;
    bottom: 0;
    margin-bottom: -15px;
  }
`;

/**
 * <GreenLaneProject>
 *
 * Custom one-off for the legacy Green Lane Project
 * This is a branch of /pages/local-innovation/[uid].js in a sense
 * This component only gets called from that page and only works for this one content instance
 */
const GreenLaneProject = () => {
  const themeProps = useContext(ThemeContext);

  return (
    <>
      <MainContent maxWidth="1200px">
        <VideoFrame>
          <iframe
            src="https://player.vimeo.com/video/93261795?h=82fbe33ea2"
            width="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </VideoFrame>
      </MainContent>

      <MainContent bgColor={themeProps.midnightBlue}>
        {/* PROJECT SUMMARY */}
        <Accordion title="Project Summary" darkMode={true}>
          <Grid>
            <GridBox>
              <Link href="/news/engineering-an-innovation-the-inside-story-of-the-green-lane-project">
                <a>Engineering an innovation: The inside story of the Green Lane Project</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/green-lane-project-officially-kicks-off-in-chicago">
                <a>Green Lane Project officially kicks off in Chicago</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/protected-green-lanes-nearly-double-nationwide-in-2012">
                <a>Protected Green Lanes Nearly Double Nationwide in 2012</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/ray-lahood-supports-green-lanes-at-safety-summit">
                <a>Ray LaHood supports green lanes at Safety Summit</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/the-rise-of-american-protected-bike-lanes-the-4-minute-video-introduction">
                <a>The rise of American protected bike lanes: The 4-minute video introduction</a>
              </Link>
            </GridBox>
          </Grid>
          <MainContent contentPadding="4vh 0vw" textColor="#fff">
            <p>
              The PeopleForBikes Green Lane Project was a five-year program that accelerated the
              spread of protected bike lanes throughout the United States.
            </p>
            <p>
              In 2013, New York; Washington, DC; San Francisco and Chicago had built a string of
              protected bike lanes, but few cities had followed. Across the country, just 24 new
              protected bike lanes opened that year. By 2014, protected bike lanes broke through
              into the mainstream and were no longer just a curiosity found in the most
              bike-friendly cities; they had drawn the attention of forward-thinking street
              designers everywhere.
            </p>
            <p>
              In early 2013, the Green Lane Project revealed widespread sentiment that the federally
              endorsed bikeway design guides didn’t offer enough guidance for protected bike lanes,
              bike signals, and other facilities — even though more than half of major U.S. cities
              were already building them. A meeting with top federal officials led to a rapid
              federal endorsement of the NACTO and ITE guidebooks for protected bike lanes, followed
              by the 2015 publication of a guide to the designs from the Federal Highway
              Administration itself.
            </p>
          </MainContent>
        </Accordion>

        {/* PROTECTED BIKE LANES */}
        <Accordion title="Protected Bike Lanes" darkMode={true}>
          <Grid>
            <GridBox>
              <Link href="/news/the-simple-inexpensive-breakthrough-that-is-transforming-american-cities">
                <a>The simple, inexpensive breakthrough that is transforming American cities</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/tech-talk-using-planters-as-separation">
                <a>Tech Talk: Using planters as separation</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/tech-talk-19-beautiful-ways-to-protect-bike-lanes-photos">
                <a>Tech Talk: 19 beautiful ways to protect bike lanes (photos)</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/tech-talk-latest-innovations-may-make-it-dirt-cheap-to-color-streets">
                <a>Tech Talk: Latest innovations may make it dirt cheap to color streets</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/tech-talk-no-room-for-a-buffer-try-a-wheel-stop-barrier">
                <a>Tech Talk: No room for a buffer? Try a wheel stop barrier</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/the-thrilling-future-of-traffic-engineering">
                <a>The thrilling future of traffic engineering</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/bike-lane-philosophy-are-you-an-incrementalist-or-a-completionist">
                <a>Bike lane philosophy: Are you an incrementalist or a completionist?</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/tech-talk-drainage-on-an-elevated-protected-bike-lane">
                <a>Tech Talk: Drainage on an elevated protected bike lane</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/great-bikeways-only-work-if-they-connect-to-great-bikeways">
                <a>Great bikeways only work if they connect to great bikeways</a>
              </Link>
            </GridBox>
          </Grid>
          <MainContent contentPadding="4vh 0vw" textColor="#fff">
            <p>
              People on bikes everywhere feel more safe and comfortable on busy streets with a
              physical barrier between them and motor vehicles. In some places it’s a plastic post
              or line of parked cars. In others it’s a curb, planter or slightly elevated bike
              lanes. But no matter what separates people on bikes from people in cars, the results
              are hefty increases in the number and variety of people bicycling.
            </p>
            <p>
              The Green Lane Project helped expand the knowledge on how to use these tools, how
              cities could better get them on the ground, how to refine their design them, and how
              to make them work better for all riders.
            </p>
          </MainContent>
        </Accordion>

        {/* RESEARCH AND REPORTS */}
        <Accordion title="Research and Reports" darkMode={true}>
          <Grid>
            <GridBox>
              <Link href="/reports/protected-bikes-lanes-101">
                <a>Protected Bike Lanes 101</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/reports/effective-study-tours-turning-inspiration-into-action">
                <a>Effective Study Tours</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/reports/quick-builds-for-better-streets-a-new-project-delivery">
                <a>Quick Build For Better Streets</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/reports/building-equity-race-class-and-protected-bike-lanes">
                <a>Building Equity</a>
              </Link>
            </GridBox>
          </Grid>
        </Accordion>
      </MainContent>

      <MainContent contentPadding="4vh 0">
        {/* PARTNER CITIES */}
        <BlueHeading>Partner Cities</BlueHeading>
        <p>
          PeopleForBikes partnered with aspiring U.S. cities that to create comfortable spaces for
          people on bikes and inspire others to do the same.
        </p>

        {/* ATLANTA */}
        <Image alt="Atlanta" src={Atlanta} quality={80} width={1560} height={495} />
        <Accordion title="Atlanta Stories" smallMode={true}>
          <Grid>
            <GridBox>
              <Link href="/news/a-milestone-in-atlanta-two-bidirectional-protected-bike-lanes-intersect">
                <a>A milestone in Atlanta: Two bidirectional protected bike lanes intersect</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/green-lane-links-atlantas-big-plan-and-more">
                <a>Green Lane Links: Atlanta&apos;s big plan and more</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/two-day-demo-will-reclaim-one-of-atlantas-most-celebrated-streets-for-people">
                <a>
                  Two-day demo will reclaim one of Atlanta&apos;s most celebrated streets for people
                </a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/video-atlanta-plans-big-for-bikes-and-atlantans-turn-out-big-time">
                <a>Video: Atlanta plans big for bikes, and Atlantans turn out big time</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/why-atlanta-is-poised-to-go-big-for-bicycling">
                <a>Why Atlanta is poised to go big for bicycling</a>
              </Link>
            </GridBox>
          </Grid>
          <p>&nbsp;</p>
        </Accordion>

        {/* AUSTIN */}
        <hr />
        <Image alt="Austin" src={Austin} quality={80} width={1560} height={495} />
        <Accordion title="Austin Stories" smallMode={true}>
          <Grid>
            <GridBox>
              <Link href="/news/austin-plans-two-more-protected-intersections-just-outside-downtown">
                <a>Austin plans two more protected intersections just outside downtown</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/dutch-bike-embassy-brings-expertise-to-austin">
                <a>Dutch Bike Embassy Brings Expertise to Austin</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/four-simple-lessons-from-austins-brilliant-bike-plan-update">
                <a>Four simple lessons from Austin&apos;s brilliant bike plan update</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/hygge-sighting-the-idea-that-built-denmark-pops-up-in-austin">
                <a>Hygge sighting: The little idea that built Denmark pops up in Austin</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/imagine-austincompact-and-connected">
                <a>Imagine Austin - Compact and Connected</a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/mueller-district-finds-cycle-tracks-good-for-business-in-austin">
                <a>Mueller District Finds Cycle Tracks Good for Business in Austin</a>
              </Link>
            </GridBox>
          </Grid>
          <p>&nbsp;</p>
        </Accordion>

        {/* BOSTON */}
        <hr />
        <Image alt="Boston" src={Boston} quality={80} width={1560} height={495} />
        <Accordion title="Boston Stories" smallMode={true}>
          <Grid>
            <GridBox>
              <Link href="/news/massachusetts-is-about-to-release-a-new-bikeway-guide-and-its-going-to-be-awesome">
                <a>
                  Massachusetts is about to release a new bikeway guide and it&apos;s going to be
                  awesome
                </a>
              </Link>
            </GridBox>
            <GridBox>
              <Link href="/news/pedaling-prosperity-for-bostons-council-president-safe-streets-arent-enough">
                <a>
                  Pedaling prosperity: For Boston&apos;s council president,&apos;safe streets&apos;
                  aren&apos;t enough
                </a>
              </Link>
            </GridBox>
          </Grid>
          <p>&nbsp;</p>
        </Accordion>

        <Accordion title="See All Cities">
          {/* CHICAGO */}
          <hr />
          <Image alt="Chicago" src={Chicago} quality={80} width={1560} height={495} />
          <Accordion title="Chicago Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/chicago-getting-ready-for-the-green-lane-breakthrough">
                  <a>Chicago: Getting Ready for the Green Lane &apos;Breakthrough&apos;</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/can-chicago-hit-30-miles-of-green-lanes-before-the-snow-flies">
                  <a>Can Chicago hit 30 miles of green lanes before the snow flies?</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/oh-dearborn-a-virtual-tour-of-chicagos-first-2-way-green-lane">
                  <a>Oh Dearborn! A virtual tour of Chicago&apos;s first 2-way green lane</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/chicago-keeps-on-trucking-toward-goal-of-100-miles-of-green-lanes-by-2015">
                  <a>Chicago keeps on trucking toward goal of 100 miles of green lanes by 2015</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/chicago-considers-bold-steps-to-make-room-for-protected-lanes">
                  <a>Chicago Considers Bold Steps to Make Room for Protected Lanes</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/building-support-in-chicago-neighborhood-by-neighborhood">
                  <a>Building support in Chicago, neighborhood by neighborhood</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* DENVER */}
          <hr />
          <Image alt="Denver" src={Denver} quality={80} width={1560} height={495} />
          <Accordion title="Denver Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/denver-tech-companies-the-no-1-thing-they-want-is-bike-lanes">
                  <a>Denver tech companies: &apos;The No. 1 thing they want is bike lanes&apos;</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-denver-got-an-oil-company-to-help-crowdfund-a-protected-bike-lane">
                  <a>How Denver got an oil company to help crowdfund a protected bike lane</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/qa-lessons-from-denvers-crowdfunded-bike-lane-success">
                  <a>Q&A: Lessons from Denver&apos;s crowdfunded bike lane success</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/denverites-say-theyd-shop-more-on-broadway-with-a-protected-bike-lane">
                  <a>Denverites say they&apos;d shop more on Broadway with a protected bike lane</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/denvers-two-newest-protected-bike-lanes-from-zero-to-finished-in-one-year">
                  <a>
                    Denver&apos;s two newest protected bike lanes: From zero to finished in one year
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-denver-improvised-a-new-contracting-model-to-deliver-change-fast">
                  <a>How Denver improvised a new contracting model to deliver change fast</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* INDIANAPOLIS */}
          <hr />
          <Image alt="Indianapolis" src={Indianapolis} quality={80} width={1560} height={495} />
          <Accordion title="Indianapolis Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/a-new-future-for-bicycling-in-indianapolis">
                  <a>A new future for bicycling in Indianapolis</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/indianapolis-gop-mayor-on-bikes-and-the-great-revival-of-us-cities">
                  <a>
                    Indianapolis&apos; GOP mayor on bikes and the &apos;great revival&apos; of US
                    cities
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/indianapolis-becomes-first-city-to-get-nba-backed-bikeshare">
                  <a>Indianapolis becomes first city to get NBA-backed bikeshare</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/pacers-bikeshare-launches-in-indianapolis-this-week">
                  <a>Pacers Bikeshare launches in Indianapolis this week</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/young-people-in-indianapolis-like-low-car-lifestyles-almost-as-much-as-youn">
                  <a>
                    Young people in Indianapolis want low-car lifestyles almost as much as young
                    people in NYC
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/indy-celebrates-a-bikeshare-win">
                  <a>Indy celebrates a bikeshare win</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* MEMPHIS */}
          <hr />
          <Image alt="Memphis" src={Memphis} quality={80} width={1560} height={495} />
          <Accordion title="Memphis Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/memphis-on-broadway">
                  <a>Memphis on Broadway</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/memphis-in-the-netherlands-blown-away">
                  <a>Memphis in the Netherlands: &quot;Blown Away&quot;</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/memphis-announces-major-initiatives-for-protected-bike-lanes">
                  <a>Memphis announces major initiatives for protected bike lanes</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/memphis-is-about-to-build-the-countrys-first-crowdfunded-bike-lane">
                  <a>Memphis is about to build the country&apos;s first crowdfunded bike lane</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/the-big-idea-behind-bike-projects-and-the-memphis-rebound">
                  <a>The big idea behind bike projects and the Memphis rebound</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-memphis-created-a-rolling-festival-of-street-redesigns">
                  <a>How Memphis created a rolling festival of street redesigns</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* NYC */}
          <hr />
          <Image alt="NYC" src={NYC} quality={80} width={1560} height={495} />
          <Accordion title="New York City Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/celebrate-nycs-latest-biking-win">
                  <a>Celebrate NYC&apos;s latest biking win</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/10-years-ago-next-month-this-letter-to-the-nyt-foresaw-new-yorks-biking-triumph">
                  <a>
                    10 years ago next month,this letter to the NYT foresaw New York&apos;s biking
                    triumph
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/queens-teens-push-for-protected-bikeway-to-reconnect-their-peninsula">
                  <a>Queens teens push for protected bikeway to reconnect their peninsula</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/nyc-says-2016-will-set-yet-another-record-for-new-protected-bike-lanes">
                  <a>NYC says 2016 will set yet another record for new protected bike lanes</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/new-yorks-network-nine-miles-of-protected-biking-from-brooklyn-to-bronx">
                  <a>
                    New York&apos;s network: Nine miles of protected biking from Brooklyn to Bronx
                  </a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* PITTSBURGH */}
          <hr />
          <Image alt="Pittsburgh" src={Pittsburgh} quality={80} width={1560} height={495} />
          <Accordion title="Pittsburgh Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/business-leaders-cheer-protected-bike-lanes-into-busy-downtown-pittsburgh">
                  <a>Business leaders cheer protected bike lanes into busy downtown Pittsburgh</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-copenhagen-helped-pittsburghs-mayor-peduto-understand-the-wedding-cake-of-transportation">
                  <a>
                    How Copenhagen helped Pittsburgh&apos;s Mayor Peduto understand the
                    &apos;wedding cake of transportation&apos;
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/persistence-pays-off-in-western-pennsylvania">
                  <a>Persistence pays off in western Pennsylvania</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/video-how-pittsburgh-became-a-national-model-for-rapid-bikeway-progress">
                  <a>Video: How Pittsburgh became a national model for rapid bikeway progress</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/these-two-videos-about-biking-in-pittsburgh-are-actually-worth-watching">
                  <a>These two videos about biking in Pittsburgh are actually worth watching</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* PORTLAND */}
          <Image alt="Portland" src={Portland} quality={80} width={1560} height={495} />
          <Accordion title="Portland Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/how-portland-won-its-crown-and-how-to-keep-it">
                  <a>How Portland won its crown - and how to keep it</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-economic-growth-sold-portland-landlords-on-a-bikeway">
                  <a>How economic growth sold Portland landlords on a bikeway</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/boxed-in-by-politics-portland-tries-a-splash-of-color">
                  <a>Boxed in by politics, Portland tries a splash of color</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/portland-retailers-swoop-into-storefronts-along-bikeways">
                  <a>Portland retailers swoop into storefronts along bikeways</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/the-private-sector-understands-opportunity-how-portland-scored-its-latest-biking-win">
                  <a>
                    &apos;The private sector understands opportunity&apos;: How Portland scored its
                    latest biking win
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/portland-is-first-u-s-city-to-make-protection-the-default-for-all-new-bike-lanes">
                  <a>
                    Portland is first U.S. city to make protection the default for all new bike
                    lanes
                  </a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* SF */}
          <hr />
          <Image alt="SF" src={SF} quality={80} width={1560} height={495} />
          <Accordion title="San Francisco Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/san-francisco-cycling-in-the-city">
                  <a>San Francisco: Cycling in the City</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/introducing-green-lanes-on-fell-and-oak-streets-in-san-francisco">
                  <a>Introducing green lanes on Fell and Oak streets in San Francisco</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/relaxing-rides-in-san-francisco">
                  <a>Relaxing Rides in San Francisco</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/looking-back-at-san-franciscos-big-year">
                  <a>Looking back at San Francisco&apos;s big year</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/san-francisco-architect-protected-bike-lanes-will-boost-property-value">
                  <a>San Francisco architect: Better bike lanes = higher land value</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/a-poor-sf-neighborhood-rallies-for-less-auto-parking">
                  <a>A poor SF neighborhood rallies for less auto parking</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* SEATTLE */}
          <hr />
          <Image alt="Seattle" src={Seattle} quality={80} width={1560} height={495} />
          <Accordion title="Seattle Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/7-lessons-from-seattles-spectacular-broadway-protected-bike-lanes">
                  <a>7 lessons from Seattle&apos;s spectacular protected bike lanes on Broadway</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/seattle-holds-bike-lane-open-house-right-on-the-street-draws-just-as-many-people">
                  <a>
                    Seattle holds bike lane open house right on the street,draws just as many people
                  </a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/in-seattle-fold-down-posts-can-take-a-punch-while-protecting-bike-lanes">
                  <a>In Seattle, fold-down posts can take a punch while protecting bike lanes</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-seattles-mayor-gave-planners-the-fire-to-make-improvements-fast">
                  <a>How Seattle&apos;s mayor gave planners the fire to make improvements fast</a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>

          {/* WASHINGTON DC */}
          <hr />
          <Image alt="Washington DC" src={WashingtonDC} quality={80} width={1560} height={495} />
          <Accordion title="Washington DC Stories" smallMode={true}>
            <Grid>
              <GridBox>
                <Link href="/news/washington-dc-nations-capital-commits-to-green-lanes">
                  <a>Washington, DC: Nation&apos;s Capital Commits to Green Lanes</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/improved-pennsylvania-avenue-green-lane-in-the-spotlight">
                  <a>Improved Pennsylvania Avenue Green Lane in the spotlight</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/washington-dc-prepares-to-double-down-on-bicycling">
                  <a>Washington, DC prepares to double down on bicycling</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/data-confirms-it-dc-is-the-new-u-s-bike-city-to-watch">
                  <a>Data confirms it: DC is the new U.S. bike city to watch</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/from-dc-a-better-way-to-think-about-businesses-and-bike-lane-battles">
                  <a>From DC, a better way to think about businesses and bike lane battles</a>
                </Link>
              </GridBox>
              <GridBox>
                <Link href="/news/how-high-can-they-go-dc-bike-counts-show-continuing-surge-in-protected-lane-use">
                  <a>
                    How high can they go? DC bike counts show continuing surge in protected lane use
                  </a>
                </Link>
              </GridBox>
            </Grid>
            <p>&nbsp;</p>
          </Accordion>
        </Accordion>
      </MainContent>
    </>
  );
};

function YouthBikingMap() {
  return (
    <>
      <a id="map" />
      <MainContent contentPadding="8vh 4vw 2vh 4vw" maxWidth="1200px">
        <RedHeading>National Youth Bicycle Programs Map</RedHeading>
        <hr />
        <p>
          PeopleForBikes and{' '}
          <a href="https://outridebike.org/" target="_blank">
            Outride
          </a>{' '}
          have published a map of national youth bicycle programs operating throughout the country.
          All programs share a commitment to breaking down barriers to bicycling, especially for
          low-income communities, BIPOC, LGBTQ+ and other historically marginalized youth. Is there
          a youth bicycle program near you?
        </p>
      </MainContent>
      <MainContent contentPadding="0vh 4vw 4vh 4vw" maxWidth="800px">
        <Container>
          <div className="embed-container">
            <iframe
              width="800"
              height="500"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              title="National Youth Programs Map"
              src="https://pfb.maps.arcgis.com/apps/Embed/index.html?webmap=458326200f3745c5908b4ae3aa10f5dc&extent=-139.5761,16.4746,-60.1229,53.5446&zoom=true&previewImage=false&scale=true&legendlayers=true&disable_scroll=true&theme=light"
            />
          </div>
        </Container>
        <p>
          <strong>
            Map Legend is accessible with the `{'>>'}` icon in the upper left hand corner of the
            map.
          </strong>
        </p>
        <p>
          Questions about the map? Is there a program near you that you would like to see on the
          map?{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfv_WGPAQiZFb-i4lnkhuk2lAc7S9Y_aN-CMfYDfCBP4NPHcA/viewform"
            target="_blank"
          >
            Let us know
          </a>
          .
        </p>
      </MainContent>
    </>
  );
}

export default function ProgramPage({ fallback, page, preview }) {
  // Destructure topic from main page payload and meta from global context
  const { program } = page;
  const { meta } = useContext(DefaultContext);
  const themeProps = useContext(ThemeContext);

  return (
    <>
      <SiteMetaCustom
        desc={program.intro ? `${program.intro.substring(0, 180)}... ` : meta.desc}
        title={program.title ? `${program.title[0].text} | PeopleForBikes` : meta.title}
        path={
          program
            ? `https://www.peopleforbikes.org/local-innovation/${program._meta.uid}`
            : meta.path
        }
      />

      <Wrapper
        postPath={program.body && '/local-innovation'}
        postTitle={program.body && 'Local Innovation'}
        isWide={true}
      >
        {program.title && (
          <BigTitleBanner>
            <Heading1>{program.title[0].text}</Heading1>
          </BigTitleBanner>
        )}

        {program.archived === true && (
          <MainContent>
            <BlueBox>
              <img src="/return-arrow.svg" alt="return arrow" />
              <ArchiveTitle>Archive</ArchiveTitle>
            </BlueBox>
          </MainContent>
        )}

        {program.body &&
          program.body.map((slice) => {
            // SUMMARY BLOCK
            if (slice.type === 'content_block') {
              return (
                <MainContent contentPadding="4vh 4vw">
                  <RichText render={slice.primary.main_content} />
                </MainContent>
              );
            }

            // PROMOS
            if (slice.type === 'promo') {
              return (
                <MainContent contentPadding="6vh 4vw">
                  <Promo
                    bigWords={slice.primary.bottom_text ? slice.primary.bottom_text : null}
                    path={slice.primary.link ? linkResolver(slice.primary.link) : null}
                    smallWords={slice.primary.top_text ? slice.primary.top_text : null}
                    source={slice.primary.main_image.url}
                  />
                </MainContent>
              );
            }

            // PILLARS (Accordions)
            if (slice.type === 'policy_pillar') {
              return (
                <>
                  <MainContent
                    bgColor={themeProps.midnightBlue}
                    contentPadding="8vh 4vw 2vh 4vw"
                    textColor="#fff"
                  >
                    <h2 style={{ margin: 0 }}>
                      {slice.primary.long_name ? slice.primary.long_name : 'Our Strategy'}
                    </h2>
                  </MainContent>
                  <MainContent
                    bgColor={themeProps.midnightBlue}
                    contentPadding="0 4vw 8vh 4vw"
                    textColor="#fff"
                  >
                    {slice.fields &&
                      slice.fields.map((field) => {
                        return (
                          <Accordion
                            darkMode={true}
                            key={randomID(1234567890)}
                            title={field.sub_pillar}
                          >
                            <p>{field.sub_pillar_summary}</p>
                            {(field.news_item_1 || field.news_item_2 || field.news_item_3) && (
                              <strong>Our Work in This Area:</strong>
                            )}
                            <ul>
                              {field.news_item_1 && (
                                <li>
                                  <Link href={linkResolver(field.news_item_1)} passHref>
                                    <a>{field.news_item_title_1}</a>
                                  </Link>
                                </li>
                              )}
                              {field.news_item_2 && (
                                <li>
                                  <Link href={linkResolver(field.news_item_2)} passHref>
                                    <a>{field.news_item_title_2}</a>
                                  </Link>
                                </li>
                              )}
                              {field.news_item_3 && (
                                <li>
                                  <Link href={linkResolver(field.news_item_3)} passHref>
                                    <a>{field.news_item_title_3}</a>
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </Accordion>
                        );
                      })}
                  </MainContent>
                  {program._meta.uid === 'youth-cycling-programs' && <YouthBikingMap />}
                </>
              );
            }

            // NEWS
            if (slice.type === 'related_news') {
              return (
                <>
                  <MainContent contentPadding="8vh 4vw 0vh 4vw">
                    <RedHeading>Recent News</RedHeading>
                    <hr />
                  </MainContent>
                  <MainContent contentPadding="0vh 4vw 4vh 4vw">
                    {slice.fields.map((item) => {
                      return (
                        // @TODO add valid key prop from field
                        // eslint-disable-next-line react/jsx-key
                        <ul>
                          {item.news_item_title && item.news && (
                            <li>
                              <Link href={linkResolver(item.news)} passHref>
                                <a>{item.news_item_title}</a>
                              </Link>
                            </li>
                          )}
                        </ul>
                      );
                    })}
                  </MainContent>
                </>
              );
            }

            // LOGOS (<VisualGrid>)
            if (slice.type === 'visual_grid') {
              return (
                <>
                  <MainContent contentPadding="8vh 4vw 4vh 4vw">
                    <RedHeading>Program Partners</RedHeading>
                    <hr />
                  </MainContent>
                  <MainContent contentPadding="0vh 4vw 8vh 4vw">
                    <VisualGrid
                      isOneItem={slice.fields.length === 1 ? true : false}
                      payload={slice.fields}
                      title={slice.primary.grid_title}
                    />
                  </MainContent>
                </>
              );
            }
          })}

        {/* Custom content for `green-lane-project` node only */}
        {program._meta.uid === 'green-lane-project' && <GreenLaneProject />}
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getProgramPage(params.uid, previewData);

  return {
    props: {
      fallback: FallbackImage(),
      preview,
      page: pageData,
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allPrograms = await getPrograms();

  return {
    paths: allPrograms?.map(({ node }) => `/local-innovation/${node._meta.uid}`) || [],
    fallback: false,
  };
}

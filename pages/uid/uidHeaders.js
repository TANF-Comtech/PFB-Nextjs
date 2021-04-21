import React from 'react'
import BigTitleBanner from '../../components/content/big-title-banner'
import SecondaryTitleBanner from '../../components/content/secondary-title-banner'
import Heading1 from '../../components/primitives/h1'
import HeaderImage from '../../components/global/header-image'
import SummaryBlock from '../../components/content/summary-block'
import Button from '../../components/primitives/button'
import SummaryBlock from '../../components/content/summary-block'
import Button from '../../components/primitives/button'



export default function UidHeader ({landing_page}){
let Header;


// HEADER - STYLE COMPLEX: (SecondaryTitleBanner + HeaderImage + SummaryBlock}

landing_page.header_image || 
        landing_page._meta.uid === 'team' ? (
          Header = (
        <>
          <SecondaryTitleBanner
            secondaryText={ landing_page.secondary_text }
            mainText={ landing_page.main_text }
          />
          { landing_page.header_image &&
            <HeaderImage 
              srcSet={ landing_page.header_image }
            />
          }
          { landing_page.summary &&
            <SummaryBlock
              bgColor="#002C40"
              textColor="#fff"
            >
              <p>{ landing_page.summary }</p>
            </SummaryBlock>
          }                       
        </>
      )) : (
        // HEADER - STYLE SIMPLE: (BigTitleBanner + SummaryBlock)
        Header= (
        <>
          <BigTitleBanner>
            <RichText
              elements={{ heading1: Heading1 }}
              render={ landing_page.title }
            />
          </BigTitleBanner>
          { landing_page.summary &&
            <SummaryBlock>
              <p>{ landing_page.summary }</p>
            </SummaryBlock>
          }
        </>
      ))
 

  return({Header})

}
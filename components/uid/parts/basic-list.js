import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import MainContent from '~/components/main-content';
import Rule from '~/components/rule';

const ListItem = styled.h3`
  border-bottom: 1px solid ${(props) => props.theme.lightestGray} !important;
  color: ${(props) => props.textColor} !important;
  margin-bottom: 2vh !important;
  padding-bottom: 2vh !important;
  text-decoration: none !important;

  &:last-child {
    border-bottom: none !important;
  }
`;

/**
 * <BasicList>
 *
 * Just a generic list of items to loop through and display
 * They look like a list of links
 *
 * @param { array } payload - response from Prismic API
 * @param { string } title - list title, optional
 * @param { string } textColor - hex value of whatever color you're looking for
 */
const BasicList = ({ payload, textColor = '#333', title }) => {
  return (
    <>
      <MainContent maxWidth="1200px">
        {title && <h2>{title}</h2>}
        {payload.map((job) => {
          return (
            <>
              <Link href={`/careers/${job.node._meta.uid}`} key={job.node._meta.id}>
                <ListItem textColor={textColor}>{job.node.title[0].text}</ListItem>
              </Link>
            </>
          );
        })}
      </MainContent>
      <Rule />
    </>
  );
};

export default BasicList;

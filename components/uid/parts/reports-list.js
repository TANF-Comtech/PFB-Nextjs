import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import MainContent from '~/components/main-content';

const ReportListItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightestGray} !important;
  margin: 2.5vh 0 1.25vh 0 !important;
  padding-bottom: 1.75vh !important;

  &:last-child {
    border-bottom: none !important;
  }
`;

const PageHeading = styled.h2`
  color: ${(props) => props.theme.red} !important;
  font-weight: 700 !important;
  margin-top: 5vh !important;
  text-transform: uppercase !important;
`;

/**
 * <ReportsList>
 *
 * Provides list of report content
 *
 * @param { array } payload - list of locations from Prismic API
 */
const ReportsList = ({ payload }) => {
  return (
    <MainContent>
      <PageHeading>Report Library</PageHeading>
      <hr />
      {payload.map((report) => {
        return (
          <>
            <ReportListItem key={report.reports._meta.id}>
              <Link href={`/reports/${report.reports._meta.uid}`} passHref>
                <a>
                  <strong>{report.reports.title[0].text}</strong>
                </a>
              </Link>
              {report.reports.summary && (
                <p>{`${report.reports.summary[0].text.substring(0, 180)} ...`}</p>
              )}
            </ReportListItem>
          </>
        );
      })}
    </MainContent>
  );
};

export default ReportsList;

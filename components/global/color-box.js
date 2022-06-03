import Link from 'next/link';
import styled from 'styled-components';

const Box = styled.div`
  align-items: center;
  background-color: ${(props) => (props.bgColor ? props.bgColor : props.theme.redAccent)};
  display: flex;
  justify-content: center;
  min-height: 190px;
  padding: 25px 50px;
`;

const LinkBox = styled.div`
  width: 100%;
`;

/**
 * <ColorBox>
 *
 * A color box that you can fill with content
 * This is meant to be a prominent list
 *
 * @param { string } bgColor - color you want the box (default red)
 * @param { object } children - React children components
 * @param { object } path - where does the box go? (default: nowheresville)
 */
const ColorBox = ({ bgColor, children, path }) => {
  return (
    <>
      {path && path.__typename === '_ExternalLink' ? (
        <LinkBox dangerouslySetInnerHTML={{ __html: linkResolver(path, true) }}>
          <Box bgColor={bgColor}>{children}</Box>
        </LinkBox>
      ) : (
        <>
          {path ? (
            <Link href={linkResolver(path, false)} passHref>
              <Box bgColor={bgColor}>{children}</Box>
            </Link>
          ) : (
            <Box bgColor={bgColor}>{children}</Box>
          )}
        </>
      )}
    </>
  );
};

export default ColorBox;

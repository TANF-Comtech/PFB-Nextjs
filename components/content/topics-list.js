import MainContent from '../global/main-content';
import Grid from '../global/grid';
import ImageSquare from '../global/image-square';

import genericSquare1x from '../../public/PFB_Topics_450x450_generic.jpg';
import genericSquare2x from '../../public/PFB_Topics_900x900_generic.jpg';

/**
 * <TopicsList>
 *
 * Provides topics landing page list content (all locations)
 *
 * @param { array } payload - list of topics from Prismic API
 */
const TopicsList = ({ payload }) => {
  return (
    <MainContent>
      <Grid>
        {payload.map((topic) => {
          return (
            <ImageSquare
              imageSquareLink={`/topics/${topic.node._meta.uid}`}
              source1X={
                topic.node.square_image ? topic.node.square_image.mobile.url : genericSquare1x
              }
              source2X={topic.node.square_image ? topic.node.square_image.url : genericSquare2x}
              title={topic.node.title[0].text}
              key={topic.node._meta.id}
            />
          );
        })}
      </Grid>
    </MainContent>
  );
};

export default TopicsList;

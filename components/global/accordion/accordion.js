import React from "react";
import Text from "../text";
import RightArrow from "./expansionArrow.png";

/****
 * Arrow button used to control the expansion panel
 ****/
const ArrowButton = ({ onClick, accordionIsOpen }) => (
  <>
    <div
      className={`accordionClosed ${accordionIsOpen ? "accordionOpen" : ""}`}
      onClick={onClick}
    >
      <RightArrow accordionIsOpen={accordionIsOpen} />
    </div>
  </>
);

export default function Accordion() {
  /****
   * The hook that's going to be used to handle the state change
   ****/
  const [accordionIsOpen, setAccordionIsOpen] = React.useState(false);
  /****
   * Toggle the button
   ****/
  const accordionToggleDrawer = () => setAccordionIsOpen(!accordionIsOpen);

  return (
    <>
      {/* The main wrapper will be used statically. It'll just hold everything within it. */}
      <div>
        <ArrowButton
          onClick={accordionToggleDrawer}
          accordionIsOpen={accordionIsOpen}
        />
        <Text>What We Fund</Text>
        {/*Container to hold the panels content when it's closed, and then display content when it's open, currently holds dummy data. Later on we can add a prop to this so that it can be a reusable component. Fow now we're going for functionality.*/}
        <Text className={`textHide ${accordionIsOpen ? "textReveal" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat
          ante in metus pharetra ultrices. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Aenean congue,
          nunc ac iaculis dignissim, ante dui viverra arcu, eu convallis lacus
          velit sed ex. Curabitur vulputate turpis gravida eleifend varius.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Nunc bibendum sem ac velit varius, quis
          consequat risus varius. Nulla semper nunc ac nisl maximus, mollis
          sollicitudin nibh pretium. Nullam quis orci metus.
        </Text>
      </div>
    </>
  );
}

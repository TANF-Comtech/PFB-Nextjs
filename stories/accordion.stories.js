import React from 'react';
import Accordion from '../components/global/accordion';

export default {
  title: 'Accordion',
  component: Accordion,
};

export const Basic = () => (
  <Accordion title="Can John Be Nice?">
    Answer: Ask a different question. It'll never happen.
  </Accordion>
);

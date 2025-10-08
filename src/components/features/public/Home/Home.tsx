import React from 'react';
import { Hero } from './Hero/Hero';
import { Projects } from './Projects/Projects';
import { CTA } from './Contact/Contact';

const Home = () => {
  return (
    <div>
      <Hero/>
      <Projects/>
      <CTA/>
    </div>
  );
};

export default Home;
import React from 'react';
import { Hero } from './Hero/Hero';
import { Projects } from './Projects/Projects';
import { About } from './About/about';
import { Education } from './Education/education';
import { Contact } from './Contact/contact';

const Home = () => {
  return (
    <div>
      <Hero/>
      <Projects/>
      <About/>
      <Education/>
      <Contact/>
    </div>
  );
};

export default Home;
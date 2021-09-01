import { FC } from 'react';

const About: FC = (): JSX.Element => {
  return (
    <div className="about">
      <h1>NEWS API</h1>
      <p className="about__text">
        The main use of News API is to search through every article published by over 80,000 news
        sources and blogs in the last 3 years. Think of us as Google News that you can interact with
        programmatically!
      </p>
      <p className="about__text">
        News API is great as a data source for news tickers and other applications where you want to
        show your users live headlines. We track headlines in 7 categories across over 50 countries,
        and at over a hundred top publications and blogs, in near real time.
      </p>
      <p className="about__text">
        Search through millions of articles from over 80,000 large and small news sources and blogs.
        This endpoint suits article discovery and analysis.
      </p>
    </div>
  );
};

export default About;

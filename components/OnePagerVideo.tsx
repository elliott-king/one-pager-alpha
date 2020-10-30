import React from 'react';
import { Heading } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerVideoProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

export const OnePagerVideo = ({
  onePagerData,
  isLoading,
}: OnePagerVideoProps) => {

  const embedLink = (link: string) => {
    const replString = 'watch?v=';
    return link.replace(replString, 'embed/');
  };
  
  return (
    <ContentCard title='Pitch Video' isLoading={isLoading}>
      <iframe width='75%' height='300vh' src={embedLink(onePagerData.pitchVideoLink)} />
    </ContentCard>
  );
};

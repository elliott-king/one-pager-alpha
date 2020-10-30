import Link from 'next/link';
import { Flex, Heading, Box, Text, Divider, Button } from '@chakra-ui/core';
import { ContentCard } from './ContentCard';
import { useDispatch } from 'react-redux';

export const PaymentRequest = ({ onePagerUrl }: {onePagerUrl: string}) => {

  const dispatch = useDispatch();
  const submitPayment = () => {
    dispatch({type: 'PAY'});
  };

  return (
    <Box bg='#f2f4f5'>
      <ContentCard title='You have used up all of your free views.' isLoading={false}>
        <Text>Please purchase a subscription.</Text>
      </ContentCard>

      <Divider width='50%' />

      <ContentCard title='Purchase Options' isLoading={false}>
        <Box>
          <Heading as='h2' size='sm' color='grey' fontStyle='italic'>
            Premium Subscription
          </Heading>
          <Text fontSize='sm'>$0000.00</Text>
          <Button onClick={submitPayment}>Pay</Button>
        </Box>

        <Divider width='95%' />

        <Box>
          <Heading as='h2' size='sm' color='grey' fontStyle='italic'>
            Regular Subscription
          </Heading>
          <Text fontSize='sm'>$00.00</Text>
          <Button onClick={submitPayment}>Pay</Button>
        </Box>
      </ContentCard>

      <Divider width='50%' />

      <ContentCard isLoading={false}>
        <Flex justifyContent='center'>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </Flex>
      </ContentCard>
    </Box>
  );
};
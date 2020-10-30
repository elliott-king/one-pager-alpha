import { ONE_PAGERS_PUBLIC_DATA_ARRAY } from '../data/onepagers';
import { OnePager } from '../components/OnePager';
import { PaymentRequest } from '../components/PaymentRequest';
import { OnePagerPublicData } from '../model/model';

import { useSelector, useDispatch } from 'react-redux';

type OnePagerPageData = {
  onePagerUrl: string;
};

/** Render a One Pager Page. */
export default function OnePagerPage({ onePagerUrl }: OnePagerPageData) {
  const visited: Array<string> = useSelector((state) => state.visited);
  const hasPaid: boolean = useSelector((state) => state.hasPaid);
  const dispatch: any = useDispatch();

  if (!hasPaid && (visited.length >= 2 && !visited.includes(onePagerUrl))) {
    return <PaymentRequest onePagerUrl={onePagerUrl} />;
  }

  dispatch({
    type: 'VISIT',
    onePagerUrl: onePagerUrl,
  });
  return <OnePager onePagerUrl={onePagerUrl}></OnePager>;
}

export async function getStaticPaths() {
  const paths = ONE_PAGERS_PUBLIC_DATA_ARRAY.map(
    (onePager: OnePagerPublicData) => {
      return {
        params: {
          onePagerUrl: onePager.url,
        },
      };
    }
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      onePagerUrl: params.onePagerUrl,
    },
  };
}

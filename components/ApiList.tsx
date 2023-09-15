'use client';

import { useParams, useRouter } from 'next/navigation';
import useOrigin from '@/hooks/use-origin';
import ApiAlert from './ApiAlert';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({entityName, entityIdName}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  
  return (
    <>
      <ApiAlert title='GET' description={`${baseUrl}/${entityName}`} variant='public' />
      <ApiAlert title='GET' description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='public' />
      <ApiAlert title='POST' description={`${baseUrl}/${entityName}`} variant='admin' />
      <ApiAlert title='PATCH' description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='admin' />
      <ApiAlert title='DELETE' description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='admin' />
    </>
  );
};

export default ApiList;

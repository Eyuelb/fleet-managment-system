"use client"
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { EntityOperations } from '../model/index';
import { useResource } from './useResource';

const useEntity = () => {
  const resource = useResource();
  const searchParams = useSearchParams()
  const entityId = searchParams.get('id');
  const { slug } = useParams();
  const operation = slug[0] as EntityOperations;
  const pathname = usePathname();
  const path = pathname.substring(
    0,
    pathname.lastIndexOf('/'),
  );

  return { entityId, operation, feat: path, resource };
};

export default useEntity;

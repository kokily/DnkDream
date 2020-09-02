import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from 'graphql/cache.local';
import { CHECK_USER } from 'graphql/auth.queries';

const useAuth = () => {
  const logged = useQuery(IS_LOGGED_IN);
  const check = useQuery(CHECK_USER);

  return [logged, check];
};

export default useAuth;

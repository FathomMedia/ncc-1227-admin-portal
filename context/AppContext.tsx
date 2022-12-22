import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GetAdminQueryVariables,
  ListAdminLogsQueryVariables,
  ListAdminsQuery,
  ListAdminsQueryVariables,
} from "../src/API";
import { listAdmins } from "../src/graphql/queries";

// interface for all the values & functions
interface IUseAppContext {
  admins: ListAdminsQuery | undefined;
}

// the default state for all the values & functions
const defaultState: IUseAppContext = {
  admins: undefined,
};

// creating the app contexts
const AppContext = createContext<IUseAppContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useAppContext = () => useContext(AppContext);

// The App provider to wrap the components that will use the context
export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

//NOTE: declare vars and functions here
function useProviderApp() {
  const [admins, setAdmins] = useState<ListAdminsQuery | undefined>(undefined);

  useEffect(() => {
    getAdmins();
    return () => {};
  }, []);

  async function getAdmins() {
    let queryInput: ListAdminsQueryVariables = {};

    let res = (await API.graphql({
      query: listAdmins,
      variables: queryInput,
    })) as GraphQLResult<ListAdminsQuery>;

    setAdmins(res.data);

    return res.data;
  }

  // NOTE: return all the values & functions you want to export
  return { admins };
}

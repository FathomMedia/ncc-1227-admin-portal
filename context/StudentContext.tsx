import { API, graphqlOperation } from "aws-amplify";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ListStudentsQuery } from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { listStudents } from "../src/graphql/queries";
import { Student } from "../src/models";

// interface for all the values & functions
interface IUseStudentContext {
  students: ListStudentsQuery | undefined;
}

// the default state for all the values & functions
const defaultState: IUseStudentContext = {
  students: undefined,
};

// creating the app contexts
const StudentContext = createContext<IUseStudentContext>(defaultState);

// Access Student values and functions with custom useStudentContext hook
export const useStudent = () => useContext(StudentContext);

// The Student provider to wrap the components that will use the context
export const StudentProvider: FC<PropsWithChildren> = ({ children }) => {
  const student = useProviderStudent();
  return (
    <StudentContext.Provider value={student}>
      {children}
    </StudentContext.Provider>
  );
};

//NOTE: declare vars and functions here
function useProviderStudent() {
  const [students, setStudents] = useState<ListStudentsQuery | undefined>(
    undefined
  );

  useEffect(
    () => {
      // Run this
      getStudents();

      // on destroy
      return () => {};
    },

    // Rerun whenever anything here changes
    []
  );

  async function getStudents(): Promise<ListStudentsQuery | undefined> {
    let res = (await API.graphql(
      graphqlOperation(listStudents)
    )) as GraphQLResult<ListStudentsQuery>;

    let tempStudents = res.data;

    setStudents(tempStudents);

    // console.log("students", tempStudents);

    return tempStudents;
  }

  // NOTE: return all the values & functions you want to export
  return { students };
}

import { API, graphqlOperation } from "aws-amplify";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Application, ListApplicationsQuery } from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Student } from "../src/models";
import { IDateRange } from "../src/Helpers";

// interface for all the values & functions
interface IUseStudentContext {
  students: Student[] | undefined;
  applications: Application[] | undefined;
  applicationById: Application | undefined;
  getApplicationByID: (id: string) => void;
  dateRange: IDateRange;
  updateDateRange: (newDateRange: IDateRange) => void;
  syncApplications: () => Promise<void>;
}

// the default state for all the values & functions
const defaultState: IUseStudentContext = {
  students: undefined,
  applications: undefined,
  applicationById: undefined,
  getApplicationByID: () => {},
  dateRange: {
    start: `${new Date().getFullYear()}-01-01`,
    end: `${new Date().getFullYear() + 1}-01-01`,
  },
  updateDateRange: function (): void {
    throw new Error("Function not implemented.");
  },
  syncApplications: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
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
  const [students, setStudents] = useState<Student[] | undefined>(
    defaultState.students
  );

  const [applications, setApplications] = useState<Application[] | undefined>(
    defaultState.applications
  );

  const [dateRange, setDateRange] = useState<IDateRange>(
    defaultState.dateRange
  );

  const [applicationById, setApplicationById] = useState<
    Application | undefined
  >(undefined);

  useEffect(() => {
    getStudents();

    return () => {};
  }, []);

  useEffect(
    () => {
      // Run this
      getAllApplications(dateRange);

      // on destroy
      return () => {};
    },

    // Re-run whenever anything here changes
    [dateRange]
  );

  function updateDateRange(newDateRange: IDateRange) {
    setDateRange(newDateRange);
  }

  async function getStudents(): Promise<Student[] | undefined> {
    let query = `
    query ListStudents {
      listStudents {
        items {
          cpr
          email
          fullName
        }
      }
    }    
    `;

    let res = (await API.graphql(
      graphqlOperation(query)
    )) as GraphQLResult<any>;

    let tempStudents = res.data;
    let temp: Student[] = (tempStudents.listStudents?.items ?? []) as Student[];

    setStudents(temp);
    return temp;
  }

  // add programs to uni
  async function getAllApplications(
    newDateR: IDateRange
  ): Promise<Application[] | undefined> {
    let tempApplicationList = await getAllApplicationsAPI(newDateR);
    setApplications(tempApplicationList);
    return tempApplicationList;
  }

  // get application by id
  async function getApplicationByID(
    id: string
  ): Promise<Application | undefined> {
    let tempApplication = await getApplicationByIdAPI(id);
    setApplicationById(tempApplication);

    return tempApplication;
  }

  async function syncApplications() {
    await getAllApplications(dateRange);
  }

  // NOTE: return all the values & functions you want to export
  return {
    students,
    applications,
    applicationById,
    getApplicationByID,
    dateRange,
    updateDateRange,
    syncApplications,
  };
}

export async function getApplicationByIdAPI(
  id: string
): Promise<Application | undefined> {
  let query = `
  query GetApplicationInfo {
    getApplication(id: "${id}") {
      _deleted
      _lastChangedAt
      _version
      adminLogs {
        items {
          adminAdminLogsCpr
          adminCPR
          applicationID
          dateTime
          snapshot
        }
      }
      attachment {
        acceptanceLetterDoc
        cprDoc
        id
        signedContractDoc
        transcriptDoc
        updatedAt
      }
      attachmentID
      gpa
      id
      programs {
        items {
          choiceOrder
          programID
          program {
            name
            university {
              name
            }
          }
        }
      }
      status
      studentCPR
      studentLogs {
        items {
          _deleted
          _lastChangedAt
          applicationID
          _version
          applicationStudentLogsId
          createdAt
          dateTime
          id
          reason
          snapshot
          studentCPR
          updatedAt
        }
      }
      student {
        ParentInfo {
          address
          fatherCPR
          fatherFullName
          guardianCPR
          guardianFullName
          motherCPR
          id
          motherFullName
          numberOfFamilyMembers
          primaryMobile
          relation
          secondaryMobile
          updatedAt
        }
        _deleted
        _version
        address
        cpr
        fullName
        gender
        createdAt
        email
        graduationDate
        householdIncome
        phone
        placeOfBirth
        preferredLanguage
        schoolName
        specialization
        studentOrderAmongSiblings
      }
      updatedAt
      createdAt
    }
  }
  `;

  let res = (await API.graphql(graphqlOperation(query))) as GraphQLResult<any>;

  let tempApplication = res.data;

  if (res.data === null) {
    throw new Error("Failed to get all applications");
  }

  return tempApplication.getApplication as Application;
}

export async function getAllApplicationsAPI(
  dateRange: IDateRange
): Promise<Application[] | undefined> {
  let query = `
  query ListAllApplications {
    listApplications(filter: {dateTime: {between: ["${dateRange.start}T00:00:00", "${dateRange.end}T00:00:00"]}}) {
      items {
        _version
        _deleted
        dateTime
        applicationAttachmentId
        attachmentID
        gpa
        id
        status
        studentCPR
        programs {
          items {
            _deleted
            id
            programID
            program {
              id
              name
              university {
                name
                id
              }
            }
          }
        }
        createdAt
        updatedAt
        student {
          householdIncome
        }
      }
      nextToken
    }
  }
  
  `;

  let res = (await API.graphql(graphqlOperation(query))) as GraphQLResult<any>;

  let tempApplicationList = res.data;
  let temp: Application[] = (tempApplicationList?.listApplications?.items ??
    []) as Application[];

  if (res.data === null) {
    throw new Error("Failed to get all applications");
  }

  return temp;
}

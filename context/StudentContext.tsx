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

// interface for all the values & functions
interface IUseStudentContext {
  students: Student[] | undefined;
  applications: Application[] | undefined;
  applicationById: Application | undefined;
  getApplicationByID: (id: string) => void;
}

// the default state for all the values & functions
const defaultState: IUseStudentContext = {
  students: undefined,
  applications: undefined,
  applicationById: undefined,
  getApplicationByID: (id: string) => {},
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
  const [students, setStudents] = useState<Student[] | undefined>(undefined);

  const [applications, setApplications] = useState<Application[] | undefined>(
    undefined
  );

  const [applicationById, setApplicationById] = useState<
    Application | undefined
  >(undefined);

  useEffect(
    () => {
      // Run this
      getStudents();
      getAllApplications();

      // on destroy
      return () => {};
    },

    // Re-run whenever anything here changes
    []
  );

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
  async function getAllApplications(): Promise<Application[] | undefined> {
    let tempApplicationList = await getAllApplicationsAPI();
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

  // NOTE: return all the values & functions you want to export
  return {
    students,
    applications,
    applicationById,
    getApplicationByID,
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

export async function getAllApplicationsAPI(): Promise<
  Application[] | undefined
> {
  let query = `
  query ListAllApplications {
    listApplications {
      items {
        _version
        _deleted
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
      }
      nextToken
    }
  }
  `;
  // let query = `
  // query ListAllApplications {
  //   listApplications {
  //     items {
  //       _version
  //       _deleted
  //       applicationAttachmentId
  //       attachmentID
  //       gpa
  //       id
  //       status
  //       studentCPR
  //       adminLogs {
  //         items {
  //           snapshot
  //           applicationID
  //           applicationAdminLogsId
  //           adminCPR
  //           dateTime
  //         }
  //       }
  //       programs {
  //         items {
  //           _deleted
  //           programID
  //           program {
  //             name
  //             university {
  //               name
  //             }
  //           }
  //         }
  //       }
  //       createdAt
  //     }
  //     nextToken
  //   }
  // }

  // `;

  let res = (await API.graphql(graphqlOperation(query))) as GraphQLResult<any>;

  let tempApplicationList = res.data;
  let temp: Application[] = (tempApplicationList?.listApplications?.items ??
    []) as Application[];

  if (res.data === null) {
    throw new Error("Failed to get all applications");
  }

  return temp;
}

import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { idText } from "typescript";
import {
  Admin,
  AdminLog,
  Application,
  CreateAdminLogMutation,
  CreateAdminLogMutationVariables,
  CreateApplicationMutation,
  CreateApplicationMutationVariables,
  CreateAttachmentMutation,
  CreateAttachmentMutationVariables,
  CreateProgramChoiceMutation,
  CreateProgramChoiceMutationVariables,
  CreateStudentLogMutation,
  CreateStudentLogMutationVariables,
  Program,
  StudentLog,
  University,
  UpdateApplicationMutation,
  UpdateApplicationMutationVariables,
  UpdateAttachmentMutation,
  UpdateAttachmentMutationVariables,
  UpdateProgramChoiceMutation,
  UpdateProgramChoiceMutationVariables,
  UpdateProgramMutation,
  UpdateProgramMutationVariables,
  UpdateUniversityMutation,
  UpdateUniversityMutationVariables,
} from "./API";
import {
  createAttachment,
  updateAttachment,
  createApplication,
  updateApplication,
  createProgramChoice,
  updateProgramChoice,
  createStudentLog,
  createAdminLog,
  updateProgram,
  updateUniversity,
} from "./graphql/mutations";

/* -------------------------------------------------------------------------- */
/*                                    ENUMS                                   */
/* -------------------------------------------------------------------------- */
export enum DocType {
  CPR,
  ACCEPTANCE,
  TRANSCRIPT,
  SIGNED_CONTRACT,
}

export interface DownloadLinks {
  cprDoc?: string | null;
  acceptanceLetterDoc?: string | null;
  transcriptDoc?: string | null;
  signedContractDoc?: string | null;
}

/* -------------------------------------------------------------------------- */
/*                             CUSTOM API QUERIES                             */
/* -------------------------------------------------------------------------- */

/**
 * It takes an application ID as a parameter and returns the application data as a promise
 * @param {string} id - string
 * @returns A promise of an application
 */
export async function getApplicationData(
  id: string
): Promise<Application | undefined> {
  let q = `query MyQuery {
        getApplication(id: "${id}") {
                id
                _version
                _deleted
                gpa
                createdAt
                attachmentID
                applicationAttachmentId
                _lastChangedAt
                studentCPR
                status
                updatedAt
                attachment {
                  id
                  transcriptDoc
                  signedContractDoc
                  cprDoc
                  acceptanceLetterDoc
                  _version
                  _deleted
                  _lastChangedAt
                  createdAt
                  updatedAt
                }
                programs {
                  items {
                    id
                    choiceOrder
                    applicationID
                    applicationProgramsId
                    programApplicationsId
                    programID
                    program {
                      id
                      name
                      requirements
                      availability
                      university {
                        id
                        name
                      }
                      _version
                      _deleted
                    }
                    _version
                    _deleted
                  }
                }
                studentLogs {
                  items {
                    id
                    dateTime
                    studentCPR
                    snapshot
                    reason
                    applicationStudentLogsId
                    applicationID
                    _version
                  }
                }
                adminLogs {
                  items {
                    adminCPR
                    adminAdminLogsCpr
                    applicationAdminLogsId
                    _deleted
                    _lastChangedAt
                    _version
                    applicationID
                    createdAt
                    dateTime
                    id
                    reason
                    snapshot
                    updatedAt
                    admin {
                      fullName
                    }
                  }
                }
              }
      }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let application = res.data?.getApplication as Application;

  return application;
}

/**
 * It queries the GraphQL API for all the programs in the database, and returns them as an array of
 * Program objects
 * @returns A list of all programs
 */
export async function listAllPrograms() {
  let q = `
    query ListAllPrograms {
      listPrograms {
        items {
          id
          name
          requirements
          universityID
          universityProgramsId
          updatedAt
          createdAt
          availability
          _version
          _lastChangedAt
          _deleted
          university {
            id
            _deleted
            _version
            name
          }
        }
      }
    }
    `;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>; // your fetch function here
  let programs = res.data?.listPrograms.items as Program[];
  return programs;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to a GraphQL result
 * object
 * @param {CreateAttachmentMutationVariables} mutationVars - CreateAttachmentMutationVariables
 * @returns The data from the mutation.
 */
export async function createAttachmentInDB(
  mutationVars: CreateAttachmentMutationVariables
): Promise<CreateAttachmentMutation | undefined> {
  let res = (await API.graphql({
    query: createAttachment,
    variables: mutationVars,
  })) as GraphQLResult<CreateAttachmentMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to the mutation result
 * @param {UpdateAttachmentMutationVariables} mutationVars - UpdateAttachmentMutationVariables
 * @returns The return type is a promise that resolves to an object of type UpdateAttachmentMutation.
 */
export async function updateAttachmentInDB(
  mutationVars: UpdateAttachmentMutationVariables
): Promise<UpdateAttachmentMutation | undefined> {
  let res = (await API.graphql({
    query: updateAttachment,
    variables: mutationVars,
  })) as GraphQLResult<UpdateAttachmentMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to a mutation object
 * @param {CreateApplicationMutationVariables} mutationVars - CreateApplicationMutationVariables
 * @returns The data from the mutation.
 */
export async function createApplicationInDB(
  mutationVars: CreateApplicationMutationVariables
): Promise<CreateApplicationMutation | undefined> {
  let res = (await API.graphql({
    query: createApplication,
    variables: mutationVars,
  })) as GraphQLResult<CreateApplicationMutation>;

  return res.data;
}

/**
 * It takes in a set of variables, and returns the result of the mutation
 * @param {UpdateApplicationMutationVariables} mutationVars - UpdateApplicationMutationVariables
 * @returns The data from the mutation.
 */
export async function updateApplicationInDB(
  mutationVars: UpdateApplicationMutationVariables
): Promise<UpdateApplicationMutation | undefined> {
  let res = (await API.graphql({
    query: updateApplication,
    variables: mutationVars,
  })) as GraphQLResult<UpdateApplicationMutation>;

  return res.data;
}

/**
 * It takes in a variable of type CreateProgramChoiceMutationVariables and returns a promise of type
 * CreateProgramChoiceMutation or undefined
 * @param {CreateProgramChoiceMutationVariables} mutationVars - CreateProgramChoiceMutationVariables
 * @returns The data from the mutation.
 */
export async function createProgramChoiceInDB(
  mutationVars: CreateProgramChoiceMutationVariables
): Promise<CreateProgramChoiceMutation | undefined> {
  let res = (await API.graphql({
    query: createProgramChoice,
    variables: mutationVars,
  })) as GraphQLResult<CreateProgramChoiceMutation>;

  return res.data;
}

/**
 * It takes in a `mutationVars` object, and returns a promise that resolves to the
 * `UpdateProgramChoiceMutation` object
 * @param {UpdateProgramChoiceMutationVariables} mutationVars - UpdateProgramChoiceMutationVariables
 * @returns The data from the mutation
 */
export async function updateProgramChoiceInDB(
  mutationVars: UpdateProgramChoiceMutationVariables
): Promise<UpdateProgramChoiceMutation | undefined> {
  let res = (await API.graphql({
    query: updateProgramChoice,
    variables: mutationVars,
  })) as GraphQLResult<UpdateProgramChoiceMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to the mutation result
 * @param {CreateStudentLogMutationVariables} mutationVars - CreateStudentLogMutationVariables
 * @returns The data from the mutation
 */
export async function createStudentLogInDB(
  mutationVars: CreateStudentLogMutationVariables
): Promise<CreateStudentLogMutation | undefined> {
  let res = (await API.graphql({
    query: createStudentLog,
    variables: mutationVars,
  })) as GraphQLResult<CreateStudentLogMutation>;

  return res.data;
}

/**
 * It takes a file and a document type, and uploads the file to the AWS S3 bucket, and returns the
 * key of the file
 * @param {File} file - File - The file to be uploaded
 * @param {DocType} type - DocType - this is an enum that I have defined in my code.
 * @returns The key of the file uploaded to the storage bucket.
 */
export async function uploadFile(file: File, type: DocType, cpr: string) {
  try {
    let res = await Storage.put(
      `Student${cpr}/${cpr}#${DocType[type]}#${new Date().getDate()}`,
      file,
      {
        contentType: file.type,
      }
    );
    return res.key;
  } catch (error) {
    console.log("Error uploading file: ", error);
    return null;
  }
}

export async function createAdminLogInDB(
  mutationVars: CreateAdminLogMutationVariables
): Promise<CreateAdminLogMutation | undefined> {
  let res = (await API.graphql({
    query: createAdminLog,
    variables: mutationVars,
  })) as GraphQLResult<CreateAdminLogMutation>;

  return res.data;
}

export async function getApplicationLogHistory(
  id: string
): Promise<AdminLog[]> {
  let q = `
  query GetApplicationLogHistory {
    getApplication(id: "${id}") {
      adminLogs {
        items {
          adminCPR
          adminAdminLogsCpr
          applicationAdminLogsId
          _deleted
          _lastChangedAt
          _version
          applicationID
          createdAt
          dateTime
          id
          reason
          snapshot
          updatedAt
          admin {
            fullName
          }
        }
      }
    }
  }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return [];
  }

  let adminLogs = res.data.getApplication.adminLogs.items as AdminLog[];

  return adminLogs;
}

export async function getAdminByCPR(id: string): Promise<Admin | undefined> {
  let q = `
  query GetAdminByCPR {
    getAdmin(cpr: "${id}") {
      cpr
      _version
      email
      fullName
    }
  }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let admin = res.data as Admin;

  return admin;
}

export async function listAllStudentLogsOfApplication(applicationID: string) {
  let q = `
  query GetAllApplicationStudentLogs {
    getApplication(id: "${applicationID}") {
      studentLogs {
        items {
          id
          _version
          _lastChangedAt
          _deleted
          applicationID
          applicationStudentLogsId
          createdAt
          dateTime
          reason
          snapshot
          studentCPR
          studentStudentLogsCpr
          updatedAt
        }
      }
    }
  } 
    `;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>; // your fetch function here
  let studentLogs = res.data
    ? (res.data?.getApplication?.studentLogs?.items as StudentLog[])
    : [];
  return studentLogs;
}

export async function listAllAdminsLogs() {
  let q = `
  query ListAllAdminsLogs {
    listAdminLogs {
      items {
        _deleted
        _lastChangedAt
        _version
        admin {
          cpr
          email
          fullName
        }
        adminAdminLogsCpr
        adminCPR
        applicationAdminLogsId
        applicationID
        createdAt
        dateTime
        id
        reason
        snapshot
        updatedAt
      }
    }
  }  
    `;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>; // your fetch function here
  let adminsLogs = res.data ? (res.data.listAdminLogs.items as AdminLog[]) : [];
  return adminsLogs;
}

export async function getStudentLogsByLogID(
  id: string
): Promise<StudentLog | undefined> {
  let q = `
  query StudentLogHistoryInfo {
    getStudentLog(id: "${id}") {
      id
      _version
      _lastChangedAt
      _deleted
      applicationID
      applicationStudentLogsId
      createdAt
      dateTime
      studentCPR
      studentStudentLogsCpr
      updatedAt
      reason
      snapshot
      student {
        fullName
        email
        phone
        cpr
      }
    }
  }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let studentLog = res.data.getStudentLog as StudentLog;

  return studentLog;
}

export async function getAdminLogsByLogID(
  id: string
): Promise<AdminLog | undefined> {
  let q = `
  query GetAdminLogById {
    getAdminLog(id: "${id}") {
      _deleted
      _lastChangedAt
      _version
      admin {
        cpr
        email
        fullName
        _deleted
      }
      adminAdminLogsCpr
      adminCPR
      applicationAdminLogsId
      applicationID
      dateTime
      id
      reason
      snapshot
      updatedAt
    }
  }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let adminLog = res.data.getAdminLog as AdminLog;

  return adminLog;
}

export async function getProgramById(id: string): Promise<Program | undefined> {
  let q = `
  query GetProgramLogById {
    getProgram(id: "${id}") {
      _deleted
      _lastChangedAt
      _version
      availability
      createdAt
      id
      isDeactivated
      name
      requirements
      university {
        name
        isDeactivated
        id
      }
      universityID
      universityProgramsId
    }
  }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let program = res.data.getProgram as Program;

  return program;
}

export async function updateProgramById(
  mutationVars: UpdateProgramMutationVariables
): Promise<UpdateProgramMutation | undefined> {
  let res = (await API.graphql({
    query: updateProgram,
    variables: mutationVars,
  })) as GraphQLResult<UpdateProgramMutation>;

  return res.data;
}

// get all programs related to uni id
export async function getUniversityByID(
  id?: string
): Promise<University | undefined> {
  let query = `
  query GetUniInfo {
    getUniversity(id: "${id}") {
      _version
      name
      updatedAt
      id
      createdAt
      _lastChangedAt
      _deleted
      isDeactivated 
      Programs {
        items {
          isDeactivated
          name
          requirements
          universityID
          universityProgramsId
          updatedAt
          createdAt
          availability
          id
          _version
          _lastChangedAt
          _deleted
        }
      }
    }
  }
  `;

  let res = (await API.graphql(graphqlOperation(query))) as GraphQLResult<any>;

  let tempProgramList = res.data.getUniversity as University;

  return tempProgramList;
}

export async function updateUniversityById(
  mutationVars: UpdateUniversityMutationVariables
): Promise<UpdateUniversityMutation | undefined> {
  let res = (await API.graphql({
    query: updateUniversity,
    variables: mutationVars,
  })) as GraphQLResult<UpdateUniversityMutation>;

  return res.data;
}

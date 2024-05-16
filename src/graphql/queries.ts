/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttachment = /* GraphQL */ `
  query GetAttachment($id: ID!) {
    getAttachment(id: $id) {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      schoolCertificate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAttachments = /* GraphQL */ `
  query ListAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cprDoc
        signedContractDoc
        transcriptDoc
        schoolCertificate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAttachments = /* GraphQL */ `
  query SyncAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttachments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        cprDoc
        signedContractDoc
        transcriptDoc
        schoolCertificate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      gpa
      verifiedGPA
      status
      attachmentID
      adminLogs {
        nextToken
        startedAt
      }
      studentLogs {
        nextToken
        startedAt
      }
      attachment {
        id
        cprDoc
        signedContractDoc
        transcriptDoc
        schoolCertificate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      programs {
        nextToken
        startedAt
      }
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      program {
        id
        name
        minimumGPA
        requirements
        nameAr
        requirementsAr
        availability
        universityID
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      universityID
      university {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      studentCPR
      student {
        cpr
        cprDoc
        fullName
        batch
        email
        phone
        gender
        nationalityCategory
        nationality
        schoolName
        schoolType
        specialization
        placeOfBirth
        studentOrderAmongSiblings
        familyIncome
        familyIncomeProofDoc
        familyIncomeProofDocs
        preferredLanguage
        graduationDate
        address
        parentInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
      applicationAttachmentId
    }
  }
`;
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncApplications = /* GraphQL */ `
  query SyncApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const getProgramChoice = /* GraphQL */ `
  query GetProgramChoice($id: ID!) {
    getProgramChoice(id: $id) {
      id
      programID
      applicationID
      program {
        id
        name
        minimumGPA
        requirements
        nameAr
        requirementsAr
        availability
        universityID
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      choiceOrder
      acceptanceLetterDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationProgramsId
      programApplicationsId
    }
  }
`;
export const listProgramChoices = /* GraphQL */ `
  query ListProgramChoices(
    $filter: ModelProgramChoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgramChoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        programID
        applicationID
        choiceOrder
        acceptanceLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationProgramsId
        programApplicationsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProgramChoices = /* GraphQL */ `
  query SyncProgramChoices(
    $filter: ModelProgramChoiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProgramChoices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        programID
        applicationID
        choiceOrder
        acceptanceLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationProgramsId
        programApplicationsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
      id
      name
      minimumGPA
      requirements
      nameAr
      requirementsAr
      availability
      universityID
      university {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
        nextToken
        startedAt
      }
      isDeactivated
      isTrashed
      application {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        minimumGPA
        requirements
        nameAr
        requirementsAr
        availability
        universityID
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPrograms = /* GraphQL */ `
  query SyncPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPrograms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        minimumGPA
        requirements
        nameAr
        requirementsAr
        availability
        universityID
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getUniversity = /* GraphQL */ `
  query GetUniversity($id: ID!) {
    getUniversity(id: $id) {
      id
      name
      nameAr
      Programs {
        nextToken
        startedAt
      }
      availability
      isDeactivated
      isExtended
      extensionDuration
      isException
      isTrashed
      applications {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUniversities = /* GraphQL */ `
  query ListUniversities(
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUniversities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUniversities = /* GraphQL */ `
  query SyncUniversities(
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUniversities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAdminLog = /* GraphQL */ `
  query GetAdminLog($id: ID!) {
    getAdminLog(id: $id) {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      reason
      admin {
        cpr
        fullName
        email
        role
        isDeactivated
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const listAdminLogs = /* GraphQL */ `
  query ListAdminLogs(
    $filter: ModelAdminLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        applicationID
        adminCPR
        dateTime
        snapshot
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAdminLogsId
        adminAdminLogsCpr
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAdminLogs = /* GraphQL */ `
  query SyncAdminLogs(
    $filter: ModelAdminLogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdminLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        applicationID
        adminCPR
        dateTime
        snapshot
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAdminLogsId
        adminAdminLogsCpr
      }
      nextToken
      startedAt
    }
  }
`;
export const getStudentLog = /* GraphQL */ `
  query GetStudentLog($id: ID!) {
    getStudentLog(id: $id) {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      student {
        cpr
        cprDoc
        fullName
        batch
        email
        phone
        gender
        nationalityCategory
        nationality
        schoolName
        schoolType
        specialization
        placeOfBirth
        studentOrderAmongSiblings
        familyIncome
        familyIncomeProofDoc
        familyIncomeProofDocs
        preferredLanguage
        graduationDate
        address
        parentInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
    }
  }
`;
export const listStudentLogs = /* GraphQL */ `
  query ListStudentLogs(
    $filter: ModelStudentLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        applicationID
        studentCPR
        dateTime
        snapshot
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationStudentLogsId
        studentStudentLogsCpr
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStudentLogs = /* GraphQL */ `
  query SyncStudentLogs(
    $filter: ModelStudentLogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStudentLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        applicationID
        studentCPR
        dateTime
        snapshot
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationStudentLogsId
        studentStudentLogsCpr
      }
      nextToken
      startedAt
    }
  }
`;
export const getAdmin = /* GraphQL */ `
  query GetAdmin($cpr: String!) {
    getAdmin(cpr: $cpr) {
      cpr
      fullName
      email
      AdminLogs {
        nextToken
        startedAt
      }
      role
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $cpr: String
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAdmins(
      cpr: $cpr
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cpr
        fullName
        email
        role
        isDeactivated
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAdmins = /* GraphQL */ `
  query SyncAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdmins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        cpr
        fullName
        email
        role
        isDeactivated
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getParentInfo = /* GraphQL */ `
  query GetParentInfo($id: ID!) {
    getParentInfo(id: $id) {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listParentInfos = /* GraphQL */ `
  query ListParentInfos(
    $filter: ModelParentInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParentInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncParentInfos = /* GraphQL */ `
  query SyncParentInfos(
    $filter: ModelParentInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncParentInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($cpr: String!) {
    getStudent(cpr: $cpr) {
      cpr
      cprDoc
      fullName
      batch
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      applications {
        nextToken
        startedAt
      }
      ParentInfo {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      parentInfoID
      StudentLogs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $cpr: String
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      cpr: $cpr
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cpr
        cprDoc
        fullName
        batch
        email
        phone
        gender
        nationalityCategory
        nationality
        schoolName
        schoolType
        specialization
        placeOfBirth
        studentOrderAmongSiblings
        familyIncome
        familyIncomeProofDoc
        familyIncomeProofDocs
        preferredLanguage
        graduationDate
        address
        parentInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStudents = /* GraphQL */ `
  query SyncStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStudents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        cpr
        cprDoc
        fullName
        batch
        email
        phone
        gender
        nationalityCategory
        nationality
        schoolName
        schoolType
        specialization
        placeOfBirth
        studentOrderAmongSiblings
        familyIncome
        familyIncomeProofDoc
        familyIncomeProofDocs
        preferredLanguage
        graduationDate
        address
        parentInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBatch = /* GraphQL */ `
  query GetBatch($batch: Int!) {
    getBatch(batch: $batch) {
      batch
      createApplicationStartDate
      createApplicationEndDate
      updateApplicationEndDate
      signUpStartDate
      signUpEndDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listBatches = /* GraphQL */ `
  query ListBatches(
    $batch: Int
    $filter: ModelBatchFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBatches(
      batch: $batch
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        batch
        createApplicationStartDate
        createApplicationEndDate
        updateApplicationEndDate
        signUpStartDate
        signUpEndDate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBatches = /* GraphQL */ `
  query SyncBatches(
    $filter: ModelBatchFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBatches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        batch
        createApplicationStartDate
        createApplicationEndDate
        updateApplicationEndDate
        signUpStartDate
        signUpEndDate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getScholarship = /* GraphQL */ `
  query GetScholarship($id: ID!) {
    getScholarship(id: $id) {
      id
      status
      applicationID
      batch
      isConfirmed
      application {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      studentCPR
      unsignedContractDoc
      signedContractDoc
      studentSignature
      guardianSignature
      bankName
      IBAN
      IBANLetterDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listScholarships = /* GraphQL */ `
  query ListScholarships(
    $filter: ModelScholarshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScholarships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        applicationID
        batch
        isConfirmed
        studentCPR
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        bankName
        IBAN
        IBANLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncScholarships = /* GraphQL */ `
  query SyncScholarships(
    $filter: ModelScholarshipFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncScholarships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        status
        applicationID
        batch
        isConfirmed
        studentCPR
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        bankName
        IBAN
        IBANLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getStatistics = /* GraphQL */ `
  query GetStatistics($id: Int!) {
    getStatistics(id: $id) {
      id
      batch
      totalApplications
      totalApplicationsPerStatus
      scoreHistogram
      gpaHistogram
      totalApplicationsPerUniversity
      topUniversities
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listStatistics = /* GraphQL */ `
  query ListStatistics(
    $id: Int
    $filter: ModelStatisticsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStatistics(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        batch
        totalApplications
        totalApplicationsPerStatus
        scoreHistogram
        gpaHistogram
        totalApplicationsPerUniversity
        topUniversities
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStatistics = /* GraphQL */ `
  query SyncStatistics(
    $filter: ModelStatisticsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStatistics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        batch
        totalApplications
        totalApplicationsPerStatus
        scoreHistogram
        gpaHistogram
        totalApplicationsPerUniversity
        topUniversities
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByIdAndDateTime = /* GraphQL */ `
  query ApplicationsByIdAndDateTime(
    $id: ID!
    $dateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByIdAndDateTime(
      id: $id
      dateTime: $dateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByNationalityCategoryAndBatch = /* GraphQL */ `
  query ApplicationsByNationalityCategoryAndBatch(
    $nationalityCategory: Nationality!
    $batch: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByNationalityCategoryAndBatch(
      nationalityCategory: $nationalityCategory
      batch: $batch
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByStudentCPRAndGpa = /* GraphQL */ `
  query ApplicationsByStudentCPRAndGpa(
    $studentCPR: String!
    $gpa: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByStudentCPRAndGpa(
      studentCPR: $studentCPR
      gpa: $gpa
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByBatchAndStatus = /* GraphQL */ `
  query ApplicationsByBatchAndStatus(
    $batch: Int!
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByBatchAndStatus(
      batch: $batch
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByScoreAndStatus = /* GraphQL */ `
  query ApplicationsByScoreAndStatus(
    $score: Float!
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByScoreAndStatus(
      score: $score
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const applicationsByProcessedAndBatch = /* GraphQL */ `
  query ApplicationsByProcessedAndBatch(
    $processed: Int!
    $batch: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByProcessedAndBatch(
      processed: $processed
      batch: $batch
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gpa
        verifiedGPA
        status
        attachmentID
        dateTime
        isEmailSent
        nationalityCategory
        familyIncome
        schoolName
        schoolType
        studentName
        programID
        universityID
        studentCPR
        batch
        score
        adminPoints
        processed
        isFamilyIncomeVerified
        reason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        programApplicationId
        universityApplicationsId
        applicationAttachmentId
      }
      nextToken
      startedAt
    }
  }
`;
export const universitiesByIsExtendedAndName = /* GraphQL */ `
  query UniversitiesByIsExtendedAndName(
    $isExtended: Int!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    universitiesByIsExtendedAndName(
      isExtended: $isExtended
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const universitiesByIsException = /* GraphQL */ `
  query UniversitiesByIsException(
    $isException: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    universitiesByIsException(
      isException: $isException
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        nameAr
        availability
        isDeactivated
        isExtended
        extensionDuration
        isException
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const studentsByNationalityCategoryAndGraduationDate = /* GraphQL */ `
  query StudentsByNationalityCategoryAndGraduationDate(
    $nationalityCategory: Nationality!
    $graduationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentsByNationalityCategoryAndGraduationDate(
      nationalityCategory: $nationalityCategory
      graduationDate: $graduationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        cpr
        cprDoc
        fullName
        batch
        email
        phone
        gender
        nationalityCategory
        nationality
        schoolName
        schoolType
        specialization
        placeOfBirth
        studentOrderAmongSiblings
        familyIncome
        familyIncomeProofDoc
        familyIncomeProofDocs
        preferredLanguage
        graduationDate
        address
        parentInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const scholarshipsByApplicationID = /* GraphQL */ `
  query ScholarshipsByApplicationID(
    $applicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScholarshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scholarshipsByApplicationID(
      applicationID: $applicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        applicationID
        batch
        isConfirmed
        studentCPR
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        bankName
        IBAN
        IBANLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const scholarshipsByBatchAndStatus = /* GraphQL */ `
  query ScholarshipsByBatchAndStatus(
    $batch: Int!
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScholarshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scholarshipsByBatchAndStatus(
      batch: $batch
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        applicationID
        batch
        isConfirmed
        studentCPR
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        bankName
        IBAN
        IBANLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const scholarshipsByStudentCPRAndStatus = /* GraphQL */ `
  query ScholarshipsByStudentCPRAndStatus(
    $studentCPR: String!
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScholarshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scholarshipsByStudentCPRAndStatus(
      studentCPR: $studentCPR
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        applicationID
        batch
        isConfirmed
        studentCPR
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        bankName
        IBAN
        IBANLetterDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const statisticsByBatchAndTotalApplications = /* GraphQL */ `
  query StatisticsByBatchAndTotalApplications(
    $batch: Int!
    $totalApplications: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStatisticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    statisticsByBatchAndTotalApplications(
      batch: $batch
      totalApplications: $totalApplications
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        batch
        totalApplications
        totalApplicationsPerStatus
        scoreHistogram
        gpaHistogram
        totalApplicationsPerUniversity
        topUniversities
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;

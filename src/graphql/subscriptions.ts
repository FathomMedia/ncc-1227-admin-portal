/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttachment = /* GraphQL */ `
  subscription OnCreateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onCreateAttachment(filter: $filter) {
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
export const onUpdateAttachment = /* GraphQL */ `
  subscription OnUpdateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onUpdateAttachment(filter: $filter) {
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
export const onDeleteAttachment = /* GraphQL */ `
  subscription OnDeleteAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onDeleteAttachment(filter: $filter) {
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
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
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
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
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
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
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
export const onCreateProgramChoice = /* GraphQL */ `
  subscription OnCreateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onCreateProgramChoice(filter: $filter) {
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
export const onUpdateProgramChoice = /* GraphQL */ `
  subscription OnUpdateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onUpdateProgramChoice(filter: $filter) {
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
export const onDeleteProgramChoice = /* GraphQL */ `
  subscription OnDeleteProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onDeleteProgramChoice(filter: $filter) {
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
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onCreateProgram(filter: $filter) {
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onUpdateProgram(filter: $filter) {
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram($filter: ModelSubscriptionProgramFilterInput) {
    onDeleteProgram(filter: $filter) {
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
export const onCreateUniversity = /* GraphQL */ `
  subscription OnCreateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onCreateUniversity(filter: $filter) {
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
export const onUpdateUniversity = /* GraphQL */ `
  subscription OnUpdateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onUpdateUniversity(filter: $filter) {
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
export const onDeleteUniversity = /* GraphQL */ `
  subscription OnDeleteUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onDeleteUniversity(filter: $filter) {
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
export const onCreateAdminLog = /* GraphQL */ `
  subscription OnCreateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onCreateAdminLog(filter: $filter) {
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
export const onUpdateAdminLog = /* GraphQL */ `
  subscription OnUpdateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onUpdateAdminLog(filter: $filter) {
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
export const onDeleteAdminLog = /* GraphQL */ `
  subscription OnDeleteAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onDeleteAdminLog(filter: $filter) {
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
export const onCreateStudentLog = /* GraphQL */ `
  subscription OnCreateStudentLog(
    $filter: ModelSubscriptionStudentLogFilterInput
  ) {
    onCreateStudentLog(filter: $filter) {
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
export const onUpdateStudentLog = /* GraphQL */ `
  subscription OnUpdateStudentLog(
    $filter: ModelSubscriptionStudentLogFilterInput
  ) {
    onUpdateStudentLog(filter: $filter) {
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
export const onDeleteStudentLog = /* GraphQL */ `
  subscription OnDeleteStudentLog(
    $filter: ModelSubscriptionStudentLogFilterInput
  ) {
    onDeleteStudentLog(filter: $filter) {
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
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onCreateAdmin(filter: $filter) {
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
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onUpdateAdmin(filter: $filter) {
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
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onDeleteAdmin(filter: $filter) {
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
export const onCreateParentInfo = /* GraphQL */ `
  subscription OnCreateParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onCreateParentInfo(filter: $filter) {
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
export const onUpdateParentInfo = /* GraphQL */ `
  subscription OnUpdateParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onUpdateParentInfo(filter: $filter) {
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
export const onDeleteParentInfo = /* GraphQL */ `
  subscription OnDeleteParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onDeleteParentInfo(filter: $filter) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
export const onCreateBatch = /* GraphQL */ `
  subscription OnCreateBatch($filter: ModelSubscriptionBatchFilterInput) {
    onCreateBatch(filter: $filter) {
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
export const onUpdateBatch = /* GraphQL */ `
  subscription OnUpdateBatch($filter: ModelSubscriptionBatchFilterInput) {
    onUpdateBatch(filter: $filter) {
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
export const onDeleteBatch = /* GraphQL */ `
  subscription OnDeleteBatch($filter: ModelSubscriptionBatchFilterInput) {
    onDeleteBatch(filter: $filter) {
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
export const onCreateScholarship = /* GraphQL */ `
  subscription OnCreateScholarship(
    $filter: ModelSubscriptionScholarshipFilterInput
  ) {
    onCreateScholarship(filter: $filter) {
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
export const onUpdateScholarship = /* GraphQL */ `
  subscription OnUpdateScholarship(
    $filter: ModelSubscriptionScholarshipFilterInput
  ) {
    onUpdateScholarship(filter: $filter) {
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
export const onDeleteScholarship = /* GraphQL */ `
  subscription OnDeleteScholarship(
    $filter: ModelSubscriptionScholarshipFilterInput
  ) {
    onDeleteScholarship(filter: $filter) {
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
export const onCreateStatistics = /* GraphQL */ `
  subscription OnCreateStatistics(
    $filter: ModelSubscriptionStatisticsFilterInput
  ) {
    onCreateStatistics(filter: $filter) {
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
export const onUpdateStatistics = /* GraphQL */ `
  subscription OnUpdateStatistics(
    $filter: ModelSubscriptionStatisticsFilterInput
  ) {
    onUpdateStatistics(filter: $filter) {
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
export const onDeleteStatistics = /* GraphQL */ `
  subscription OnDeleteStatistics(
    $filter: ModelSubscriptionStatisticsFilterInput
  ) {
    onDeleteStatistics(filter: $filter) {
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

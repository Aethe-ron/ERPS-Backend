-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'INVIGILATOR', 'SUPERVISOR', 'INSPECTOR', 'AAC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "oName" TEXT,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT,
    "idCard" TEXT,
    "bio" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activationToken" TEXT,
    "activationTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT,
    "district" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "category" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "center" TEXT,
    "candidate" TEXT,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MalpracticStudents" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "candidateIndexNumber" TEXT NOT NULL,
    "typeOfMulpractices" TEXT NOT NULL,
    "invigilatorComment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MalpracticStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvigilatorsEndorsement" (
    "id" TEXT NOT NULL,
    "invigilatorName" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvigilatorsEndorsement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulations" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Regulations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityNote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamAttendances" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gps" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "signature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamAttendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitoring" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monitoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "examination" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "centerName" TEXT NOT NULL,
    "centerNumber" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "paperNumber" TEXT NOT NULL,
    "signature" TEXT,
    "candidateName" TEXT NOT NULL,
    "candidateIndexNumber" TEXT NOT NULL,
    "incidentNature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaySheet" (
    "id" TEXT NOT NULL,
    "officerName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "examination" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "signature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaySheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficersDetail" (
    "id" TEXT NOT NULL,
    "officersName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "centerNumber" TEXT NOT NULL,
    "signature" TEXT,
    "designation" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "centerName" TEXT NOT NULL,
    "examination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfficersDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepotKeepersDetails" (
    "id" TEXT NOT NULL,
    "keepersName" TEXT NOT NULL,
    "keeperAddress" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepotKeepersDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signout" (
    "id" TEXT NOT NULL,
    "normalAnswerBooklet" TEXT NOT NULL,
    "graphedAnswerBootLet" TEXT NOT NULL,
    "scannableAnswerBooklet" TEXT NOT NULL,
    "twine" TEXT NOT NULL,
    "scissor" TEXT NOT NULL,
    "pens" TEXT NOT NULL,
    "permanetMaker" TEXT NOT NULL,
    "cellotape" TEXT NOT NULL,
    "fieldFolder" TEXT NOT NULL,
    "invigilationcertMarkesheet" TEXT NOT NULL,
    "padlocks" TEXT NOT NULL,
    "scriptEnvelopes" TEXT NOT NULL,
    "pencil" TEXT NOT NULL,
    "strawBooks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "User_activationToken_key" ON "User"("activationToken");

-- CreateIndex
CREATE UNIQUE INDEX "School_code_key" ON "School"("code");

# Migration `20201231073420-init`

This migration has been generated by sesia at 12/31/2020, 4:34:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `RiggingRecord` DROP FOREIGN KEY `RiggingRecord_ibfk_1`

ALTER TABLE `Post` MODIFY `postCategory` ENUM('JOB', 'REPAIR', 'ETC') NOT NULL

CREATE TABLE `craneDataRecord` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `craneName` VARCHAR(191),
    `craneCode` VARCHAR(191),
    `craneModeName` VARCHAR(191),
    `excelSheetName` VARCHAR(191),
    `riggingDataId` INT NOT NULL,
    `userId` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `RiggingData` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `mainBoom` INT NOT NULL,
    `mainAngle` INT NOT NULL,
    `totalExtLength` INT NOT NULL,
    `adapter1` INT NOT NULL,
    `extBoom1` INT NOT NULL,
    `extBoom2` INT NOT NULL,
    `extBoom3` INT NOT NULL,
    `extBoom4` INT NOT NULL,
    `adapter2` INT NOT NULL,
    `flyFixLuffing` INT NOT NULL,
    `flyFixLuffingAngle` INT NOT NULL,
    `distance1` INT NOT NULL,
    `distance2` INT NOT NULL,
    `craneDistance` INT NOT NULL,
    `edgeDistanceId` INT NOT NULL,
    `centerToBlockDistance` INT NOT NULL,
    `craneToBuildingDistance` INT NOT NULL,
    `craneToBlockDistance` INT NOT NULL,
    `totalDistance` INT NOT NULL,
    `tableDistance` INT NOT NULL,
    `height1` INT NOT NULL,
    `height2` INT NOT NULL,
    `totalHeight` INT NOT NULL,
    `marginHeight` INT NOT NULL,
    `workingArea` INT NOT NULL,
    `tableWeight` INT NOT NULL,
    `counterWeight` VARCHAR(191) NOT NULL,
    `overRear` VARCHAR(191) NOT NULL,
    `optional` VARCHAR(191) NOT NULL,
    `safetyFactor` INT NOT NULL,
    `craneLocation` VARCHAR(191) NOT NULL,
    `workWeight` INT NOT NULL,
    `workBuildingId` INT NOT NULL,
    `blockId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `EdgeDistance` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `mainToBlock` INT NOT NULL,
    `mainToBuilding` INT NOT NULL,
    `flyFixLuffingToBlock` INT NOT NULL,
    `flyFixLuffingToBuilding` INT NOT NULL,
    `centerToBuildingDistance` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `WorkBuilding` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `horizontal` INT NOT NULL,
    `vertical` INT NOT NULL,
    `height` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `Block` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `vertical1` INT NOT NULL,
    `horizontal1` INT NOT NULL,
    `height1` INT NOT NULL,
    `vertical2` INT NOT NULL,
    `height2` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

DROP TABLE `RiggingRecord`

ALTER TABLE `craneDataRecord` ADD FOREIGN KEY (`riggingDataId`) REFERENCES `RiggingData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `craneDataRecord` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `RiggingData` ADD FOREIGN KEY (`edgeDistanceId`) REFERENCES `EdgeDistance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `RiggingData` ADD FOREIGN KEY (`workBuildingId`) REFERENCES `WorkBuilding`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `RiggingData` ADD FOREIGN KEY (`blockId`) REFERENCES `Block`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201231070056-init..20201231073420-init
--- datamodel.dml
+++ datamodel.dml
@@ -3,27 +3,27 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 model User {
-  id              Int             @id @default(autoincrement())
-  createdAt       DateTime        @default(now())
-  updatedAt       DateTime        @updatedAt
-  name            String          @unique
-  email           String          @unique
-  phoneNumber     String          @unique
+  id              Int               @id @default(autoincrement())
+  createdAt       DateTime          @default(now())
+  updatedAt       DateTime          @updatedAt
+  name            String            @unique
+  email           String            @unique
+  phoneNumber     String            @unique
   loginSecretCode String?
-  avatar          String          @default(value: "")
+  avatar          String            @default(value: "")
   posts           Post[]
   comments        Comment[]
   likes           Like[]
-  riggingRecord   RiggingRecord[]
+  riggingRecord   craneDataRecord[]
   overWorks       OverWork[]
-  following       User[]          @relation("FollowRelation", references: [id])
-  followers       User[]          @relation("FollowRelation", references: [id])
+  following       User[]            @relation("FollowRelation", references: [id])
+  followers       User[]            @relation("FollowRelation", references: [id])
 }
 model Post {
   id           Int          @id @default(autoincrement())
@@ -59,16 +59,87 @@
   userId    Int?
   postId    Int
 }
-model RiggingRecord {
-  id               Int      @id @default(autoincrement())
-  createdAt        DateTime @default(now())
-  craneRiggingData String?
-  user             User?    @relation(fields: [userId], references: [id])
-  userId           Int?
+model craneDataRecord {
+  id             Int         @id @default(autoincrement())
+  createdAt      DateTime    @default(now())
+  craneName      String?
+  craneCode      String?
+  craneModeName  String?
+  excelSheetName String?
+  riggingData    RiggingData @relation(fields: [riggingDataId], references: [id])
+  riggingDataId  Int
+  user           User?       @relation(fields: [userId], references: [id])
+  userId         Int?
 }
+model RiggingData {
+  id                      Int          @id @default(autoincrement())
+  mainBoom                Int
+  mainAngle               Int
+  totalExtLength          Int
+  adapter1                Int
+  extBoom1                Int
+  extBoom2                Int
+  extBoom3                Int
+  extBoom4                Int
+  adapter2                Int
+  flyFixLuffing           Int
+  flyFixLuffingAngle      Int
+  distance1               Int
+  distance2               Int
+  craneDistance           Int
+  edgeDistance            EdgeDistance @relation(fields: [edgeDistanceId], references: [id])
+  edgeDistanceId          Int
+  centerToBlockDistance   Int
+  craneToBuildingDistance Int
+  craneToBlockDistance    Int
+  totalDistance           Int
+  tableDistance           Int
+  height1                 Int
+  height2                 Int
+  totalHeight             Int
+  marginHeight            Int
+  workingArea             Int
+  tableWeight             Int
+  counterWeight           String
+  overRear                String
+  optional                String
+  safetyFactor            Int
+  craneLocation           String
+  workWeight              Int
+  workBuilding            WorkBuilding @relation(fields: [workBuildingId], references: [id])
+  workBuildingId          Int
+  block                   Block        @relation(fields: [blockId], references: [id])
+  blockId                 Int
+}
+
+model EdgeDistance {
+  id                       Int @id @default(autoincrement())
+  mainToBlock              Int
+  mainToBuilding           Int
+  flyFixLuffingToBlock     Int
+  flyFixLuffingToBuilding  Int
+  centerToBuildingDistance Int
+}
+
+model WorkBuilding {
+  id         Int @id @default(autoincrement())
+  horizontal Int
+  vertical   Int
+  height     Int
+}
+
+model Block {
+  id          Int @id @default(autoincrement())
+  vertical1   Int
+  horizontal1 Int
+  height1     Int
+  vertical2   Int
+  height2     Int
+}
+
 model OverWork {
   id               Int              @id @default(autoincrement())
   date             DateTime?
   yearMonth        String?
```


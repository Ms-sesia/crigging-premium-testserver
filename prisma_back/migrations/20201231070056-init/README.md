# Migration `20201231070056-init`

This migration has been generated by sesia at 12/31/2020, 4:00:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `Post` MODIFY `postCategory` ENUM('JOB', 'REPAIR', 'ETC') NOT NULL

ALTER TABLE `RiggingRecord` DROP COLUMN `craneName`,
    DROP COLUMN `craneCode`,
    DROP COLUMN `craneModeName`,
    DROP COLUMN `excelSheetName`,
    DROP COLUMN `riggingData`,
    ADD COLUMN     `craneRiggingData` VARCHAR(191)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201215111112-init..20201231070056-init
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 model User {
   id              Int             @id @default(autoincrement())
@@ -60,17 +60,13 @@
   postId    Int
 }
 model RiggingRecord {
-  id             Int      @id @default(autoincrement())
-  createdAt      DateTime @default(now())
-  craneName      String?
-  craneCode      String?
-  craneModeName  String?
-  excelSheetName String?
-  riggingData    String?
-  user           User?    @relation(fields: [userId], references: [id])
-  userId         Int?
+  id               Int      @id @default(autoincrement())
+  createdAt        DateTime @default(now())
+  craneRiggingData String?
+  user             User?    @relation(fields: [userId], references: [id])
+  userId           Int?
 }
 model OverWork {
   id               Int              @id @default(autoincrement())
@@ -83,9 +79,9 @@
   content          String
   overWorkCategory OverWorkCategory
   amount           Int
   overWorkAuthor   User             @relation(fields: [overWorkAuthorId], references: [id])
-  overWorkAuthorId         Int
+  overWorkAuthorId Int
   createdAt        DateTime         @default(now())
   updatedAt        DateTime         @updatedAt
 }
```


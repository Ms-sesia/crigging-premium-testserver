# Migration `20201215082359-init`

This migration has been generated by sesia at 12/15/2020, 5:23:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `OverWork` DROP COLUMN `yearMonthDat`,
    ADD COLUMN     `yearMonthDay` VARCHAR(191)

ALTER TABLE `Post` MODIFY `postCategory` ENUM('JOB', 'REPAIR', 'ETC') NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201215063303-init..20201215082359-init
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
@@ -75,9 +75,9 @@
 model OverWork {
   id               Int              @id @default(autoincrement())
   date             DateTime?
   yearMonth        String?
-  yearMonthDat     String?
+  yearMonthDay     String?
   week             Int
   location         String
   content          String
   overWorkCategory OverWorkCategory
```


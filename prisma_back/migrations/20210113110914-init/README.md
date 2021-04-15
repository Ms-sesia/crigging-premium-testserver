# Migration `20210113110914-init`

This migration has been generated by sesia at 1/13/2021, 8:09:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `Post` DROP COLUMN `title`,
    MODIFY `postCategory` ENUM('JOB', 'REPAIR', 'ETC') NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210113041733-init..20210113110914-init
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
   id              Int               @id @default(autoincrement())
@@ -29,9 +29,8 @@
 model Post {
   id           Int          @id @default(autoincrement())
   createdAt    DateTime     @default(now())
   updatedAt    DateTime     @updatedAt
-  title        String
   content      String?
   postCategory PostCategory
   comments     Comment[]
   likes        Like[]
```


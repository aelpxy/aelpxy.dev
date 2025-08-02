-- CreateTable
CREATE TABLE "public"."shares" (
    "id" TEXT NOT NULL,
    "encryptedContent" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "authTag" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shares_id_idx" ON "public"."shares"("id");

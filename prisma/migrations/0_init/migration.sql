-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "pdns_records" (
    "id" SERIAL NOT NULL,
    "qname" TEXT NOT NULL,
    "rrtype" VARCHAR(10) NOT NULL,
    "rdata" TEXT,
    "ttl" INTEGER,
    "rcode" VARCHAR(20),
    "bailiwick" TEXT,
    "first_seen" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "observation_count" INTEGER DEFAULT 1,

    CONSTRAINT "pdns_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_pdns_last_seen" ON "pdns_records"("last_seen" DESC);

-- CreateIndex
CREATE INDEX "idx_pdns_qname" ON "pdns_records"("qname");

-- CreateIndex
CREATE INDEX "idx_pdns_rdata" ON "pdns_records"("rdata");

-- CreateIndex
CREATE UNIQUE INDEX "pdns_records_qname_rrtype_rdata_rcode_key" ON "pdns_records"("qname", "rrtype", "rdata", "rcode");


-- CreateTable
CREATE TABLE "test"."layouts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "titleField" VARCHAR(255) NOT NULL,
    "categoryField" VARCHAR(255) NOT NULL,
    "typeField" VARCHAR(255) NOT NULL,
    "amountField" VARCHAR(255) NOT NULL,
    "dateField" VARCHAR(255) NOT NULL,

    CONSTRAINT "layouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test"."invoices" (
    "id" UUID NOT NULL,
    "layoutId" UUID NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "importedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test"."invoices_items" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "amount" MONEY NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "invoiceId" UUID NOT NULL,

    CONSTRAINT "invoices_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "layouts_name_key" ON "test"."layouts"("name");

-- AddForeignKey
ALTER TABLE "test"."invoices" ADD CONSTRAINT "invoices_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "test"."layouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test"."invoices_items" ADD CONSTRAINT "invoices_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "test"."invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

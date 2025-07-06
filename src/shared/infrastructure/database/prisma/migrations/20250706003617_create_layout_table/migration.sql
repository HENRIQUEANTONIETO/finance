-- CreateTable
CREATE TABLE "layouts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "titleField" VARCHAR(255) NOT NULL,
    "categoryField" VARCHAR(255) NOT NULL,
    "typeField" VARCHAR(255) NOT NULL,
    "amountField" VARCHAR(255) NOT NULL,
    "dateField" VARCHAR(255) NOT NULL,

    CONSTRAINT "layouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "layouts_name_key" ON "layouts"("name");

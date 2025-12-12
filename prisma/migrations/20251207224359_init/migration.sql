-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "sexo" TEXT NOT NULL,
    "objetivo" TEXT,
    "nivel_atividade" TEXT,
    "observacoes" TEXT,
    "tmb" DOUBLE PRECISION,
    "carboidratos_g" DOUBLE PRECISION,
    "proteinas_g" DOUBLE PRECISION,
    "gorduras_g" DOUBLE PRECISION,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dieta" (
    "id" SERIAL NOT NULL,
    "pacientes_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT,
    "objetivo" TEXT,
    "calorias_totais" DOUBLE PRECISION NOT NULL,
    "proteinas_totais" DOUBLE PRECISION NOT NULL,
    "carboidratos_totais" DOUBLE PRECISION NOT NULL,
    "gorduras_totais" DOUBLE PRECISION NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "obs" TEXT,
    "nome_dieta" TEXT,
    "data_dieta" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dieta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refeicao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_refeicao" TEXT NOT NULL,
    "descricao" TEXT,
    "calorias" DOUBLE PRECISION NOT NULL,
    "proteinas" DOUBLE PRECISION NOT NULL,
    "carboidratos" DOUBLE PRECISION NOT NULL,
    "gorduras" DOUBLE PRECISION NOT NULL,
    "dietas_id" INTEGER NOT NULL,

    CONSTRAINT "Refeicao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dieta" ADD CONSTRAINT "Dieta_pacientes_id_fkey" FOREIGN KEY ("pacientes_id") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refeicao" ADD CONSTRAINT "Refeicao_dietas_id_fkey" FOREIGN KEY ("dietas_id") REFERENCES "Dieta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

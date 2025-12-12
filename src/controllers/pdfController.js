const prisma = require("../config/prisma");
const PDFDocument = require("pdfkit");

function drawSeparator(doc, y) {
  doc
    .moveTo(40, y)
    .lineTo(555, y)
    .lineWidth(1)
    .strokeColor("#d1fae5")
    .stroke();
}

exports.generateDietPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const dieta = await prisma.dieta.findUnique({
      where: { id: Number(id) },
      include: { refeicoes: true, paciente: true }
    });

    if (!dieta) {
      return res.status(404).json({ error: "Dieta não encontrada" });
    }

    const filename = `dieta_${id}.pdf`;
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

  
    doc.rect(0, 0, doc.page.width, 60)
      .fill("#10b981");

    doc
      .fillColor("#ffffff")
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("Plano Alimentar", 40, 18);

    doc
      .fontSize(12)
      .font("Helvetica")
      .text(`NutriCopilot – ${dieta.paciente?.nome_completo || dieta.nome}`, 40, 42);

    doc.moveDown(2);

    doc.fillColor("#065f46").fontSize(16).font("Helvetica-Bold").text("Informações do Paciente");
    drawSeparator(doc, doc.y + 4);
    doc.moveDown(1);

    
    const cardY = doc.y;
    const cardPadding = 8;
    const cardWidth = 250;
    const cardHeight = 40;

    function drawCard(x, y, title, value) {
      doc
        .rect(x, y, cardWidth, cardHeight)
        .fillOpacity(0.1)
        .fill("#10b981")
        .fillOpacity(1);

      doc
        .fillColor("#065f46")
        .fontSize(10)
        .text(title, x + cardPadding, y + 5);

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(value, x + cardPadding, y + 18);
    }

    drawCard(40, cardY, "Paciente", dieta.paciente?.nome_completo || "Não informado");
    drawCard(310, cardY, "Idade / Sexo", `${dieta.paciente?.idade || "-"} anos • ${dieta.paciente?.sexo || "-"}`);

    drawCard(40, cardY + 55, "Objetivo", dieta.objetivo || "Não informado");
    drawCard(310, cardY + 55, "Calorias Totais", `${dieta.calorias_totais} kcal`);

    doc.moveDown(6);

    const LEFT_MARGIN = 90; 

    doc.x = LEFT_MARGIN;
    doc.fillColor("#065f46").fontSize(16).font("Helvetica-Bold").text("Refeições do Plano", {
      align: "left"
    });

    drawSeparator(doc, doc.y + 4);
    doc.moveDown();

    dieta.refeicoes.forEach((m) => {

      doc.x = LEFT_MARGIN;

      doc
        .fillColor("#047857")
        .fontSize(13)
        .font("Helvetica-Bold")
        .text(`${m.tipo_refeicao.toUpperCase()} – ${m.nome}`);

      doc.x = LEFT_MARGIN;
      doc
        .fillColor("#111827")
        .fontSize(11)
        .font("Helvetica")
        .text(`${m.descricao || ""}`, { width: 400 });

      doc.x = LEFT_MARGIN;
      doc
        .fillColor("#374151")
        .fontSize(10)
        .text(`Calorias: ${m.calorias} kcal`, { width: 400 });

      doc.moveDown(1.2);
    });

    doc.moveDown(2);
    drawSeparator(doc, doc.y);

    doc
      .fillColor("#6b7280")
      .fontSize(10)
      .text("Gerado automaticamente pelo NutriCopilot", { align: "center" });

    doc.end();

  } catch (err) {
    console.error("ERRO PDF:", err);
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
};

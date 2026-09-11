import PDFDocument from "pdfkit";
import type { RegistrationEmailData } from "./email";

/**
 * Generates an official, print-ready PDF Registration Docket for BLK Buddies League.
 * Returns a Buffer containing the complete PDF file.
 */
export async function generateRegistrationPdf(data: RegistrationEmailData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 32, bottom: 26, left: 36, right: 36 },
        bufferPages: true,
        info: {
          Title: `BLK Buddies League Registration - ${data.referenceNo}`,
          Author: "Trivandrum Capitals Basketball Club",
          Subject: "School Team Registration Docket",
          Keywords: "Trivandrum Capitals, BLK Buddies League, Basketball, Registration",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err: Error) => reject(err));

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const leftMargin = 36;
      const rightMargin = 36;
      const contentWidth = pageWidth - leftMargin - rightMargin; // 523.28

      // ── Helper functions ──
      const checkPageBreak = (neededHeight: number) => {
        if (doc.y + neededHeight > pageHeight - 48) {
          doc.addPage();
          drawPageHeaderMini();
        }
      };

      const drawPageHeaderMini = () => {
        // Mini running header for subsequent pages
        const startY = 32;
        doc.rect(leftMargin, startY, contentWidth, 20).fill("#032245");
        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor("#FDF7D6")
          .text("TRIVANDRUM CAPITALS — BLK BUDDIES LEAGUE DOCKET", leftMargin + 10, startY + 6, {
            lineBreak: false,
          });
        doc
          .font("Helvetica")
          .fontSize(8)
          .fillColor("#FBA643")
          .text(`REF: ${data.referenceNo} | ${data.schoolName}`, pageWidth - rightMargin - 230, startY + 6, {
            width: 220,
            align: "right",
            lineBreak: false,
          });
        doc.y = startY + 30;
      };

      // ── 1. MAIN HEADER (Page 1) ──
      // Top accent stripe
      doc.rect(leftMargin, doc.y, contentWidth, 4).fill("#E84103");
      doc.y += 4;

      // Primary Navy banner
      const bannerHeight = 56;
      doc.rect(leftMargin, doc.y, contentWidth, bannerHeight).fill("#032245");

      const headerStartY = doc.y + 9;
      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .fillColor("#FDF7D6")
        .text("TRIVANDRUM CAPITALS BASKETBALL CLUB", leftMargin + 14, headerStartY, {
          characterSpacing: 0.5,
          lineBreak: false,
        });

      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor("#FBA643")
        .text("BLK BUDDIES LEAGUE 2026 — OFFICIAL REGISTRATION DOCKET & RECEIPT", leftMargin + 14, headerStartY + 19, {
          characterSpacing: 0.3,
          lineBreak: false,
        });

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor("#93C5FD")
        .text("Thiruvananthapuram, Kerala | Affiliated Grassroots Development Program", leftMargin + 14, headerStartY + 34, {
          lineBreak: false,
        });

      doc.y = headerStartY + bannerHeight - 2;

      // ── 2. REFERENCE & STATUS HIGHLIGHT BAR ──
      doc.y += 8;
      const refBoxY = doc.y;
      const refBoxHeight = 34;
      doc.roundedRect(leftMargin, refBoxY, contentWidth, refBoxHeight, 4).fillAndStroke("#FEF3C7", "#F59E0B");

      doc
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .fillColor("#92400E")
        .text("OFFICIAL REFERENCE:", leftMargin + 12, refBoxY + 6, { lineBreak: false });
      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor("#E84103")
        .text(data.referenceNo, leftMargin + 12, refBoxY + 17, { lineBreak: false });

      const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor("#6B7280")
        .text(`Filing Date: ${today}`, leftMargin + 190, refBoxY + 13, { lineBreak: false });

      // Status Pill
      const statusPillX = pageWidth - rightMargin - 130;
      doc.roundedRect(statusPillX, refBoxY + 8, 118, 18, 9).fill("#16A34A");
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#FFFFFF")
        .text("CONFIRMED & FILED", statusPillX, refBoxY + 13, { width: 118, align: "center", lineBreak: false });

      doc.y = refBoxY + refBoxHeight + 8;

      // ── 3. SCHOOL & REPRESENTATIVE INFORMATION ──
      const drawSectionTitle = (title: string) => {
        checkPageBreak(28);
        const y = doc.y;
        doc.rect(leftMargin, y, 4, 14).fill("#E84103");
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#032245")
          .text(title.toUpperCase(), leftMargin + 10, y + 2, { lineBreak: false });
        doc.y = y + 18;
      };

      drawSectionTitle("1. School & Representative Details");

      const infoBoxY = doc.y;
      const colWidth = (contentWidth - 10) / 2;
      const infoBoxHeight = 88;

      // Left Box: School Information
      doc.roundedRect(leftMargin, infoBoxY, colWidth, infoBoxHeight, 3).fillAndStroke("#FFFFFF", "#E5E7EB");
      doc.rect(leftMargin, infoBoxY, colWidth, 16).fill("#032245");
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#FDF7D6")
        .text("INSTITUTION INFORMATION", leftMargin + 8, infoBoxY + 4, { lineBreak: false });

      const syllabusText = data.syllabus === "Other" && data.otherSyllabus ? `Other (${data.otherSyllabus})` : data.syllabus;
      const schoolLines = [
        { label: "School Name:", value: data.schoolName },
        { label: "Syllabus:", value: syllabusText },
        { label: "School Email:", value: data.schoolEmail },
        { label: "School Phone:", value: data.schoolPhone },
        { label: "Address:", value: data.schoolAddress.length > 44 ? data.schoolAddress.slice(0, 42) + "..." : data.schoolAddress },
      ];

      let curY = infoBoxY + 20;
      schoolLines.forEach((item) => {
        doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#6B7280").text(item.label, leftMargin + 8, curY, { width: 68, lineBreak: false });
        doc.font("Helvetica").fontSize(7.5).fillColor("#1F2937").text(item.value, leftMargin + 78, curY, { width: colWidth - 86, lineBreak: false });
        curY += 13;
      });

      // Right Box: Representative Information
      const rightColX = leftMargin + colWidth + 10;
      doc.roundedRect(rightColX, infoBoxY, colWidth, infoBoxHeight, 3).fillAndStroke("#FFFFFF", "#E5E7EB");
      doc.rect(rightColX, infoBoxY, colWidth, 16).fill("#032245");
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#FDF7D6")
        .text("OFFICIAL REPRESENTATIVE", rightColX + 8, infoBoxY + 4, { lineBreak: false });

      const designationText = data.repDesignation === "Other" && data.otherDesignation ? `Other (${data.otherDesignation})` : data.repDesignation;
      const repLines = [
        { label: "Representative:", value: data.repName },
        { label: "Designation:", value: designationText },
        { label: "Mobile Phone:", value: data.repPhone },
        { label: "Email ID:", value: data.repEmail },
        { label: "Authorized Role:", value: "Primary Team In-Charge / Coach" },
      ];

      curY = infoBoxY + 20;
      repLines.forEach((item) => {
        doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#6B7280").text(item.label, rightColX + 8, curY, { width: 75, lineBreak: false });
        doc.font("Helvetica").fontSize(7.5).fillColor("#1F2937").text(item.value, rightColX + 85, curY, { width: colWidth - 93, lineBreak: false });
        curY += 13;
      });

      doc.y = infoBoxY + infoBoxHeight + 10;

      // ── 4. REGISTRATION SUMMARY & FEE TABLE ──
      drawSectionTitle("2. Registered Categories & Fee Breakdown");

      const feeTableY = doc.y;
      const rowHeight = 16;

      // Table Header
      doc.rect(leftMargin, feeTableY, contentWidth, rowHeight).fill("#032245");
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#FFFFFF");
      doc.text("CATEGORY / DIVISION", leftMargin + 8, feeTableY + 4, { width: 220, lineBreak: false });
      doc.text("TEAM SIZE", leftMargin + 240, feeTableY + 4, { width: 80, lineBreak: false });
      doc.text("RATE PER TEAM", leftMargin + 340, feeTableY + 4, { width: 80, lineBreak: false });
      doc.text("AMOUNT", pageWidth - rightMargin - 90, feeTableY + 4, { width: 80, align: "right", lineBreak: false });

      let feeY = feeTableY + rowHeight;
      data.registeredCategories.forEach((cat, idx) => {
        const bg = idx % 2 === 0 ? "#F9FAFB" : "#FFFFFF";
        doc.rect(leftMargin, feeY, contentWidth, rowHeight).fill(bg);
        doc.rect(leftMargin, feeY, contentWidth, rowHeight).stroke("#E5E7EB");

        doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#032245").text(`* ${cat}`, leftMargin + 8, feeY + 4, { lineBreak: false });
        doc.font("Helvetica").fontSize(7.5).fillColor("#4B5563").text("10 Players (Official Roster)", leftMargin + 240, feeY + 4, { lineBreak: false });
        doc.font("Helvetica").fontSize(7.5).fillColor("#4B5563").text("INR 1,000", leftMargin + 340, feeY + 4, { lineBreak: false });
        doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#032245").text("INR 1,000", pageWidth - rightMargin - 90, feeY + 4, {
          width: 80,
          align: "right",
          lineBreak: false,
        });

        feeY += rowHeight;
      });

      // Total Row
      doc.rect(leftMargin, feeY, contentWidth, rowHeight + 2).fill("#FEF3C7");
      doc.rect(leftMargin, feeY, contentWidth, rowHeight + 2).stroke("#F59E0B");
      doc.font("Helvetica-Bold").fontSize(8).fillColor("#92400E").text("TOTAL REGISTRATION FEE DUE:", leftMargin + 8, feeY + 5, { lineBreak: false });
      doc
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .fillColor("#E84103")
        .text(`INR ${data.totalFee.toLocaleString("en-IN")}`, pageWidth - rightMargin - 110, feeY + 5, {
          width: 100,
          align: "right",
          lineBreak: false,
        });

      doc.y = feeY + rowHeight + 12;

      // ── 5. TEAM ROSTERS ──
      drawSectionTitle("3. Official Submitted Player Rosters");

      const renderRosterPdf = (title: string, players?: { name: string; dob: string }[]) => {
        if (!players || players.length === 0) return;

        checkPageBreak(65);

        const bannerY = doc.y;
        doc.roundedRect(leftMargin, bannerY, contentWidth, 16, 2).fill("#032245");
        doc
          .font("Helvetica-Bold")
          .fontSize(8)
          .fillColor("#FDF7D6")
          .text(`* ${title.toUpperCase()}`, leftMargin + 8, bannerY + 4, { lineBreak: false });
        doc
          .font("Helvetica-Bold")
          .fontSize(7.5)
          .fillColor("#FBA643")
          .text(`${players.length} Verified Players`, pageWidth - rightMargin - 140, bannerY + 4, {
            width: 130,
            align: "right",
            lineBreak: false,
          });

        let rY = bannerY + 16;

        // Subheader
        doc.rect(leftMargin, rY, contentWidth, 13).fill("#E2E8F0");
        doc.font("Helvetica-Bold").fontSize(7).fillColor("#334155");
        doc.text("SL NO.", leftMargin + 8, rY + 3, { width: 60, lineBreak: false });
        doc.text("PLAYER FULL NAME", leftMargin + 75, rY + 3, { width: 270, lineBreak: false });
        doc.text("DATE OF BIRTH (DD/MM/YYYY)", pageWidth - rightMargin - 160, rY + 3, { width: 150, align: "right", lineBreak: false });
        rY += 13;

        players.forEach((p, i) => {
          checkPageBreak(15);
          if (doc.y > rY) rY = doc.y;

          const rowBg = i % 2 === 0 ? "#F8FAFC" : "#FFFFFF";
          doc.rect(leftMargin, rY, contentWidth, 14).fill(rowBg);
          doc.rect(leftMargin, rY, contentWidth, 14).stroke("#E2E8F0");

          doc.font("Helvetica-Bold").fontSize(7).fillColor("#E84103").text(`#${i + 1}`, leftMargin + 8, rY + 3.5, { lineBreak: false });
          doc.font("Helvetica").fontSize(7).fillColor("#0F172A").text(p.name || "—", leftMargin + 75, rY + 3.5, { lineBreak: false });
          doc
            .font("Helvetica")
            .fontSize(7)
            .fillColor("#475569")
            .text(p.dob || "—", pageWidth - rightMargin - 160, rY + 3.5, { width: 150, align: "right", lineBreak: false });

          rY += 14;
          doc.y = rY;
        });

        doc.y += 6;
      };

      if (data.registeredCategories.includes("U10 Boys")) {
        renderRosterPdf("U10 Boys Team Roster", data.u10BoysPlayers);
      }
      if (data.registeredCategories.includes("U10 Girls")) {
        renderRosterPdf("U10 Girls Team Roster", data.u10GirlsPlayers);
      }
      if (data.registeredCategories.includes("U12 Boys")) {
        renderRosterPdf("U12 Boys Team Roster", data.u12BoysPlayers);
      }
      if (data.registeredCategories.includes("U12 Girls")) {
        renderRosterPdf("U12 Girls Team Roster", data.u12GirlsPlayers);
      }

      // ── 6. TOURNAMENT REGULATIONS & INSTRUCTIONS ──
      checkPageBreak(75);
      drawSectionTitle("4. Tournament Guidelines & Eligibility Rules");

      const rulesY = doc.y;
      const rulesHeight = 52;
      doc.roundedRect(leftMargin, rulesY, contentWidth, rulesHeight, 3).fillAndStroke("#F8FAFC", "#CBD5E1");

      const rules = [
        "1. Age Verification: Original School ID card or Birth Certificate must be produced at the registration desk prior to the first match.",
        "2. Uniforms & Numbers: All players must wear identical team jerseys with visible numbers on front and back.",
        "3. Match Reporting: Teams must report to the tournament desk at least 30 minutes before their scheduled tip-off time.",
        "4. Code of Conduct: Players, coaches, and accompanying representatives are bound by FIBA mini-basketball sporting conduct standards.",
      ];

      let ruleY = rulesY + 5;
      rules.forEach((rule) => {
        doc.font("Helvetica").fontSize(6.5).fillColor("#334155").text(rule, leftMargin + 8, ruleY, { width: contentWidth - 16, lineBreak: false });
        ruleY += 11.5;
      });

      doc.y = rulesY + rulesHeight + 10;

      // ── 7. OFFICIAL SIGNATURES & ENDORSEMENT BOXES ──
      checkPageBreak(65);
      drawSectionTitle("5. Authorization & League Seal");

      const signY = doc.y;
      const signBoxWidth = (contentWidth - 14) / 2;
      const signBoxHeight = 48;

      // Left Sign Box (School Authority)
      doc.roundedRect(leftMargin, signY, signBoxWidth, signBoxHeight, 3).fillAndStroke("#FFFFFF", "#CBD5E1");
      doc.moveTo(leftMargin + 15, signY + 30).lineTo(leftMargin + signBoxWidth - 15, signY + 30).stroke("#94A3B8");
      doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .fillColor("#032245")
        .text("School Principal / Physical Education Director", leftMargin + 15, signY + 34, {
          width: signBoxWidth - 30,
          align: "center",
          lineBreak: false,
        });
      doc
        .font("Helvetica")
        .fontSize(6)
        .fillColor("#64748B")
        .text("(Authorized Signature & School Seal)", leftMargin + 15, signY + 9, {
          width: signBoxWidth - 30,
          align: "center",
          lineBreak: false,
        });

      // Right Sign Box (Trivandrum Capitals League Official)
      const sign2X = leftMargin + signBoxWidth + 14;
      doc.roundedRect(sign2X, signY, signBoxWidth, signBoxHeight, 3).fillAndStroke("#FFFFFF", "#CBD5E1");
      doc.moveTo(sign2X + 15, signY + 30).lineTo(sign2X + signBoxWidth - 15, signY + 30).stroke("#94A3B8");
      doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .fillColor("#032245")
        .text("Tournament Director / League Secretariat", sign2X + 15, signY + 34, {
          width: signBoxWidth - 30,
          align: "center",
          lineBreak: false,
        });
      doc
        .font("Helvetica")
        .fontSize(6)
        .fillColor("#64748B")
        .text("(Trivandrum Capitals Basketball Club)", sign2X + 15, signY + 9, {
          width: signBoxWidth - 30,
          align: "center",
          lineBreak: false,
        });

      // ── 8. MULTI-PAGE RUNNING FOOTERS ──
      const range = doc.bufferedPageRange();
      const totalPages = range.count;
      for (let i = range.start; i < range.start + totalPages; i++) {
        doc.switchToPage(i);
        doc.page.margins.bottom = 0;
        const footerY = pageHeight - 20;

        // Footer separator line
        doc.moveTo(leftMargin, footerY - 4).lineTo(pageWidth - rightMargin, footerY - 4).stroke("#D1D5DB");

        doc
          .font("Helvetica")
          .fontSize(6)
          .fillColor("#6B7280")
          .text("Trivandrum Capitals Basketball Club • Central Stadium, Thiruvananthapuram • trivandrumcapitals@gmail.com", leftMargin, footerY, {
            width: 380,
            lineBreak: false,
          });

        doc
          .font("Helvetica-Bold")
          .fontSize(6.5)
          .fillColor("#032245")
          .text(`Page ${i + 1} of ${totalPages}`, pageWidth - rightMargin - 80, footerY, {
            width: 80,
            align: "right",
            lineBreak: false,
          });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}


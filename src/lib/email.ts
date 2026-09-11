import nodemailer from "nodemailer";
import { generateRegistrationPdf } from "./pdf";

interface Player {
  name: string;
  dob: string;
}

export interface RegistrationEmailData {
  referenceNo: string;
  schoolName: string;
  syllabus: string;
  otherSyllabus?: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  repName: string;
  repDesignation: string;
  otherDesignation?: string;
  repPhone: string;
  repEmail: string;
  registeredCategories: string[];
  totalPlayers: number;
  totalFee: number;
  u10BoysPlayers?: Player[];
  u10GirlsPlayers?: Player[];
  u12BoysPlayers?: Player[];
  u12GirlsPlayers?: Player[];
}

function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!user || !rawPass) {
    return null;
  }

  // Strip whitespace from app password (e.g. "abcd efgh ijkl mnop" -> "abcdefghijklmnop")
  const pass = rawPass.replace(/\s+/g, "");

  // Custom SMTP host if provided
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user, pass },
    });
  }

  // Default: Gmail service
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function renderRosterTable(title: string, players?: Player[]): string {
  if (!players || players.length === 0) return "";

  const rows = players
    .map(
      (p, i) => `
      <tr style="border-bottom: 1px solid #1D719C33; ${i % 2 === 0 ? "background-color: #03224510;" : ""}">
        <td style="padding: 8px 12px; font-weight: bold; color: #E84103; width: 40px;">#${i + 1}</td>
        <td style="padding: 8px 12px; color: #032245; font-weight: 500;">${p.name || "—"}</td>
        <td style="padding: 8px 12px; color: #555555; font-size: 13px;">${p.dob || "—"}</td>
      </tr>
    `
    )
    .join("");

  return `
    <div style="margin-top: 18px; margin-bottom: 22px; border: 1px solid #1D719C40; border-radius: 4px; overflow: hidden;">
      <div style="background-color: #032245; color: #FDF7D6; padding: 10px 14px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
        <span>🏀 ${title}</span>
        <span style="color: #FBA643;">${players.length} Players</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
        <thead>
          <tr style="background-color: #F3F4F6; color: #374151; font-size: 12px; text-transform: uppercase;">
            <th style="padding: 6px 12px;">#</th>
            <th style="padding: 6px 12px;">Player Name</th>
            <th style="padding: 6px 12px;">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

export async function sendRegistrationEmails(data: RegistrationEmailData): Promise<{
  success: boolean;
  adminEmailSent: boolean;
  repEmailSent: boolean;
  message: string;
}> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log("[EMAIL_SERVICE] EMAIL_USER and EMAIL_PASS not configured yet. Skipping email delivery.");
    return {
      success: true,
      adminEmailSent: false,
      repEmailSent: false,
      message: "Registration saved. Email notification skipped (credentials not configured yet).",
    };
  }

  const senderUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const adminRecipient = process.env.EMAIL_TO || senderUser;

  const syllabusText = data.syllabus === "Other" && data.otherSyllabus ? `Other (${data.otherSyllabus})` : data.syllabus;
  const designationText = data.repDesignation === "Other" && data.otherDesignation ? `Other (${data.otherDesignation})` : data.repDesignation;

  // Build Rosters HTML
  const u10BoysHtml = data.registeredCategories.includes("U10 Boys") ? renderRosterTable("U10 Boys Team Roster", data.u10BoysPlayers) : "";
  const u10GirlsHtml = data.registeredCategories.includes("U10 Girls") ? renderRosterTable("U10 Girls Team Roster", data.u10GirlsPlayers) : "";
  const u12BoysHtml = data.registeredCategories.includes("U12 Boys") ? renderRosterTable("U12 Boys Team Roster", data.u12BoysPlayers) : "";
  const u12GirlsHtml = data.registeredCategories.includes("U12 Girls") ? renderRosterTable("U12 Girls Team Roster", data.u12GirlsPlayers) : "";

  // ─── 1. Admin Notification Email ─────────────────────────────────────────
  const adminMailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; color: #1f2937;">
      <div style="max-w: 680px; margin: 0 auto; background: #ffffff; border: 2px solid #032245; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
        
        {/* Brand Header */}
        <div style="background-color: #032245; color: #FDF7D6; padding: 24px; text-align: center; border-bottom: 4px solid #E84103;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.08em; text-transform: uppercase;">TRIVANDRUM CAPITALS</h1>
          <p style="margin: 4px 0 0; font-size: 14px; color: #FBA643; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
            BLK Buddies League — New School Registration
          </p>
        </div>

        <div style="padding: 24px;">
          {/* Reference Banner */}
          <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 14px 18px; border-radius: 4px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; text-transform: uppercase; color: #92400E; font-weight: bold;">Reference Code</div>
              <div style="font-size: 20px; font-weight: bold; color: #E84103; letter-spacing: 0.05em;">${data.referenceNo}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 12px; text-transform: uppercase; color: #92400E; font-weight: bold;">Total Fee Due</div>
              <div style="font-size: 20px; font-weight: bold; color: #032245;">₹${data.totalFee.toLocaleString("en-IN")}</div>
            </div>
          </div>

          {/* School Details */}
          <h3 style="margin: 18px 0 8px; color: #032245; border-bottom: 2px solid #1D719C; padding-bottom: 4px; font-size: 16px; text-transform: uppercase;">
            1. School Information
          </h3>
          <table style="width: 100%; font-size: 14px; line-height: 1.6; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="width: 180px; color: #6B7280; font-weight: 600;">School Name:</td><td style="color: #111827; font-weight: bold;">${data.schoolName}</td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">Syllabus:</td><td style="color: #111827;">${syllabusText}</td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">School Email:</td><td style="color: #111827;"><a href="mailto:${data.schoolEmail}" style="color: #1D719C;">${data.schoolEmail}</a></td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">School Contact:</td><td style="color: #111827;"><a href="tel:${data.schoolPhone}" style="color: #1D719C;">${data.schoolPhone}</a></td></tr>
            <tr><td style="color: #6B7280; font-weight: 600; vertical-align: top;">School Address:</td><td style="color: #111827;">${data.schoolAddress}</td></tr>
          </table>

          {/* Representative Details */}
          <h3 style="margin: 18px 0 8px; color: #032245; border-bottom: 2px solid #1D719C; padding-bottom: 4px; font-size: 16px; text-transform: uppercase;">
            2. School Representative
          </h3>
          <table style="width: 100%; font-size: 14px; line-height: 1.6; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="width: 180px; color: #6B7280; font-weight: 600;">Representative Name:</td><td style="color: #111827; font-weight: bold;">${data.repName}</td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">Designation:</td><td style="color: #111827;">${designationText}</td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">Mobile Phone:</td><td style="color: #111827;"><a href="tel:${data.repPhone}" style="color: #1D719C;">${data.repPhone}</a></td></tr>
            <tr><td style="color: #6B7280; font-weight: 600;">Email ID:</td><td style="color: #111827;"><a href="mailto:${data.repEmail}" style="color: #1D719C;">${data.repEmail}</a></td></tr>
          </table>

          {/* Categories Registered */}
          <h3 style="margin: 18px 0 8px; color: #032245; border-bottom: 2px solid #1D719C; padding-bottom: 4px; font-size: 16px; text-transform: uppercase;">
            3. Registered Categories & Fee
          </h3>
          <p style="font-size: 14px; margin: 6px 0;">
            <strong>Registered Teams (${data.registeredCategories.length}):</strong> <span style="color: #E84103; font-weight: bold;">${data.registeredCategories.join(", ")}</span><br />
            <strong>Total Players:</strong> ${data.totalPlayers} Players<br />
            <strong>Total Fee:</strong> ₹${data.totalFee.toLocaleString("en-IN")} (₹1,000 per team)
          </p>

          {/* Rosters */}
          <h3 style="margin: 22px 0 8px; color: #032245; border-bottom: 2px solid #1D719C; padding-bottom: 4px; font-size: 16px; text-transform: uppercase;">
            4. Submitted Player Rosters
          </h3>
          ${u10BoysHtml}
          ${u10GirlsHtml}
          ${u12BoysHtml}
          ${u12GirlsHtml}

          <div style="background-color: #ECFDF5; border: 1px solid #10B981; padding: 12px 16px; border-radius: 6px; margin-top: 20px; color: #065F46; font-size: 13px; line-height: 1.5;">
            <strong>📎 Official Registration Docket (PDF) Attached:</strong><br />
            An official print-ready PDF (<strong>BLK_Registration_${data.referenceNo}.pdf</strong>) containing all team rosters, verification rules, and signature sections has been generated and attached.
          </div>

          <div style="margin-top: 20px; padding: 14px; background: #F3F4F6; border-left: 4px solid #E84103; font-size: 12px; color: #6B7280;">
            This is an automated notification from the Trivandrum Capitals League Registration Portal.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // ─── 2. School Representative Confirmation Email ────────────────────────
  const repMailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; color: #1f2937;">
      <div style="max-w: 640px; margin: 0 auto; background: #ffffff; border: 2px solid #032245; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
        
        {/* Brand Header */}
        <div style="background-color: #032245; color: #FDF7D6; padding: 24px; text-align: center; border-bottom: 4px solid #E84103;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.08em; text-transform: uppercase;">TRIVANDRUM CAPITALS</h1>
          <p style="margin: 4px 0 0; font-size: 14px; color: #FBA643; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
            BLK Buddies League — Registration Confirmation
          </p>
        </div>

        <div style="padding: 24px;">
          <p style="font-size: 15px; margin-top: 0;">
            Dear <strong>${data.repName}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #374151;">
            Thank you for registering <strong>${data.schoolName}</strong> for the upcoming <strong>BLK Buddies League – Trivandrum</strong>. Your application has been received by our league tournament committee.
          </p>

          {/* Reference Card */}
          <div style="background-color: #FEF3C7; border: 2px dashed #F59E0B; padding: 16px; border-radius: 6px; text-align: center; margin: 20px 0;">
            <div style="font-size: 12px; text-transform: uppercase; color: #92400E; font-weight: bold; letter-spacing: 0.05em;">
              Your Official Registration Reference Number
            </div>
            <div style="font-size: 26px; font-weight: bold; color: #E84103; letter-spacing: 0.08em; margin: 6px 0;">
              ${data.referenceNo}
            </div>
            <div style="font-size: 12px; color: #6B7280;">
              Please quote this reference number for all future communications and fixture queries.
            </div>
          </div>

          <h3 style="margin: 18px 0 8px; color: #032245; font-size: 15px; text-transform: uppercase; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px;">
            Registration Summary
          </h3>
          <table style="width: 100%; font-size: 14px; line-height: 1.6; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="width: 180px; color: #6B7280;">School:</td><td><strong>${data.schoolName}</strong></td></tr>
            <tr><td style="color: #6B7280;">Registered Teams:</td><td><strong style="color: #E84103;">${data.registeredCategories.join(", ")}</strong></td></tr>
            <tr><td style="color: #6B7280;">Total Players:</td><td>${data.totalPlayers} Players</td></tr>
            <tr><td style="color: #6B7280;">Total Registration Fee:</td><td><strong style="color: #032245;">₹${data.totalFee.toLocaleString("en-IN")}</strong></td></tr>
          </table>

          <div style="background-color: #ECFDF5; border: 1px solid #10B981; padding: 12px 16px; border-radius: 6px; margin: 18px 0; color: #065F46; font-size: 13px; line-height: 1.5;">
            <strong>📎 Official Registration Docket (PDF) Attached:</strong><br />
            An official print-ready PDF (<strong>BLK_Registration_${data.referenceNo}.pdf</strong>) containing verified institution details, team rosters, and league rules has been attached to this email.
          </div>

          <div style="background-color: #EFF6FF; border: 1px solid #93C5FD; padding: 14px; border-radius: 4px; margin-top: 18px; font-size: 13px; color: #1E40AF; line-height: 1.5;">
            <strong>Next Steps:</strong><br />
            1. Our league operations committee will verify team player eligibility cut-off dates.<br />
            2. Match tournament schedules, venue details, and referee briefings will be shared via email and WhatsApp.<br />
            3. For any immediate assistance, reply to this email or reach us at <a href="mailto:trivandrumcapitals@gmail.com" style="color: #1E40AF; font-weight: bold;">trivandrumcapitals@gmail.com</a>.
          </div>

          <p style="font-size: 14px; margin-top: 24px; color: #374151;">
            Best regards,<br />
            <strong>Trivandrum Capitals Basketball Club</strong><br />
            <span style="font-size: 12px; color: #6B7280;">Thiruvananthapuram, Kerala</span>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Generate Official Registration Docket PDF
  let pdfBuffer: Buffer | null = null;
  try {
    pdfBuffer = await generateRegistrationPdf(data);
    console.log(`[EMAIL_SERVICE] Generated official registration PDF (${pdfBuffer.length} bytes) for ${data.referenceNo}`);
  } catch (pdfErr) {
    console.error("[EMAIL_SERVICE] Failed to generate registration PDF docket:", pdfErr);
  }

  const attachments = pdfBuffer
    ? [
        {
          filename: `BLK_Registration_${data.referenceNo}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ]
    : [];

  let adminSent = false;
  let repSent = false;

  try {
    // 1. Send Admin Email with attached PDF
    await transporter.sendMail({
      from: `"Trivandrum Capitals Portal" <${senderUser}>`,
      to: adminRecipient,
      replyTo: data.repEmail,
      subject: `[New Registration] ${data.schoolName} — ${data.referenceNo} (${data.registeredCategories.join(", ")})`,
      html: adminMailHtml,
      attachments,
    });
    adminSent = true;
    console.log(`[EMAIL_SERVICE] Admin email with PDF sent successfully to ${adminRecipient}`);
  } catch (err) {
    console.error("[EMAIL_SERVICE] Failed to send admin email:", err);
  }

  try {
    // 2. Send Representative Confirmation Email with attached PDF
    if (data.repEmail && data.repEmail.includes("@")) {
      await transporter.sendMail({
        from: `"Trivandrum Capitals" <${senderUser}>`,
        to: data.repEmail,
        replyTo: adminRecipient,
        subject: `BLK Buddies League Registration Confirmed — Ref: ${data.referenceNo}`,
        html: repMailHtml,
        attachments,
      });
      repSent = true;
      console.log(`[EMAIL_SERVICE] Confirmation email with PDF sent successfully to ${data.repEmail}`);
    }
  } catch (err) {
    console.error("[EMAIL_SERVICE] Failed to send confirmation email to representative:", err);
  }

  return {
    success: true,
    adminEmailSent: adminSent,
    repEmailSent: repSent,
    message: adminSent && repSent ? "Confirmation emails with official PDF docket sent successfully." : "Registration processed.",
  };
}

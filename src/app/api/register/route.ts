import { NextRequest, NextResponse } from "next/server";
import { schoolRegistrationSchema } from "@/lib/validation";
import { sendRegistrationEmails } from "@/lib/email";
import { clubConfig } from "@/config/club";
import { ZodError } from "zod";

function generateReferenceNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BLK-SCH-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate payload against schema
    const validatedData = schoolRegistrationSchema.parse(body);

    const referenceNo = generateReferenceNumber();

    const registeredCategories: string[] = [];
    if (validatedData.registerU10Boys) registeredCategories.push("U10 Boys");
    if (validatedData.registerU10Girls) registeredCategories.push("U10 Girls");
    if (validatedData.registerU12Boys) registeredCategories.push("U12 Boys");
    if (validatedData.registerU12Girls) registeredCategories.push("U12 Girls");

    const totalFee = registeredCategories.length * clubConfig.leagueInfo.feeStructure.perTeam;
    const totalPlayers = registeredCategories.length * 10;

    // Send emails in background / non-blocking fashion
    const emailResult = await sendRegistrationEmails({
      referenceNo,
      schoolName: validatedData.schoolName,
      syllabus: validatedData.syllabus,
      otherSyllabus: validatedData.otherSyllabus,
      schoolEmail: validatedData.schoolEmail,
      schoolPhone: validatedData.schoolPhone,
      schoolAddress: validatedData.schoolAddress,
      repName: validatedData.repName,
      repDesignation: validatedData.repDesignation,
      otherDesignation: validatedData.otherDesignation,
      repPhone: validatedData.repPhone,
      repEmail: validatedData.repEmail,
      registeredCategories,
      totalPlayers,
      totalFee,
      u10BoysPlayers: validatedData.u10BoysPlayers,
      u10GirlsPlayers: validatedData.u10GirlsPlayers,
      u12BoysPlayers: validatedData.u12BoysPlayers,
      u12GirlsPlayers: validatedData.u12GirlsPlayers,
    });

    return NextResponse.json({
      success: true,
      referenceNo,
      message: "School Registration received! Your BLK Buddies League application has been submitted successfully.",
      schoolName: validatedData.schoolName,
      repName: validatedData.repName,
      repEmail: validatedData.repEmail,
      registeredCategories,
      totalPlayers,
      totalFee,
      emailSent: emailResult.adminEmailSent,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMap: Record<string, string[]> = {};
      for (const issue of err.issues) {
        const key = issue.path.join("_");
        if (!errorMap[key]) {
          errorMap[key] = [];
        }
        errorMap[key].push(issue.message);
      }
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fieldErrors: errorMap,
        },
        { status: 400 }
      );
    }

    console.error("[API_REGISTER_ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your school registration.",
      },
      { status: 500 }
    );
  }
}

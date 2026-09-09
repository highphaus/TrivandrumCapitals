"use client";

import { useState, useTransition } from "react";
import { clubConfig } from "@/config/club";
import { schoolRegistrationSchema, checkDobEligibility } from "@/lib/validation";
import { ZodError } from "zod";
import {
  ShieldCheck as ShieldCheckIcon,
  CheckCircle2 as CheckCircle2Icon,
  AlertTriangle as AlertTriangleIcon,
  Loader2 as Loader2Icon,
  Copy as CopyIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
  Trash2 as Trash2Icon,
  School as SchoolIcon,
  UserCheck as UserCheckIcon,
  Users as UsersIcon,
  Calculator as CalculatorIcon,
  Info as InfoIcon,
} from "lucide-react";

const ShieldCheck = ShieldCheckIcon as any;
const CheckCircle2 = CheckCircle2Icon as any;
const AlertTriangle = AlertTriangleIcon as any;
const Loader2 = Loader2Icon as any;
const Copy = CopyIcon as any;
const Check = CheckIcon as any;
const Plus = PlusIcon as any;
const Trash2 = Trash2Icon as any;
const School = SchoolIcon as any;
const UserCheck = UserCheckIcon as any;
const Users = UsersIcon as any;
const Calculator = CalculatorIcon as any;
const Info = InfoIcon as any;

interface Player {
  name: string;
  dob: string;
}

interface FormState {
  schoolName: string;
  schoolAddress: string;
  syllabus: string;
  otherSyllabus: string;
  schoolEmail: string;
  schoolPhone: string;
  repName: string;
  repDesignation: string;
  otherDesignation: string;
  repPhone: string;
  repEmail: string;
  registerU10Boys: boolean;
  registerU10Girls: boolean;
  registerU12Boys: boolean;
  registerU12Girls: boolean;
  u10BoysPlayers: Player[];
  u10GirlsPlayers: Player[];
  u12BoysPlayers: Player[];
  u12GirlsPlayers: Player[];
  consent: boolean;
}

const createEmptyPlayer = (): Player => ({ name: "", dob: "" });
const createInitialPlayers = (): Player[] => [createEmptyPlayer()];

const initialFormState: FormState = {
  schoolName: "",
  schoolAddress: "",
  syllabus: "CBSE",
  otherSyllabus: "",
  schoolEmail: "",
  schoolPhone: "",
  repName: "",
  repDesignation: "Physical Education Teacher",
  otherDesignation: "",
  repPhone: "",
  repEmail: "",
  registerU10Boys: true,
  registerU10Girls: false,
  registerU12Boys: false,
  registerU12Girls: false,
  u10BoysPlayers: createInitialPlayers(),
  u10GirlsPlayers: createInitialPlayers(),
  u12BoysPlayers: createInitialPlayers(),
  u12GirlsPlayers: createInitialPlayers(),
  consent: false,
};

function generateReferenceNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BLK-SCH-${random}`;
}

// ─── Player Roster Sub-Component ────────────────────────────────────────────

interface PlayerRosterSectionProps {
  title: string;
  eligibility: string;
  cutoffDate: string;
  categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers";
  players: Player[];
  fieldErrors: Record<string, string[]>;
  onPlayerChange: (
    categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers",
    index: number,
    field: "name" | "dob",
    value: string
  ) => void;
  onAddPlayer: (categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers") => void;
  onRemovePlayer: (categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers", index: number) => void;
}

function PlayerRosterSection({
  title,
  eligibility,
  cutoffDate,
  categoryKey,
  players,
  fieldErrors,
  onPlayerChange,
  onAddPlayer,
  onRemovePlayer,
}: PlayerRosterSectionProps) {
  const count = players.length;
  const isComplete = count === 10;
  const progressPct = (count / 10) * 100;

  return (
    <div className="border-2 border-brand-blue/40 overflow-hidden">

      {/* ── Header Strip ── */}
      <div className="bg-brand-blue/20 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-brand-blue/40">
        <div>
          <h4 className="font-display text-2xl text-brand-yellow uppercase tracking-wide">
            🏀 {title}
          </h4>
          <p className="text-xs text-brand-cream/70 font-medium mt-0.5">
            Eligibility cut-off: <span className="text-brand-orange font-bold">{eligibility}</span>
          </p>
        </div>

        {/* Progress pill */}
        <div className={`flex items-center gap-2 px-4 py-2 border text-sm font-display tracking-widest shrink-0 ${
          isComplete
            ? "border-green-500/60 bg-green-900/30 text-green-400"
            : "border-brand-yellow/50 bg-brand-yellow/10 text-brand-yellow"
        }`}>
          {isComplete ? <Check size={15} /> : <Users size={15} />}
          {count} / 10 PLAYERS
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="h-1.5 w-full bg-brand-dark">
        <div
          className={`h-full transition-all duration-500 ${isComplete ? "bg-green-500" : "bg-brand-orange"}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* ── Step Dots ── */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-1.5 flex-wrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold border transition-all duration-200 ${
              i < count
                ? "bg-brand-orange border-brand-orange text-brand-cream"
                : "border-brand-blue/40 text-brand-blue/40"
            }`}
          >
            {i + 1}
          </div>
        ))}
        <span className="text-xs text-brand-cream/50 ml-2">
          {isComplete ? "✅ Roster complete!" : `${10 - count} more needed`}
        </span>
      </div>

      {fieldErrors[categoryKey] && (
        <p className="px-5 pb-2 text-xs text-red-400 font-medium">{fieldErrors[categoryKey][0]}</p>
      )}

      {/* ── Player Rows ── */}
      <div className="divide-y divide-brand-blue/20">
        {players.map((player, idx) => {
          const isEligible = checkDobEligibility(player.dob, cutoffDate);
          const nameError = fieldErrors[`${categoryKey}_${idx}_name`];
          const dobError = fieldErrors[`${categoryKey}_${idx}_dob`];
          const hasValidDob = player.dob !== "";

          return (
            <div
              key={idx}
              className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-start gap-3 bg-brand-dark hover:bg-brand-blue/5 transition-colors"
            >
              {/* Number Badge */}
              <div className="shrink-0 w-8 h-8 bg-brand-orange flex items-center justify-center font-display text-brand-cream text-sm mt-5 sm:mt-6">
                {idx + 1}
              </div>

              {/* Name */}
              <div className="flex-1 space-y-1 min-w-0">
                <label className="block text-[11px] font-semibold text-brand-cream/60 uppercase tracking-wider">
                  Full Name <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => onPlayerChange(categoryKey, idx, "name", e.target.value)}
                  placeholder={`Player ${idx + 1} full name`}
                  className="w-full bg-brand-dark/80 border border-brand-blue/40 hover:border-brand-blue text-brand-cream placeholder-brand-cream/25 px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                />
                {nameError && <p className="text-[11px] text-red-400">{nameError[0]}</p>}
              </div>

              {/* DOB */}
              <div className="sm:w-48 space-y-1 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-[11px] font-semibold text-brand-cream/60 uppercase tracking-wider">
                    Date of Birth <span className="text-brand-orange">*</span>
                  </label>
                  {hasValidDob && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 shrink-0 ${
                      isEligible
                        ? "bg-green-900/60 text-green-400 border border-green-700/50"
                        : "bg-red-900/60 text-red-400 border border-red-700/50"
                    }`}>
                      {isEligible ? "✓ OK" : "✗ Age"}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={player.dob}
                  onChange={(e) => onPlayerChange(categoryKey, idx, "dob", e.target.value)}
                  className="w-full bg-brand-dark/80 border border-brand-blue/40 hover:border-brand-blue text-brand-cream px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                />
                {dobError && <p className="text-[11px] text-red-400">{dobError[0]}</p>}
              </div>

              {/* Remove */}
              <div className="shrink-0 flex items-end pb-0.5 sm:pt-6">
                <button
                  type="button"
                  onClick={() => onRemovePlayer(categoryKey, idx)}
                  disabled={players.length <= 1}
                  title="Remove player"
                  className="w-8 h-8 flex items-center justify-center text-brand-blue/50 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add Player / Complete Footer ── */}
      <div className="p-4 bg-brand-dark/60 border-t border-brand-blue/30">
        {!isComplete ? (
          <button
            type="button"
            onClick={() => onAddPlayer(categoryKey)}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-brand-blue/10 border-2 border-dashed border-brand-blue/50 text-brand-cream/70 hover:bg-brand-orange/10 hover:border-brand-orange hover:text-brand-orange transition-all duration-200 group"
          >
            <div className="w-6 h-6 bg-brand-blue/30 group-hover:bg-brand-orange/30 flex items-center justify-center transition-colors">
              <Plus size={16} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display text-lg tracking-wider uppercase">
              Add Player {count + 1}
            </span>
            <span className="text-xs text-brand-cream/40 group-hover:text-brand-orange/60 font-mono">
              ({10 - count} remaining)
            </span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 py-3.5 bg-green-900/20 border-2 border-green-600/40 text-green-400">
            <div className="w-6 h-6 bg-green-900/50 flex items-center justify-center">
              <Check size={16} />
            </div>
            <span className="font-display text-lg tracking-wider uppercase">
              Roster Complete — 10 / 10 Players
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Form Component ─────────────────────────────────────────────────────

export default function TrialRegistrationForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [successData, setSuccessData] = useState<{
    referenceNo: string;
    message: string;
    schoolName: string;
    repName: string;
    repEmail: string;
    registeredCategories: string[];
    totalPlayers: number;
    totalFee: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic calculations
  const teamCount = [
    formData.registerU10Boys,
    formData.registerU10Girls,
    formData.registerU12Boys,
    formData.registerU12Girls,
  ].filter(Boolean).length;

  const totalPlayersFilled =
    (formData.registerU10Boys ? formData.u10BoysPlayers.filter((p) => p.name.trim()).length : 0) +
    (formData.registerU10Girls ? formData.u10GirlsPlayers.filter((p) => p.name.trim()).length : 0) +
    (formData.registerU12Boys ? formData.u12BoysPlayers.filter((p) => p.name.trim()).length : 0) +
    (formData.registerU12Girls ? formData.u12GirlsPlayers.filter((p) => p.name.trim()).length : 0);

  // Fee calculation: ₹1,000 per team OR ₹100 per player
  const teamFee = teamCount * clubConfig.leagueInfo.feeStructure.perTeam;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    setGeneralError(null);
  };

  const handlePlayerChange = (
    categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers",
    index: number,
    field: "name" | "dob",
    value: string
  ) => {
    setFormData((prev) => {
      const players = [...prev[categoryKey]];
      players[index] = { ...players[index], [field]: value };
      return { ...prev, [categoryKey]: players };
    });
  };

  const handleAddPlayer = (
    categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers"
  ) => {
    setFormData((prev) => {
      if (prev[categoryKey].length >= 10) return prev;
      return { ...prev, [categoryKey]: [...prev[categoryKey], createEmptyPlayer()] };
    });
  };

  const handleRemovePlayer = (
    categoryKey: "u10BoysPlayers" | "u10GirlsPlayers" | "u12BoysPlayers" | "u12GirlsPlayers",
    index: number
  ) => {
    setFormData((prev) => {
      if (prev[categoryKey].length <= 1) return prev;
      const players = prev[categoryKey].filter((_, i) => i !== index);
      return { ...prev, [categoryKey]: players };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    startTransition(async () => {
      try {
        const validatedData = schoolRegistrationSchema.parse(formData);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const refNo = generateReferenceNumber();

        const registeredCategories: string[] = [];
        if (validatedData.registerU10Boys) registeredCategories.push("U10 Boys");
        if (validatedData.registerU10Girls) registeredCategories.push("U10 Girls");
        if (validatedData.registerU12Boys) registeredCategories.push("U12 Boys");
        if (validatedData.registerU12Girls) registeredCategories.push("U12 Girls");

        const finalFee = registeredCategories.length * clubConfig.leagueInfo.feeStructure.perTeam;

        setSuccessData({
          referenceNo: refNo,
          message: "School Registration received! Your BLK Buddies League application has been submitted successfully.",
          schoolName: validatedData.schoolName,
          repName: validatedData.repName,
          repEmail: validatedData.repEmail,
          registeredCategories,
          totalPlayers: registeredCategories.length * 10,
          totalFee: finalFee,
        });
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          const errors = err.flatten().fieldErrors;
          setFieldErrors(errors as Record<string, string[]>);
          setGeneralError("Please resolve the highlighted validation errors before submitting.");
        } else {
          setGeneralError("An unexpected error occurred while submitting your school registration.");
        }
      }
    });
  };

  const handleCopyReference = () => {
    if (successData?.referenceNo) {
      navigator.clipboard.writeText(successData.referenceNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
    setSuccessData(null);
    setFieldErrors({});
    setGeneralError(null);
  };

  return (
    <section id="trials" className="section-pad bg-brand-dark relative court-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WELCOME BANNER & OFFICIAL LEAGUE GUIDELINES */}
        <div className="bg-brand-dark/95 border-2 sm:border-4 border-brand-orange p-4 sm:p-10 mb-12 shadow-2xl space-y-6 relative" id="register-form">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-orange/40 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 border border-brand-orange text-brand-orange font-display text-sm tracking-wider uppercase">
              <ShieldCheck size={18} />
              OFFICIAL LEAGUE ANNOUNCEMENT
            </div>
            <span className="font-display text-lg sm:text-xl text-brand-yellow tracking-widest uppercase">
              THIRUVANANTHAPURAM
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-brand-cream font-bold uppercase tracking-tight leading-none whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: "clamp(1.1rem, 4.5vw, 3.75rem)" }}>
              BLK BUDDIES LEAGUE – <span className="text-brand-orange">TRIVANDRUM</span>
            </h2>
            <p className="text-brand-yellow font-display text-lg sm:text-2xl uppercase tracking-wide">
              {clubConfig.leagueInfo.welcomeText}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubConfig.leagueInfo.categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 bg-brand-blue/20 border border-brand-blue/50 flex items-start gap-3"
              >
                <span className="text-2xl shrink-0">🏀</span>
                <div>
                  <div className="font-display text-xl text-brand-cream uppercase font-bold">
                    {cat.name}
                  </div>
                  <div className="text-sm text-brand-orange font-semibold">
                    {cat.cutoff}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Rules & Guidelines List */}
          <div className="p-4 bg-brand-dark border border-brand-blue/30 space-y-2">
            <div className="flex items-center gap-2 text-brand-yellow font-display text-lg uppercase tracking-wider">
              <Info size={18} />
              Official Registration Rules
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-cream/90 font-normal">
              {clubConfig.leagueInfo.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Fee Structure Summary Banner */}
          <div className="p-5 bg-gradient-to-r from-brand-orange/20 via-brand-yellow/10 to-brand-orange/20 border-2 border-brand-yellow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl text-brand-yellow uppercase font-bold">
                REGISTRATION FEE
              </div>
              <div className="text-base text-brand-cream font-semibold">
                ₹1,000 per team <span className="text-brand-orange font-bold">OR</span> ₹100 per player
              </div>
            </div>
            <div className="text-xs text-brand-cream/80 max-w-xs sm:text-right font-medium">
              Fees are calculated based on registered team categories.
            </div>
          </div>
        </div>

        {/* Success Screen State */}
        {successData ? (
          <div className="bg-brand-dark border-4 border-brand-orange p-6 sm:p-12 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-brand-orange/20 border-2 border-brand-orange text-brand-orange rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-3xl sm:text-5xl text-brand-cream font-bold uppercase">
                  SCHOOL REGISTRATION CONFIRMED
                </h3>
                <p className="text-xl text-brand-yellow font-medium">
                  {successData.message}
                </p>
              </div>

              {/* Reference Number Display Card */}
              <div className="max-w-md mx-auto p-6 bg-brand-blue/20 border-2 border-brand-yellow space-y-3">
                <div className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                  OFFICIAL LEAGUE REGISTRATION REFERENCE
                </div>
                <div className="font-display text-4xl sm:text-5xl tracking-widest text-brand-orange font-bold">
                  {successData.referenceNo}
                </div>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-2 text-sm text-brand-cream hover:text-brand-yellow bg-brand-dark px-4 py-2 border border-brand-blue/40 hover:border-brand-yellow transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-400" /> Reference Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy Reference Code
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left p-6 bg-brand-dark/80 border border-brand-blue/30 max-w-3xl mx-auto">
                <div>
                  <span className="text-xs text-brand-cream/60 uppercase block font-semibold">School Name</span>
                  <span className="font-display text-lg text-brand-cream">{successData.schoolName}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-cream/60 uppercase block font-semibold">Representative</span>
                  <span className="font-display text-lg text-brand-yellow">{successData.repName}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-cream/60 uppercase block font-semibold">Registered Categories</span>
                  <span className="font-display text-lg text-brand-orange">{successData.registeredCategories.join(", ")}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-cream/60 uppercase block font-semibold">Total Registration Fee</span>
                  <span className="font-display text-2xl text-brand-yellow font-bold">₹{successData.totalFee.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p className="text-xs text-brand-cream/70 max-w-lg mx-auto">
                A confirmation summary has been sent to representative email <strong className="text-brand-cream">{successData.repEmail}</strong>. Our league committee will issue tournament match fixtures soon.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-secondary"
                >
                  Register Another School
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form Container */
          <form
            onSubmit={handleSubmit}
            className="bg-brand-dark/95 border-2 border-brand-blue/40 p-4 sm:p-8 lg:p-10 shadow-2xl space-y-8 sm:space-y-10 relative"
            noValidate
          >
            {/* Corner Graphic Accent */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-orange/20 border-b border-l border-brand-orange pointer-events-none" />

            {/* General Banner Error */}
            {generalError && (
              <div className="p-4 bg-red-950/80 border-2 border-red-500 text-red-200 flex items-start gap-3">
                <AlertTriangle size={24} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xl text-red-300 uppercase">Submission Error</h4>
                  <p className="text-sm text-red-200/90">{generalError}</p>
                </div>
              </div>
            )}

            {/* SECTION 1: SCHOOL DETAILS */}
            <div className="space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <School className="text-brand-orange" size={24} />
                  <h3 className="font-display text-2xl text-brand-yellow uppercase tracking-wide">
                    1. School Details
                  </h3>
                </div>
                <span className="text-xs text-brand-cream/60 uppercase font-semibold">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name */}
                <div className="space-y-2">
                  <label htmlFor="schoolName" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    School Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Full official school name"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.schoolName && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.schoolName[0]}</p>
                  )}
                </div>

                {/* Syllabus Followed */}
                <div className="space-y-2">
                  <label htmlFor="syllabus" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Syllabus Followed in Your School <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    id="syllabus"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  >
                    {clubConfig.syllabuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.syllabus && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.syllabus[0]}</p>
                  )}
                </div>

                {formData.syllabus === "Other" && (
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="otherSyllabus" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                      Specify Other Syllabus
                    </label>
                    <input
                      type="text"
                      id="otherSyllabus"
                      name="otherSyllabus"
                      value={formData.otherSyllabus}
                      onChange={handleChange}
                      placeholder="Specify your school syllabus"
                      className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                )}

                {/* School Email ID */}
                <div className="space-y-2">
                  <label htmlFor="schoolEmail" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    School Email ID <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="schoolEmail"
                    name="schoolEmail"
                    required
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    placeholder="school@example.com"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.schoolEmail && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.schoolEmail[0]}</p>
                  )}
                </div>

                {/* School Contact Number */}
                <div className="space-y-2">
                  <label htmlFor="schoolPhone" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    School Contact Number <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    id="schoolPhone"
                    name="schoolPhone"
                    required
                    value={formData.schoolPhone}
                    onChange={handleChange}
                    placeholder="10-digit school contact phone"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.schoolPhone && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.schoolPhone[0]}</p>
                  )}
                </div>

                {/* School Address */}
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="schoolAddress" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    School Address <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    id="schoolAddress"
                    name="schoolAddress"
                    rows={2}
                    required
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    placeholder="Full street address, district, pincode"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.schoolAddress && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.schoolAddress[0]}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: SCHOOL REPRESENTATIVE */}
            <div className="space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCheck className="text-brand-orange" size={24} />
                  <h3 className="font-display text-2xl text-brand-yellow uppercase tracking-wide">
                    2. School Representative
                  </h3>
                </div>
                <span className="text-xs text-brand-cream/60 uppercase font-semibold">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name of Representative */}
                <div className="space-y-2">
                  <label htmlFor="repName" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Name of School Representative <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="repName"
                    name="repName"
                    required
                    value={formData.repName}
                    onChange={handleChange}
                    placeholder="Full name of representative"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.repName && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.repName[0]}</p>
                  )}
                </div>

                {/* Designation */}
                <div className="space-y-2">
                  <label htmlFor="repDesignation" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Designation <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    id="repDesignation"
                    name="repDesignation"
                    value={formData.repDesignation}
                    onChange={handleChange}
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  >
                    {clubConfig.designations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.repDesignation && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.repDesignation[0]}</p>
                  )}
                </div>

                {formData.repDesignation === "Other" && (
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="otherDesignation" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                      Specify Other Designation
                    </label>
                    <input
                      type="text"
                      id="otherDesignation"
                      name="otherDesignation"
                      value={formData.otherDesignation}
                      onChange={handleChange}
                      placeholder="Specify your designation"
                      className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                )}

                {/* Representative Phone */}
                <div className="space-y-2">
                  <label htmlFor="repPhone" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Representative&apos;s Phone Number <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    id="repPhone"
                    name="repPhone"
                    required
                    value={formData.repPhone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.repPhone && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.repPhone[0]}</p>
                  )}
                </div>

                {/* Representative Email */}
                <div className="space-y-2">
                  <label htmlFor="repEmail" className="block text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Representative&apos;s Email ID <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="repEmail"
                    name="repEmail"
                    required
                    value={formData.repEmail}
                    onChange={handleChange}
                    placeholder="representative@example.com"
                    className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {fieldErrors.repEmail && (
                    <p className="text-xs text-red-400 font-medium">{fieldErrors.repEmail[0]}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: TEAM CATEGORIES SELECTION & FEE CALCULATOR */}
            <div className="space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="text-brand-orange" size={24} />
                  <h3 className="font-display text-2xl text-brand-yellow uppercase tracking-wide">
                    3. Category Selection & Registration Fee
                  </h3>
                </div>
                <span className="text-xs text-brand-cream/60 uppercase font-semibold">Step 3 of 4</span>
              </div>

              <p className="text-sm text-brand-cream/80">
                Select the categories in which your school wishes to participate (1, 2, 3 or all 4 teams). Each selected team requires 10 players.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* U10 Boys Checkbox */}
                <div className={`p-4 border-2 transition-all ${formData.registerU10Boys ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-xl text-brand-cream uppercase font-bold block">
                        🏀 U10 Boys Division
                      </span>
                      <span className="text-xs text-brand-orange font-semibold">
                        Born on or after 01-01-2017
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="registerU10Boys"
                        checked={formData.registerU10Boys}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </label>
                  </div>
                </div>

                {/* U10 Girls Checkbox */}
                <div className={`p-4 border-2 transition-all ${formData.registerU10Girls ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-xl text-brand-cream uppercase font-bold block">
                        🏀 U10 Girls Division
                      </span>
                      <span className="text-xs text-brand-orange font-semibold">
                        Born on or after 01-01-2017
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="registerU10Girls"
                        checked={formData.registerU10Girls}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </label>
                  </div>
                </div>

                {/* U12 Boys Checkbox */}
                <div className={`p-4 border-2 transition-all ${formData.registerU12Boys ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-xl text-brand-cream uppercase font-bold block">
                        🏀 U12 Boys Division
                      </span>
                      <span className="text-xs text-brand-orange font-semibold">
                        Born on or after 01-01-2015
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="registerU12Boys"
                        checked={formData.registerU12Boys}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </label>
                  </div>
                </div>

                {/* U12 Girls Checkbox */}
                <div className={`p-4 border-2 transition-all ${formData.registerU12Girls ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-xl text-brand-cream uppercase font-bold block">
                        🏀 U12 Girls Division
                      </span>
                      <span className="text-xs text-brand-orange font-semibold">
                        Born on or after 01-01-2015
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="registerU12Girls"
                        checked={formData.registerU12Girls}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </label>
                  </div>
                </div>
              </div>
              {fieldErrors.registerU10Boys && (
                <p className="text-xs text-red-400 font-medium">{fieldErrors.registerU10Boys[0]}</p>
              )}

              {/* REAL-TIME REGISTRATION FEE SUMMARY CARD */}
              <div className="p-6 bg-brand-dark border-2 border-brand-yellow space-y-4">
                <div className="flex items-center gap-3 border-b border-brand-yellow/40 pb-3">
                  <Calculator className="text-brand-yellow" size={24} />
                  <h4 className="font-display text-xl text-brand-yellow uppercase font-bold">
                    Real-Time Fee Calculator
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                  <div className="p-3 bg-brand-blue/20 border border-brand-blue/40">
                    <span className="text-xs uppercase text-brand-cream/70 block">Registered Teams</span>
                    <span className="font-display text-3xl text-brand-orange">{teamCount} Team(s)</span>
                  </div>
                  <div className="p-3 bg-brand-blue/20 border border-brand-blue/40">
                    <span className="text-xs uppercase text-brand-cream/70 block">Total Player Roster</span>
                    <span className="font-display text-3xl text-brand-cream">{teamCount * 10} Players</span>
                  </div>
                  <div className="p-3 bg-brand-orange/20 border border-brand-orange">
                    <span className="text-xs uppercase text-brand-cream/70 block">Calculated Total Fee</span>
                    <span className="font-display text-3xl text-brand-yellow font-bold">
                      ₹{teamFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-brand-cream/70">
                  Fee calculation rate: ₹1,000 per team (or ₹100 per player). {teamCount} team(s) × ₹1,000 = ₹{teamFee.toLocaleString("en-IN")}.
                </p>
              </div>
            </div>

            {/* SECTION 4: 10 PLAYER ROSTERS FOR REGISTERED CATEGORIES */}
            <div className="space-y-8">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <h3 className="font-display text-2xl text-brand-yellow uppercase tracking-wide">
                  4. Player Rosters (10 Players per Registered Team)
                </h3>
                <span className="text-xs text-brand-cream/60 uppercase font-semibold">Step 4 of 4</span>
              </div>

              {/* U10 BOYS ROSTER */}
              {formData.registerU10Boys && (
                <PlayerRosterSection
                  title="U10 Boys Team Roster"
                  eligibility="Born on or after 01-01-2017"
                  cutoffDate="2017-01-01"
                  categoryKey="u10BoysPlayers"
                  players={formData.u10BoysPlayers}
                  fieldErrors={fieldErrors}
                  onPlayerChange={handlePlayerChange}
                  onAddPlayer={handleAddPlayer}
                  onRemovePlayer={handleRemovePlayer}
                />
              )}

              {/* U10 GIRLS ROSTER */}
              {formData.registerU10Girls && (
                <PlayerRosterSection
                  title="U10 Girls Team Roster"
                  eligibility="Born on or after 01-01-2017"
                  cutoffDate="2017-01-01"
                  categoryKey="u10GirlsPlayers"
                  players={formData.u10GirlsPlayers}
                  fieldErrors={fieldErrors}
                  onPlayerChange={handlePlayerChange}
                  onAddPlayer={handleAddPlayer}
                  onRemovePlayer={handleRemovePlayer}
                />
              )}

              {/* U12 BOYS ROSTER */}
              {formData.registerU12Boys && (
                <PlayerRosterSection
                  title="U12 Boys Team Roster"
                  eligibility="Born on or after 01-01-2015"
                  cutoffDate="2015-01-01"
                  categoryKey="u12BoysPlayers"
                  players={formData.u12BoysPlayers}
                  fieldErrors={fieldErrors}
                  onPlayerChange={handlePlayerChange}
                  onAddPlayer={handleAddPlayer}
                  onRemovePlayer={handleRemovePlayer}
                />
              )}

              {/* U12 GIRLS ROSTER */}
              {formData.registerU12Girls && (
                <PlayerRosterSection
                  title="U12 Girls Team Roster"
                  eligibility="Born on or after 01-01-2015"
                  cutoffDate="2015-01-01"
                  categoryKey="u12GirlsPlayers"
                  players={formData.u12GirlsPlayers}
                  fieldErrors={fieldErrors}
                  onPlayerChange={handlePlayerChange}
                  onAddPlayer={handleAddPlayer}
                  onRemovePlayer={handleRemovePlayer}
                />
              )}
            </div>

            {/* CONSENT & AUTHORIZATION */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-brand-orange cursor-pointer shrink-0"
                />
                <span className="text-sm text-brand-cream/90 font-normal leading-snug group-hover:text-brand-cream">
                  I confirm that I am an authorized representative of the school. All submitted student-player information is accurate and approved for BLK Buddies League participation. <span className="text-brand-orange font-bold">*</span>
                </span>
              </label>
              {fieldErrors.consent && (
                <p className="text-xs text-red-400 font-medium mt-1 pl-8">{fieldErrors.consent[0]}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-brand-blue/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-brand-cream/70 font-semibold">
                Registration Fee Due: <span className="text-brand-yellow font-display text-lg">₹{teamFee.toLocaleString("en-IN")}</span> ({teamCount} Team(s))
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full sm:w-auto text-center flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                id="submit-school-registration"
              >
                {isPending ? (
                  <>
                    <Loader2 size={22} className="animate-spin text-brand-cream" />
                    SUBMITTING SCHOOL REGISTRATION...
                  </>
                ) : (
                  <>SUBMIT SCHOOL REGISTRATION</>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}

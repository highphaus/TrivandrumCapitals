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
  const categoryError = fieldErrors[categoryKey];

  return (
    <div className={`border-2 overflow-hidden transition-colors ${categoryError ? "border-red-500/80" : "border-brand-blue/40"}`}>

      {/* ── Header Strip ── */}
      <div className="bg-brand-blue/20 px-3.5 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-brand-blue/40">
        <div>
          <h4 className="font-display text-lg sm:text-2xl text-brand-yellow uppercase tracking-wide flex items-center gap-2">
            <span>🏀</span> {title}
          </h4>
          <p className="text-xs sm:text-sm text-brand-cream/70 font-medium mt-0.5">
            Eligibility cut-off: <span className="text-brand-orange font-bold">{eligibility}</span>
          </p>
        </div>

        {/* Progress pill */}
        <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border text-xs sm:text-sm font-display tracking-wider shrink-0 self-start sm:self-auto ${
          isComplete
            ? "border-green-500/60 bg-green-900/30 text-green-400 font-bold"
            : "border-brand-yellow/50 bg-brand-yellow/10 text-brand-yellow"
        }`}>
          {isComplete ? <Check size={14} /> : <Users size={14} />}
          {count} / 10 PLAYERS
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="h-1.5 w-full bg-brand-dark">
        <div
          className={`h-full transition-all duration-300 ${isComplete ? "bg-green-500" : "bg-brand-orange"}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* ── Step Dots ── */}
      <div className="px-3.5 sm:px-5 pt-3 pb-2 flex items-center gap-1.5 flex-wrap">
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
        <span className="text-xs text-brand-cream/60 ml-2 font-medium">
          {isComplete ? "✅ Roster complete!" : `${10 - count} more required`}
        </span>
      </div>

      {categoryError && (
        <div className="mx-3.5 sm:mx-5 my-2 p-2.5 bg-red-950/60 border border-red-500 text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle size={15} className="text-red-400 shrink-0" />
          <span>{categoryError[0]}</span>
        </div>
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
              className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-3 bg-brand-dark hover:bg-brand-blue/5 transition-colors"
            >
              {/* Mobile Header: Badge + Label + Delete button (<640px) */}
              <div className="flex items-center justify-between w-full sm:hidden">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-brand-orange flex items-center justify-center font-display text-brand-cream text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-brand-cream/80 font-semibold uppercase tracking-wider">
                    Player {idx + 1}
                  </span>
                </div>
                {players.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemovePlayer(categoryKey, idx)}
                    title="Remove player"
                    className="w-7 h-7 flex items-center justify-center text-brand-cream/50 hover:text-red-400 hover:bg-red-950/40 border border-brand-blue/30 hover:border-red-900/50 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* Desktop Number Badge (sm+) */}
              <div className="hidden sm:flex shrink-0 w-8 h-8 bg-brand-orange items-center justify-center font-display text-brand-cream text-sm mt-5">
                {idx + 1}
              </div>

              {/* Name */}
              <div className="flex-1 space-y-1 min-w-0 w-full">
                <label className="block text-[11px] font-semibold text-brand-cream/70 uppercase tracking-wider">
                  Full Name <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => onPlayerChange(categoryKey, idx, "name", e.target.value)}
                  placeholder={`Player ${idx + 1} full name`}
                  className={`w-full bg-brand-dark/80 border text-brand-cream placeholder-brand-cream/25 px-3 py-2 sm:py-2.5 text-base sm:text-sm focus:outline-none transition-colors min-h-[42px] ${
                    nameError ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/40 hover:border-brand-blue focus:border-brand-orange"
                  }`}
                />
                {nameError && (
                  <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-0.5">
                    <AlertTriangle size={12} className="shrink-0" /> {nameError[0]}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div className="w-full sm:w-48 space-y-1 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-[11px] font-semibold text-brand-cream/70 uppercase tracking-wider">
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
                  className={`w-full bg-brand-dark/80 border text-brand-cream px-3 py-2 sm:py-2.5 text-base sm:text-sm focus:outline-none transition-colors min-h-[42px] ${
                    dobError ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/40 hover:border-brand-blue focus:border-brand-orange"
                  }`}
                />
                {dobError && (
                  <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-0.5">
                    <AlertTriangle size={12} className="shrink-0" /> {dobError[0]}
                  </p>
                )}
              </div>

              {/* Remove button on Desktop (sm+) */}
              <div className="hidden sm:flex shrink-0 items-end pb-0.5 pt-5">
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
      <div className="p-3 sm:p-4 bg-brand-dark/60 border-t border-brand-blue/30">
        {!isComplete ? (
          <button
            type="button"
            onClick={() => onAddPlayer(categoryKey)}
            className="w-full flex items-center justify-center gap-2.5 sm:gap-3 py-3 sm:py-3.5 bg-brand-blue/10 border-2 border-dashed border-brand-blue/50 text-brand-cream/80 hover:bg-brand-orange/10 hover:border-brand-orange hover:text-brand-orange transition-all duration-200 min-h-[46px] group"
          >
            <div className="w-6 h-6 bg-brand-blue/30 group-hover:bg-brand-orange/30 flex items-center justify-center transition-colors">
              <Plus size={16} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display text-base sm:text-lg tracking-wider uppercase">
              Add Player {count + 1}
            </span>
            <span className="text-xs text-brand-cream/50 group-hover:text-brand-orange/70 font-mono">
              ({10 - count} remaining)
            </span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-3 sm:py-3.5 bg-green-900/20 border-2 border-green-600/40 text-green-400 min-h-[46px]">
            <div className="w-6 h-6 bg-green-900/50 flex items-center justify-center">
              <Check size={16} />
            </div>
            <span className="font-display text-base sm:text-lg tracking-wider uppercase font-bold">
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

  // Fee calculation: ₹1,000 per team
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

    // Auto-clear error when user modifies the field
    if (fieldErrors[name] || fieldErrors.categorySelection) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        if (name.startsWith("register")) {
          delete updated.categorySelection;
        }
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

    const errorKey = `${categoryKey}_${index}_${field}`;
    if (fieldErrors[errorKey] || fieldErrors[categoryKey]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[errorKey];
        delete updated[categoryKey];
        return updated;
      });
    }
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

        window.scrollTo({ top: 100, behavior: "smooth" });
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
          setFieldErrors(errorMap);
          setGeneralError("Please resolve the highlighted validation errors before submitting.");

          // Smooth scroll to top of form or first error
          const formTop = document.getElementById("register-form");
          if (formTop) {
            formTop.scrollIntoView({ behavior: "smooth", block: "start" });
          }
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
    <section id="trials" className="py-16 sm:py-20 lg:py-32 bg-brand-dark relative court-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WELCOME BANNER & OFFICIAL LEAGUE GUIDELINES */}
        <div className="bg-brand-dark/95 border-2 sm:border-4 border-brand-orange p-4 sm:p-10 mb-8 sm:mb-12 shadow-2xl space-y-5 sm:space-y-6 relative" id="register-form">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-brand-orange/40 pb-3 sm:pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 border border-brand-orange text-brand-orange font-display text-xs sm:text-sm tracking-wider uppercase">
              <ShieldCheck size={16} />
              OFFICIAL LEAGUE ANNOUNCEMENT
            </div>
            <span className="font-display text-sm sm:text-xl text-brand-yellow tracking-widest uppercase">
              THIRUVANANTHAPURAM
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-display text-brand-cream font-bold uppercase tracking-tight leading-none whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: "clamp(1.1rem, 4.5vw, 3.75rem)" }}>
              BLK BUDDIES LEAGUE – <span className="text-brand-orange">TRIVANDRUM</span>
            </h2>
            <p className="text-brand-yellow font-display text-base sm:text-2xl uppercase tracking-wide">
              {clubConfig.leagueInfo.welcomeText}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {clubConfig.leagueInfo.categories.map((cat) => (
              <div
                key={cat.id}
                className="p-3 sm:p-4 bg-brand-blue/20 border border-brand-blue/50 flex items-start gap-3"
              >
                <span className="text-xl sm:text-2xl shrink-0">🏀</span>
                <div>
                  <div className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold leading-tight">
                    {cat.name}
                  </div>
                  <div className="text-xs sm:text-sm text-brand-orange font-semibold mt-0.5">
                    {cat.cutoff}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Rules & Guidelines List */}
          <div className="p-3.5 sm:p-4 bg-brand-dark border border-brand-blue/30 space-y-2">
            <div className="flex items-center gap-2 text-brand-yellow font-display text-base sm:text-lg uppercase tracking-wider">
              <Info size={18} />
              Official Registration Rules
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-brand-cream/90 font-normal">
              {clubConfig.leagueInfo.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Fee Structure Summary Banner */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-orange/20 via-brand-yellow/10 to-brand-orange/20 border-2 border-brand-yellow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="font-display text-xl sm:text-2xl text-brand-yellow uppercase font-bold">
                REGISTRATION FEE
              </div>
              <div className="text-sm sm:text-base text-brand-cream font-semibold mt-0.5">
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
          <div className="bg-brand-dark border-4 border-brand-orange p-5 sm:p-12 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-orange/20 border-2 border-brand-orange text-brand-orange rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="font-display text-2xl sm:text-5xl text-brand-cream font-bold uppercase">
                  SCHOOL REGISTRATION CONFIRMED
                </h3>
                <p className="text-base sm:text-xl text-brand-yellow font-medium max-w-xl mx-auto">
                  {successData.message}
                </p>
              </div>

              {/* Reference Number Display Card */}
              <div className="max-w-md mx-auto p-4 sm:p-6 bg-brand-blue/20 border-2 border-brand-yellow space-y-2 sm:space-y-3">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                  OFFICIAL LEAGUE REGISTRATION REFERENCE
                </div>
                <div className="font-display text-3xl sm:text-5xl tracking-widest text-brand-orange font-bold break-all">
                  {successData.referenceNo}
                </div>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-cream hover:text-brand-yellow bg-brand-dark px-3 py-1.5 sm:px-4 sm:py-2 border border-brand-blue/40 hover:border-brand-yellow transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" /> Reference Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Reference Code
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left p-4 sm:p-6 bg-brand-dark/80 border border-brand-blue/30 max-w-3xl mx-auto">
                <div>
                  <span className="text-[11px] text-brand-cream/60 uppercase block font-semibold">School Name</span>
                  <span className="font-display text-base sm:text-lg text-brand-cream truncate block">{successData.schoolName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-brand-cream/60 uppercase block font-semibold">Representative</span>
                  <span className="font-display text-base sm:text-lg text-brand-yellow truncate block">{successData.repName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-brand-cream/60 uppercase block font-semibold">Registered Categories</span>
                  <span className="font-display text-base sm:text-lg text-brand-orange truncate block">{successData.registeredCategories.join(", ")}</span>
                </div>
                <div>
                  <span className="text-[11px] text-brand-cream/60 uppercase block font-semibold">Total Registration Fee</span>
                  <span className="font-display text-xl sm:text-2xl text-brand-yellow font-bold">₹{successData.totalFee.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p className="text-xs text-brand-cream/70 max-w-lg mx-auto">
                A confirmation summary has been sent to representative email <strong className="text-brand-cream">{successData.repEmail}</strong>. Our league committee will issue tournament match fixtures soon.
              </p>

              <div className="pt-2 sm:pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-secondary w-full sm:w-auto text-center"
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
            className="bg-brand-dark/95 border-2 border-brand-blue/40 p-4 sm:p-8 lg:p-10 shadow-2xl space-y-6 sm:space-y-10 relative"
            noValidate
          >
            {/* Corner Graphic Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-brand-orange/20 border-b border-l border-brand-orange pointer-events-none" />

            {/* General Banner Error */}
            {generalError && (
              <div className="p-3.5 sm:p-4 bg-red-950/80 border-2 border-red-500 text-red-200 flex items-start gap-3">
                <AlertTriangle size={22} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-lg sm:text-xl text-red-300 uppercase">Submission Error</h4>
                  <p className="text-xs sm:text-sm text-red-200/90">{generalError}</p>
                </div>
              </div>
            )}

            {/* SECTION 1: SCHOOL DETAILS */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <School className="text-brand-orange" size={22} />
                  <h3 className="font-display text-xl sm:text-2xl text-brand-yellow uppercase tracking-wide">
                    1. School Details
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs text-brand-cream/60 uppercase font-semibold">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* School Name */}
                <div className="space-y-1.5">
                  <label htmlFor="schoolName" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.schoolName ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.schoolName && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.schoolName[0]}
                    </p>
                  )}
                </div>

                {/* Syllabus Followed */}
                <div className="space-y-1.5">
                  <label htmlFor="syllabus" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Syllabus Followed in Your School <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    id="syllabus"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.syllabus ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  >
                    {clubConfig.syllabuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.syllabus && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.syllabus[0]}
                    </p>
                  )}
                </div>

                {formData.syllabus === "Other" && (
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="otherSyllabus" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
                      Specify Other Syllabus
                    </label>
                    <input
                      type="text"
                      id="otherSyllabus"
                      name="otherSyllabus"
                      value={formData.otherSyllabus}
                      onChange={handleChange}
                      placeholder="Specify your school syllabus"
                      className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none focus:border-brand-orange transition-colors min-h-[44px]"
                    />
                  </div>
                )}

                {/* School Email ID */}
                <div className="space-y-1.5">
                  <label htmlFor="schoolEmail" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.schoolEmail ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.schoolEmail && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.schoolEmail[0]}
                    </p>
                  )}
                </div>

                {/* School Contact Number */}
                <div className="space-y-1.5">
                  <label htmlFor="schoolPhone" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.schoolPhone ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.schoolPhone && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.schoolPhone[0]}
                    </p>
                  )}
                </div>

                {/* School Address */}
                <div className="md:col-span-2 space-y-1.5">
                  <label htmlFor="schoolAddress" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors ${
                      fieldErrors.schoolAddress ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.schoolAddress && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.schoolAddress[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: SCHOOL REPRESENTATIVE */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <UserCheck className="text-brand-orange" size={22} />
                  <h3 className="font-display text-xl sm:text-2xl text-brand-yellow uppercase tracking-wide">
                    2. School Representative
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs text-brand-cream/60 uppercase font-semibold">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Name of Representative */}
                <div className="space-y-1.5">
                  <label htmlFor="repName" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.repName ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.repName && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.repName[0]}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div className="space-y-1.5">
                  <label htmlFor="repDesignation" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
                    Designation <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    id="repDesignation"
                    name="repDesignation"
                    value={formData.repDesignation}
                    onChange={handleChange}
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.repDesignation ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  >
                    {clubConfig.designations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.repDesignation && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.repDesignation[0]}
                    </p>
                  )}
                </div>

                {formData.repDesignation === "Other" && (
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="otherDesignation" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
                      Specify Other Designation
                    </label>
                    <input
                      type="text"
                      id="otherDesignation"
                      name="otherDesignation"
                      value={formData.otherDesignation}
                      onChange={handleChange}
                      placeholder="Specify your designation"
                      className="w-full bg-brand-dark border-2 border-brand-blue/50 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none focus:border-brand-orange transition-colors min-h-[44px]"
                    />
                  </div>
                )}

                {/* Representative Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="repPhone" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.repPhone ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.repPhone && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.repPhone[0]}
                    </p>
                  )}
                </div>

                {/* Representative Email */}
                <div className="space-y-1.5">
                  <label htmlFor="repEmail" className="block text-xs sm:text-sm font-semibold text-brand-cream uppercase tracking-wider">
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
                    className={`w-full bg-brand-dark border-2 text-brand-cream px-3 py-2.5 sm:px-4 sm:py-3 text-base focus:outline-none transition-colors min-h-[44px] ${
                      fieldErrors.repEmail ? "border-red-500 bg-red-950/10 focus:border-red-400" : "border-brand-blue/50 focus:border-brand-orange"
                    }`}
                  />
                  {fieldErrors.repEmail && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.repEmail[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: TEAM CATEGORIES SELECTION & FEE CALCULATOR */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Users className="text-brand-orange" size={22} />
                  <h3 className="font-display text-xl sm:text-2xl text-brand-yellow uppercase tracking-wide">
                    3. Category Selection & Registration Fee
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs text-brand-cream/60 uppercase font-semibold">Step 3 of 4</span>
              </div>

              <p className="text-xs sm:text-sm text-brand-cream/80">
                Select the categories in which your school wishes to participate (1, 2, 3 or all 4 teams). Each selected team requires 10 players.
              </p>

              {fieldErrors.categorySelection && (
                <div className="p-3 bg-red-950/80 border border-red-500 text-xs text-red-200 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-red-400 shrink-0" />
                  <span>{fieldErrors.categorySelection[0]}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* U10 Boys Checkbox Card */}
                <label className={`p-3.5 sm:p-4 border-2 transition-all cursor-pointer block ${
                  formData.registerU10Boys ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30 hover:border-brand-blue/60"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold block leading-tight">
                        🏀 U10 Boys Division
                      </span>
                      <span className="text-[11px] sm:text-xs text-brand-orange font-semibold block mt-0.5">
                        Born on or after 01-01-2017
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        name="registerU10Boys"
                        checked={formData.registerU10Boys}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </div>
                  </div>
                </label>

                {/* U10 Girls Checkbox Card */}
                <label className={`p-3.5 sm:p-4 border-2 transition-all cursor-pointer block ${
                  formData.registerU10Girls ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30 hover:border-brand-blue/60"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold block leading-tight">
                        🏀 U10 Girls Division
                      </span>
                      <span className="text-[11px] sm:text-xs text-brand-orange font-semibold block mt-0.5">
                        Born on or after 01-01-2017
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        name="registerU10Girls"
                        checked={formData.registerU10Girls}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </div>
                  </div>
                </label>

                {/* U12 Boys Checkbox Card */}
                <label className={`p-3.5 sm:p-4 border-2 transition-all cursor-pointer block ${
                  formData.registerU12Boys ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30 hover:border-brand-blue/60"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold block leading-tight">
                        🏀 U12 Boys Division
                      </span>
                      <span className="text-[11px] sm:text-xs text-brand-orange font-semibold block mt-0.5">
                        Born on or after 01-01-2015
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        name="registerU12Boys"
                        checked={formData.registerU12Boys}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </div>
                  </div>
                </label>

                {/* U12 Girls Checkbox Card */}
                <label className={`p-3.5 sm:p-4 border-2 transition-all cursor-pointer block ${
                  formData.registerU12Girls ? "bg-brand-blue/20 border-brand-orange" : "bg-brand-dark border-brand-blue/30 hover:border-brand-blue/60"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold block leading-tight">
                        🏀 U12 Girls Division
                      </span>
                      <span className="text-[11px] sm:text-xs text-brand-orange font-semibold block mt-0.5">
                        Born on or after 01-01-2015
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        name="registerU12Girls"
                        checked={formData.registerU12Girls}
                        onChange={handleChange}
                        className="w-5 h-5 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-brand-yellow uppercase">Select</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* REAL-TIME REGISTRATION FEE SUMMARY CARD */}
              <div className="p-4 sm:p-6 bg-brand-dark border-2 border-brand-yellow space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5 border-b border-brand-yellow/40 pb-2.5">
                  <Calculator className="text-brand-yellow" size={20} />
                  <h4 className="font-display text-lg sm:text-xl text-brand-yellow uppercase font-bold">
                    Real-Time Fee Calculator
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center sm:text-left">
                  <div className="p-3 bg-brand-blue/20 border border-brand-blue/40">
                    <span className="text-[11px] uppercase text-brand-cream/70 block font-semibold">Registered Teams</span>
                    <span className="font-display text-2xl sm:text-3xl text-brand-orange">{teamCount} Team(s)</span>
                  </div>
                  <div className="p-3 bg-brand-blue/20 border border-brand-blue/40">
                    <span className="text-[11px] uppercase text-brand-cream/70 block font-semibold">Total Player Roster</span>
                    <span className="font-display text-2xl sm:text-3xl text-brand-cream">{teamCount * 10} Players</span>
                  </div>
                  <div className="p-3 bg-brand-orange/20 border border-brand-orange">
                    <span className="text-[11px] uppercase text-brand-cream/70 block font-semibold">Calculated Total Fee</span>
                    <span className="font-display text-2xl sm:text-3xl text-brand-yellow font-bold">
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
            <div className="space-y-6 sm:space-y-8">
              <div className="border-b-2 border-brand-orange pb-2 flex items-center justify-between">
                <h3 className="font-display text-xl sm:text-2xl text-brand-yellow uppercase tracking-wide">
                  4. Player Rosters (10 Players per Registered Team)
                </h3>
                <span className="text-[11px] sm:text-xs text-brand-cream/60 uppercase font-semibold">Step 4 of 4</span>
              </div>

              {teamCount === 0 && (
                <div className="p-4 bg-brand-blue/15 border border-brand-blue/40 text-center space-y-2">
                  <p className="text-sm text-brand-cream/80">
                    Please select at least one team category above to enter player rosters.
                  </p>
                </div>
              )}

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
              <label className="flex items-start gap-3 cursor-pointer select-none group p-3 sm:p-4 bg-brand-dark border border-brand-blue/30 hover:border-brand-blue/60 transition-colors">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 accent-brand-orange cursor-pointer shrink-0"
                />
                <span className="text-xs sm:text-sm text-brand-cream/90 font-normal leading-relaxed group-hover:text-brand-cream">
                  I confirm that I am an authorized representative of the school. All submitted student-player information is accurate and approved for BLK Buddies League participation. <span className="text-brand-orange font-bold">*</span>
                </span>
              </label>
              {fieldErrors.consent && (
                <p className="text-xs text-red-400 font-medium mt-1 pl-3 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="shrink-0" /> {fieldErrors.consent[0]}
                </p>
              )}
            </div>

            {/* Submit Button & Due Fee Bar */}
            <div className="pt-4 border-t border-brand-blue/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-brand-cream/80 font-semibold text-center sm:text-left">
                Registration Fee Due: <span className="text-brand-yellow font-display text-lg sm:text-xl">₹{teamFee.toLocaleString("en-IN")}</span> ({teamCount} Team(s))
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full sm:w-auto text-center flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                id="submit-school-registration"
              >
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin text-brand-cream" />
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

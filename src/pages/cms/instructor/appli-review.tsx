import * as React from "react"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

import {
  BadgeCheck,
  MapPin,
  Briefcase,
  Linkedin,
  Github,
  Globe,
  History,
  Brain,
  PlayCircle,
  FileText,
  ShieldCheck,
  MessageSquare,
  ChevronDown,
  Info,
  CheckCircle2,
  XCircle,
  Video,
  Download,
} from "lucide-react"

function GlassCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn("border-white/10 bg-white/[0.06] text-white backdrop-blur-md", className)}
    />
  )
}

type AdminComment = {
  id: string
  name: string
  role: string
  timeAgo: string
  avatar?: string
  content: string
}

export default function InstructorApplicantReview() {
  const [discussionNote, setDiscussionNote] = React.useState("")
  const [verdict, setVerdict] = React.useState("")

  const comments: AdminComment[] = [
    {
      id: "c1",
      name: "Marcus Chen",
      role: "Content Lead",
      timeAgo: "4h ago",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDd3Ad9e6CWfoBTuqhoLc5eEccjXuoQHzSwd14keHIXkhbhdJnm4Y-96QqhYKI76No-0AePYOJtBSCoS3RmLWmEx62jdSd_UQ0MeTLe4Go-vnWZ6jsfpv4SnxAnDR1aTrIXWvDRPKsFfuoYZKRqorHauG8lDXtnvOsazc6ai8m_vH5MRpCU4tHoRZH8KzIX8ycwQeI_FrscBAFXVDCRhCUTz8x0PEthK1wTFgWdIoWDynGBqlRR8oAPnwBhtMO_kptEITnPiwqQYw0",
      content:
        "The sample video content is exceptional. Her explanation of backpropagation is the clearest I've seen in years. We definitely need her for the Q3 AI Deep Dive series.",
    },
    {
      id: "c2",
      name: "Sarah Jenkins",
      role: "Product Manager",
      timeAgo: "1h ago",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfyxJxRf_JkX-LneC0GAQ9b_8p_MOz_LLxWEf95llttGf_N4x_Lf-QYKgCAig8QhM9wdU2trxfptY5OQDZG3E8ZJiHgp9Lfmfnjd0F5lRM0lZ1ohf7gtQ9F2yyDdB328xDf0_HlYMp7gc-hU_IfIUJGyn4By57TqiPskdqWGoq48hBP9hkWrAUhEZVnxTJp1gBkJTXnD1QYIZQYWV1O5BZ2C7e6yDGP-_5e29CyA0UIK5ttuBe8D6Quh2Gh9_AT1L1TsQaIaRFnw",
      content:
        "Agreed. I've checked her LinkedIn references and they all check out. My only concern is her availability for live sessions given her current research role. We should clarify this in the interview.",
    },
  ]

  return (
    <main className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8 p-8 bg-[#070A1A] text-white">
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Applicant Profile Header */}
        <GlassCard className="rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

          <div className="relative">
            <img
              alt="Applicant"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBapG1vupXevrVossVh2Gumhy7Vphtz9SFE-eRTe-1XomcqzKevZLEd4aC3dIuDam74FEc0-XIxpdOC_ABiUPl3FnVHaumBCQXqXnOgKuuKGOSuDxjwux1WfYm2GkFwaz6objkAEgaFcLMcHnYQZubheyhjjrTXLMBWDBjJIkNwlKmY6slxBtJmJr8DoTmt_H-x52OjSNE-BikmeQGKz6S7dXRFm6XZedi-1WviblUnh6vyft2d31vADzkqkbhciRDgFMqV_bwjgU0"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-lg flex items-center justify-center">
              <BadgeCheck className="h-4 w-4" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold">Dr. Elena Sterling</h2>
              <p className="text-primary font-medium tracking-wide mt-1 uppercase text-sm">
                Senior AI Research Scientist &amp; Lead Educator
              </p>

              <div className="flex items-center gap-4 mt-3 text-slate-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm">12 Years Experience</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <IconBtn ariaLabel="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </IconBtn>
              <IconBtn ariaLabel="GitHub">
                <Github className="h-5 w-5" />
              </IconBtn>
              <IconBtn ariaLabel="Website">
                <Globe className="h-5 w-5" />
              </IconBtn>
            </div>
          </div>
        </GlassCard>

        {/* Professional Background */}
        <GlassCard className="rounded-xl p-8 space-y-6">
          <SectionTitle icon={<History className="h-5 w-5" />} title="Professional Background" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Leading AI Researcher with over a decade of experience in Neural Networks and
                Transformer architectures. Previously a Lead Content Engineer at TechAcademy, where
                I developed the most popular "Generative AI Fundamentals" course which reached over
                45,000 students globally.
              </p>
              <p className="text-slate-400 text-sm italic">
                “My goal is to bridge the gap between complex mathematical theory and practical
                implementation for the next generation of AI engineers.”
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Key Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Neural Networks",
                  "PyTorch",
                  "NLP",
                  "LLM Fine-tuning",
                  "Vector DBs",
                  "RAG Systems",
                ].map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="bg-primary/10 border-primary/20 text-primary text-xs font-medium rounded-full px-3 py-1"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Teaching Philosophy */}
        <GlassCard className="rounded-xl p-8 space-y-6">
          <SectionTitle icon={<Brain className="h-5 w-5" />} title="Teaching Philosophy" />
          <div className="space-y-4 text-slate-300">
            <p>
              I believe in a 'Project-First' pedagogical approach. In the fast-moving world of tech
              and AI, theory alone is insufficient. Students must get their hands dirty with code
              from day one. My teaching style involves constructing complex systems step-by-step,
              ensuring no student is left behind while maintaining a rigorous academic standard.
            </p>

            <div className="bg-black/20 border border-white/10 p-4 rounded-lg flex items-start gap-4">
              <span className="text-primary/60 text-2xl leading-none">“</span>
              <p className="text-sm italic">
                Education is not the learning of facts, but the training of the mind to think. —
                My core motivation for joining the LMS platform is to create thinkers, not just
                coders.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Sample Content Preview */}
        <GlassCard className="rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <SectionTitle
              icon={<PlayCircle className="h-5 w-5" />}
              title="Sample Content Preview"
              noBottom
            />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">
              Lesson Demo: "Architecture of LLMs"
            </span>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden relative group cursor-pointer bg-black">
            <img
              alt="Video Placeholder"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr74x18mjU0plQKrGTrtUCZf3Oo2DpN9rgCLp0ZYA0bcQ0n5knc_e-12SKdLY-ZUOR5CNEJ6lO4xndL0Ofr7q9loD_eQKau2nBSfFOoqa37zDrpFrMTufLb82C1buXAI63UVWbH-C5ttlrSwPWFldxTWBFdnmjnDdtsr6WmE_QdocMgzlwANrmwGg1r-PzsZag5bei6W95jHjA_3jTHQjh5UPoIEDNeSEyI3AsSW9teGYJnj8S1dp3YF2W8fcTVrs9HEGhA0C7Qgc"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.35)] group-hover:scale-110 transition-all">
                <PlayCircle className="h-10 w-10" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
              <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3" />
              </div>
              <span className="text-xs font-mono text-white">08:24 / 24:15</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileRow
              icon={<FileText className="h-5 w-5" />}
              title="Curriculum_Vitae_Sterling.pdf"
              meta="2.4 MB • PDF Document"
            />
            <FileRow
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Certifications_Portfolio.zip"
              meta="15.8 MB • Compressed Archive"
            />
          </div>
        </GlassCard>

        {/* Admin Discussion */}
        <GlassCard className="rounded-xl p-8 space-y-6">
          <SectionTitle icon={<MessageSquare className="h-5 w-5" />} title="Admin Discussion" />

          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-4">
                <img
                  alt={c.name}
                  className="w-10 h-10 rounded-lg object-cover"
                  src={c.avatar}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-300">
                      {c.name}
                      <span className="text-xs text-slate-500 font-normal ml-2">
                        {c.role} • {c.timeAgo}
                      </span>
                    </span>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-sm text-slate-300">{c.content}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                {/* <PlusMessage className="h-5 w-5 text-primary" /> */}
              </div>
              <div className="flex-1">
                <Textarea
                  value={discussionNote}
                  onChange={(e) => setDiscussionNote(e.target.value)}
                  className="w-full bg-black/20 border-white/10 text-slate-200 focus-visible:ring-primary placeholder:text-slate-600 p-4"
                  placeholder="Add internal note..."
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    className="bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold rounded"
                    onClick={() => console.log("POST COMMENT", discussionNote)}
                  >
                    POST COMMENT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* RIGHT */}
      <div className="col-span-12 lg:col-span-4">
        <div className="sticky top-24 space-y-6">
          {/* Decision Panel */}
          <GlassCard className="rounded-xl overflow-hidden border-primary/20">
            <div className="p-6 bg-primary/10 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Review Status
              </span>

              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase">Pending</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Assigned */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Assigned Reviewer
                </label>

                <div className="flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-lg cursor-pointer hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Reviewer"
                      className="w-8 h-8 rounded-full border border-primary/40"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwnmQzXVGFFh8wlOrALZdhfnyArFPVVtKEA316F3E3t2f8gwVp6BI-Kl_AFH7eC19jJFm4u2Sv2cnkdw8myXBeSWKlD_zpo64rxCUBiPuwIjXezrAn9_J3tXoMmng-dnpTss22h1mEAqM_5HyIe8N7ub45q6RrVbCVv2IR5ZSMsDKpYSE_SG_DQEUkMaP9uDTNLuOR8ne_YUG5XzlCu6CrJK1zYl0EcyeeAQlCHRPKUAqYYUSukg26QkH1FoQtmOQz5dkJ2dr-hhQ"
                    />
                    <span className="text-sm font-medium">Chief Admin (You)</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
              </div>

              {/* Rating scales */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Internal Evaluation
                </label>

                <RatingRow label="Presentation Skill" value={4.8} />
                <RatingRow label="Subject Expertise" value={5.0} />
                <RatingRow label="Content Quality" value={4.2} />
              </div>

              {/* Verdict */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Internal Verdict
                </label>
                <Textarea
                  value={verdict}
                  onChange={(e) => setVerdict(e.target.value)}
                  className="w-full bg-black/20 border-white/10 text-slate-200 focus-visible:ring-primary placeholder:text-slate-600 p-4"
                  placeholder="Briefly justify your decision..."
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-lg shadow-[0_0_40px_rgba(59,130,246,0.25)]"
                  onClick={() => console.log("APPROVE")}
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  APPROVE APPLICATION
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/10 hover:bg-white/5 text-slate-200 py-6"
                    onClick={() => console.log("REJECT")}
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    REJECT
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-transparent border-white/10 hover:bg-white/5 text-slate-200 py-6"
                    onClick={() => console.log("INTERVIEW")}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    INTERVIEW
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Next Steps */}
          <GlassCard className="p-6 rounded-xl space-y-4 border-dashed">
            <div className="flex items-center gap-3 text-slate-400">
              <Info className="h-4 w-4" />
              <p className="text-[11px] uppercase tracking-widest font-bold">
                Post-Approval Workflow
              </p>
            </div>
            <ul className="space-y-2">
              {[
                "Onboarding email automation",
                "Contract generation (Docusign)",
                "LMS Course Builder access",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

function IconBtn({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-all"
      onClick={() => console.log(ariaLabel)}
    >
      {children}
    </button>
  )
}

function SectionTitle({
  icon,
  title,
  noBottom,
}: {
  icon: React.ReactNode
  title: string
  noBottom?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-3", !noBottom && "mb-0")}>
      <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  )
}

function FileRow({
  icon,
  title,
  meta,
}: {
  icon: React.ReactNode
  title: string
  meta: string
}) {
  return (
    <div className="p-4 bg-black/20 border border-white/10 rounded-lg flex items-center justify-between group hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-slate-400 group-hover:text-primary transition-colors">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-slate-500">{meta}</p>
        </div>
      </div>
      <button
        type="button"
        className="text-slate-500 hover:text-white"
        onClick={() => console.log("download", title)}
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  )
}

function RatingRow({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-primary">{value.toFixed(1)} / 5.0</span>
      </div>

      <div className="relative">
        <Progress value={pct} className="h-2 bg-white/10" />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-primary shadow-lg"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
    </div>
  )
}

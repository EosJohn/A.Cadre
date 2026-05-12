import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function ZoningSystemPage() {
  // Array ng mga screenshots 
  const systemScreenshots = [
    { src: "/zoning/Dashboard.png", title: "Main Dashboard", desc: "The command center of the system providing real-time overview of pending applications and municipal zoning statistics." },
    { src: "/zoning/ApplicationForm.png", title: "Smart Application Form", desc: "A streamlined data entry interface with built-in validation to ensure all permit requirements are captured accurately." },
    { src: "/zoning/ZoningRegistry.png", title: "Zoning Registry", desc: "A centralized database management view for tracking historical records and current zoning land-use status." },
    { src: "/zoning/ZoningAssessment.png", title: "Technical Assessment", desc: "The logic-heavy module where staff evaluate applications against municipal land-use regulations." },
    { src: "/zoning/Payment.png", title: "Payment Processing", desc: "The final step in the workflow, managing fee assessments and transaction records for issued permits." },
  ];

  return (
    <div className="bg-brand-canvas min-h-screen font-sans selection:bg-teal-400 selection:text-brand-canvas text-brand-body flex flex-col relative z-50">
      
      {/* TOP NAV */}
      <nav className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8 relative z-10">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors font-mono text-sm group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </Link>
      </nav>

      {/* HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold text-brand-heading tracking-tight`}>
            Zoning System
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Municipal Planning and Development Office</p>
        </div>
        
        <p className="text-xl text-brand-body/80 leading-relaxed max-w-3xl mt-8 mb-10">
          A C#-powered internal management system designed to digitalize municipal zoning boundaries and streamline the building permit approval workflow from application to payment.
        </p>

        <div className="flex flex-wrap gap-3">
          {["C#", "Visual Studio 2022", ".NET Core", "SQL Server", "System Architecture"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* SYSTEM WALKTHROUGH SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-24 relative z-10">
        
        {/* Intro text */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-700/50 pt-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold text-brand-heading`}>The Digital Transformation</h2>
            <p className="text-lg leading-relaxed">
              Manual zoning assessments often lead to long wait times and data silos. I engineered this system to act as a "Single Source of Truth," automating the validation of building permits against municipal land-use ordinances.
            </p>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Core Features</h3>
            <ul className="space-y-2 text-sm text-brand-body/90">
              <li>• Automated Assessment Logic</li>
              <li>• Relational Record Tracking</li>
              <li>• Secure Transaction Logging</li>
              <li>• AI-Assisted Code Quality</li>
            </ul>
          </div>
        </div>

        {/* GALLERY WALKTHROUGH */}
        <div className="space-y-32">
          {systemScreenshots.map((item, index) => (
            <div key={index} className="space-y-8 group">
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-700/50 pb-4">
                <h3 className={`${outfit.className} text-2xl font-bold text-brand-heading group-hover:text-teal-400 transition-colors`}>
                  <span className="text-teal-400/50 font-mono text-lg mr-3">0{index + 1}.</span> 
                  {item.title}
                </h3>
                <p className="max-w-md text-brand-body/70 text-right">{item.desc}</p>
              </div>
              
              <div className="w-full bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-700/50 py-12 text-center mt-auto bg-brand-canvas relative z-20">
        <p className="text-brand-body/50 text-sm font-mono">
          System Architecture & Development by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
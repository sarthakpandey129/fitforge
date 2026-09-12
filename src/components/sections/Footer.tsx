import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="pt-20 pb-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80 mb-4">
              FITFORGE
            </h3>
            <p className="text-sm font-medium text-white/25">
              Your body is a system. Train it like one.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mb-6">
              PRODUCT
            </h4>
            <div className="flex flex-col gap-3">
              {["Features", "Pricing", "Method", "Roadmap"].map((link) => (
                <Link key={link} href="#" className="text-sm font-medium text-white/30 hover:text-white/70 transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mb-6">
              COMPANY
            </h4>
            <div className="flex flex-col gap-3">
              {["About", "Blog", "Careers", "Contact"].map((link) => (
                <Link key={link} href="#" className="text-sm font-medium text-white/30 hover:text-white/70 transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mb-6">
              LEGAL
            </h4>
            <div className="flex flex-col gap-3">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <Link key={link} href="#" className="text-sm font-medium text-white/30 hover:text-white/70 transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/15">
            © 2026 FITFORGE. All rights reserved.
          </p>
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/10">
            Built with obsession.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="inline-block h-5 w-5 rounded-sm bg-foreground" />
            Laptopia
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Editorial laptop reviews, comparisons, and rankings — for creators, gamers, students, and professionals.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Discover</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/laptops" className="text-foreground hover:text-muted-foreground">All laptops</Link></li>
            <li><Link to="/top-lists" className="text-foreground hover:text-muted-foreground">Top lists</Link></li>
            <li><Link to="/compare" className="text-foreground hover:text-muted-foreground">Compare</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-foreground hover:text-muted-foreground">About</Link></li>
            <li><Link to="/contact" className="text-foreground hover:text-muted-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="text-foreground hover:text-muted-foreground">Privacy</a></li>
            <li><a href="#" className="text-foreground hover:text-muted-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Laptopia. All rights reserved.</span>
          <span>Built for laptop enthusiasts.</span>
        </div>
      </div>
    </footer>
  );
}
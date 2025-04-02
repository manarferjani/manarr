import { Separator } from "@/app/components/ui/separator";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { ModeToggle } from "@/app/components/ui/mode-toggle";
import { ThemeSelector } from "./theme-selector";

export function SiteHeader() {
  return (
    <header 
      className="sticky top-0 z-40 flex h-[var(--header-height)] shrink-0 items-center" 
      style={{
        backgroundColor: "var(--background)",
        borderBottom: "1px solid var(--border)"
      }}
    >
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-2" />
          <Separator
            orientation="vertical"
            className="h-4 mx-2 hidden md:block"
          />
          <h1 className="text-lg font-semibold">Orcish Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

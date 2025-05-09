import { Search, Users } from "lucide-react";

export default function AgentSelectionHeader() {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-purple-600/10 rounded-lg" />
      <div className="relative p-6 sm:p-8 backdrop-blur-sm rounded-lg border shadow-sm">
        <div className="flex items-center gap-3 text-finance-blue mb-3">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Investment Agent Lab</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          Select virtual investment agents modeled after legendary investors. Each agent applies unique 
          strategies and filters to generate stock ideas and portfolio suggestions.
        </p>
      </div>
    </div>
  );
}

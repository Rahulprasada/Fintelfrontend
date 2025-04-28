import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Star } from "lucide-react";
import { Agent } from "./Agent";
import cardBackground from "../../asset/cardbackground.jpg";

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AgentCard({
  agent,
  isSelected,
  onSelect,
}: AgentCardProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Card
        className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
          isSelected ? "ring-2 ring-primary shadow-lg" : ""
        }`}
        style={{
          backgroundImage: `url(${cardBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                <img
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  className="h-full w-full object-cover rounded-full border-2 border-background"
                />
                {isSelected && (
                  <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center ring-2 ring-background">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {agent.name}
                  {agent.historicalAlpha && (
                    <span className="flex items-center text-sm font-normal text-amber-500">
                      <Star className="h-4 w-4 inline mr-1 fill-current" />
                      {agent.historicalAlpha}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{agent.style}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground pb-2">
          <p className="line-clamp-2">{agent.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(true);
            }}
            //   className="hover:bg-blue-50 text-blue-700"
          >
            View Profile
          </Button>
          <Button
            variant={isSelected ? "secondary" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={
              isSelected ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
            }
          >
            {isSelected ? "Selected" : "Select Agent"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full opacity-20" />
                <img
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  className="h-full w-full object-cover rounded-full border-2 border-background"
                />
              </div>
              <div>
                <DialogTitle>{agent.name}</DialogTitle>
                <DialogDescription>{agent.style}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Bio</h4>
              <p className="text-sm text-muted-foreground">{agent.bio}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Key Rules</h4>
              <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                {agent.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Holding Period</h4>
                <p className="text-sm text-muted-foreground">
                  {agent.holdingPeriod}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Historical Alpha</h4>
                <p className="text-sm text-muted-foreground">
                  {agent.historicalAlpha}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Strengths</h4>
                <ul className="text-sm list-disc pl-5 text-muted-foreground">
                  {agent.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Weaknesses</h4>
                <ul className="text-sm list-disc pl-5 text-muted-foreground">
                  {agent.weaknesses.map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => {
              onSelect();
              setShowProfile(false);
            }}
          >
            {isSelected ? "Deselect Agent" : "Select Agent"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

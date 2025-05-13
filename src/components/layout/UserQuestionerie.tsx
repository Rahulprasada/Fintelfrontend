import { useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle, Calendar, Mail, User, Pen, Phone, CircleDollarSign, Shield, TrendingUp, Check } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface UserQuestionnaireProps {
  onClose: () => void;
}

type LifeGoal = 
  | "Wealth Building"
  | "Retirement Planning" 
  | "Kids Education" 
  | "Property Purchase"
  | "Car Purchase"
  | "Other Assets accumulation"
  | "Secondary Source of Income generation"
  | "Class up"
  | "Other";

type InvestmentChannel = 
  | "Fixed Deposits"
  | "Gold"
  | "Shares"
  | "Mutual Funds"
  | "New Age investments"
  | "Any Crypto currencies"
  | "Bitcoiner"
  | "Private Equity investments"
  | "Start up funding"
  | "Real Estates"
  | "Private lending"
  | "Other";

type Document = 
  | "PAN card"
  | "Bank Account"
  | "Cancelled Cheque"
  | "Bank Passbook";

interface FormData {
  fullName: string;
  email: string;
  investmentEmail: string;
  panNumber: string;
  mobileNumber: string;
  dateOfBirth: Date | undefined;
  lifeGoals: LifeGoal[];
  otherLifeGoal?: string;
  riskLevel: string;
  netWorth: string;
  wealthTarget: string;
  timeFrame: string;
  healthInsurance: "Yes" | "No";
  termInsurance: "Yes" | "No";
  documents: Document[];
  retirementAge: string;
  investmentChannels: InvestmentChannel[];
  otherInvestmentChannel?: string;
  goodReturns: string;
  monthlyInvestment: string;
  lumpsumInvestment: string;
  stockMarketKnowledge: string;
}

export function UserQuestionnaire({ onClose }: UserQuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otherLifeGoal, setOtherLifeGoal] = useState("");
  const [otherInvestmentChannel, setOtherInvestmentChannel] = useState("");
  
  const form = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      investmentEmail: "",
      panNumber: "",
      mobileNumber: "",
      dateOfBirth: undefined,
      lifeGoals: [],
      riskLevel: "5",
      netWorth: "",
      wealthTarget: "",
      timeFrame: "",
      healthInsurance: "No",
      termInsurance: "No",
      documents: [],
      retirementAge: "",
      investmentChannels: [],
      goodReturns: "",
      monthlyInvestment: "",
      lumpsumInvestment: "",
      stockMarketKnowledge: "5"
    }
  });

  const lifeGoalOptions: LifeGoal[] = [
    "Wealth Building",
    "Retirement Planning",
    "Kids Education", 
    "Property Purchase",
    "Car Purchase",
    "Other Assets accumulation",
    "Secondary Source of Income generation",
    "Class up",
    "Other"
  ];

  const investmentChannelOptions: InvestmentChannel[] = [
    "Fixed Deposits",
    "Gold",
    "Shares",
    "Mutual Funds",
    "New Age investments",
    "Any Crypto currencies",
    "Bitcoiner",
    "Private Equity investments",
    "Start up funding",
    "Real Estates",
    "Private lending",
    "Other"
  ];

  const documentOptions: Document[] = [
    "PAN card",
    "Bank Account",
    "Cancelled Cheque",
    "Bank Passbook"
  ];

  const handleSubmit = async (data: FormData) => {
    if (!data.fullName || !data.email || !data.panNumber || !data.mobileNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Include other fields in data if they're set
      if (otherLifeGoal) {
        data.otherLifeGoal = otherLifeGoal;
      }
      
      if (otherInvestmentChannel) {
        data.otherInvestmentChannel = otherInvestmentChannel;
      }

      // Mock API call - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form data submitted:", data);
      
      setIsSubmitted(true);
      toast.success("Financial questionnaire submitted successfully");
      
      // Reset after 2 seconds and close
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit questionnaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[70vh] overflow-y-auto p-4 md:p-6">
      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:space-y-6">
            <DialogHeader className="text-center sm:text-left">
                <div className="p-4 bg-slate-50">
              <DialogTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-finance-blue to-finance-indigo bg-clip-text ">
                Path to Wealth - Financial Planning Questionnaire
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Complete this questionnaire to help us create your personalized financial plan.
              </DialogDescription>
              </div>
            </DialogHeader>

            <div className="space-y-4 md:space-y-6">
              {/* Personal Information Section */}
              <div className="bg-gray-100 p-3 md:p-4 rounded-md border">
                <h3 className="font-bold text-base sm:text-lg mb-2 md:mb-3 text-finance-blue">Personal Information</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-finance-blue" />
                        <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium">
                          Full Name (as in PAN card) <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="fullName"
                        required
                        placeholder="Enter your full name"
                        className="text-sm"
                        {...form.register("fullName")}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Pen size={16} className="text-finance-blue" />
                        <Label htmlFor="panNumber" className="text-xs sm:text-sm font-medium">
                          PAN Number <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="panNumber"
                        required
                        placeholder="Enter your PAN number"
                        className="text-sm"
                        {...form.register("panNumber")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-finance-blue" />
                        <Label htmlFor="mobileNumber" className="text-xs sm:text-sm font-medium">
                          Mobile Number <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="mobileNumber"
                        required
                        placeholder="10 digit number (e.g. 9944453333)"
                        className="text-sm"
                        {...form.register("mobileNumber")}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-finance-blue" />
                        <Label htmlFor="dateOfBirth" className="text-xs sm:text-sm font-medium">
                          Date of Birth (as in PAN card) <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <DatePicker 
                        date={form.getValues("dateOfBirth")}
                        setDate={(date) => form.setValue("dateOfBirth", date)}
                        placeholder="Select your date of birth"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-finance-blue" />
                        <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="text-sm"
                        {...form.register("email")}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <Mail size={16} className="text-finance-blue" />
                        <Label htmlFor="investmentEmail" className="text-xs sm:text-sm font-medium whitespace-normal">
                          Investment Email <span className="text-red-500">*</span>
                          <span className="block text-xs font-normal mt-1">
                            (Email used in existing investments)
                          </span>
                        </Label>
                      </div>
                      <Input
                        id="investmentEmail"
                        type="email"
                        required
                        placeholder="Enter your investment email"
                        className="text-sm"
                        {...form.register("investmentEmail")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Goals Section */}
              <div className="bg-gray-100 p-3 md:p-4 rounded-md border">
                <h3 className="font-bold text-base sm:text-lg mb-2 md:mb-3 text-finance-blue">Financial Goals</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">
                      Please provide your Life Goals <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid gap-2 grid-cols-1 xs:grid-cols-2">
                      {lifeGoalOptions.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${goal}`}
                            onCheckedChange={(checked) => {
                              const currentGoals = form.getValues("lifeGoals");
                              if (checked) {
                                form.setValue("lifeGoals", [...currentGoals, goal]);
                              } else {
                                form.setValue("lifeGoals", currentGoals.filter(g => g !== goal));
                              }
                            }}
                          />
                          <Label htmlFor={`goal-${goal}`} className="text-xs sm:text-sm">
                            {goal}
                          </Label>
                          {goal === "Other" && (
                            <Input 
                              placeholder="Please specify"
                              value={otherLifeGoal}
                              onChange={(e) => setOtherLifeGoal(e.target.value)}
                              className="ml-2 w-28 sm:w-40 text-xs sm:text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">
                      Risk Levels <span className="text-red-500">*</span>
                      <span className="block text-xs font-normal mt-1">
                        (If you are given choice to risk your capital, to increase your profit)
                      </span>
                    </Label>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Low risk</span>
                          <span>High risk</span>
                        </div>
                        <div className="pt-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            className="w-full accent-finance-blue"
                            value={form.getValues("riskLevel")}
                            onChange={(e) => form.setValue("riskLevel", e.target.value)}
                          />
                          <div className="flex justify-between text-xs mt-1">
                            {Array.from({length: 10}, (_, i) => (
                              <span key={i+1}>{i+1}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <CircleDollarSign size={16} className="text-finance-blue" />
                        <Label htmlFor="netWorth" className="text-xs sm:text-sm font-medium">
                          Current Net worth in INR
                          <span className="block text-xs font-normal mt-1">
                            (Assets - Liabilities)
                          </span>
                        </Label>
                      </div>
                      <Input
                        id="netWorth"
                        placeholder="Enter your net worth"
                        className="text-sm"
                        {...form.register("netWorth")}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp size={16} className="text-finance-blue" />
                        <Label htmlFor="wealthTarget" className="text-xs sm:text-sm font-medium">
                          Planned wealth target in INR
                          <span className="block text-xs font-normal mt-1">
                            (e.g. 5 Cr, 10 Cr, 100 Cr)
                          </span>
                        </Label>
                      </div>
                      <Input
                        id="wealthTarget"
                        placeholder="Enter your wealth target"
                        className="text-sm"
                        {...form.register("wealthTarget")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="timeFrame" className="text-xs sm:text-sm font-medium">
                        Time frame for investment? <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        onValueChange={(value) => form.setValue("timeFrame", value)}
                        defaultValue={form.getValues("timeFrame")}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select time frame" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3 years">1-3 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="5-10 years">5-10 years</SelectItem>
                          <SelectItem value="10-20 years">10-20 years</SelectItem>
                          <SelectItem value="20+ years">20+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="retirementAge" className="text-xs sm:text-sm font-medium">
                        Planned retirement age? <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="retirementAge"
                        required
                        placeholder="Enter retirement age"
                        className="text-sm"
                        {...form.register("retirementAge")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance & Documentation */}
              <div className="bg-gray-100 p-3 md:p-4 rounded-md border">
                <h3 className="font-bold text-base sm:text-lg mb-2 md:mb-3 text-finance-blue">Insurance & Documentation</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium flex items-start space-x-2">
                      <Shield size={16} className="text-finance-blue mt-1 flex-shrink-0" />
                      <span>Are you sufficiently insured for healthcare for you and your dependents? <span className="text-red-500">*</span></span>
                    </Label>
                    <RadioGroup 
                      defaultValue={form.getValues("healthInsurance")} 
                      className="flex space-x-4"
                      onValueChange={(value) => form.setValue("healthInsurance", value as "Yes" | "No")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="health-yes" />
                        <Label htmlFor="health-yes" className="text-xs sm:text-sm">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="health-no" />
                        <Label htmlFor="health-no" className="text-xs sm:text-sm">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium flex items-start space-x-2">
                      <Shield size={16} className="text-finance-blue mt-1 flex-shrink-0" />
                      <span>Do you have term insurance covering your potential lifetime earning as sum assured? <span className="text-red-500">*</span></span>
                    </Label>
                    <RadioGroup 
                      defaultValue={form.getValues("termInsurance")} 
                      className="flex space-x-4"
                      onValueChange={(value) => form.setValue("termInsurance", value as "Yes" | "No")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="term-yes" />
                        <Label htmlFor="term-yes" className="text-xs sm:text-sm">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="term-no" />
                        <Label htmlFor="term-no" className="text-xs sm:text-sm">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">
                      Do you have the following documents? <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid gap-2 grid-cols-1 xs:grid-cols-2">
                      {documentOptions.map((doc) => (
                        <div key={doc} className="flex items-center space-x-2">
                          <Checkbox
                            id={`doc-${doc}`}
                            onCheckedChange={(checked) => {
                              const currentDocs = form.getValues("documents");
                              if (checked) {
                                form.setValue("documents", [...currentDocs, doc]);
                              } else {
                                form.setValue("documents", currentDocs.filter(d => d !== doc));
                              }
                            }}
                          />
                          <Label htmlFor={`doc-${doc}`} className="text-xs sm:text-sm">
                            {doc === "Bank Account" ? "Bank Account (Savings/NRO/NRE)" : 
                             doc === "Cancelled Cheque" ? "Cancelled Cheque leaf" : 
                             doc === "Bank Passbook" ? "Bank Passbook/Statement" : doc}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Profile */}
              <div className="bg-gray-100 p-3 md:p-4 rounded-md border">
                <h3 className="font-bold text-base sm:text-lg mb-2 md:mb-3 text-finance-blue">Investment Profile</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">
                      What are your current investment channels? <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid gap-2 grid-cols-1 xs:grid-cols-2">
                      {investmentChannelOptions.map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Checkbox
                            id={`channel-${channel}`}
                            onCheckedChange={(checked) => {
                              const currentChannels = form.getValues("investmentChannels");
                              if (checked) {
                                form.setValue("investmentChannels", [...currentChannels, channel]);
                              } else {
                                form.setValue("investmentChannels", currentChannels.filter(c => c !== channel));
                              }
                            }}
                          />
                          <Label htmlFor={`channel-${channel}`} className="text-xs sm:text-sm">
                            {channel}
                          </Label>
                          {channel === "Other" && (
                            <Input 
                              placeholder="Please specify"
                              value={otherInvestmentChannel}
                              onChange={(e) => setOtherInvestmentChannel(e.target.value)}
                              className="ml-2 w-28 sm:w-40 text-xs sm:text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="goodReturns" className="text-xs sm:text-sm font-medium">
                        What do you think is a good annual return for investments in India?
                      </Label>
                      <Input
                        id="goodReturns"
                        placeholder="e.g. 12%"
                        className="text-sm"
                        {...form.register("goodReturns")}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="monthlyInvestment" className="text-xs sm:text-sm font-medium">
                        What is your planned investment amount per month?
                      </Label>
                      <Input
                        id="monthlyInvestment"
                        placeholder="Enter monthly amount"
                        className="text-sm"
                        {...form.register("monthlyInvestment")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="lumpsumInvestment" className="text-xs sm:text-sm font-medium">
                      What is the lumpsum amount you plan to invest now? <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lumpsumInvestment"
                      required
                      placeholder="Enter lumpsum amount"
                      className="text-sm"
                      {...form.register("lumpsumInvestment")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">
                      What is your knowledge about investing in stock markets? <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Beginner</span>
                          <span>Expert</span>
                        </div>
                        <div className="pt-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            className="w-full accent-finance-blue"
                            value={form.getValues("stockMarketKnowledge")}
                            onChange={(e) => form.setValue("stockMarketKnowledge", e.target.value)}
                          />
                          <div className="flex justify-between text-xs mt-1">
                            {Array.from({length: 10}, (_, i) => (
                              <span key={i+1}>{i+1}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                
            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-finance-blue hover:bg-finance-blue/80 w-full sm:w-auto order-1 sm:order-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      ) : (
        <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center px-4">
          <div className="rounded-full bg-green-50 p-3 mb-4">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
          </div>
          <h3 className="text-base sm:text-lg font-medium mb-2">Thank you for your financial planning information!</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your input is valuable and will help us create a personalized financial plan for you.
          </p>
        </div>
      )}
    </DialogContent>
  );
}
export default UserQuestionnaire;
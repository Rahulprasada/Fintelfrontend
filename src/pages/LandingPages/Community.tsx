
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Video, FileText, MessageSquare, PieChart, LucideIcon } from "lucide-react";

// Component for upcoming events
const EventCard = ({ 
  title, 
  date, 
  time, 
  speaker, 
  role, 
  company,
  isExclusive = false
}: { 
  title: string; 
  date: string; 
  time: string; 
  speaker: string; 
  role: string; 
  company: string;
  isExclusive?: boolean;
}) => (
  <Card className="bg-white dark:bg-finance-gray shadow-md hover:shadow-lg transition-all">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            {isExclusive && (
              <span className="bg-finance-gold/90 text-white text-xs font-bold py-1 px-2 rounded">
                EXCLUSIVE
              </span>
            )}
            <span className="text-sm text-finance-blue dark:text-blue-300">
              {date} • {time}
            </span>
          </div>
          <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-2">{title}</h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`} 
                alt={speaker} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{speaker}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex md:justify-end items-end">
          <Button size="sm" className="bg-finance-blue hover:bg-finance-accent text-white w-full md:w-auto">
            Register
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Component for resources
const ResourceCard = ({ 
  title, 
  type, 
  date, 
  description,
  icon: Icon,
  isPremium = false
}: { 
  title: string; 
  type: string; 
  date: string; 
  description: string;
  icon: LucideIcon;
  isPremium?: boolean;
}) => (
  <Card className="bg-white dark:bg-finance-gray shadow-md hover:shadow-lg transition-all">
    <CardContent className="p-6">
      <div className="flex gap-4">
        <div className="bg-finance-blue/10 dark:bg-blue-900/30 p-2 rounded-md text-finance-blue dark:text-blue-400 h-min">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">{type}</span>
            <span className="h-1 w-1 rounded-full bg-gray-400"></span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
            {isPremium && (
              <span className="bg-finance-gold/90 text-white text-xs font-bold py-0.5 px-1.5 rounded ml-auto">
                PREMIUM
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-finance-blue dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
          
          <Button variant="outline" size="sm" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10 dark:border-blue-300 dark:text-blue-300">
            View Resource
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-finance-blue py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 bg-white/10 p-3 rounded-xl">
                <Users className="h-10 w-10 text-blue-300" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Exclusive Investor Community & Thought Leadership
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Join a network of institutional investors, portfolio managers, and financial leaders to share insights and strategies.
              </p>
              <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                Apply for Membership
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-2">
                    Upcoming Events
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Exclusive webinars, roundtables, and strategy sessions with industry leaders.
                  </p>
                </div>
                <Button variant="outline" className="mt-4 md:mt-0 border-finance-blue text-finance-blue hover:bg-finance-blue/10 dark:border-blue-300 dark:text-blue-300">
                  View All Events
                </Button>
              </div>
              
              <div className="space-y-6">
                <EventCard 
                  title="Quarterly Macro Outlook: Navigating Inflation and Monetary Policy"
                  date="Jun 15, 2023"
                  time="11:00 AM EST"
                  speaker="Dr. Michael Stevens"
                  role="Chief Economist"
                  company="Global Investment Partners"
                  isExclusive={true}
                />
                
                <EventCard 
                  title="Disruptive Technologies: Investment Opportunities in AI and Quantum Computing"
                  date="Jun 22, 2023"
                  time="2:00 PM EST"
                  speaker="Sarah Chen"
                  role="Managing Partner"
                  company="Alpha Ventures"
                />
                
                <EventCard 
                  title="Private Investment Roundtable: Alternative Assets in a Rising Rate Environment"
                  date="Jun 28, 2023"
                  time="10:00 AM EST"
                  speaker="Robert Williams"
                  role="CIO"
                  company="Fortress Capital"
                  isExclusive={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="py-16 bg-gray-50 dark:bg-finance-gray/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Member Benefits
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our exclusive community brings together institutional investors, portfolio managers, and financial leaders.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Strategy Calls & Market Webinars",
                    description: "Monthly insights from leading CIOs, hedge fund managers, and portfolio strategists on market trends and investment opportunities.",
                    icon: <Video className="h-12 w-12 text-finance-blue dark:text-blue-400" />
                  },
                  {
                    title: "Quarterly Macro & Earnings Forecasts",
                    description: "Institutional-level research and investment outlooks with detailed economic projections and sector-specific earnings estimates.",
                    icon: <PieChart className="h-12 w-12 text-finance-green dark:text-green-400" />
                  },
                  {
                    title: "Private Investment Roundtables",
                    description: "Exclusive networking with top institutional investors, offering high-value connections and collaborative investment discussions.",
                    icon: <Users className="h-12 w-12 text-finance-accent dark:text-purple-400" />
                  },
                  {
                    title: "Early Access to Research",
                    description: "Get premium research reports and investment ideas before they're released to the broader market.",
                    icon: <FileText className="h-12 w-12 text-finance-blue dark:text-blue-400" />
                  },
                  {
                    title: "Member Forums & Discussion Boards",
                    description: "Participate in private discussion boards to share insights, ask questions, and collaborate with fellow members.",
                    icon: <MessageSquare className="h-12 w-12 text-finance-green dark:text-green-400" />
                  },
                  {
                    title: "VIP Access to Conferences",
                    description: "Priority access and special discounts to major financial conferences and industry events.",
                    icon: <Calendar className="h-12 w-12 text-finance-accent dark:text-purple-400" />
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-finance-gray rounded-xl p-6 shadow-md">
                    <div className="flex justify-center mb-4">
                      <div className="bg-finance-blue/10 dark:bg-blue-900/30 p-3 rounded-full">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-3 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-2">
                    Member Resources
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access exclusive research, recordings, and analysis from past events.
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <Tabs defaultValue="webinars" className="w-full">
                  <TabsList className="bg-white dark:bg-finance-gray mb-6">
                    <TabsTrigger value="webinars">Webinar Recordings</TabsTrigger>
                    <TabsTrigger value="research">Research Papers</TabsTrigger>
                    <TabsTrigger value="presentations">Presentations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="webinars" className="space-y-6">
                    <ResourceCard 
                      title="The Future of Monetary Policy: Fed Outlook 2023-2024"
                      type="Webinar"
                      date="May 10, 2023"
                      description="Former Federal Reserve economist Dr. James Harrison discusses the trajectory of monetary policy and implications for investors."
                      icon={Video}
                      isPremium={true}
                    />
                    
                    <ResourceCard 
                      title="ESG Investing: Impact Measurement and Portfolio Integration"
                      type="Webinar"
                      date="Apr 25, 2023"
                      description="Panel discussion on the evolution of ESG metrics and practical approaches to portfolio construction."
                      icon={Video}
                    />
                    
                    <ResourceCard 
                      title="Emerging Market Opportunities: Asia-Pacific Focus"
                      type="Webinar"
                      date="Apr 12, 2023"
                      description="In-depth analysis of investment trends and opportunities across emerging Asian markets with regional experts."
                      icon={Video}
                      isPremium={true}
                    />
                  </TabsContent>
                  
                  <TabsContent value="research" className="space-y-6">
                    <ResourceCard 
                      title="Factor Investing in Volatile Markets: A Quantitative Analysis"
                      type="Research Paper"
                      date="May 20, 2023"
                      description="Comprehensive analysis of factor performance during market volatility, with actionable insights for portfolio construction."
                      icon={FileText}
                      isPremium={true}
                    />
                    
                    <ResourceCard 
                      title="The Evolution of Fixed Income: New Strategies for a Changed Landscape"
                      type="Research Paper"
                      date="May 5, 2023"
                      description="Exploring innovative approaches to fixed income investing in a rising rate environment."
                      icon={FileText}
                    />
                  </TabsContent>
                  
                  <TabsContent value="presentations" className="space-y-6">
                    <ResourceCard 
                      title="Q2 2023 Market Outlook: Sectors, Themes, and Opportunities"
                      type="Presentation"
                      date="Jun 1, 2023"
                      description="Comprehensive presentation on market outlook, sector rotation, and investment themes for the quarter ahead."
                      icon={PieChart}
                      isPremium={true}
                    />
                    
                    <ResourceCard 
                      title="Private Market Valuations: Finding Value in Late-Stage Growth"
                      type="Presentation"
                      date="May 15, 2023"
                      description="Analysis of private market dynamics, valuations, and strategies for institutional investors."
                      icon={PieChart}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 finance-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  What Our Members Say
                </h2>
                <p className="text-gray-200 max-w-3xl mx-auto">
                  Hear from the institutional investors who are part of our exclusive community.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "The private investment roundtables have been invaluable for our firm. The quality of insights and networking opportunities is exceptional.",
                    name: "David Chen",
                    title: "Chief Investment Officer",
                    company: "Horizon Capital Partners"
                  },
                  {
                    quote: "Accessing institutional-level research and being able to discuss strategies with like-minded investors gives us a significant edge in the market.",
                    name: "Emily Rodriguez",
                    title: "Portfolio Manager",
                    company: "Vertex Asset Management"
                  },
                  {
                    quote: "The quarterly macro forecasts have consistently helped us position our portfolio ahead of major market shifts. The insights are truly actionable.",
                    name: "Thomas Wright",
                    title: "Head of Research",
                    company: "Meridian Investments"
                  },
                  {
                    quote: "Being part of this community has transformed how we approach institutional investing. The collaboration and thought leadership are second to none.",
                    name: "Sarah Johnson",
                    title: "Managing Director",
                    company: "Atlas Wealth Advisors"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-white/90 dark:bg-finance-gray/90 border-0 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <svg className="h-8 w-8 text-finance-blue opacity-30" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center mt-auto">
                          <div className="mr-4">
                            <img 
                              src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 30}.jpg`} 
                              alt={testimonial.name} 
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-finance-blue dark:text-white">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.title}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-finance-blue rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Join Our Exclusive Investor Community
                  </h2>
                  <p className="text-xl text-gray-200 mb-8">
                    Apply today for membership and gain access to institutional-level insights, networking, and resources.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                      Apply for Membership
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white text-finance-blue ">
                      Learn More
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 mt-6">
                    Membership is by application only and limited to qualified institutional investors and senior finance professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;


import { Card } from "@/components/ui/card";
import { CircleCheck, TrendingUp, Building, Award } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      id: 1,
      title: "Portfolio Performance",
      value: "+32.7%",
      description: "Average portfolio outperformance",
      icon: <TrendingUp className="h-12 w-12 text-finance-blue dark:text-blue-400" />,
      color: "from-blue-500/20 to-blue-500/5 dark:from-blue-500/10 dark:to-blue-500/5",
    },
    {
      id: 2,
      title: "Institutional Clients",
      value: "200+",
      description: "Hedge funds and asset managers",
      icon: <Building className="h-12 w-12 text-finance-green dark:text-green-400" />,
      color: "from-green-500/20 to-green-500/5 dark:from-green-500/10 dark:to-green-500/5",
    },
    {
      id: 3,
      title: "Research Success Rate",
      value: "88%",
      description: "Recommendation accuracy",
      icon: <CircleCheck className="h-12 w-12 text-finance-gold dark:text-yellow-400" />,
      color: "from-yellow-500/20 to-yellow-500/5 dark:from-yellow-500/10 dark:to-yellow-500/5",
    },
    {
      id: 4,
      title: "Industry Recognition",
      value: "12",
      description: "Financial analysis awards",
      icon: <Award className="h-12 w-12 text-purple-500 dark:text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/5 dark:from-purple-500/10 dark:to-purple-500/5",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-blue dark:text-white mb-4">
            Our Performance Metrics
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover why leading institutions trust our financial intelligence services for their investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card 
              key={stat.id} 
              className="bg-white dark:bg-finance-gray border-0 shadow-lg rounded-xl overflow-hidden"
            >
              <div className={`h-full p-6 bg-gradient-to-br ${stat.color}`}>
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {stat.title}
                  </h3>
                  <div className="mt-auto">
                    <p className="text-4xl font-bold text-finance-blue dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

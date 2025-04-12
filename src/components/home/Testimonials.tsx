
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The AI-driven stock screening has completely transformed our research process. We're identifying opportunities faster than ever before.",
      author: "Sarah Johnson",
      title: "Chief Investment Officer",
      company: "Apex Capital Management",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      quote: "The institutional trading activity tracker gives us real insights into what smart money is doing. It's been a game-changer for our strategy.",
      author: "Michael Chen",
      title: "Portfolio Manager",
      company: "Blackrock Investments",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      quote: "Their bespoke research on emerging markets has consistently given us an edge. The depth of analysis is impressive and actionable.",
      author: "Robert Park",
      title: "Head of Research",
      company: "Vanguard Group",
      image: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
      id: 4,
      quote: "The private investment roundtables have connected us with like-minded institutions and generated valuable collaboration opportunities.",
      author: "Jessica Williams",
      title: "Managing Director",
      company: "Goldman Sachs Asset Management",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <section className="py-20 finance-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-200 text-lg">
            Hear from the institutional investors and wealth managers who rely on our financial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/90 dark:bg-finance-gray/90 border-0 shadow-lg rounded-xl overflow-hidden">
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
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-finance-blue dark:text-white">
                        {testimonial.author}
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
    </section>
  );
};

export default Testimonials;

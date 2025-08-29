import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertCircle, 
  MapPin, 
  PlusCircle, 
  Search,
  CheckCircle,
  Clock,
  Users,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const steps = [
    {
      icon: PlusCircle,
      title: "Report",
      description: "Submit civic issues with photos and detailed descriptions"
    },
    {
      icon: Clock,
      title: "Track",
      description: "Monitor your complaint's progress with real-time updates"
    },
    {
      icon: CheckCircle,
      title: "Resolve",
      description: "Watch as local authorities address and fix the issue"
    },
    {
      icon: Users,
      title: "Feedback",
      description: "Rate the resolution and help improve civic services"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Live Heatmaps",
      description: "Visualize civic issues across your community",
      link: "/heatmaps"
    },
    {
      icon: PlusCircle,
      title: "Report Issues",
      description: "Quick and easy issue reporting with AI validation",
      link: "/report"
    },
    {
      icon: Search,
      title: "Track Status",
      description: "Check your complaints and get real-time updates",
      link: "/status"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
              Make Your City
              <span className="text-primary"> Better</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Report civic issues, track their progress, and collaborate with your community 
              to create positive change. Your voice matters in building a better tomorrow.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="text-base">
                <Link to="/report">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Report an Issue
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base">
                <Link to="/heatmaps">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Heatmaps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple steps to make a difference in your community
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-1/2 -right-4 hidden h-6 w-6 text-muted-foreground lg:block transform -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Platform Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to engage with your local government
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <Button variant="ghost" className="mt-4 p-0 h-auto" asChild>
                      <Link to={feature.link} className="flex items-center text-primary">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of citizens working together to improve their communities
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started Today</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/heatmaps">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Issues
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
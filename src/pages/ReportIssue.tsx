import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  MapPin, 
  AlertCircle, 
  CheckCircle,
  Camera,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Roads & Infrastructure",
    "Street Lighting",
    "Waste Management",
    "Parking Issues",
    "Public Safety",
    "Water & Drainage",
    "Parks & Recreation",
    "Noise Complaints",
    "Building Violations",
    "Other"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form validation and submission
    setTimeout(() => {
      toast({
        title: "Issue Reported Successfully!",
        description: "Your complaint has been submitted and will be reviewed by our AI system.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        image: null
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const isFormValid = formData.title && formData.description && formData.category && formData.location;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground mt-2">
            Help improve your community by reporting civic issues
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All submissions are validated by AI to ensure relevance. Please provide clear descriptions and photos when possible.
          </AlertDescription>
        </Alert>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Issue Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Street address or landmark"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description of the issue, including when you noticed it and how it affects the community..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Photo Evidence (Optional)</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/20 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {formData.image ? (
                        <div className="flex items-center space-x-2 text-primary">
                          <CheckCircle className="h-6 w-6" />
                          <span className="text-sm font-medium">{formData.image.name}</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isFormValid || isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Issue Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be specific and accurate in your description</li>
              <li>• Include photos when possible for faster resolution</li>
              <li>• One issue per report for better tracking</li>
              <li>• Check if the issue has already been reported</li>
              <li>• Emergency situations should be reported to local authorities directly</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Fabric, Ruler, Palette, Scissors, Clock, DollarSign } from 'lucide-react';

interface DesignData {
  id: string;
  designType: string;
  color: string;
  style: string;
  weight: number;
  height: number;
  designPhoto: string;
  fabricSuggestion: {
    type: string;
    description: string;
    characteristics: string[];
    estimatedCost: number;
  };
  makingDetails: {
    difficulty: string;
    estimatedTime: string;
    requiredTools: string[];
    measurements: {
      bust: number;
      waist: number;
      hips: number;
      length: number;
    };
    instructions: string[];
  };
  createdAt: string;
}

export default function DressDesignDisplay() {
  const [designData, setDesignData] = useState<DesignData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for design submission events from DressDesignerForm
  useEffect(() => {
    const handleDesignSubmitted = (event: CustomEvent) => {
      setIsLoading(true);
      setError(null);
      
      // Simulate loading time for design generation
      setTimeout(() => {
        // Mock design data - in real implementation, this would come from the API response
        const mockDesignData: DesignData = {
          id: event.detail.id || 'mock-design-id',
          designType: event.detail.designType || 'evening',
          color: event.detail.color || '#000000',
          style: event.detail.style || 'elegant',
          weight: event.detail.weight || 65,
          height: event.detail.height || 170,
          designPhoto: `https://via.placeholder.com/400x600/${event.detail.color?.slice(1) || '000000'}/ffffff?text=${encodeURIComponent(event.detail.designType || 'Dress')}`,
          fabricSuggestion: {
            type: 'Silk Chiffon',
            description: 'Lightweight, flowing fabric perfect for elegant evening wear',
            characteristics: ['Breathable', 'Drapes beautifully', 'Soft texture', 'Natural fiber'],
            estimatedCost: 45
          },
          makingDetails: {
            difficulty: 'Intermediate',
            estimatedTime: '8-12 hours',
            requiredTools: ['Sewing machine', 'Fabric scissors', 'Measuring tape', 'Pins', 'Needles'],
            measurements: {
              bust: Math.round(event.detail.height * 0.55 || 94),
              waist: Math.round(event.detail.height * 0.45 || 77),
              hips: Math.round(event.detail.height * 0.53 || 90),
              length: Math.round(event.detail.height * 0.6 || 102)
            },
            instructions: [
              'Take accurate body measurements',
              'Create a pattern based on measurements',
              'Cut fabric according to pattern',
              'Sew main seams together',
              'Add finishing touches and hem'
            ]
          },
          createdAt: new Date().toISOString()
        };
        
        setDesignData(mockDesignData);
        setIsLoading(false);
      }, 2000);
    };

    window.addEventListener('designSubmitted', handleDesignSubmitted as EventListener);
    
    return () => {
      window.removeEventListener('designSubmitted', handleDesignSubmitted as EventListener);
    };
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Generating Your Design</CardTitle>
          <CardDescription>Please wait while we create your perfect dress design...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
          <Button onClick={() => setError(null)} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!designData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Your Design Awaits</CardTitle>
          <CardDescription>
            Submit your design preferences in the form above to see your custom dress design here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-muted-foreground">
            <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No design generated yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Design Preview Card */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Your Custom Design</CardTitle>
          <CardDescription>
            {designData.designType.charAt(0).toUpperCase() + designData.designType.slice(1)} dress in {designData.style} style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Design Photo */}
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-lg border-2 border-border">
              <img
                src={designData.designPhoto}
                alt={`${designData.designType} dress design`}
                className="w-80 h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
                <p className="text-sm font-medium">Color: {designData.color}</p>
              </div>
            </div>
          </div>

          {/* Design Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Style</p>
                <p className="text-sm text-muted-foreground capitalize">{designData.style}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Measurements</p>
                <p className="text-sm text-muted-foreground">{designData.height}cm, {designData.weight}kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Est. Time</p>
                <p className="text-sm text-muted-foreground">{designData.makingDetails.estimatedTime}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fabric Suggestion Card */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary flex items-center">
            <Fabric className="w-5 h-5 mr-2" />
            Recommended Fabric
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-accent">{designData.fabricSuggestion.type}</h3>
            <p className="text-muted-foreground mt-1">{designData.fabricSuggestion.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Characteristics:</h4>
            <div className="flex flex-wrap gap-2">
              {designData.fabricSuggestion.characteristics.map((char, index) => (
                <Badge key={index} variant="secondary">{char}</Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <span className="font-medium">Estimated Fabric Cost</span>
            </div>
            <span className="text-2xl font-bold text-primary">${designData.fabricSuggestion.estimatedCost}</span>
          </div>
        </CardContent>
      </Card>

      {/* Making Details Card */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary flex items-center">
            <Scissors className="w-5 h-5 mr-2" />
            Making Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Difficulty Level */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Difficulty Level:</span>
            <Badge className={getDifficultyColor(designData.makingDetails.difficulty)}>
              {designData.makingDetails.difficulty}
            </Badge>
          </div>

          {/* Required Tools */}
          <div>
            <h4 className="font-medium mb-2">Required Tools:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {designData.makingDetails.requiredTools.map((tool, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculated Measurements */}
          <div>
            <h4 className="font-medium mb-2">Calculated Pattern Measurements:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Bust</p>
                <p className="text-lg font-bold">{designData.makingDetails.measurements.bust}cm</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Waist</p>
                <p className="text-lg font-bold">{designData.makingDetails.measurements.waist}cm</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Hips</p>
                <p className="text-lg font-bold">{designData.makingDetails.measurements.hips}cm</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Length</p>
                <p className="text-lg font-bold">{designData.makingDetails.measurements.length}cm</p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="font-medium mb-2">Step-by-Step Instructions:</h4>
            <ol className="space-y-2">
              {designData.makingDetails.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Time Estimate */}
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-medium">Estimated Completion Time:</span>
              <span className="font-bold text-accent">{designData.makingDetails.estimatedTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

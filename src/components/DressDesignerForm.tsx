'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DesignFormData {
  designType: string;
  color: string;
  style: string;
  weight: number;
  height: number;
}

export default function DressDesignerForm() {
  const [formData, setFormData] = useState<DesignFormData>({
    designType: '',
    color: '',
    style: '',
    weight: 0,
    height: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof DesignFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/designs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit design request');
      }

      const result = await response.json();
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        designType: '',
        color: '',
        style: '',
        weight: 0,
        height: 0,
      });

      // Dispatch custom event for parent components to handle the response
      window.dispatchEvent(new CustomEvent('designSubmitted', { detail: result }));
    } catch (error) {
      console.error('Error submitting design:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Dress Designer</CardTitle>
        <CardDescription>
          Create your perfect dress design by providing your preferences and measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Design Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Design Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="designType">Dress Type</Label>
              <Select
                value={formData.designType}
                onValueChange={(value) => handleInputChange('designType', value)}
                required
              >
                <SelectTrigger id="designType">
                  <SelectValue placeholder="Select dress type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evening">Evening Gown</SelectItem>
                  <SelectItem value="casual">Casual Dress</SelectItem>
                  <SelectItem value="cocktail">Cocktail Dress</SelectItem>
                  <SelectItem value="wedding">Wedding Dress</SelectItem>
                  <SelectItem value="summer">Summer Dress</SelectItem>
                  <SelectItem value="formal">Formal Dress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Preferred Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="h-12 cursor-pointer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style Description</Label>
              <Input
                id="style"
                type="text"
                placeholder="e.g., A-line, fitted, flowing, vintage"
                value={formData.style}
                onChange={(e) => handleInputChange('style', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Measurements Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Your Measurements</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="30"
                  max="200"
                  step="0.1"
                  placeholder="65.5"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  placeholder="170"
                  value={formData.height || ''}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Design...' : 'Generate Design'}
          </Button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Design request submitted successfully! Check the display below for your design.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              Failed to submit design request. Please try again.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

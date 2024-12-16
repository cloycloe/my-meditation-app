import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import logo2 from '@/assets/logoA.png';
import NavBar from "@/components/common/NavBar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import PageTransition from "@/components/common/PageTransition";

const affirmationCategories = [
  {
    title: "Positivity",
    images: [
      "/src/assets/PositivtyA.jpg",
      "/src/assets/PositivityB.jpg",
      "/src/assets/PositivityC.jpg",
      "/src/assets/PositivityD.jpg",
      "/src/assets/PositivtyE.jpg",
    ],
    expandedImages: [
      "/src/assets/P1.jpg",
      "/src/assets/P2.jpg",
      "/src/assets/P3.jpg",
      "/src/assets/P4.jpg",
      "/src/assets/P5.jpg",
    ]
  },
  {
    title: "Reduce Anxiety",
    images: [
      "/src/assets/AnxietyA.jpg",
      "/src/assets/AnxietyB.jpg",
      "/src/assets/AnxietyC.jpg",
      "/src/assets/AnxietyD.jpg",
      "/src/assets/AnxietyE.jpg",
    ],
    expandedImages: [
      "/src/assets/A1.jpg",
      "/src/assets/A2.jpg",
      "/src/assets/A3.jpg",
      "/src/assets/A4.jpg",
      "/src/assets/A5.jpg",
    ]
  },
  {
    title: "Success",
    images: [
      "/src/assets/SuccessA.jpg",
      "/src/assets/SuccessB.jpg",
      "/src/assets/SuccessC.jpg",
      "/src/assets/SuccessD.jpg",
      "/src/assets/SuccessE.jpg",
    ],
    expandedImages: [
      "/src/assets/S1.jpg",
      "/src/assets/S2.jpg",
      "/src/assets/S3.jpg",
      "/src/assets/S4.jpg",
      "/src/assets/S5.jpg",
    ]
  },
  {
    title: "Self-Love & Confidence",
    images: [
      "/src/assets/SelfLoveA.jpg",
      "/src/assets/SelfLoveB.jpg",
      "/src/assets/SelfLoveC.jpg",
      "/src/assets/SelfLoveD.jpg",
      "/src/assets/SelfLoveE.jpg",
    ],
    expandedImages: [
      "/src/assets/SL1.jpg",
      "/src/assets/SL2.jpg",
      "/src/assets/SL3.jpg",
      "/src/assets/SL4.jpg",
      "/src/assets/SL5.jpg",
    ]
  }
];

const AffirmationPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (expandedImage) => {
    console.log('Image clicked:', expandedImage);
    setSelectedImage(expandedImage);
  };

  return (
    <PageTransition>
      <>
        <ScrollArea className="h-screen">
          <div className="min-h-screen bg-[#E8F3F3] pb-20">
            <div className="container max-w-md mx-auto p-6">
              {/* Header without logo */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/home')}
                  className="w-10 h-10"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>

                <div className="w-10 h-10" />
              </div>

              {/* Title */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Love yourself, Live your best life
                </h1>
              </div>

              {/* Affirmation Categories */}
              <div className="space-y-8">
                {affirmationCategories.map((category) => (
                  <div key={category.title} className="space-y-4">
                    <h2 className="text-xl font-medium tracking-tight">
                      {category.title}
                    </h2>
                    
                    <ScrollArea className="w-full whitespace-nowrap">
                      <div className="flex w-full gap-3 pb-4 px-[2px]">
                        {category.images.map((image, index) => (
                          <Card 
                            key={index}
                            className={cn(
                              "flex-shrink-0",
                              "hover:shadow-lg transition-all duration-300",
                              "rounded-[20px] overflow-hidden",
                              "w-[166px]",
                              "cursor-pointer",
                              index === category.images.length - 1 ? "mr-3" : ""
                            )}
                            onClick={() => handleImageClick(category.expandedImages?.[index])}
                          >
                            <CardContent className="p-0">
                              <img 
                                src={image} 
                                alt={`${category.title} ${index + 1}`}
                                className="w-[166px] h-[150px] object-cover"
                              />
                            </CardContent>
                          </Card>
                        ))} 
                      </div>
                      <ScrollBar 
                        orientation="horizontal" 
                        className="bg-secondary"
                      />
                    </ScrollArea>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NavBar />
        </ScrollArea>

        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogOverlay />
          <DialogPortal>
            <DialogContent className="w-full max-w-md">
              <img 
                src={selectedImage} 
                alt="Selected Image" 
                className="w-full h-auto"
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </>
    </PageTransition>
  );
};

export default AffirmationPage;

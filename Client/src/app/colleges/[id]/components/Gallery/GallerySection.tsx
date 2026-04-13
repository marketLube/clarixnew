import { useState } from "react";
import { Button } from "@/components/common/Button";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";

interface GallerySectionProps {
  college: any;
}

type GalleryCategory = "Campus" | "Hostel" | "Labs" | "Events";

const categories: GalleryCategory[] = ["Campus", "Hostel", "Labs", "Events"];

export default function GallerySection({ college }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Campus");

  const fieldMap: Record<GalleryCategory, string> = {
    Campus: "campusImages",
    Hostel: "hostelImages",
    Labs: "labsImages",
    Events: "eventsImages",
  };

  const activeField = fieldMap[activeCategory];
  const galleryImages = college?.[activeField] || [];

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-4 py-16">
        <SectionHeading title="Gallery" />
        <SectionDescription className="max-w-[24rem]">
          Browse authentic images of the campus, facilities, events, and daily
          student life to get a true sense of the college atmosphere.
        </SectionDescription>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "primary" : "outline"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-8 min-h-[400px]">
          {galleryImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
              <p className="text-gray-400 font-medium">No images available for {activeCategory} yet.</p>
            </div>
          ) : (
            (() => {
              /* Desktop / tablet layout: existing 3-image rows pattern */
              const desktopRows: string[][] = [];
              for (let i = 0; i < galleryImages.length; i += 3) {
                desktopRows.push(galleryImages.slice(i, i + 3));
              }

              /* Mobile layout: 2-image rows (one small, one big) */
              const mobileRows: string[][] = [];
              for (let i = 0; i < galleryImages.length; i += 2) {
                mobileRows.push(galleryImages.slice(i, i + 2));
              }

              return (
                <>
                  {/* Desktop / tablet */}
                  <div className="hidden md:flex flex-col gap-4">
                    {desktopRows.map((row, rowIndex) => {
                      const patternIndex = rowIndex % 3;
                      const smallImageIndex =
                        patternIndex === 0 ? 2 : patternIndex === 1 ? 1 : 0;

                      return (
                        <div key={rowIndex} className="grid grid-cols-5 gap-4">
                          {row.map((imageUrl, imageIndex) => {
                            const isSmall = imageIndex === smallImageIndex;
                            return (
                              <div
                                key={imageIndex}
                                className={`relative rounded-[16px] overflow-hidden h-[400px] border border-gray-100 shadow-sm ${isSmall ? "col-span-1" : "col-span-2"
                                  }`}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`${activeCategory} image ${rowIndex * 3 + imageIndex + 1
                                    }`}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile: 2 images per row, alternating small position */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {mobileRows.map((row, rowIndex) => {
                      const smallImageIndex = rowIndex % 2 === 0 ? 1 : 0;

                      return (
                        <div key={rowIndex} className="grid grid-cols-3 gap-3">
                          {row.map((imageUrl, imageIndex) => {
                            const isSmall = imageIndex === smallImageIndex;
                            return (
                              <div
                                key={imageIndex}
                                className={`relative rounded-[16px] overflow-hidden h-[220px] border border-gray-100 ${isSmall ? "col-span-1" : "col-span-2"
                                  }`}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`${activeCategory} image ${rowIndex * 2 + imageIndex + 1
                                    }`}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}


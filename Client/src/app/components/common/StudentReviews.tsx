"use client";

import React from "react";
import Image from "next/image";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";

interface Review {
  id: number;
  studentName: string;
  course: string;
  review: string;
  scholarshipName?: string;
  scholarshipAmount?: string;
  college?: string;
  imageUrl?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    studentName: "Rahul Verma",
    course: "M.Sc Physics at IISc Bangalore",
    review:
      '"Thanks to Clarix, I found the perfect scholarship that covered my entire tuition. The process was so simple!"',
    scholarshipName: "NSP Merit Scholarship",
    scholarshipAmount: "₹1,00,000",
    college: "IISc Bangalore",
  },
  {
    id: 2,
    studentName: "Ananya Reddy",
    course: "MA Economics at JNU",
    review:
      '"Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking."',
  },
  {
    id: 3,
    studentName: "Priya Sharma",
    course: "B.Tech Computer Science at IIT Delhi",
    review:
      '"Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growthAmazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth"',
  },
  {
    id: 4,
    studentName: "Priya Sharma",
    course: "B.Tech Computer Science at IIT Delhi",
    review:
      '"Clarix helped me discover scholarships I never knew existed. The eligibility checker saved me hours of research!"',
    scholarshipName: "Pragati Scholarship",
    scholarshipAmount: "₹50,000",
    college: "IIT Delhi",
  },
  {
    id: 5,
    studentName: "Ananya Reddy",
    course: "MA Economics at JNU",
    review:
      '"Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking."',
  },
  {
    id: 6,
    studentName: "Rahul Verma",
    course: "M.Sc Physics at IISc Bangalore",
    review:
      '"Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers."',
  },
  {
    id: 7,
    studentName: "Ananya Reddy",
    course: "MA Economics at JNU",
    review:
      '"Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking."',
  },
  {
    id: 8,
    studentName: "Rahul Verma",
    course: "M.Sc Physics at IISc Bangalore",
    review:
      '"Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers."',
  },
  {
    id: 9,
    studentName: "Priya Sharma",
    course: "B.Tech Computer Science at IIT Delhi",
    review:
      '"Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growthAmazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth"',
  },
];

export default function StudentReviews() {
  return (
    <section className="w-full py-16 bg-[#f6f7ff] ">
      <div className="container max-width-[1536px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center">
          <h2 className="font-poppins font-medium leading-[48px] text-[#162447] text-[40px] sm:text-[48px] tracking-[-0.96px]">
            Student Reviews
          </h2>
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] max-w-[638px]">
            Read authentic reviews from real students sharing their experiences
            with academics, faculty, campus life, and placements. Every review
            is verified to help you make confident decisions.
          </p>
        </div>

        {/* Reviews Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] w-full">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-[20px] shadow-[0px_7px_32.4px_0px_rgba(0,0,0,0.07)] p-5 flex flex-col w-full"
            >
              {/* Student Info */}
              <div className="flex gap-[10px] items-center mb-4">
                <div className="w-[50px] h-[50px] rounded-[10px] bg-[#d9d9d9] flex-shrink-0 overflow-hidden relative">
                  {review.imageUrl ? (
                    <Image
                      src={review.imageUrl}
                      alt={`${review.studentName} profile photo`}
                      fill
                      className="object-cover rounded-[10px]"
                      sizes="50px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#513392] to-[#6a46c0] flex items-center justify-center rounded-[10px]">
                      <span className="text-white font-medium text-lg">
                        {review.studentName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[9px] flex-1 min-w-0">
                  <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px] break-words">
                    {review.studentName}
                  </h3>
                  <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] break-words">
                    {review.course}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e2e4e8] mb-4 w-full"></div>

              {/* Review Text */}
              <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] mb-4 flex-1 break-words">
                {review.review}
              </p>

              {/* Scholarship Info (if available) */}
              {review.scholarshipName && (
                <div className="flex flex-col gap-[13px] mt-auto pt-4">
                  <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#513392]">
                    {review.scholarshipName} • {review.scholarshipAmount}
                  </p>
                  {review.college && (
                    <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                      {review.college}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button
            size="md"
            className="bg-[#f6f7ff] border-0 rounded-[30px] px-[14px] py-[10px] flex items-center gap-[10px] text-[16px] leading-[20px] hover:bg-[#e8e9f5] transition-colors text-[#ffffff] mt-4 "
          >
            <span className=" ">
              Load More Reviews
            </span>
            <ArrowRightIcon width={18} height={18} fill="#ffffff" />
          </Button>
        </div>
      </div>
    </section>
  );
}


import { Building2, Calendar, Check, MoreVertical, Trash2, X } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { Button } from "@/src/components/ui/button";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Review } from "@/src/servicesHooks/reviewHooks/types/reviewHooksType";
import { useUpdateReview } from "@/src/servicesHooks/reviewHooks/useUpdateReview";
import { useDeleteReview } from "@/src/servicesHooks/reviewHooks/useDeleteReview";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

    const handleStatusChange = (status: 'Approved' | 'Rejected') => {
        updateReview({ id: review._id, data: { status } });
    }

    const handleDelete = () => {
        deleteReview(review._id);
    }

    return (
        <div className="bg-white border-[#dee7e4] border-[0.5px] border-solid flex flex-col gap-[20px] items-start p-3 relative rounded-[20px] w-full">

            <div className="flex gap-[18px] items-start w-full">
                <div className="pt-1 shrink-0">
                    <input
                        type="checkbox"
                        className="appearance-none w-[14px] h-[14px] border-[0.5px] border-[#a6c3b9] rounded-[3px] cursor-pointer checked:bg-[#2d9a75] checked:border-[#2d9a75] relative flex items-center justify-center shrink-0 mt-2"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-1 items-start">
                    <div className="flex justify-between items-center w-full gap-[12px]">
                        <div className="w-[70px] h-[68px] rounded-[16px] overflow-hidden shrink-0 relative bg-gray-100">
                            <img
                                src={review.userAvatar || "/assets/user_avatar.png"}
                                alt={review.userName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/assets/user_avatar.png";
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-[2px] w-full">

                            <h3 className="font-medium text-base text-[#364440] leading-5">
                                {review.userName}
                            </h3>


                            <div className="flex items-center gap-[10px]">
                                {review.collegeName && (
                                    <p className="text-xs text-[#868f8b] flex items-center gap-[2px]">
                                        <Building2 className="w-4 h-4" /> {review.collegeName}
                                    </p>
                                )}
                                <p className="flex items-center gap-[2px] text-xs text-[#868f8b]">
                                    <Calendar className="w-4 h-4" />  {new Date(review.reviewDate || review.createdAt).toLocaleDateString()}
                                </p>
                            </div>


                        </div>
                        <div className="flex items-center gap-2">
                            <StatusBadge status={review.status} />
                            <ActionMenu
                                trigger={
                                    <button className="w-6 h-6 flex items-center justify-center cursor-pointer rounded">
                                        <MoreVertical className="w-4 h-4 text-[#364440]" />
                                    </button>
                                }
                                items={[
                                    { label: "Delete", icon: Trash2, danger: true, onClick: handleDelete },
                                ]}
                            />
                        </div>
                    </div>


                    <p className="text-[14px] font-semibold text-[#364440] text-wrap max-w-[32rem]">
                        {review.content}
                    </p>

                    <div className="flex items-center gap-[16px] mt-3">
                        <Button
                            onClick={() => handleStatusChange('Approved')}
                            disabled={isUpdating || review.status === 'Approved'}
                            className="flex items-center gap-[6px] px-[12px] py-[6px] h-auto bg-[#e6fcf4] border-[0.5px] border-[#a9e6d2] rounded-[8px] hover:bg-[#d4f8ec] text-[#2d9a75] text-xs font-medium shadow-none hover:text-[#2d9a75] disabled:opacity-50 disabled:cursor-not-allowed">
                            <Check className="w-3.5 h-3.5" />
                            Approve
                        </Button>

                        <Button
                            onClick={() => handleStatusChange('Rejected')}
                            disabled={isUpdating || review.status === 'Rejected'}
                            className="flex items-center gap-[6px] px-[12px] py-[6px] h-auto bg-white border-[0.5px] border-[#ffc9c9] rounded-[8px] hover:bg-red-50 text-[#f63f3f] text-xs font-medium shadow-none hover:text-[#f63f3f] disabled:opacity-50 disabled:cursor-not-allowed">
                            <X className="w-3.5 h-3.5" />
                            Reject
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
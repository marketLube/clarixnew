import { MapPin, MoreVertical, Eye, Pencil, Ban, FileText, Share2, Trash2 } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { CollegeStats } from "./CollegeStats";
import { CollegeListItemProps } from "../(types)/type";
import { useRouter } from "next/navigation";


export function CollegeListItem({
  college,
  isSelected,
  onToggleSelection,
  showDivider,
  onDelete,
}: CollegeListItemProps) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/colleges/view/${college?._id}`);
  };

  const handleEdit = () => {
    router.push(`/colleges/edit/${college?._id}`);
  };

  const handleDelete = () => {
    onDelete?.(college?._id);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex gap-3 items-center flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(college?._id)}
            className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
          />
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={college?.logo}
                alt={college?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* College Info */}
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-2 items-center">
                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                  {college?.name}
                </h3>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-0.5 items-center h-4">
                  <MapPin className="w-4 h-4 text-[rgba(54,68,62,0.6)]" />
                  <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                    {[college?.state, college?.city].filter(Boolean).join(', ')}
                  </span>
                </div>
                <span className="text-xs font-normal leading-4 text-[#868f8b] whitespace-nowrap">
                  {college.type}
                </span>
                {college?.category && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-[#868f8b]" />
                    <span className="text-xs font-normal leading-4 text-[#868f8b] whitespace-nowrap">
                      {typeof college.category === 'object' ? ((college.category as any).name || (college.category as any).title) : college.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Stats and Options */}
        <div className="flex gap-6 items-center px-0">
          <CollegeStats
            courses={college?.courses?.length}
            students={college.students}
            rating={college.rating}
          />


          <ActionMenu
            trigger={
              <button className="w-5 h-5 flex items-center justify-center cursor-pointer rounded">
                <MoreVertical className="w-5 h-5 text-[#364440]" />
              </button>
            }
            items={[
              { label: "View", icon: Eye, onClick: handleView },
              { label: "Edit", icon: Pencil, onClick: handleEdit },
              { label: "Delete", icon: Trash2, danger: true, onClick: handleDelete },
            ]}
          />
        </div>
      </div>

      {/* Divider */}
      {showDivider && <div className="h-px bg-[#aac4bc] w-full mt-2" />}
    </div>
  );
}


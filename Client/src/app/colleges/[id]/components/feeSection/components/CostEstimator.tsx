import { GraduationCapIcon } from "@/components/common/Icons";
import Selector from "@/components/common/Selector";
import FormField from "@/components/common/FormField";

export default function CostEstimator() {
  return (
    <div className="bg-[var(--white-color)] rounded-[20px] shadow-[1px_6px_21.3px_0px_rgba(0,0,0,0.01)] w-full px-6 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[24px] leading-[28px] tracking-[-0.48px] text-[var(--text-headline)] flex items-center gap-2">
          <GraduationCapIcon
            width={24}
            height={24}
            fill="var(--primary-color)"
          />{" "}
          Cost Estimator
        </p>
        <p className="text-[14px] leading-[20px] text-[var(--text-sub)]">
          Calculate your total education cost in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Tuition Fee">
          <Selector
            placeholder="Select Course"
            options={[
              { label: "B.Tech (CSE)", value: "btech-cse" },
              { label: "BBA", value: "bba" },
              { label: "B.Sc", value: "bsc" },
              { label: "MBA", value: "mba" },
            ]}
          />
        </FormField>

        <FormField label="Mess Charges">
          <Selector
            placeholder="Select Duration"
            options={[
              { label: "Per semester", value: "semester" },
              { label: "Per year", value: "year" },
            ]}
          />
        </FormField>

        <FormField label="Hostel Fees">
          <Selector
            placeholder="Select Duration"
            options={[
              { label: "Non-AC", value: "non-ac" },
              { label: "AC", value: "ac" },
            ]}
          />
        </FormField>

        <FormField label="Extra Expenses">
          <Selector
            placeholder="Select Extra Expenses"
            options={[
              { label: "Books & Supplies", value: "books" },
              { label: "Travel", value: "travel" },
              { label: "Others", value: "others" },
            ]}
          />
        </FormField>
      </div>

      <div className="mt-2 rounded-[20px] border border-[#ffc10680] bg-[rgba(255,193,6,0.07)] px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[12px] leading-[20px] tracking-[-0.24px] text-[var(--text-sub)]">
            Total Annual Cost
          </p>
          <p className="font-medium text-[24px] leading-[28px] tracking-[-0.48px] text-[var(--text-headline)]">
            ₹0000
          </p>
        </div>

        <div className="hidden h-full w-px bg-[#ffc10680] md:block" />

        <div className="flex flex-col gap-1 md:items-start">
          <p className="text-[12px] leading-[20px] tracking-[-0.24px] text-[var(--text-sub)]">
            Total Program Cost (4 years)
          </p>
          <p className="font-medium text-[24px] leading-[28px] tracking-[-0.48px] text-[var(--text-headline)]">
            ₹0000
          </p>
        </div>
      </div>
    </div>
  );
}

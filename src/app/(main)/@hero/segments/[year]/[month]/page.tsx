import {
  ExplorerHero,
  ExplorerHeroHeading,
} from "@/app/(main)/_components/Explorer";
import { DateTime } from "@/components/DateTime";
import { CassetteTapeIcon } from "lucide-react";

export default async function SegmentsByMonthHero({
  params,
}: {
  params: Promise<Record<"year" | "month", string>>;
}) {
  try {
    const { year: yearParam, month: monthParam } = await params;
    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);
    const date = new Temporal.PlainDate(year, month, 1).toString();

    return (
      <ExplorerHero>
        <ExplorerHeroHeading>
          <CassetteTapeIcon />
          <span>
            Segments for{" "}
            <DateTime
              date={date}
              options={{
                year: "numeric",
                month: "long",
              }}
            />
          </span>
        </ExplorerHeroHeading>
      </ExplorerHero>
    );
  } catch (_e) {
    return null;
  }
}

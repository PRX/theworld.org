import {
  ExplorerHero,
  ExplorerHeroHeading,
} from "@/app/(main)/_components/Explorer";
import { DateTime } from "@/components/DateTime";
import { CassetteTapeIcon } from "lucide-react";

export default async function SegmentsByDateHero({
  params,
}: {
  params: Promise<Record<"year" | "month" | "day", string>>;
}) {
  try {
    const { year: yearParam, month: monthParam, day: dayParam } = await params;
    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);
    const day = parseInt(dayParam, 10);
    const date = new Temporal.PlainDate(year, month, day).toString();

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
                day: "numeric",
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
